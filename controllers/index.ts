import type { Request, Response } from "express";
import axiosInstance from "../config/axios";
import { getCache, setCache } from "../utils/cache";

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
    const cacheKey = "products";
    const cached = getCache(cacheKey);
    if (cached) {
      console.log("🔁 Returning cached data");

      res.json(cached);
    } else {
      const data = await fetchProducts();
      setCache(cacheKey, data, 1000 * 60 * 5); // Cache for 5 minutes
      res.json(data);
    }
  } catch (error: any) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cacheKey = id!;
    const cached = getCache(cacheKey);
    if (cached) {
      console.log("🔁 Returning cached data");
      res.json(cached);
    } else {
      const data = await fetchProducts();
      setCache(cacheKey, data, 1000 * 60 * 5); // Cache for 5 minutes
      res.json(data);
    }
  } catch (error: any) {
    console.log("Error: ", error);

    res.status(500).json({ error: error.message });
  }
};
