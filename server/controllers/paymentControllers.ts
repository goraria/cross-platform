import { NextFunction, Request, Response } from "express";

export const momoPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        res.json(null);
    } catch (error: any) {
        res.status(500).json({
            message: `Error retrieving applications: ${error.message}`
        });
    }
};

export const zaloPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        res.json(null);
    } catch (error: any) {
        res.status(500).json({
            message: `Error retrieving applications: ${error.message}`
        });
    }
};

export const vnPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {

        res.json(null);
    } catch (error: any) {
        res.status(500).json({
            message: `Error retrieving applications: ${error.message}`
        });
    }
};
