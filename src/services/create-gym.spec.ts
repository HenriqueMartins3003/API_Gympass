import {expect, describe,it, beforeEach} from 'vitest'
import { CreateGymService} from './create-gym.service'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository' 
import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

let gymRepository: InMemoryGymRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new CreateGymService(gymRepository)
    })

    it('Should be able to create a new gym', async ()=> {
        const {gym} = await sut.execute({
            title: "gym-01",
            description: "Gym JS",
            phone: "987654",
            latitude: -12345,
            longitude: -23456
        })
        expect(gym.id).toEqual(expect.any(String))
    })
    
}) 
