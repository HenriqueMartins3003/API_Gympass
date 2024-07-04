import { Gym, Prisma } from "@prisma/client";

export interface GymRepository {
    findBYId(id: string): Promise<Gym | null>
}

