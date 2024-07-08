import {expect, describe,it, beforeEach} from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymsService } from './fetch-nearby-gyms.service'

let gymRepository: InMemoryGymRepository
let sut: FetchNearbyGymsService

describe('Fetch user Check-in history Service', () => {
    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository();
        sut = new FetchNearbyGymsService(gymRepository)        
    })

    it('Should be able to fetch nearby Gyms', async ()=> {
       
       await gymRepository.create({
        title: "Javascript Gym",
            description: "Near Gym JS",
            phone: "987654",
            latitude: -23.6097523,
            longtitude: -46.6131605
       })
       
       await gymRepository.create({
        title: "Typescript Gym",
            description: "Far Gym TS",
            phone: "987654",
            latitude: -23.9549098,
            longtitude: -46.3868863
       })
       

       const {gyms} = await sut.execute({user_latitude: -23.6097523, user_longitude: -46.6131605})

       expect(gyms).toHaveLength(1)
       expect(gyms).toEqual([
        expect.objectContaining({title: 'Javascript Gym'}),
       ])
    })

}) 
