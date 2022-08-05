import { Router } from "express";
import categoryController from "../controllers/category.controller";
import { protect, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", categoryController.getCategories);
router.get("/posts/:id", categoryController.getCategoryPosts);
router.post("/", protect, isAdmin, categoryController.createCategory);
router.put("/:id", protect, isAdmin, categoryController.updateCategory);
router.delete("/:id", protect, isAdmin, categoryController.deleteCategory);

export default router;
