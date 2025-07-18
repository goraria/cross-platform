// src/middleware/validateRequest.ts
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateMiddleware = (
  schema: AnyZodObject
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ 
      message: 'Validation error',
      errors: result.error.format() 
    });
    return next(); // Đảm bảo luôn trả về void, không return Response
  }
  req.body = result.data;
  next();
};

export const validateSafely = (
  schema: AnyZodObject
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ 
      message: 'Validation error',
      errors: result.error.format() 
    });
  }
  // replace body with parsed & typed data
  req.body = result.data;
  next();
};

export const validateUnsafely = (
  schema: AnyZodObject
) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await schema.parseAsync(req.body)
    next()
  } catch (error: any) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.errors
    })
  }
};
