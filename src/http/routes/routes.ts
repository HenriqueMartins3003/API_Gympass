import { FastifyInstance } from "fastify"
import { authenticate } from "../controller/authenticate.controller"
import {register} from "@/http/controller/register.controller"


export const appRoutes = async (app: FastifyInstance) => {
    app.post("/users", register )
    app.post("/sessions", authenticate)
}