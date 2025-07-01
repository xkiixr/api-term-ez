import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw "No token provided";
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token!, JWT_SECRET);
    next();
  } catch (err) {
    throw "Invalid or expired token";
  }
};
