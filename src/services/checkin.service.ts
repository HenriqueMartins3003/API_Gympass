import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
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
        
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId,new Date())

        if(checkInOnSameDate){
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({gym_Id: gymId, user_id: userId})
        
        if(!checkIn){
            throw new InvalidCredentialsError();

        }
        
        return {
            checkIn
        }
    }
}