import { Router } from "express";
import { login, register, me, cookieToken, refreshToken, logout } from "@controllers/authControllers";
import { validateMiddleware } from "@middlewares/validateMiddleware";
import { authRequire } from "@middlewares/authRequire";
import { loginSchema } from "@constants/schemas";
import { authenticate } from "@middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
// router.post('/login', validateMiddleware(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/logout', authenticate, logout);
router.get("/me", authRequire, me);
// router.post("/test", validateRequest(loginSchema), cookieToken);

export default router;