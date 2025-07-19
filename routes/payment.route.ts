import { Router } from 'express';
import { Server } from 'socket.io';
import {
  createTransaction,
  generateQr,
  handleCallBack,
} from '../controllers/payment.controller';
import validateSignature from '../middlewares/validateSignature';

export default function createPaymentRoute(io: Server) {
  const router = Router();
  console.log('Creating payment route with socket.io integration');

  router.post('/create', createTransaction);
  router.post('/callback', handleCallBack(io)); //Pass io to funtion add validateSignature if it neccessery
  router.post('/generateqr', generateQr);

  return router;
}
