// server/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@config/prisma';
import { UnauthorizedError } from '@/lib/errors';
// import { UnauthorizedError } from '../utils/errors';

interface JwtPayload {
  userId: string;
  sessionId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
      };
      authSession?: {
        id: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.access_token;
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    // 2. Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    // 3. Check if session exists and is valid
    const session = await prisma.sessions.findUnique({
      where: {
        id: decoded.sessionId,
        is_valid: true,
        expires_at: {
          gt: new Date()
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        }
      }
    });

    if (!session) {
      throw new UnauthorizedError('Invalid session');
    }

    // 4. Attach user and session to request
    req.user = session.user;
    req.authSession = { id: session.id };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    } else {
      next(error);
    }
  }
};

// import { NextFunction, Request, RequestHandler, Response } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// interface DecodedToken extends JwtPayload {
//   sub: string;
//   "custom:role"?: string;
// }

// interface AccessTokenPayload extends JwtPayload {
//   sub: string;              // user id
//   "custom:role"?: string;   // role
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//         role: string;
//       };
//     }
//   }
// }

// export const verifyToken: RequestHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<any> => {
//   try {
//     let token = req.header("Authorization");

//     if (!token) {
//       return res.status(403).send("Access Denied");
//     }

//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length).trimLeft();
//     }

//     // const verified = jwt.verify(token, process.env.JWT_SECRET!);
//     // req.user = verified;
//     // @ts-ignore
//     req.user = jwt.verify(token, process.env.JWT_SECRET!);

//     next();
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const authMiddleware = (allowedRoles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction): void => {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       res.status(401).json({ message: "Unauthorized" });
//       return;
//     }

//     try {
//       const decoded = jwt.decode(token) as DecodedToken;
//       const userRole = decoded["custom:role"] || "";
//       req.user = {
//         id: decoded.sub,
//         role: userRole,
//       };

//       const hasAccess = allowedRoles.includes(userRole.toLowerCase());
//       if (!hasAccess) {
//         res.status(403).json({ message: "Access Denied" });
//         return;
//       }
//     } catch (err) {
//       console.error("Failed to decode token:", err);
//       res.status(400).json({ message: "Invalid token" });
//       return;
//     }

//     next();
//   };
// };

// // export const authenticate: RequestHandler = (req, res, next) => {
// //     try {
// //         // 1) ưu tiên đọc từ cookie
// //         let token = req.cookies?.jid as string | undefined;
// //
// //         // 2) nếu không có cookie, fallback header
// //         if (!token) {
// //             const auth = req.headers.authorization;
// //             if (auth && auth.startsWith("Bearer ")) {
// //                 token = auth.slice(7).trim();
// //             }
// //         }
// //
// //         if (!token) {
// //             return res.status(401).json({ message: "No token provided" });
// //         }
// //
// //         // 3) verify
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AccessTokenPayload;
// //
// //         // 4) gán req.user
// //         req.user = {
// //             id: decoded.sub,
// //             role: decoded["custom:role"] ?? "user",
// //         };
// //
// //         next();
// //     } catch (err: any) {
// //         console.error("Auth error:", err);
// //         // nếu token expired thì trả 401, còn lại 400
// //         const status = err.name === "TokenExpiredError" ? 401 : 400;
// //         return res.status(status).json({ message: err.message });
// //     }
// // };

// // export const authorize = (allowedRoles: string[]): RequestHandler => {
// //     return (req, res, next) => {
// //         // authenticate phải chạy trước
// //         if (!req.user) {
// //             return res.status(401).json({ message: "Unauthorized" });
// //         }
// //
// //         const userRole = req.user.role.toLowerCase();
// //         const allowed = allowedRoles.map(r => r.toLowerCase());
// //         if (!allowed.includes(userRole)) {
// //             return res.status(403).json({ message: "Forbidden: insufficient role" });
// //         }
// //
// //         next();
// //     };
// // };