import { Router } from "express";
import seederController from "../controllers/seeder.contoller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/createusers", seederController.createUsers);
router.post("/createcategories", protect, seederController.createCategories);
router.post("/createposts", protect, seederController.createPosts);
router.post("/createcomments", protect, seederController.createComments);

export default router;
