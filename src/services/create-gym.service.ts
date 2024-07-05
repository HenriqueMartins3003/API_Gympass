import { Gym } from "@prisma/client"
import { GymRepository } from "@/repositories/gym-repository"


interface CreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
    gym: Gym
}

export class CreateGymService {
    constructor(private gymRepository: GymRepository){

    }

    async execute({title,description,phone,latitude,longitude}:CreateGymServiceRequest):
     Promise<CreateGymServiceResponse>{
        
        const gym = await this.gymRepository.create(
            {title,
            phone: phone ?? "",
            description: description ?? "",
            latitude,
            longtitude: longitude
        })

     
        return { gym } 
    }

}