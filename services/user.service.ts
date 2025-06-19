import axiosInstance from "../configs/axios.config";

export const getBalance = async (id?: string) => {
  const url = `/get-balance`;

  const { data } = await axiosInstance.get(url, {
    headers: {
      "agent-token": process.env.PASSWORD!,
    },
  });

  return data;
};
