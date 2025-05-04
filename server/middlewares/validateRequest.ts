// src/middleware/validateRequest.ts
import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (
  schema: AnyZodObject
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.format() });
  }
  // replace body with parsed & typed data
  req.body = result.data;
  next();
};
