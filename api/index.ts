import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import { notFound } from "./middlewares/not-fond";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
// app.use(notFound);


app.use("/", (req, res) => {
  console.log("Hello World");
  res.send("Welcome to the Product API");
});
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
