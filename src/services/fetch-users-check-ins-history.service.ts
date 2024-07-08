import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";

interface FetchUsersCheckInHistoryServiceRequest {
    userId: string
    page: number
    
}

interface FetchUsersCheckInHistoryServiceResponse {
    checkIns: CheckIn[]
}

export class FetchUsersCheckInHistoryService {

    
    constructor(
        private checkInsRepository: CheckInsRepository,
    ){
        
    }   

    async execute({userId,page}: FetchUsersCheckInHistoryServiceRequest): Promise<FetchUsersCheckInHistoryServiceResponse> {

        const checkIns = await this.checkInsRepository.findManyByUserId(userId,page)

        return {
            checkIns
        }
    }
}