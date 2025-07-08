// controllers/paymentController.ts
import type { NextFunction, Request, Response } from 'express';
import type { ApiResponse } from '../types/apiResponse';
import { Server } from 'socket.io';
import * as paymentService from '../services/payment.service';
import { decryptObject } from '../utils/encrypt';
import { pubnub } from '../configs/pubnub.config';

export const handleCallBack =
  (io: Server) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) throw new Error('no playload');
      console.log(JSON.stringify(req?.body));

      const { billNumber, message, data } = req?.body;

      if (message === 'success') {
        await paymentService.createTransaction(decryptObject(data), req?.body);
        io.to(billNumber).emit('payment:status', {
          ...req?.body,
          status: 'success',
        });
        await pubnub.publish({
          channel: `order-${billNumber}`, // client subscribe ช่องนี้
          message: {
            type: 'payment_update',
            data: {
              ...req?.body,
              status: 'success',
            },
          },
        });
        const response: ApiResponse<any> = {
          message: 'Callback processed successfully',
          status: 'success',
          error: null,
        };
        res.status(200).json(response);
      } else {
        throw 'Callback processing failed';
      }
    } catch (error) {
      next(error);
    }
  };

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await paymentService.createTransaction(req.body, {});
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
};

export const generateQr = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await paymentService.generatePaymentQrcode(req.body);
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
};
