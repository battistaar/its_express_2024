import { NextFunction, Request, Response } from "express";
import productSrv from './product.service';
import { NotFoundError } from "../../errors/not-found";
import { TypedRequest } from "../../utils/typed-request";
import { ProductQueryDTO } from "./product.dto";

export const list = async (req: TypedRequest<unknown, ProductQueryDTO>, res: Response, next: NextFunction) => {
  try {
    // const { search }: { search?: string} = req.query;
    const results = await productSrv.find(req.query);

    res.json(results);
  } catch(err) {
    next(err);
  }
}

export const detail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const item = await productSrv.getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    
    res.json(item);
  } catch(err) {
    next(err);
  }
}