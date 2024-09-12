import {app} from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import request from 'supertest'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Profile (E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to user Profile', async () => {
      
        const { token } = await createAndAuthenticateUser(app)

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