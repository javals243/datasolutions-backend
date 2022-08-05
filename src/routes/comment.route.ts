import { Router } from "express";
import commentController from "../controllers/comment.controller";
import { protect, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", commentController.getComments);
router.post("/", commentController.createComment);
router.put("/approve/:id", protect, isAdmin, commentController.approveComment);
router.put("/:id", protect, isAdmin, commentController.updateComment);
router.delete("/:id", protect, isAdmin, commentController.deleteComment);

export default router;
