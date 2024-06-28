import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1 >Welcome to my LIST</h1>
      <h2>New here??</h2>
      <h2>Create a new user.</h2>
      <form action={async (formData) => {
        'use server'
        await prisma.owner.create({
          data: {
            owner_name: formData.get('u_name')
          }
        })
        revalidatePath('/')
      }}>
        <input type='text' name='u_name' placeholder='Your name here' />
        <button className='add'>Create</button>
      </form>

      <div style={{marginTop: "40vh"}}>
        <h1 style={{ fontSize: "5vh" }}>Already Created a user??</h1>
        <form action={async (formData) => {
          'use server'
          const route = formData.get('r_name')
          redirect(`/${route}`)
        }}>
          <input type='text' name='r_name' placeholder='Enter your name' />
          <button className='add' style={{ backgroundColor: 'green', border:'none' }}>My list</button>
        </form>
      </div>
    </div>
  )
}

export default page
