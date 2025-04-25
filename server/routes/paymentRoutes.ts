import { Router } from "express";
import { momoPayment, zaloPayment, vnPayment } from "@controllers/paymentControllers";
import { authMiddleware } from "@middlewares/authMiddleware";

const router = Router();

router.post("/momo", authMiddleware(["user"]), momoPayment);
router.post("/zalopay", authMiddleware(["user"]), zaloPayment);
router.post("/vnpay", authMiddleware(["user"]), vnPayment);

export default router;