'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const clear = async () => {
    await prisma.user.deleteMany({})
    revalidatePath('/')
}

export default clear
