import { Request, Response, NextFunction, RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/userModel";
import prisma from "@config/prisma";
import { AuthRequest } from "@middlewares/authRequire";
import { generateSign, logoutSign, refreshSign, createUser } from "@/services/authServices";
import { BadRequestError, ValidationError, ConflictError } from "@/lib/errors";
import { registerSchema } from "@/constants/schemas";
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
      throw new BadRequestError('User ID not found in request');
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
      throw new BadRequestError('User not found');
    }

    res.json({ 
      success: true,
      user 
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await generateSign(email, password);

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
      user: result.user
    });
  } catch (error) {
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
    const loginResult = await generateSign(newUser.email, result.data.password);

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
      }
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

    const result = await refreshSign(refreshToken);

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
      user: result.user
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
    const sessionId = req.authSession?.id;
    if (!sessionId) {
      throw new BadRequestError('No active session found');
    }

    await logoutSign(sessionId);

    // Clear cookies
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.json({ 
      success: true,
      message: 'Logout successful' 
    });
  } catch (error) {
    next(error);
  }
}