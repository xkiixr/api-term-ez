// src/middlewares/errorHandler.ts
import type { Request, Response, NextFunction } from "express";
import { AxiosError } from "axios";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  console.error(err);

  if (err instanceof AxiosError) {
    if (err.response) {
      return res.status(err.response.status || 500).json({
        status: "fail",
        message: err.message,
        details: err.response.data,
      });
    } else if (err.request) {
      return res.status(500).json({
        status: "fail",
        message: "No response received from external service",
        details: err.message,
      });
    }
    return res.status(500).json({
      status: "fail",
      message: "Axios error occurred",
      details: err.message,
    });
  }

  return res.status(500).json({
    status: "fail",
    message: "Internal Server Error",
    details: err.message || err,
  });
}
