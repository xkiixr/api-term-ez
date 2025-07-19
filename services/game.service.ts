import axiosInstance from '../configs/axios.config';
import type { Payload } from '../types/transaction';
import { getCache, setCache } from '../utils/cache';

interface getGameUserNamePlayload {
  productId: string;
  payload: Payload[];
}

export const getGameUserName = async (playload: getGameUserNamePlayload) => {
  try {
    const url = `/get-game-role`;

    const { data } = await axiosInstance.post(url, playload, {
      headers: {
        'agent-token': process.env.PASSWORD!,
      },
    });

    console.log('🟢 Fetched fresh', url);
    return data;
  } catch (error: any) {
    throw error;
  }
};
