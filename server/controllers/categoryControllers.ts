import { Request, Response, NextFunction, RequestHandler } from "express";

export const getCategories: RequestHandler = async (
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

export const createCategories: RequestHandler = async (
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
