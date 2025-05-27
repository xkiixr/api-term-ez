import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import productRoute from "./routes/productRoute";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productRoute);
app.use("/", (req, res) => {
  console.log("Hello World");

  res.send("Welcome to the Product API");
});
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
