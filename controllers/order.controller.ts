import type { Request, Response } from "express";

import * as orderService from "../services/order.service";

export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const data = await orderService.getOrders();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
