import axiosInstance from "../configs/axios.config";

export const getBalance = async (id?: string) => {
  try {
    const url = `/get-balance`;

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
