import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validateSession } from '@/services/authServices';

interface JwtPayload { userId: string; sessionId: string }

// softAuth: optional authentication. If token valid -> attach user/session; else continue silently.
export const softAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return next();
    if (!process.env.EXPRESS_JWT_SECRET) return next();
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.EXPRESS_JWT_SECRET) as JwtPayload;
    } catch { return next(); }
    if (!decoded.sessionId) return next();
    try {
      const session = await validateSession(decoded.sessionId);
      (req as any).user = {
        id: session.users.id,
        email: session.users.email,
        username: session.users.username,
        role: (session.users as any).role
      };
      (req as any).authSession = { id: session.id };
      // Align with AuthRequest expectations so controllers using req.userId work
      (req as any).userId = session.users.id;
      (req as any).sessionId = session.id;
    } catch { /* ignore invalid session */ }
    return next();
  } catch {
    return next();
  }
};
