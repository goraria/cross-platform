import { Request, Response, NextFunction, RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/userModel";
import prisma from "@config/prisma";
import { AuthRequest } from "@middlewares/authRequire";
import { generateSign, logoutSign, refreshSign } from "@/services/authServices";
import { BadRequestError } from "@/lib/errors";
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

export const me = (req: AuthRequest, res: Response): void => {
  // Lấy userId từ middleware authRequire
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  prisma.users.findUnique({
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
      role: true
    }
  }).then(user => {
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ user });
  }).catch(() => {
    res.status(500).json({ message: "Internal server error" });
  });
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
      sameSite: 'lax', // Đổi từ 'strict' sang 'lax' để cookie hoạt động khi FE/BE khác port
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'lax', // Đổi từ 'strict' sang 'lax' để cookie hoạt động khi FE/BE khác port
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      user: result.user,
      message: 'Login successful'
    });
    return;
  } catch (error) {
    next(error);
  }
  // try {
  //   const { email, password } = req.body;

  //   const user = await prisma.users.findFirst({
  //     where: { email },
  //   })
  //   // const user: any = await User.findOne({ email: email });

  //   if (!user) {
  //     return res.status(400).json({ message: "User does not exist. " });
  //   }

  //   const isMatch = await bcrypt.compare(password, user.password_hash);
  //   if (!isMatch) {
  //     return res.status(400).json({ message: "Invalid credentials. " })
  //   }

  //   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
  //   // delete user.password;

  //   let safeUser;
  //   if (user) {
  //     safeUser = {
  //       ...user,
  //       id: user.id.toString(),
  //     };
  //   }
  //   res.status(200).json({ token, user: safeUser });
  // } catch (error: any) {
  //   res.status(500).json({ message: error.message });
  // }
};

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: result.error.format()
      });
      return;
    }
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      phone_number,
      phone_code,
    } = result.data;
    // Check if user exists
    const existUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })
    if (existUser) {
      if (existUser.username === username) {
        res.status(400).json({ message: 'Username already exists' })
      } else if (existUser.email === email) {
        res.status(400).json({ message: 'Email already exists' })
      } else {
        res.status(400).json({ message: 'User already exists' })
      }
      return;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await prisma.users.create({
      data: {
        id: uuidv4(),
        first_name,
        last_name,
        full_name: `${first_name} ${last_name}`,
        username,
        email,
        phone_number,
        phone_code,
        role: "user",
        status: "inactive",
        password_hash: passwordHash,
        created_at: new Date(),
        updated_at: new Date(),
      }
    });
    // Tự động đăng nhập sau khi đăng ký
    const sessionId = uuidv4();
    const { accessToken, refreshToken } = require("@/services/authServices").generateTokens(newUser.id, sessionId);
    await prisma.sessions.create({
      data: {
        id: sessionId,
        user_id: newUser.id,
        token: accessToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        is_valid: true
      }
    });
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      },
      message: 'Register & login successful',
      accessToken,
      refreshToken
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      user: result.user,
      message: 'Token refreshed successfully'
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
    if (!req.session?.id) {
      throw new BadRequestError('No active session');
    }

    await logoutSign(req.session.id);

    // Clear cookies
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
}