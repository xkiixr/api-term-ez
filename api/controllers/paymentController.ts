// controllers/paymentController.ts
import { Request, Response } from "express";
import { Server } from "socket.io";
import { ApiResponse } from "../types/apiReponse";
import { error } from "console";

export const handleCallBack =
  (io: Server) => async (req: Request, res: Response) => {
    try {
      console.log("Call back");
      const orderId = req.query.orderId as string;

      io.to(orderId).emit("payment:status", {
        orderId,
        status: "success",
      });
      const response: ApiResponse<any> = {
        message: "Callback processed successfully",
        status: "success",
        error: null,
      };
      res.status(200).json(response);
    } catch (error) {
      const erorResponse: ApiResponse<any> = {
        message: "Callback processing failed",
        status: "fail",
        error: true,
      };
      console.error("Error processing callback:", error);
      res.status(500).json(erorResponse);
    }
  };
