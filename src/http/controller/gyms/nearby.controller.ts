import { makeCreateGymService } from '@/services/factories/make-create-gym.service'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms.service'
import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'

export const searchNearby = async (request: FastifyRequest , reply: FastifyReply) => {
    
    const searchNearbyGymBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    
    const {latitude,longitude} = searchNearbyGymBodySchema.parse(request.body)
    
    const gymService = makeFetchNearbyGymsService()
        
    const { gyms } = await gymService.execute({user_latitude: latitude, user_longitude: longitude});
        
    return reply.status(200).send()
    
}