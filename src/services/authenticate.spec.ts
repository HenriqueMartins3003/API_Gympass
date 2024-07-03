import {expect, describe,it, beforeEach} from 'vitest'
import {AuthenticateService} from './authenticate.service'
import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUserRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        sut = new AuthenticateService(usersRepository)
    })
    it('Should be able to Authenticate', async ()=> {
        
        await usersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@example.com',
            password_hash: await hash('123456',6)
        })

       const {user} = await sut.execute({
            
            email: 'johnDoe@example.com',
            password: '123456'
        })
         
        expect(user.id).toEqual(expect.any(String))
    })

    it('Should not be able to authenticate with wrong email', async () => {
 
         expect(async () => {
            await sut.execute({
                email: 'johnDoe@example.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })


    it('Should not be able to authenticate with wrong password', async () => {   
        await usersRepository.create({
            name: 'John Doe',
            email: 'johnDoe@example.com',
            password_hash: await hash('123456',6)
        })

         expect(async () => {
            await sut.execute({
                email: 'johnDoe@example.com',
                password: '123123'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
}) 
