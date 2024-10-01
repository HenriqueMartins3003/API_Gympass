import { makeCheckInService } from '@/services/factories/make-check-in.service'
import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'

export const create = async (request: FastifyRequest , reply: FastifyReply) => {
    
    const createCheckInBodySchema = z.object({
        
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })
    const createCheckInParamSchema = z.object({
        gymId: z.string().uuid()
    })

    const { gymId } =
     createCheckInParamSchema.parse(request.params)
    const {latitude,longitude } =
     createCheckInBodySchema.parse(request.body)
    
    const checkInService = makeCheckInService()
        
    await checkInService.execute({
        gymId,
        userId: request.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    
    });
        
    
     return reply.status(201).send()
    
}