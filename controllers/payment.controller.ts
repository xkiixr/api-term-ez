// controllers/paymentController.ts
import type { Request, Response } from "express";
import { Server } from "socket.io";
import type { ApiResponse } from "../types/apiResponse";
import * as paymentService from "../services/payment.service";

export const handleCallBack =
  (io: Server) => async (req: Request, res: Response) => {
    try {
      const { id, code, total, status } = req.body;
      if (status === "success") {
        io.to(id).emit("payment:status", {
          id,
          code,
          total,
          status: "success",
        });
        const response: ApiResponse<any> = {
          message: "Callback processed successfully",
          status: "success",
          error: false,
        };
        res.status(200).json(response);
      } else {
        const erorResponse: ApiResponse<any> = {
          message: "Callback processing failed",
          status: "fail",
          error: true,
        };
        res.status(500).json(erorResponse);
      }
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

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const data = await paymentService.createTransaction(req.body);
    res.status(200).json(data);
  } catch (error: any) {
    const erorResponse: ApiResponse<any> = {
      message: error.message,
      status: "fail",
      error: true,
    };

    res.status(500).json(erorResponse);
  }
};
