// src/middleware/requireAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authRequire = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jid;
    if (!token) throw new Error("No token");

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    req.userId = payload.id.toString();
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
