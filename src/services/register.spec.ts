import {expect, describe,it, beforeEach} from 'vitest'
import { RegisterService } from './register.service'
import { compare } from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { userAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUserRepository
let sut: RegisterService

describe('Register Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUserRepository();
        sut = new RegisterService(usersRepository)
    })
    it('Should hash user password upon registration', async ()=> {
       const userRepository = new InMemoryUserRepository()
        const registerService = new RegisterService(userRepository)

       const {user} = await registerService.execute({
            name:'John Doe',
            email: 'johnDoe@example.com',
            password: '123456'
        })
         
        const isPasswordHashed = await compare('123456',user.password_hash)

        expect(isPasswordHashed).toBe(true) 
    })
    
    it('Should not be able to register with same email twice', async ()=> {
        sut;
        
         await sut.execute({
             name:'John Doe',
             email: 'johnDoe@example.com',
             password: '123456'
         })

         await expect(async () => {
             await sut.execute({
             name:'John Doe',
             email: 'johnDoe@example.com',
             password: '123456'
            })
        }).rejects.toBeInstanceOf(userAlreadyExistsError)
     })
}) 
