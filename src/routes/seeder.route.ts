import { Router } from "express";
import seederController from "../controllers/seeder.contoller";

const router = Router();

router.post("/createusers", seederController.createUsers);

export default router;
