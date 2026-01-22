import prisma from "../../config/prisma";
import { RegisterDto } from "./auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class AuthService{
    static async register(data: RegisterDto) {
        const {email, password} = data;
    
        //1. Check user existence
        const existingUser = await prisma.user.findUnique({
            where: {email},

        });
        if(existingUser){
            throw new Error("Email already in use");
        }
        //2. Hard password by bcrypt
        const hashedPaddword = await bcrypt.hash(password, 10);

        //3. save to DB
        const user = await prisma.user.create({
            data:{
                email,
                password: hashedPaddword,
            }
        });
        return{
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
        }
    }

    static async login(email: string, password: string){
        //1. Check user existence
        const user = await prisma.user.findUnique({
            where: {email},
        });
        if(!user){
            throw new Error( "Invalid email or password");
        }
        //2. so sach password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid email or password");
        }
        //3. Create JWT
        const accessToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            {expiresIn: "1h"}
        );
        return{
            accessToken
        }
    }
}