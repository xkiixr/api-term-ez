import express from "express";

import cors from "cors";
import productRourte from "./routes/index";
import { requestLogger } from "./middlewares/logger";
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
      // Allow non-browser clients like Postman
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true); // ✅ Allow
    } else {
      callback(new Error("Not allowed by CORS")); // ❌ Block
    }
  },
  credentials: true,
};

const app = express();
const port = process.env.PORT || 3000;
app.use(requestLogger);

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use("/api", productRourte);
app.use("/", (req, res) => {
  res.send("Welcome to the Product API");
});
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
