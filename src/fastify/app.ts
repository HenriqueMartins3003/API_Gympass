import fastify from "fastify";
import {z} from 'zod'


export const app = fastify()


app.post("/users", (request, reply) => {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {name,email,password} = registerBodySchema.parse(request.body)
})


