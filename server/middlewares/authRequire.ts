// src/middleware/requireAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError, TokenExpiredError } from '@/lib/errors';
import { validateSession } from '@/services/authServices';

export interface AuthRequest extends Request {
  userId?: string;
  sessionId?: string;
}

export const authRequire = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    if (!process.env.EXPRESS_JWT_SECRET) {
      throw new Error("JWT secret is not configured");
    }

    // Verify JWT token
    let payload: any;
    try {
      payload = jwt.verify(token, process.env.EXPRESS_JWT_SECRET!);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new TokenExpiredError("Access token expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError("Invalid token");
      }
      throw error;
    }

    if (!payload.sessionId || !payload.userId) {
      throw new UnauthorizedError("Invalid token payload");
    }

    // Validate session
    const session = await validateSession(payload.sessionId);

    // Attach user info to request
    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    
    next();
  } catch (error) {
    next(error);
  }
};
