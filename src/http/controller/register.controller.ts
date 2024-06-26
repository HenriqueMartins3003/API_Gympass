import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { userAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { RegisterService } from '@/services/register.service'
import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'


export const register = async (request: FastifyRequest , reply: FastifyReply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    
    const {name,email,password} = registerBodySchema.parse(request.body)

    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        
        const registerService = new RegisterService(prismaUsersRepository)
        
        await registerService.execute({name,email,password});
        
        return reply.status(201).send()
    } catch (error) {
        if(error instanceof userAlreadyExistsError){
            return reply.status(409).send({message: error.message})
        }
        throw error
    }


}