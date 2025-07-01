import axiosInstance from "../configs/axios.config";

export const getOrders = async (id?: string) => {
  try {
    const url = `/orders/`;
    const { data } = await axiosInstance.get(url, {
      headers: {
        "agent-token": process.env.PASSWORD!,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
