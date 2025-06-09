import type { Request, Response } from "express";
import axiosInstance from "../configs/axios";
import { getCache, setCache } from "../utils/cache";
import { fetchOrder } from "../api/order";

export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const data = await fetchOrder();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
