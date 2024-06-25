'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const getData = async (formData) => {
    await prisma.user.create({
        data: {
          item_name: formData.get('new_item')
      }
    })
    revalidatePath('/')
}

export default getData
