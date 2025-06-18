import { Request, Response } from 'express';
import prisma from '../config/prisma';

// --- Example for inventory_items ---
export const getAllInventoryItems = async (req: Request, res: Response): Promise<void> => {
  const items = await prisma.inventory_items.findMany();
  res.json(items);
};

export const createInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const item = await prisma.inventory_items.create({ data: req.body });
  res.json(item);
};

export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const item = await prisma.inventory_items.update({ where: { id }, data: req.body });
  res.json(item);
};

export const deleteInventoryItem = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await prisma.inventory_items.delete({ where: { id } });
  res.json({ success: true });
};

export const updateInventoryStock = async (req: Request, res: Response, next: Function): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await prisma.inventory_items.update({ where: { id }, data: req.body });
    res.json(item); // chỉ gọi, không return
  } catch (err) {
    next(err);
  }
};

// TODO: Repeat for all models (auto-generate or copy-paste for each model)
