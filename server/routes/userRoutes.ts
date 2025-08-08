import { Router } from "express";
import { getUsers, updateProfile } from "@controllers/userControllers";
import { authRequire } from "@middlewares/authRequire";
import { csrfProtect } from "@middlewares/csrfMiddleware";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUsers);
router.patch('/me', authRequire, csrfProtect, updateProfile);

export default router;