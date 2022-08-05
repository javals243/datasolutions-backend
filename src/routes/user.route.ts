import { Router } from "express";
import userController from "../controllers/user.controller";
import { protect, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", protect, isAdmin, userController.getUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", protect, userController.me);
router.put("/updateuser", protect, userController.updateUser);
router.put("/changepassword", protect, userController.changePassword);
router.delete("/:id", protect, isAdmin, userController.deleteUser);

export default router;
