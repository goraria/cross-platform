import { Router } from "express";
import { getUsers } from "@controllers/userControllers";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUsers);

export default router;