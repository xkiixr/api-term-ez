import axiosInstance from '../configs/axios.config';
import type { GenerateQrPlayloadInterface } from '../types/payment.type';
import type { TransactionPlayLoad } from '../types/transaction';
import {
  sendDiscordWebhook,
  type DiscordWebhookPayload,
} from '../utils/discord';
import { encryptObject } from '../utils/encrypt';
import { formatDate } from '../utils/formatter';

export const createTransaction = async (
  playload: TransactionPlayLoad,
  callBack: any
) => {
  try {
    const url = `/topup`;
    const { data, status } = await axiosInstance.post(url, playload, {
      headers: {
        'agent-token': process.env.PASSWORD!,
      },
    });
    console.log(data);
    if (status === 200 || status === 201) {
      const message: DiscordWebhookPayload = {
        game: playload.game,
        playload: playload.payload,
        txnRefId: callBack.txnRefId || data.code,
        billNumber: callBack.billNumber || data.billId,
        status: 'success',
        message: 'ເຕີມສຳເລັດ',
        type: callBack.txnRefId ? 'QR' : 'Manual',
        userName: data.nickname,
        timeStamp: formatDate(new Date().toISOString()),
      };

      await sendDiscordWebhook(message);
      return data;
    } else throw new Error('Create transaction failed');
  } catch (error: any) {
    // const errMessage = error?.message || error || "Unknown error";

    // const message: DiscordWebhookPayload = {
    //   status: "error",
    //   message: errMessage,
    //   timeStamp: formatDate(new Date().toISOString()),
    // };
    // console.log(message);

    // await sendDiscordWebhook(message);
    throw error;
  }
};
export const generatePaymentQrcode = async (
  playload: GenerateQrPlayloadInterface
) => {
  try {
    const url = `/generate-proxy-payment`;

    const { data, status } = await axiosInstance.post(
      url,

      {
        ...playload,
        callbackData: encryptObject(playload.callbackData),
        callbackUrl: 'https://api.term-ez.com/api/payment/callback',
      },
      {
        headers: {
          'agent-token': process.env.PASSWORD!,
        },
      }
    );
    if (status === 200 || status === 201) return data;
    else throw new Error('generate qr failed');
  } catch (error: any) {
    throw error;
  }
};
