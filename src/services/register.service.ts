import { prisma } from "@/lib/prisma"
import { userRepository } from "@/repositories/users-repository"
import {hash} from "bcryptjs"
import { userAlreadyExistsError } from "./errors/user-already-exists-error"


interface RegisterServiceRequest {
    name:string
    email: string
    password:string
}

export class RegisterService {
    constructor(private userRepository: userRepository){

    }

    async execute({email,password,name}:RegisterServiceRequest){
        
        const password_hash = await hash(password,6)
        const userExists = await this.userRepository.findByEmail(email)
      
        if (userExists){
               throw new userAlreadyExistsError()
        }
        

        await this.userRepository.create({name,email,password_hash})

        return 
    }

}


