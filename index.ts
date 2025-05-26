import express from "express";

import cors from "cors";
import productRourte from "./routes/index";
import { requestLogger } from "./middlewares/logger";
import { apiLimiter } from "./middlewares/rateLimit";
const allowedOrigins = [
  "http://localhost:3000",
  "https://www.onetop.la",
  "https://onetop.la",
  "https://www.term-ez.com",
  "https://term-ez.com",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
// app.use("/api", apiLimiter);
app.use("/api", productRourte);
app.use("/", (req, res) => {
  res.send("Welcome to the Product API");
});
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
