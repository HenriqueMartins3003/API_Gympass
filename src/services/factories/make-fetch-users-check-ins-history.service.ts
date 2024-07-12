
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUsersCheckInHistoryService } from "../fetch-users-check-ins-history.service";
;

export function makeFetchUsersCheckInHistoryService () {
    const checkInsRepository = new PrismaCheckInsRepository()
        
    const service = new FetchUsersCheckInHistoryService(checkInsRepository)

    return service;
}