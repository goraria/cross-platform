// middleware/error.middleware.ts
import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Xử lý lỗi Prisma
    switch (err.code) {
      case 'P2002':
        return res.status(400).json({
          message: 'Unique constraint violation',
          field: (err.meta?.target as string[])?.[0] || 'unknown'
        })
      case 'P2025':
        return res.status(404).json({
          message: 'Record not found'
        })
      default:
        return res.status(500).json({
          message: 'Database error'
        })
    }
  }

  return res.status(500).json({
    message: 'Internal server error'
  })
}