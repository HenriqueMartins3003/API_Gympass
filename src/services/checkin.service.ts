import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface CheckInServiceRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInServiceResponse {
    checkIn: CheckIn | undefined
}

export class CheckInService {

    
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymRepository
    ){
        
    }   

    async execute({userId,gymId,userLatitude,userLongitude}: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const gym = await this.gymsRepository.findBYId(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }
        
        //calculate distance between gym and user
        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longtitude.toNumber()})

        const MAX_DISTANCE_IN_KM = 0.1    
        if (distance > MAX_DISTANCE_IN_KM){
            throw new Error()
        }


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