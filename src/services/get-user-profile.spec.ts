import {expect, describe,it, beforeEach} from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileService } from './get-user-profile.service'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        sut = new GetUserProfileService(usersRepository)
    })
    it('Should be able to Get User Profile', async ()=> {
        
       const userCreated =  await usersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@example.com',
            password_hash: await hash('123456',6)
        })

       const {user} = await sut.execute({
         userId: userCreated.id
        })
         
        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')
    })

    it('Should not be able to get User Profile with wrong ID', async () => {
 
         expect(async () => {
            await sut.execute({
                userId: 'non-existing-id'
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

}) 
