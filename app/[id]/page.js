import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }) => {
    const list = await prisma.user.findMany({
        where: {
            owner_name: params.id,
        }
  })
  return (
    <div>
          <h1>List</h1>
          <form action={async (formData) => {
              'use server'
              await prisma.user.create({
                  data: {
                      item_name: formData.get('item_name'),
                      owner: {
                          connectOrCreate: {
                              where: {
                                  owner_name: params.id, 
                              },
                              create: {
                                  owner_name: params.id, 
                              }
                          }
                      }
                  }
              })
              revalidatePath(`/${params.id}`)
          }}>
            <input type='text' name='item_name' placeholder='Add item here' />
            <button className='add'>Add</button>
          </form>
          <hr />
          <ol>
              {list.map((t) => (
                  <li key={t.id}><Link href={`/${params.id}/${t.id}`}>{t.item_name}</Link></li>
              ))}
          </ol>
          <hr/>
          <form action={async () => {
              'use server'
              await prisma.user.deleteMany({
                  where: {
                      owner_name: params.id
                  }
              })

              revalidatePath(`/${params.id}`)
          }}>
              <button className='clear'>Clear</button>
          </form>
    </div>
  )
}

export default page
