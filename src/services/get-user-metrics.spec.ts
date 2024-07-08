import {expect, describe,it, beforeEach, afterEach,vi} from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository

let sut: GetUserMetricsService

describe('Get User Metricts Service', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new GetUserMetricsService(checkInRepository)        
    })

    it('Should be able to Get Check-in count from Metrics', async ()=> {
       
        await checkInRepository.create({
            gym_Id: 'Gym-01',
            user_id: 'user-01',
            created_at: new Date()
           })
           await checkInRepository.create({
            gym_Id: 'Gym-02',
            user_id: 'user-01',
            created_at: new Date()
           })
    
           const {checkInsCount} = await sut.execute({userId: 'user-01'})
           
           expect(checkInsCount).toEqual(2)
     
    })
  
    
}) 
