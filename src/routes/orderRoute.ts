import { Router } from "express";
import { getAllOrder } from "../controllers/orderController";
const router = Router();
router.get("/", getAllOrder);

export default router;
