'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({ params }) => {
  const selected_item = await prisma.user.findUnique({
    where: {
      id: Number(params.id)
    }
  })

  await prisma.user.update({
    where: {
      id: Number(params.id)
    },
    data: {
      item_name: `${selected_item.item_name} ---purchased`
    }
  })
  revalidatePath('/')
  return (
    <div>
      <div className='card'>
        <h1>You selected {selected_item.item_name}</h1>
        <h1>Have you purchased {selected_item.item_name} ??</h1>
      </div>
      
      <form action={() => {
        'use server'
        redirect('/')
      }
      }><button className='clear' style={{ marginLeft: "30%" }}>Purchased</button></form>
      <form action={async () => {
        'use server'
        await prisma.user.delete({
          where: {
            id: Number(params.id)
          }
        })
        revalidatePath('/')
        redirect('/')
      }}>
        <button className='clear' style={{marginLeft: "30%"}}>Delete</button>
      </form>
    </div>
  )
}

export default page

