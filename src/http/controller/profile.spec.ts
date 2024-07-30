import {app} from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import request from 'supertest'

describe("Profile (E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to user Profile', async () => {
      
        await request(app.server).post("/users").send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234567'
        })
      
        const authResponse = await request(app.server).post("/sessions").send({
            email: 'johndoe@example.com',
            password: '1234567'
        })
        
        const { token } = authResponse.body

        const profileResponse = await request(app.server)
        .get('/me').set('Authorization',`Bearer ${token}`)
        .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'johndoe@example.com'
            })
        )
    })
})