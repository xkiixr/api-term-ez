import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoute from "./routes/product.route";
import orderRoute from "./routes/orderRoute.route";
import balanceRoute from "./routes/balance.route";

import initSocket from "./socket";
import logger from "./middlewares/logger";
import { limiter } from "./utils/limiter";
import { createSocketServer } from "./socket/io";
import { notFound } from "./middlewares/not-found";
import createPaymentRoute from "./routes/payment.route";
import { errorHandler } from "./middlewares/errorHandler";

const PORT = process.env.PORT || 3000;
const app = express();
const { server, io } = createSocketServer(app);

initSocket(io);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/products", limiter, productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/balance", balanceRoute);
app.use("/api/payment", createPaymentRoute(io));

app.get("/", (req, res) => {
  res.send("Welcome to the Product API");
});
app.use(errorHandler as express.ErrorRequestHandler);

app.use(notFound);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT} with bun`);
});
