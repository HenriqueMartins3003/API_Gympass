import {expect, describe,it, beforeEach, afterEach,vi} from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInService } from './validate-check-in.service'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckInError } from './errors/late-checkIn-error'


let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService

describe('Validade Check-in Service', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new ValidateCheckInService(checkInRepository); 
        vi.useFakeTimers()
    })

    afterEach(()=> {
        vi.useRealTimers()
    })
    it('Should be able to validate a Check in', async ()=> {
        
        const createdCheckIn = await checkInRepository.create({
            gym_Id: "gym-01",
            user_id: "user_01"
        })
        
        const {checkIn} =  await sut.execute({checkinId: createdCheckIn.id})
         
        expect(checkIn?.validated_at ).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })
    
    it('Should not be able to validate a Check in', async ()=> {
        
         
        expect(async () => {
            await sut.execute({
                checkinId: "Inexistent"
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
        
    })

    it('Should not be able to validate a Check in after 20 minutes of this creation', async ()=> {
        
        vi.setSystemTime(new Date(2023,0,1,13,40))

        const createdCheckIn = await checkInRepository.create({
            gym_Id: 'gym-01',
            user_id: 'user-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)
        
        expect(async () => {
            await sut.execute({
                checkinId: createdCheckIn.id
            })
        }).rejects.toBeInstanceOf(LateCheckInError)
    })
}) 
