import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';

// Middleware: Chỉ cho phép quản lý kho (warehouse manager) thực hiện thao tác đặc biệt
export const requireWarehouseManager = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).userId || (req as any).user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });
  // Kiểm tra role trong bảng restaurant_staffs hoặc users
  const staff = await prisma.restaurant_staffs.findFirst({
    where: {
      user_id: userId,
      role: 'manager', // hoặc enum tương ứng
      status: 'active',
    },
  });
  if (!staff) return res.status(403).json({ message: 'Permission denied: Not a warehouse manager' });
  next();
};
