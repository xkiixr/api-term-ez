import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import paymentRoute from "./routes/payment";
import { notFound } from "./middlewares/not-fond";
import initSocket from "./socket";
import logger from "./middlewares/logger";
import { limiter } from "./utils/limiter";
import { createSocketServer } from "./socket/io";

const PORT = process.env.PORT || 3000;
const app = express();
const { server, io } = createSocketServer(app);

initSocket(io);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/api/products",limiter, productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute(io));

app.get("/", (req, res) => {
  res.send("Welcome to the Product API");
});

app.use(notFound);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
