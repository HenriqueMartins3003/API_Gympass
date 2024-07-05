import {expect, describe,it, beforeEach, afterEach,vi} from 'vitest'
import { CheckInService } from './checkin.service'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { randomUUID } from 'crypto'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInError } from './errors/max-number-of-checkin-error'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInService

describe('Check-in Service', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository();
        gymsRepository = new InMemoryGymRepository()
        sut = new CheckInService(checkInRepository,gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Js Gym',
            description: 'Gym JS',
            phone: '',
            latitude: new Decimal(-22.970722),
            longtitude: new Decimal(-43.182365)
        })
        
        vi.useFakeTimers()
    })

    afterEach(()=> {
        vi.useRealTimers()
    })
    it('Should be able to Check in', async ()=> {
        const {checkIn} = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -22.970722,
            userLongitude: -43.182365
            
        })
         
        expect(checkIn?.id).toEqual(expect.any(String))
    })
    it('Should not be able to Check in twice in the same day', async ()=> {
        vi.setSystemTime(new Date(2022,0,20,8,0,0))
         await sut.execute({
             gymId: 'gym-01',
             userId: 'user-01',
             userLatitude: -22.970722,        
             userLongitude: -43.182365
            
        })
        await expect(async () => {
           await sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -22.970722,        
                userLongitude: -43.182365
            })
        }).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
    })
    
    it('Should  be able to Check in twice but in different days', async ()=> {
        vi.setSystemTime(new Date(2022,0,20,8,0,0))
         await sut.execute({
             gymId: 'gym-01',
             userId: 'user-01',
             userLatitude: -22.970722,        
             userLongitude: -43.182365
            
        })
        vi.setSystemTime(new Date(2022,0,21,8,0,0))

        const {checkIn} = await sut.execute(
            {
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -22.970722,            
                userLongitude: -43.182365
            })

        expect(checkIn?.id).toEqual(expect.any(String))
        
    })
    it('Should not be able to Check-in on a distant gym', async ()=> {
        gymsRepository.gyms.push({
            id: 'gym-02',
            title: 'Js Gym',
            description: 'Gym JS',
            phone: '',
            latitude: new Decimal(-23.6019924),
            longtitude: new Decimal(-46.6150939)
        })

        expect( async () => { 
            const {checkIn} = await sut.execute({
                gymId: 'gym-02',
                userId: 'user-01',
                userLatitude: -23.6047771,
                userLongitude: -46.6071492
            
            })
        }).rejects.toBeInstanceOf(MaxDistanceError)
        
    })
}) 
