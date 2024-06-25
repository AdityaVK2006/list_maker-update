'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const deleteHandler = async (formData) => {
    const item = formData.get('selected_item')
    await prisma.user.update({
        where: {
        item_name: item
        },
        data: {
            item_name: `${item} --purchased`
        }
    })
    revalidatePath('/')
}

export default deleteHandler
