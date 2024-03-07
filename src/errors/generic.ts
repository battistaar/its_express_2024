import { Request, Response, NextFunction } from "express";

export const genericHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500);
  res.json({
    error: 'InternalServerError',
    message: 'The server encountered an internal error'
  });
}