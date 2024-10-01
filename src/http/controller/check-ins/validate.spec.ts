import request from 'supertest'
import { app } from "@/fastify/app"
import { afterAll, beforeAll, describe,expect,it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from '@/lib/prisma';

describe("Validate Check-in  (E2E)",() => {

    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    it('should be able to validate check-ins', async () => {
      
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

        let checkIn = await prisma.checkIn.create({
            data: 
                {
                    gym_Id: gym.id,
                    user_id: user.id
                }
                
        }) 

        const response = await request(app.server)
        .patch(`/check-ins/${checkIn.id}/validate`)
        .set('Authorization',`Bearer ${token}`)
        .send()


        expect(response.statusCode).toEqual(204)

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkIn.id
            }
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})