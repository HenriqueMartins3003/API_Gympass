import { FastifyInstance } from "fastify"

import { verifyJWT } from "../../middlewares/verify-jwt"

import { search } from "./search.controller"
import { create } from "./create.controller"
import { searchNearby } from "./nearby.controller"
import { verifyUserRole } from "@/http/middlewares/verify-user-role"

export const gymRoutes = async (app: FastifyInstance) => {
    //app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', searchNearby)

    app.post('/gyms',{ onRequest: [verifyUserRole('ADMIN')]} ,create)
} 