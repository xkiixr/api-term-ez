// routes/paymentRoute.ts
import { Router } from "express";
import { Server } from "socket.io";
import {
  createTransaction,
  handleCallBack,
} from "../controllers/paymentController";
import validateSignature from "../middlewares/validateSignature";

export default function createPaymentRoute(io: Server) {
  const router = Router();
  console.log("Creating payment route with socket.io integration");

  router.post("/create", createTransaction); // ✅ ส่ง io เข้าไป
  router.post("/callback", validateSignature, handleCallBack(io)); // ✅ ส่ง io เข้าไป

  return router;
}
