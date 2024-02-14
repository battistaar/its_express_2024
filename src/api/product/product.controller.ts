import { NextFunction, Request, Response } from "express";
import productSrv from './product.service';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { search }: { search?: string} = req.query;
  
  const results = await productSrv.find(search);

  res.json(results);
}

export const detail = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const item = await productSrv.getById(id);
  if (!item) {
    res.status(404);
    res.send('Product not found');
    return;
  }
  
  res.json(item);
}