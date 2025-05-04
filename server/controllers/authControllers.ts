import { Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/userModel";
import prisma from "@config/prisma";
import { AuthRequest } from "@middlewares/authRequire";
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
    secure: process.env.NODE_ENV === "production",
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
  const user = await prisma.users.findUnique({
    where: { id: Number(req.userId) },
    select: { id: true, email: true, full_name: true },
  });
  res.json({ user });
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findFirst({
      where: { email },
    })
    // const user: any = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist. " });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials. " })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    // delete user.password;

    let safeUser;
    if (user) {
      safeUser = {
        ...user,
        id: user.id.toString(),
      };
    }
    res.status(200).json({ token, user: safeUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
