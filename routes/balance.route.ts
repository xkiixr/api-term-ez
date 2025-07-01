import { Router } from "express";
import { getAllBalance } from "../controllers/balance.controller";
const router = Router();
router.get("/", getAllBalance);

export default router;
