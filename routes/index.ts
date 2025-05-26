import { Router } from "express";
import { getAllProduct, getProductById } from "../controllers";

const router = Router();

router.get("/products", getAllProduct);
router.get("/products/:id", getProductById);

export default router;
