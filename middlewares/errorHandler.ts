// src/middlewares/errorHandler.ts
import { AxiosError } from "axios";
import type { Request, Response, NextFunction } from "express";

// Removed unnecessary import of PrismaClientKnownRequestError

/**
 * Centralized error handling middleware.
 * This function catches errors from the controllers and sends a standardized error response.
 * It specifically handles Prisma-related errors for more specific feedback.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error for debugging purposes

  if (err instanceof AxiosError) {
    if (err.response) {
      // Unique constraint failed
      return res.status(409).json({
        statusCode: 409,
        message: `Conflict: A record with this value already exists.`,
        details: `Unique constraint failed on the field(s): ${err.response?.data}`,
      });
    }
    // Add more specific Prisma error codes as needed
    return res.status(400).json({
      statusCode: 400,
      message: "Bad Request: A database error occurred.",
      details: err.message,
    });
  }

  // Handle Prisma Validation Errors

  // Generic 500 Internal Server Error for all other errors
  res.status(500).json({
    statusCode: 500,
    message: "Internal Server Error",
    error: err.message, // In development, you might want to send the full error
  });
};
