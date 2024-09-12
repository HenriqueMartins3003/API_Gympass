import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { env } from "@/env";
import { ZodError } from "zod";
import { userRoutes } from "@/http/controller/users/routes";
import { gymRoutes } from "@/http/controller/gyms/routes";
import { checkInsRoutes } from "@/http/controller/check-ins/routes";


export const app = fastify()

app.register(fastifyJwt,{
    secret: env.JWT_SECRET
})
app.register(userRoutes)
app.register(gymRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error,request,reply )=>{
    if (error instanceof ZodError){
        return reply.status(400)
        .send({message: 'Validation Error.',issues:error.format()})
    }

    if(env.NODE_ENV !== "production"){
        console.error(error)
    }else{
        //TODO: Deveria enviar esse erro para uma ferramenta de erro externo DataDog/NewRelic/Sentry
    }
    return reply.status(500).send({message: 'internal server error.'})
})

