import {expect, describe,it, beforeEach, afterEach,vi} from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUsersCheckInHistoryService } from './fetch-users-check-ins-history.service'

let checkInRepository: InMemoryCheckInRepository

let sut: FetchUsersCheckInHistoryService

describe('Fetch user Check-in history Service', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new FetchUsersCheckInHistoryService(checkInRepository)        
    })

    it('Should be able to fetch Check in history', async ()=> {
       
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

       const {checkIns} = await sut.execute({userId: 'user-01',page: 1})

       expect(checkIns).toHaveLength(2)
       expect(checkIns).toEqual([
        expect.objectContaining({gym_Id: 'Gym-01'}),
        expect.objectContaining({gym_Id: 'Gym-02'})
       ])
    })
  
    it('Should be able to fetch paginated Check in history', async ()=> {
        
        for (let i=1;i<=22;i++){
            await checkInRepository.create({
                gym_Id: `gym-${i}`,
                user_id: 'user-01',
                created_at: new Date()
            })
        }
       
        const {checkIns} = await sut.execute({userId: 'user-01',page: 2})

        console.log(checkIns, "!@#$%$#@!%$#@!!@#$%¨%$#@!")
 
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
         expect.objectContaining({gym_Id: 'gym-21'}),
         expect.objectContaining({gym_Id: 'gym-22'})
        ])
     })
}) 
