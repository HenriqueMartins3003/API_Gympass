import { makeSearchGymsService } from '@/services/factories/make-search-gyms.service'
import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'

export const search = async (request: FastifyRequest , reply: FastifyReply) => {
    
    const searchGymQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const {q , page} =searchGymQuerySchema.parse(request.query)
    
    const gymService = makeSearchGymsService()
        
    const { gyms } = await gymService.execute({ query:q ,page});
        
    return reply.status(200).send()
    
}