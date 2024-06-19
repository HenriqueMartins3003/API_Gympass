import fastify from "fastify";
import { appRoutes } from "@/http/routes/routes";
import { ZodError } from "zod";
import { env } from "@/env";


export const app = fastify()

app.register(appRoutes)

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

