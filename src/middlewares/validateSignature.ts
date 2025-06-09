import { Request, Response, NextFunction } from "express";
import generateSignature from "../utils/generateSignature";
import { ApiResponse } from "../types/apiReponse";

const erorResponse: ApiResponse<any> = {
  message: "Invalid signature",
  status: "fail",
  error: true,
};
export default function validateSignature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const signature = generateSignature(req.body, process.env.SECRET_KEY!);

    if (
      !req.headers["x-signature"] ||
      req.headers["x-signature"] !== signature
    ) {
      res.status(500).json(erorResponse);
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(erorResponse);
  }
}
