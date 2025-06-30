import { Router } from "express";
import { getAllOrder } from "../controllers/order.controller";
const router = Router();
router.get("/", getAllOrder);

export default router;
