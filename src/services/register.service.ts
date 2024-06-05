import { prisma } from "@/lib/prisma"
import {hash} from "bcryptjs"


interface RegisterServiceRequest {
    name:string
    email: string
    password:string
}

export class RegisterService {
    constructor(private userRepository: any){

    }

    async execute({email,password,name}:RegisterServiceRequest){
        
        const password_hash = await hash(password,6)

        const userExists = await prisma.user.findUnique({
            where: {
                    email,
                }
            })

        if (userExists){
               throw new Error()
        }
        

        await this.userRepository.create({name,email,password_hash})

        return 
    }

}


