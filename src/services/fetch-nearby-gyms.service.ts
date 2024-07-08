import { Gym } from "@prisma/client"
import { GymRepository } from "@/repositories/gym-repository"


interface FetchNearbyGymsServiceRequest {
  user_latitude: number
  user_longitude: number
}

interface FetchNearbyGymsServiceResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsService {
    constructor(private gymRepository: GymRepository){

    }

    async execute({user_latitude,user_longitude}:FetchNearbyGymsServiceRequest):
     Promise<FetchNearbyGymsServiceResponse>{
        
        const gyms = await this.gymRepository.findManyNearby({latitude: user_latitude, longitude: user_longitude})

     
        return { gyms } 
    }

}