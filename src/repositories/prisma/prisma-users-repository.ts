import {prisma} from "@/lib/prisma"
import { Prisma } from "@prisma/client" 
import { userRepository } from "../users-repository";

export class PrismaUsersRepository implements userRepository {
    async create (data: Prisma.UserCreateInput){
      const user = await prisma.user.create({
            data
        })
        return user;
    }
    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
                    email,
                }
            })

        return user
    }

}


