import { Router } from "express";
import { getProducts, createProducts } from "@controllers/productControllers";

const router = Router();

router.get("/", getProducts);
router.post("/create", createProducts);

export default router;