import type { Request, Response } from "express";

import { fetchProducts } from "../api/product";
import type { ApiResponse } from "../types/apiResponse";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const data = await fetchProducts();
    res.json(data);
  } catch (error: any) {
    const erorResponse: ApiResponse<any> = {
      message: error.message,
      status: "fail",
      error: true,
    };

    res.status(500).json(erorResponse);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const data = await fetchProducts(req.params.id);
    res.json(data);
  } catch (error: any) {
    const erorResponse: ApiResponse<any> = {
      message: error.message,
      status: "fail",
      error: true,
    };
    res.status(500).json(erorResponse);
  }
};
