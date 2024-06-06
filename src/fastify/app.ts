import fastify from "fastify";
import { appRoutes } from "@/http/routes/routes";


export const app = fastify()

app.register(appRoutes)


