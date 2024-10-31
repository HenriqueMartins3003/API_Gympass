import request from 'supertest'
import { app } from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gyms (E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to search nearby gyms', async () => {
      
        const { token } = await createAndAuthenticateUser(app,true)

        await request(app.server)
        .post('/gyms')
        .set('Authorization',`Bearer ${token}`)
        .send({
            title: "JavaScript GYM",
            description: "Gym JS",
            phone: "987654",
            latitude: -23.6097523,
            longitude: -46.6131605
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization',`Bearer ${token}`)
        .send({
            title: "TypeScript GYM",
            description: "Gym TS",
            phone: "987654",
            latitude: -23.9549098,
            longitude: -46.3868863
        })

        const response = await request(app.server)
        .get('/gyms/nearby')
        .query({
            latitude: -23.9549098,
            longitude: -46.3868863
        })
        .set('Authorization',`Bearer ${token}`)
        .send()
            
        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'TypeScript GYM'
            })
        ])
    })
})