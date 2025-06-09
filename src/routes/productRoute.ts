import { Router } from "express";
import {
  getAllProduct,
  getProductById,
} from "../controllers/productController";

const router = Router();

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/", (req, res) => {
  console.log(req.body);
  res.json({
    message: "successfully",
  });
});

export default router;
