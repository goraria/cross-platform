import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/postControllers";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
