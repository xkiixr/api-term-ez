import { Router } from "express";
import {
  getAllProduct,
  getProductById,
} from "../controllers/productController";

const router = Router();

router.get("/", getAllProduct);
router.get("/:id", getProductById);

export default router;
