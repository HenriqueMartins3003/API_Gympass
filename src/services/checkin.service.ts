import { userRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";

interface CheckInServiceRequest {
    userId: string,
    gymId: string
}

interface CheckInServiceResponse {
    checkIn: CheckIn | undefined
}

export class CheckInService {

    
    constructor(private checkInsRepository: CheckInsRepository){
        
    }   

    async execute({userId,gymId}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        
        const checkIn = await this.checkInsRepository.create({gym_Id: gymId, user_id: userId})
        
        if(!checkIn){
            throw new InvalidCredentialsError();

        }
        
        return {
            checkIn
        }
    }
}