import {expect, describe,it, beforeEach, afterEach,vi} from 'vitest'
import { CheckInService } from './checkin.service'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { randomUUID } from 'crypto'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInService

describe('Check-in Service', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new CheckInService(checkInRepository)
        vi.useFakeTimers()
    })

    afterEach(()=> {
        vi.useRealTimers()
    })
    it('Should be able to Check in', async ()=> {
        
        const {checkIn} = await sut.execute({
            gymId: randomUUID(),
            userId: randomUUID()
            
        })
         
        expect(checkIn?.id).toEqual(expect.any(String))
    })
    it('Should not be able to Check in twice in the same day', async ()=> {
        vi.setSystemTime(new Date(2022,0,20,8,0,0))
         await sut.execute({
             gymId: 'gym-01',
             userId: 'user-01'
            
        })
        await expect(async () => {
           await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01'
            })
        }).rejects.toBeInstanceOf(Error)
    })
    
    it('Should  be able to Check in twice but in different days', async ()=> {
        vi.setSystemTime(new Date(2022,0,20,8,0,0))
         await sut.execute({
             gymId: 'gym-01',
             userId: 'user-01'
            
        })
        vi.setSystemTime(new Date(2022,0,21,8,0,0))

        const {checkIn} = await sut.execute(
            {
                gymId: 'gym-01',
                userId: 'user-01'
            })

        expect(checkIn?.id).toEqual(expect.any(String))
        
    })
}) 
