import { Gym, Prisma } from "@prisma/client";

export interface findManyNearbyParamns{
    latitude: number
    longtitude: number
}
export interface GymRepository {
    searchMany(query: string, page: number):Promise<Gym[]>
    findManyNearby(params: findManyNearbyParamns): Promise<Gym[]>
    findBYId(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}

