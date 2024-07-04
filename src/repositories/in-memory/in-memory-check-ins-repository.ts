import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../prisma/check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckInsRepository {
    
    public items: CheckIn[] = []
    
     async findByUserIdOnDate(userId: string, date: Date) {
        
        const startOfTheDay =dayjs(date).startOf('date')
        const endOfTheday = dayjs(date).endOf('date')
        
        const checkInOnSameDate = this.items.find(
            (checkIn) =>{ 
               const checkInDate = dayjs(checkIn.created_at)
               const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheday) 
                
               return checkIn.user_id === userId && isOnSameDate}
        )

        if(!checkInOnSameDate){
            return null
        }
        
        return checkInOnSameDate
    }
    
    
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