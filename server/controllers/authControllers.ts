import { Request, Response, NextFunction, RequestHandler } from "express";

export const login: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {

        next(error);
    }
};

export const register: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        res.status(201).json({ message: "Registered successfully" });
    } catch (error) {
        next(error);
    }
};
