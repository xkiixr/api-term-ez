import type { Request, Response } from "express";
import axiosInstance from "../configs/axios";
import { getCache, setCache } from "../utils/cache";

const fetchProducts = async (id?: string) => {
  try {
    const url = `/termgame/${process.env.INDENTIFY}/products/${id || ""}`;
    const cacheKey = `axios:${url}`;

    const cached = getCache(cacheKey);
    if (cached) {
      console.log("🟡 Cache hit", url);
      return cached;
    }

    const { data } = await axiosInstance.get(url, {
      headers: {
        "agent-token": process.env.PASSWORD!,
      },
    });

    setCache(cacheKey, data, 1000 * 60 * 5); // 5 min
    console.log("🟢 Fetched fresh", url);
    return data;
  } catch (error: any) {
    console.log("PRODUCT ERROR", error.response);
    throw new Error(
      error.response?.data || error || "Failed to fetch products"
    );
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
    const data = await fetchProducts(req.params.id);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
