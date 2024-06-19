import { app } from "./fastify/app";
import { env } from "@/env";

app.listen({
    host: '0.0.0.0',
    port: env.PORT,
}).then(() => {
    console.log('Http server running!!')
})