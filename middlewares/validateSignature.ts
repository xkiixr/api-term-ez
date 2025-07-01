import type { Request, Response, NextFunction } from "express";
import generateSignature from "../utils/generateSignature";
import type { ApiResponse } from "../types/apiResponse";

export default function validateSignature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const signature = generateSignature(req.body, process.env.SECRET_KEY!);
    console.log(signature);

    if (
      !req.headers["x-signature"] ||
      req.headers["x-signature"] !== signature
    ) {
      throw new Error("Invalid signature");
    } else {
      next();
    }
  } catch (error) {
    throw new Error("Invalid signature");
  }
}
