// middleware/rateLimit.ts
import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window`
  message: "⚠️ Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
