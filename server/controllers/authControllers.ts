import { Request, Response, NextFunction, RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/userModel";
import prisma from "@config/prisma";
import { AuthRequest } from "@middlewares/authRequire";
import { generateSign, logoutSign, refreshSign } from "@/services/authServices";
import { BadRequestError } from "@/lib/errors";
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

export const me: RequestHandler = async (req: AuthRequest, res) => {
  // const user = await prisma.users.findUnique({
  //   where: { id: Number(req.userId) },
  //   select: { id: true, email: true, full_name: true },
  // });
  // res.json({ user });
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const result = await generateSign(email, password);

    // Set cookies
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.EXPRESS_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      user: result.user,
      message: 'Login successful'
    });
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
    const {
      first_name,
      last_name,
      username,
      email,
      password,
    } = req.body;

    // console.log("req.body", req.body);

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
        role: "user",
        status: "inactive",
        password_hash: passwordHash,
        // viewed_profile: 0,
        // impressions: 0,
        created_at: new Date(),
        updated_at: new Date(),
      }
    });

    // const savedUser = await newUser.save();
    res.status(201).json(newUser);
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