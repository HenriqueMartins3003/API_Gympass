import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { profile } from "./profile.controller"
import { authenticate } from "./authenticate.controller"
import { register } from "@/http/controller/users/register.controller"
import { refresh } from "./refresh.controller"


export const userRoutes = async (app: FastifyInstance) => {
    app.post("/users", register )
    app.post("/sessions", authenticate)
    app.patch("/token/refresh",refresh)
    
    //**Authenticated Routes */
    app.get("/me",{onRequest: [verifyJWT]},profile)
} 