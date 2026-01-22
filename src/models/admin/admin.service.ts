import prisma from "../../config/prisma";

export class AdminService{
    static async getUser(page: number, limit: number){
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: limit,
                select: {
                    id: true,
                    email: true,
                    role: true, 
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            prisma.user.count(),

        ])
        return{
            users,
            total,
        }
    }
    
    static async updateUserRole(userId: string, role: "USER" | "ADMIN"){
        return prisma.user.update({
            where: {id: userId},
            data: {role},
            select: {
                id: true,
                email: true,
                role: true,
            },
        });
    }

    static async deleteUser(userId: string){
        return prisma.user.delete({
            where: {id: userId},
        });
    }
}