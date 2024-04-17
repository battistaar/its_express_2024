import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";

export const me = async (req: TypedRequest, res: Response, next: NextFunction) => {
  res.json(req.user!);
}