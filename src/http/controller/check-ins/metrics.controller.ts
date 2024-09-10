import { makeGetUserMetricsService } from '@/services/factories/make-get-users-metrics.service';
import {FastifyRequest, FastifyReply} from 'fastify'

export const metrics = async (request: FastifyRequest , reply: FastifyReply) => {
    
    

    const fetchUserCheckIMetricsService = makeGetUserMetricsService()
        
    const { checkInsCount } = await fetchUserCheckIMetricsService.execute({
        userId: request.user.sub
    });
        
    return reply.status(200).send({ checkInsCount })
}