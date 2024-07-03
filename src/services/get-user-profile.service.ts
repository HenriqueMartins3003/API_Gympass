import { userRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileServiceRequest {
 userId: string
}

interface GetUserProfileServiceResponse {
    user: User
}

export class GetUserProfileService {

    
    constructor(private userRepository: userRepository){
        
    }   
 
    async execute({userId}: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new ResourceNotFoundError();

        }
        
        return {
            user
        }
    }
}