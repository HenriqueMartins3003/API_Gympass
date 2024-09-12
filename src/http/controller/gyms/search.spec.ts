import request from 'supertest'
import { app } from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { title } from 'process';

describe("Search Gyms (E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to search for a GYM', async () => {
      
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
        .post('/gyms')
        .set('Authorization',`Bearer ${token}`)
        .send({
            title: "gym-01",
            description: "Gym JS",
            phone: "987654",
            latitude: -27.2892052,
            longitude: -49.6481091
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization',`Bearer ${token}`)
        .send({
            title: "gym-02",
            description: "Gym JS",
            phone: "987654",
            latitude: -27.2892032,
            longitude: -49.6481081
        })

        const response = await request(app.server)
        .get('/gyms/search')
        .set('Authorization',`Bearer ${token}`)
        .query({ q: 'gym-01' })
        .send()
    

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'gym-01'
            })
        ])
    })
})