import {app} from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import request from 'supertest'

describe("Register (E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to Register', async () => {
        const response = await request(app.server).post("/users").send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234567'
        })
        expect(response.statusCode).toEqual(201)
    })
})