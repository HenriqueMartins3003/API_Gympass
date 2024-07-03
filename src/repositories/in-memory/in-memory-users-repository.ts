import { randomUUID } from "node:crypto";
import { Prisma, User } from "@prisma/client";
import { userRepository } from "../users-repository";

 export class InMemoryUserRepository implements userRepository {
    
    public itens: User[] = []
    
    async create(data: Prisma.UserCreateInput)  {
        
        const user =  {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.itens.push(user)
        return user
    }
    async findByEmail(email: string){
        
        const user = this.itens.find((item) => item.email === email)

        if(!user){
            return null
        }

        return user
    }

     async findById(id: string){
        const user = this.itens.find((item) => item.id === id)

        if(!user) return null

        return user
    }

 }
