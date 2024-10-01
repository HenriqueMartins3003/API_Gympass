import request from 'supertest'
import { app } from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from '@/lib/prisma';

describe("Create Check in (E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to create a Check-in', async () => {
      
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: "gym-01",
                description: "Gym JS",
                phone: "987654",
                latitude: -27.2892052,
                longtitude: -49.6481091    
            }
        })

        const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
        .set('Authorization',`Bearer ${token}`)
        .send({
            latitude: -27.2892052,
            longitude: -49.6481091
        })

        expect(response.statusCode).toEqual(201)
    })
})