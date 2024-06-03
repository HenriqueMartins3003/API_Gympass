import { prisma } from "@/lib/prisma"
import {hash} from "bcryptjs"


interface RegisterServiceRequest {
    name:string
    email: string
    password:string
}


export const registerService = async ({email,password,name}:RegisterServiceRequest) => {
    
    const password_hash = await hash(password,6)

    const userExists = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if (userExists){
           throw new Error()
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })

    return 
}