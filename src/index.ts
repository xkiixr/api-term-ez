import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import paymentRoute from "./routes/payment";

import { notFound } from "./middlewares/not-fond";
import initSocket from "./socket";
import logger from "./middlewares/logger";

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://term-ez.com",
  "https://www.term-ez.com",
  "https://onetop.la",
  "https://www.onetop.la",
];

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy does not allow access from this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const io = new Server(server, {
  cors: {
    origin: corsOptions.origin,
    methods: ["GET", "POST"],
  },
});
initSocket(io);

// ✅ Middleware and Routes
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute(io));

app.get("/", (req, res) => {
  res.send("Welcome to the Product API");
});

app.use(notFound);

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
