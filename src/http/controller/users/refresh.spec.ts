import {app} from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import request from 'supertest'

describe("Refresh Token(E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to Refresh a token', async () => {
      
        await request(app.server).post("/users").send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234567'
        })
      
        const authResponse = await request(app.server).post("/sessions").send({
            email: 'johndoe@example.com',
            password: '1234567'
        })

        const cookies = authResponse.get('Set-Cookie')
        
        const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookies!)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })

        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})