
import clear from '@/components/clear'
import deleteHandler from '@/components/deleteHandler'
import getData from '@/components/getData'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const data = await prisma.user.findMany()
  return (
    <div>
      <h1>List</h1>
      <form action={getData}>
        <input type='text' name='new_item' placeholder='Add new item' />
        <button className='add'>Add</button>
      </form>
      <hr/>
      <ol>
        {data.map((t) => (
          <li key={t.id}><Link href={`/${t.id}`} >{ t.item_name }</Link></li>
        ))}
      </ol>
      <form action={clear}>
        <button className='clear'>Clear</button>
      </form>
    </div>
  )
}

export default page
