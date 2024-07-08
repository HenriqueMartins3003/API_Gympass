import { Gym } from "@prisma/client"
import { GymRepository } from "@/repositories/gym-repository"


interface SearchGymsServiceRequest {
  query: string
  page: number
  
}

interface SearchGymsServiceResponse {
    gyms: Gym[]
}

export class SearchGymsService {
    constructor(private gymRepository: GymRepository){

    }

    async execute({query,page}:SearchGymsServiceRequest):
     Promise<SearchGymsServiceResponse>{
        
        const gyms = await this.gymRepository.searchMany(query,page)

     
        return { gyms } 
    }

}