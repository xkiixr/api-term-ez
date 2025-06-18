import axiosInstance from "../configs/axios";

export const getOrders = async (id?: string) => {
  const url = `/orders/`;

  const { data } = await axiosInstance.get(url, {
    headers: {
      "agent-token": process.env.PASSWORD!,
    },
  });

  console.log("🟢 Fetched fresh", url);
  return data;
};
