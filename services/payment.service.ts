import axiosInstance from "../configs/axios.config";
import type { TransactionPlayLoad } from "../types/transaction";

export const createTransaction = async (playload: TransactionPlayLoad) => {
  try {
    const url = `/topup`;
    const { data, status } = await axiosInstance.post(url, playload, {
      headers: {
        "agent-token": process.env.PASSWORD!,
      },
    });
    if (status === 200 || status === 201) return data;
    else throw new Error("Create transaction failed");
  } catch (error: any) {
    throw new Error(
      error?.response?.data || error || "Create transaction failed"
    );
  }
};
