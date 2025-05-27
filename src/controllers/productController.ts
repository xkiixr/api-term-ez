import type { Request, Response } from "express";
import axiosInstance from "../configs/axios";

const fetchProducts = async (id?: string) => {
  try {
    const response = await axiosInstance.get(
      `/termgame/${process.env.INDENTIFY}/products/${id || ""}`,
      {
        headers: {
          "agent-token": process.env.PASSWORD,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data || "Failed to fetch products");
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const data = await fetchProducts();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await fetchProducts(id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
