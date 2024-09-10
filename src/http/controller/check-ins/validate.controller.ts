import { makeAuthenticateService } from '@/services/factories/make-authenticate.service'
import { makeCheckInService } from '@/services/factories/make-check-in.service'
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-ins.service'
import {FastifyRequest, FastifyReply} from 'fastify'
import {z} from 'zod'

export const validate = async (request: FastifyRequest , reply: FastifyReply) => {
    
    const validateCheckInParamSchema = z.object({
        checkinId: z.string().uuid()
    })

    const { checkinId } =
     validateCheckInParamSchema.parse(request.params)
    
    const validateCheckInService = makeValidateCheckInService()
        
    await validateCheckInService.execute({checkinId})
    
    return reply.status(204).send()
    
}