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
    it('should be able to list the history of checkin', async () => {
      
        const { token } = await createAndAuthenticateUser(app)
        const user = await prisma.user.findFirstOrThrow()
        
        const gym = await prisma.gym.create({
            data: {
                title: "gym-01",
                description: "Gym JS",
                phone: "987654",
                latitude: -27.2892052,
                longtitude: -49.6481091    
            }
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_Id: gym.id,
                    user_id: user.id
                },
                {
                    gym_Id: gym.id,
                    user_id: user.id
                }
            ]
        }) 

        const response = await request(app.server)
        .get('/check-ins/history')
        .set('Authorization',`Bearer ${token}`)
        .send()

        console.log(response.body.checkIns)

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_Id: gym.id,
                user_id: user.id
                
            }),
            expect.objectContaining({
                gym_Id: gym.id,
                user_id: user.id
            })
        ])
    })
})