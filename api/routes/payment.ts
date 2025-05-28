// routes/paymentRoute.ts
import { Router } from "express";
import { Server } from "socket.io";
import { handleCallBack } from "../controllers/paymentController";

export default function createPaymentRoute(io: Server) {
  const router = Router();
  console.log("Creating payment route with socket.io integration");

  router.get("/callback", handleCallBack(io)); // ✅ ส่ง io เข้าไป

  return router;
}
