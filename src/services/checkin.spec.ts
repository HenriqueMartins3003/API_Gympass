import { hash } from 'bcryptjs'
import {expect, describe,it, beforeEach} from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CheckInService } from './checkin.service'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { randomUUID } from 'crypto'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInService

describe('Check-in Service', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new CheckInService(checkInRepository)
    })
    it('Should be able to Check in', async ()=> {
        
        const {checkIn} = await sut.execute({
            gymId: randomUUID(),
            userId: randomUUID()
            
        })
         
        expect(checkIn?.id).toEqual(expect.any(String))
    })

}) 
