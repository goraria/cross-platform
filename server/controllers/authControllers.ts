import { Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/userModel";
import prisma from "@config/prisma";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const login: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        // const { email, password } = req.body;
        // const user: any = await User.findOne({ email: email });
        // if (!user) {
        //     return res.status(400).json({ message: "User does not exist. " })
        // }
        //
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: "Invalid credentials. " })
        // }
        //
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
        // delete user.password;
        // res.status(200).json({ token, user });
        const user = await prisma.users.findFirst({
            where: {
                username: "goraria",
            },
        })

        if (!user) {
            return res.status(400).json({ message: "User does not exist. " });
        }

        let safeUser

        if (user) {
            safeUser = {
                ...user,
                id: user.id.toString(),
            };
        }
        res.status(200).json(safeUser);
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
