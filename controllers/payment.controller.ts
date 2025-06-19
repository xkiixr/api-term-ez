// controllers/paymentController.ts
import type { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import type { ApiResponse } from "../types/apiResponse";
import * as paymentService from "../services/payment.service";

export const handleCallBack =
  (io: Server) => async (req: Request, res: Response, next: NextFunction) => {
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
          error: null,
        };
        res.status(200).json(response);
      } else {
        throw new Error("Callback processing failed");
      }
    } catch (error) {
      next(error);
    }
  };

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await paymentService.createTransaction(req.body);
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
};
