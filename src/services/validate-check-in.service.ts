import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInError } from "./errors/late-checkIn-error";


interface ValidateCheckInServiceRequest {
    checkinId: string
 
}

interface ValidateCheckInServiceResponse {
    checkIn: CheckIn | null
}

export class ValidateCheckInService {

    
    constructor(
        private checkInsRepository: CheckInsRepository,
    ){
        
    }   

    async execute({checkinId}: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
        
        const checkIn = await this.checkInsRepository.findById(checkinId)

        if(!checkIn) {
            throw new ResourceNotFoundError()
        }
        const distanceInMinutesFromCheckInCreation = dayjs(new Date())
        .diff(checkIn.created_at,'minutes')

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInError()
        }
        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
             checkIn
        }
    }
}