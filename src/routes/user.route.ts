import { Router } from "express";
import userController from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", protect, userController.me);
router.put("/changepassword", protect, userController.changePassword);

export default router;
