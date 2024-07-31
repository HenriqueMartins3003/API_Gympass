import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"



export const gymRoutes = async (app: FastifyInstance) => {
    app.addHook('onRequest', verifyJWT)
    
} 