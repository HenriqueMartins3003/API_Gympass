import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms.service'
import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'

export const searchNearby = async (request: FastifyRequest , reply: FastifyReply) => {
    
    const searchNearbyGymQuerySchema = z.object({
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    
    const {latitude,longitude} = searchNearbyGymQuerySchema.parse(request.query)
    
    const gymService = makeFetchNearbyGymsService()
        
    const { gyms } = await gymService.execute({user_latitude: latitude, user_longitude: longitude});
        
    return reply.status(200).send({
        gyms
    })
    
}