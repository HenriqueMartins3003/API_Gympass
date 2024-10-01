import { makeFetchUsersCheckInHistoryService } from '@/services/factories/make-fetch-users-check-ins-history.service'
import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'


export const history = async (request: FastifyRequest , reply: FastifyReply) => {
    
    const checkInsHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInsHistoryQuerySchema.parse(request.params)
    
    const fetchUserCheckInHistoryService = makeFetchUsersCheckInHistoryService()
        
    const { checkIns } = await fetchUserCheckInHistoryService.execute({ 
        page,
        userId: request.user.sub
     });
        
    return reply.status(200).send({checkIns})
}