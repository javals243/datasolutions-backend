import { Router } from "express";
import postController from "../controllers/post.controller";
import { protect, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", postController.getPosts);
router.get("/all/posts", protect, isAdmin, postController.getAllPosts);
router.get("/:slug", postController.getPost);
router.get("/comments/:id", postController.getPostComments);
router.post("/", protect, isAdmin, postController.createPost);
router.put("/:id", protect, isAdmin, postController.updatePost);
router.delete("/:id", protect, isAdmin, postController.deletePost);

export default router;
