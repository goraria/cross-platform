import { Request, Response, NextFunction, RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/userModel";
import prisma from "@config/prisma";
import { AuthRequest } from "@middlewares/authRequire";
import { generateSign, logoutSign, refreshSign, createUser } from "@/services/authServices";
import { BadRequestError, ValidationError, ConflictError } from "@/lib/errors";
import { registerSchema } from "@schemas/authSchemas";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const cookieToken: RequestHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "User does not exist." });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  // 3) generate token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  // 4) set cookie
  res.cookie("jid", token, {
    httpOnly: true,
    secure: process.env.EXPRESS_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });

  // return minimal user info
  const { password_hash, ...safeUser } = user;
  const updatedSafeUser = {
    ...safeUser,
    id: safeUser.id.toString()
  };

  res.json({ user: updatedSafeUser });
};

export const me = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
  return res.json({ success: true, authenticated: false, data: null });
    }
    const user = await prisma.users.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        full_name: true,
        avatar_url: true,
        status: true,
        role: true,
        created_at: true
      }
    });
    if (!user) {
      return res.json({ success: true, authenticated: false, data: null });
    }
    res.json({ success: true, authenticated: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Optional version: không có token vẫn trả 200
export const meOptional = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.json({ success: true, authenticated: false, user: null });
    }
    const user = await prisma.users.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        username: true,
        first_name: true,
        last_name: true,
        full_name: true,
        avatar_url: true,
        status: true,
        role: true,
        created_at: true
      }
    });
    if (!user) {
      return res.json({ success: true, authenticated: false, user: null });
    }
    return res.json({ success: true, authenticated: true, user });
  } catch (e) {
    next(e);
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  const { identifier, email, password, remember_me } = req.body;
  if (!password || !(identifier || email)) {
    return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Missing credentials' } });
  }
  const loginIdentifier = identifier || email; // backward compat
  const result = await generateSign(loginIdentifier, password, !!remember_me, {
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Set cookies
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: 'Login successful',
      user: result.user,
      sessionId: result.sessionId
    });
  } catch (error) {
    if (res.headersSent) {
      return; // avoid setting headers again
    }
    next(error);
  }
};

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError('Validation error', result.error.format());
    }

    // Use the createUser service
    const newUser = await createUser(result.data);
    
    // Auto-login after registration
  const loginResult = await generateSign(newUser.email, result.data.password, false, {
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Set cookies
    res.cookie('access_token', loginResult.accessToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refresh_token', loginResult.refreshToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      },
      sessionId: loginResult.sessionId
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new BadRequestError('No refresh token provided');
    }

    const result = await refreshSign(refreshToken, {
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Set new cookies
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      user: result.user,
      sessionId: result.sessionId
    });
  } catch (error) {
    next(error);
  }
}

export const logout = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    // Try to revoke session if token present; otherwise just clear cookies (idempotent)
    const access = req.cookies?.access_token;
    if (access && process.env.EXPRESS_JWT_SECRET) {
      try {
        const payload: any = jwt.verify(access, process.env.EXPRESS_JWT_SECRET);
        if (payload?.sessionId) {
          await logoutSign(payload.sessionId);
        }
      } catch (e) {
        // ignore token parse errors on logout
      }
    }
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    res.clearCookie('csrf_token');
    res.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
}

// ===== Role-based / auth-based access path checker =====
// Explicit public paths: accessible without login
const PUBLIC_PATHS = new Set<string>([
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/pricing',
  '/about',
  '/contact'
]);

// Map protected frontend paths to required roles (must ALSO be authenticated)
const PATH_ROLE_MAP: Record<string, string[]> = {
  '/manager': ['admin'],
};

// Helper - simple prefix match for dynamic segments (e.g., /posts/:id)
const matchesPath = (path: string, list: Set<string>) => list.has(path);

export const checkAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let path = (req.query.path as string) || '';
    if (!path.startsWith('/')) path = '/' + path; // normalize

    // 1) Public path? => allowed
    if (matchesPath(path, PUBLIC_PATHS)) {
      return res.json({ success: true, path, public: true, allowed: true });
    }

    // 2) Determine if this path has role requirements
    const requiredRoles = PATH_ROLE_MAP[path] || [];

    // 3) Must be authenticated for any non-public path
    const sessionId = (req as any).authSession?.id || (req as any).sessionId;
    if (!sessionId) {
      return res.json({ success: true, path, allowed: false, reason: 'UNAUTHENTICATED', requiredRoles: requiredRoles.length ? requiredRoles : undefined });
    }

    // 4) If no specific role requirement: authenticated user can access
    if (!requiredRoles.length) {
      return res.json({ success: true, path, allowed: true, authenticated: true });
    }

    // 5) Role enforcement
    const userRole = (req as any).user?.role;
    const allowed = !!userRole && requiredRoles.map(r => r.toLowerCase()).includes(String(userRole).toLowerCase());
    return res.json({ success: true, path, allowed, requiredRoles, userRole, reason: allowed ? undefined : 'INSUFFICIENT_ROLE' });
  } catch (e) {
    next(e);
  }
};