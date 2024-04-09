import { NextFunction, Request, Response } from "express";
import productService from "../product/product.service";
import cartItemService from './cart-item.service';
import { CartItem } from "./cart-item.entity";
import { NotFoundError } from "../../errors/not-found";
import { TypedRequest } from "../../utils/typed-request";
import { CreateCartItemDTO } from "./cart-item.dto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await cartItemService.list();
    res.json(items);
  } catch(err) {
    next(err);
  }
}

export const add = async (req: TypedRequest<CreateCartItemDTO>, res: Response, next: NextFunction) => {
  try {
    const data = plainToClass(CreateCartItemDTO, req.body);
    const errors = await validate(data);
    if (errors.length) {
      next(errors);
      return;
    }

    const { productId, quantity } = req.body;

    //controllare che il prodotto esista
    const product = await productService.getById(productId);
    if (!product) {
      throw new NotFoundError();
    }

    const newItem: CartItem = {
      product: productId,
      quantity
    }

    const saved = await cartItemService.add(newItem);

    res.json(saved);
  } catch(err) {
    next(err);
  }
}

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    const updated = await cartItemService.update(id, { quantity });
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await cartItemService.remove(id);
    res.send();
  } catch(err) {
    next(err);
  }
}