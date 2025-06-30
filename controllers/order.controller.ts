import type { NextFunction, Request, Response } from "express";
import * as orderService from "../services/order.service";

export const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await orderService.getOrders();
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
};
