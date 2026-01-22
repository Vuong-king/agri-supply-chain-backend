import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import prisma from "../../config/prisma";

export class AuthController {
    static async register( req: Request, res: Response){
        try{
            const user = await AuthService.register(req.body);
            return res.status(201).json({
                message: "Registration successful",
                data: user,
            });
        
        }catch(error: any){
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    static async login(req: Request, res: Response){
        try{
            const {email, password} = req.body;

            const result = await AuthService.login (email, password);
            return res.json({
                message: "Login successful",
                data: result,
            });

        }catch(error: any){
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    static async me (req: AuthRequest, res: Response){
       try{
        const userId = req.user!.userId;
        
        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {
                id: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.json({ user });

       }catch(error){
        return res.status(500).json({message: "Server error"});
       }
    }

    static async adminOnly (req: AuthRequest, res: Response){
        return res.json({
            message: "Welcome, Admin!",
            user: req.user,
        })
    }
}