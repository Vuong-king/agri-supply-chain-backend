import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export class AdminController{
    static async getUsers(req: Request, res: Response){
        try{
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            
            const {users, total} = await AdminService.getUser(page, limit);

            return res.json({
                data: users,
                meta: {
                    page,
                    limit,
                    total,
                    totalPage: Math.ceil(total / limit),
                },
            });
        }catch(error){
            return res.status(500).json({message: "Server error"});
        }
    }

    static async updateRole(req: Request, res: Response){
        const { id } = req.params;
        const { role } = req.body;

        if(!id || Array.isArray(id)){
            return res.status(400).json({ message: "Invalid user ID" });
        }
        
        if(!["USER", "ADMIN"].includes(role)){
            return res.status(400).json({message: "Invalid role"});
        }
        const user = await AdminService.updateUserRole(id, role);
        return res.json({
            message: "User role updated successfully",
            data: user,

        })
    }

    static async deleteUser(req: Request, res: Response){
        const { id } = req.params;
        
        if(!id || Array.isArray(id)){
            return res.status(400).json({ message: "Invalid user ID" });
        }
        await AdminService.deleteUser(id);

        return res.json({ message: "User deleted successfully" });

    }
}