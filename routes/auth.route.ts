import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();

// Example login route
router.post("/login", login);

// Example register route

export default router;
