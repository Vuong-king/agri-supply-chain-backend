import { Request, Response } from "express";
import { AuthService } from "./auth.service";

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
}