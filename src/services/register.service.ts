import {hash} from "bcryptjs"
import {User} from "@prisma/client"
import { userRepository } from "@/repositories/users-repository"
import { userAlreadyExistsError } from "./errors/user-already-exists-error"


interface RegisterServiceRequest {
    name:string
    email: string
    password:string
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    constructor(private userRepository: userRepository){

    }

    async execute({email,name,password}:RegisterServiceRequest): Promise<RegisterServiceResponse>{
        
        const password_hash = await hash(password,6)
        
        const userExists = await this.userRepository.findByEmail(email)
        
        if (userExists){
               throw new userAlreadyExistsError()
        }
        

        const user = await this.userRepository.create({
            name,
            email,
            password_hash
        })

        return {
            user  
        } 
    }

}


