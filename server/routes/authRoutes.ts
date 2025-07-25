import { Router } from "express";
import { login, register, me, cookieToken, refreshToken, logout } from "@controllers/authControllers";
import { validateMiddleware } from "@middlewares/validateMiddleware";
import { authRequire } from "@middlewares/authRequire";
import { loginSchema } from "@constants/schemas";
import { authenticate } from "@middlewares/authMiddleware";
// import { loginLimiter, registerLimiter, refreshLimiter } from "@middlewares/rateLimiter";

const router = Router();

// Apply rate limiting (commented out until express-rate-limit is installed)
// router.post("/register", registerLimiter, register);
// router.post('/login', loginLimiter, validateMiddleware(loginSchema), login);
// router.post('/refresh-token', refreshLimiter, refreshToken);

// Temporary routes without rate limiting
router.post("/register", register);
router.post('/login', validateMiddleware(loginSchema), login);
router.post('/refresh-token', refreshToken);
router.post('/logout', authenticate, logout);
router.get("/me", authRequire, me);

export default router;