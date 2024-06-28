'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async (params) => {
  const selected = await prisma.user.findUnique({
    where: {
      id: Number(params.params.slug)
    }
  })
  return (
    <div>
      <div className='card'>
        <h1>have you purchased {selected.item_name}</h1>
      </div>
      <form action={async () => {
        'use server'
        await prisma.user.update({
          where: {
            id: Number(params.params.slug)
          },
          data: {
            item_name: `${selected.item_name} --purchased`
          }
        })
        revalidatePath(`/${params.params.id}`)
        redirect(`/${params.params.id}`)
      }}> 
        <button className='clear' style={{marginLeft: "30%"}}>Purchased</button>
      </form>
      <form action={async () => {
        'use server'
        await prisma.user.delete({
          where: {
            id: Number(params.params.slug)
          }
        })
        revalidatePath(`/${params.params.id}`)
        redirect(`/${params.params.id}`)
      }}>
        <button className='clear' style={{marginLeft: "30%"}}>Delete</button>
      </form>
    </div>
  )
}

export default page
