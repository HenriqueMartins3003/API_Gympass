import { FastifyInstance } from "fastify"
import { verifyJWT } from "../middlewares/verify-jwt"
import { profile } from "../controller/profile.controller"
import { register } from "@/http/controller/register.controller"
import { authenticate } from "../controller/authenticate.controller"


export const appRoutes = async (app: FastifyInstance) => {
    app.post("/users", register )
    app.post("/sessions", authenticate)

    //**Authenticated Routes */
    app.get("/me",{onRequest: [verifyJWT]},profile)
} 