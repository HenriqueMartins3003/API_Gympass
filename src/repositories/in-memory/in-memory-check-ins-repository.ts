import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../prisma/check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepository implements CheckInsRepository {
    
    public items: CheckIn[] = []
    
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        
        const checkIn = {
            id: randomUUID(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
            user_id: data.user_id,
            gym_Id: data.gym_Id,
        
        }
        
        this.items.push(checkIn) 

        return checkIn
    
    }

}