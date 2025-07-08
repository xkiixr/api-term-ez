import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import createPaymentRoute from './routes/payment.route';
import productRoute from './routes/product.route';
import orderRoute from './routes/order.route';
import balanceRoute from './routes/balance.route';
import authRoute from './routes/auth.route';
import './utils/encrypt';

import initSocket from './socket';
import { limiter } from './utils/limiter';
import { createSocketServer } from './socket/io';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/errorHandler';
import { formatDate } from './utils/formatter';
// import connectDB from './configs/db';
import { validateToken } from './middlewares/validateToken';


const PORT = process.env.PORT || 3000;
const app = express();
const { server, io } = createSocketServer(app);

initSocket(io);
// connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/auth', authRoute);
app.use('/api/products', limiter, productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/balance', balanceRoute);
app.use('/api/payment', createPaymentRoute(io));

app.get('/', (req, res) => {
  console.log(formatDate('123'));
  res.send('Welcome to the TERM-EZ API');
});
app.use(errorHandler as express.ErrorRequestHandler);

app.use(notFound);

server.listen(PORT, () => {
  console.log(
    `🚀 Server running at http://localhost:${PORT} with bun \n call URL: https://api.term-ez.com/api/payment/callback`
  );
});
