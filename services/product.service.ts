import axiosInstance from "../configs/axios.config";
import { getCache, setCache } from "../utils/cache";

export const getProducts = async (id?: string) => {
  try {
    const url = `/products/${id || ""}`;
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
    throw error;
  }
};
