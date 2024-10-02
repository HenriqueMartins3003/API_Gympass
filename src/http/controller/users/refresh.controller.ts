import {z} from 'zod'
import {FastifyRequest, FastifyReply} from 'fastify'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate.service'


export const refresh = async (request: FastifyRequest , reply: FastifyReply) => {
    await request.jwtVerify({ onlyCookie: true })

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: request.user.sub
                }
            }
        )
        const refreshToken = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: request.user.sub,
                    expiresIn: '7d'
                }
            }
        )
        return reply.status(200)
        .setCookie('refreshToken',refreshToken,{
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        })
        .send({token})
    
}