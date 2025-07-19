import type { Request, Response, NextFunction } from 'express';
import * as gameService from '../services/game.service';

export const getUserGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await gameService.getGameUserName(req.body);
    console.log(data);

    res.status(200).json(data);
  } catch (error: any) {
    console.log(error);

    next(error);
  }
};
