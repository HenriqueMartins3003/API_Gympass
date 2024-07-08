import { Gym, Prisma } from "@prisma/client";

export interface GymRepository {
    searchMany(query: string, page: number):Promise<Gym[]>
    findBYId(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}

