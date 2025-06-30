import type { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.service";

export const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await productService.getProducts();
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await productService.getProducts(req.params.id);
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
};
