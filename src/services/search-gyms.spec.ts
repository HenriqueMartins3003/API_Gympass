import {expect, describe,it, beforeEach, afterEach,vi} from 'vitest'
import { SearchGymsService } from './search-gyms.service'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let gymRepository: InMemoryGymRepository
let sut: SearchGymsService

describe('Fetch user Check-in history Service', () => {
    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository();
        sut = new SearchGymsService(gymRepository)        
    })

    it('Should be able to search for Gyms', async ()=> {
       
       await gymRepository.create({
        title: "Javascript Gym",
            description: "Gym JS",
            phone: "987654",
            latitude: -12345,
            longtitude: -23456
       })
       
       await gymRepository.create({
        title: "Typescript Gym",
            description: "Gym TS",
            phone: "987654",
            latitude: -12345,
            longtitude: -23456
       })
       

       const {gyms} = await sut.execute({query:'Javascript',page: 1})

       expect(gyms).toHaveLength(1)
       expect(gyms).toEqual([
        expect.objectContaining({title: 'Javascript Gym'}),
       ])
    })

    it('Should be able to search Gyms with paginate', async ()=> {
       
        for(let i=1; i<= 22; i++){
            await gymRepository.create({
                title: `Javascript Gym ${i}`,
                    description: "Gym JS",
                    phone: "987654",
                    latitude: -12345,
                    longtitude: -23456
               })
        }
        const {gyms} = await sut.execute({query:'Javascript',page: 2})
 
        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
         expect.objectContaining({title: 'Javascript Gym 21'}),
         expect.objectContaining({title: 'Javascript Gym 22'}),
         
        ])
     })
}) 
