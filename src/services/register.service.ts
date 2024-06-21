import { userRepository } from "@/repositories/users-repository"
import {hash} from "bcryptjs"
import { userAlreadyExistsError } from "./errors/user-already-exists-error"
import {User} from "@prisma/client"


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

    async execute({email,password,name}:RegisterServiceRequest): Promise<RegisterServiceResponse>{
        
        const password_hash = await hash(password,6)
        
        const userExists = await this.userRepository.findByEmail(email)
        console.log(userExists,"#######")
        
        if (userExists){
            console.log("Passei aqui!!!")
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


