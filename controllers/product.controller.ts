import type { Request, Response } from "express";
import type { ApiResponse } from "../types/apiResponse";
import * as productService from "../services/product.service";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const data = await productService.getProducts();
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

export const getProductById = async (req: Request, res: Response) => {
  try {
    const data = await productService.getProducts(req.params.id);
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
