import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import user from "../models/user";
import { generateToken } from "../utils/jwt";

// POST /login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const foundUser = await user.findOne({ username });
    if (!foundUser) {
      throw "Invalid username or password";
    }
    const isMatch = await bcrypt.compare(password, foundUser.passwordHash);
    if (!isMatch) {
      throw "Invalid username or password";
    }
    const { passwordHash, ...userData } = foundUser.toObject();
    const token = generateToken({
      ...foundUser.toObject(),
    });
    res.status(200).json({ user: userData, token });
  } catch (error: any) {
    next(error);
  }
};
