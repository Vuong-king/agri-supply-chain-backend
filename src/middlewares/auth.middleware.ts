import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
}
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// ================= AUTH =================

export const autheMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing token" });
  }
  // tach token
  const token = authHeader.split(" ")[1];
  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
// ================= AUTHORIZE =================
  export const authorize =
  (role: ("USER" | "ADMIN")[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !role.includes(req.user.role)){
        return res.status(403).json({message: "Forbidden"});
    }
    next();
  }
