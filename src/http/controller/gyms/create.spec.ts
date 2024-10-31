import request from 'supertest'
import { app } from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym (E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to create a GYM', async () => {
      
        const { token } = await createAndAuthenticateUser(app,true)

        const response = await request(app.server)
        .post('/gyms')
        .set('Authorization',`Bearer ${token}`)
        .send({
            title: "gym-01",
            description: "Gym JS",
            phone: "987654",
            latitude: -27.2892052,
            longitude: -49.6481091
        })

        expect(response.statusCode).toEqual(201)
    })
})