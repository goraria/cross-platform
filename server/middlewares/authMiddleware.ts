import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface DecodedToken extends JwtPayload {
    sub: string;
    "custom:role"?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
        }
    }
}

export const verifyToken: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // const verified = jwt.verify(token, process.env.JWT_SECRET!);
        // req.user = verified;
        // @ts-ignore
        req.user = jwt.verify(token, process.env.JWT_SECRET!);

        next();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const authMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            const decoded = jwt.decode(token) as DecodedToken;
            const userRole = decoded["custom:role"] || "";
            req.user = {
                id: decoded.sub,
                role: userRole,
            };

            const hasAccess = allowedRoles.includes(userRole.toLowerCase());
            if (!hasAccess) {
                res.status(403).json({ message: "Access Denied" });
                return;
            }
        } catch (err) {
            console.error("Failed to decode token:", err);
            res.status(400).json({ message: "Invalid token" });
            return;
        }

        next();
    };
};