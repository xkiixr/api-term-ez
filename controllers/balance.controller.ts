import type { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";


export const getAllBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await userService.getBalance();
    res.status(200).json(data);
  } catch (error: any) {
    next(error);
  }
};
