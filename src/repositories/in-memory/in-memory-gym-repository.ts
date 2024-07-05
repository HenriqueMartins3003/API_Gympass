import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymRepository implements GymRepository {
    
    public gyms: Gym[] = []
    
    async create(data: Prisma.GymCreateInput) {
        
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()) ,
            longtitude: new Prisma.Decimal(data.longtitude.toString()),
            created_at: new Date()
        }
        this.gyms.push(gym)
         
        return gym
    }
    
    async findBYId(id: string) {
        const gym = this.gyms.find((gym) => gym.id === id )

        if(!gym) {
            return null
        }
        return gym
    }

}