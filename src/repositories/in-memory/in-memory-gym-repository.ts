import { Gym } from "@prisma/client";
import { GymRepository } from "../gym-repository";

export class InMemoryGymRepository implements GymRepository {
    public gyms: Gym[] = []
    async findBYId(id: string) {
        const gym = this.gyms.find((gym) => gym.id === id )

        if(!gym) {
            return null
        }
        return gym
    }

}