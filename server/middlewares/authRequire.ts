// src/middleware/requireAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from '@config/prisma';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authRequire: (req: AuthRequest, res: Response, next: NextFunction) => void = (req, res, next) => {
  (async () => {
    try {
      const token = req.cookies?.access_token;
      if (!token) {
        res.status(401).json({ message: "No token" });
        return;
      }
      if (!process.env.EXPRESS_JWT_SECRET) {
        res.status(500).json({ message: "JWT secret is not set in environment variables" });
        return;
      }
      let payload: any;
      try {
        payload = jwt.verify(token, process.env.EXPRESS_JWT_SECRET!);
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      if (!payload.sessionId || !payload.userId) {
        res.status(401).json({ message: "Invalid token payload" });
        return;
      }
      // Kiểm tra session hợp lệ (dùng findFirst để hỗ trợ nhiều điều kiện)
      const session = await prisma.sessions.findFirst({
        where: {
          id: payload.sessionId,
          is_valid: true,
          expires_at: {
            gt: new Date()
          }
        }
      });
      if (!session) {
        res.status(401).json({ message: "Invalid session" });
        return;
      }
      req.userId = payload.userId;
      next();
    } catch {
      res.status(401).json({ message: "Unauthorized" });
    }
  })();
};
