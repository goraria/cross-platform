import { Router } from "express";
import { login, register, me, cookieToken } from "@controllers/authControllers";
import { validateRequest } from "@middlewares/validateRequest";
import { authRequire } from "@middlewares/authRequire";
import { loginSchema } from "@constants/schemas";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", authRequire, me);
// router.post("/test", validateRequest(loginSchema), cookieToken);

export default router;