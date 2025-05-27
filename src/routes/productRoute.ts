import { Router } from "express";
import {
  getAllProduct,
  getProductById,
} from "../controllers/productController";

const router = Router();

router.get("/products", getAllProduct);
router.get("/products/:id", getProductById);

export default router;
