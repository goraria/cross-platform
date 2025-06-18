import { Router, RequestHandler } from 'express';
import { authRequire } from '@middlewares/authRequire';
import { getAllInventoryItems, createInventoryItem, updateInventoryItem, deleteInventoryItem, updateInventoryStock } from '@controllers/inventoryController';
import { requireWarehouseManager } from '@middlewares/roleRequire';
import prisma from '@config/prisma';

// Example: import inventoryController from '../controllers/inventoryController';
// Repeat for each model/controller

const router = Router();

// --- Inventory Items ---
router.get('/', authRequire, getAllInventoryItems);
router.post('/', authRequire, createInventoryItem);
router.put('/:id', authRequire, updateInventoryItem);
router.delete('/:id', authRequire, deleteInventoryItem);

// --- Inventory Items (special: update stock only for warehouse manager) ---
// router.put('/inventory/:id/stock', authRequire, requireWarehouseManager, asyncHandler(updateInventoryStock));

// TODO: Add similar CRUD for all other models, and add role-based middleware for special APIs (e.g. inventory update for warehouse manager)
// Example:
// import { requireWarehouseManager } from '../middlewares/roleRequire';
// router.put('/inventory/:id/stock', authRequire, requireWarehouseManager, updateStock);

// TODO: Repeat for all models (auto-generate or copy-paste for each model)

function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default router;
