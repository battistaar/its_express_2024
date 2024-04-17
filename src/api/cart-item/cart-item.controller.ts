import { NextFunction, Request, Response } from "express";
import productService from "../product/product.service";
import cartItemService from './cart-item.service';
import { CartItem } from "./cart-item.entity";
import { NotFoundError } from "../../errors/not-found";
import { TypedRequest } from "../../utils/typed-request";
import { CreateCartItemDTO, UpdateQuantityDTO } from "./cart-item.dto";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const items = await cartItemService.list(user.id!);
    res.json(items);
  } catch(err) {
    next(err);
  }
}

export const add = async (req: TypedRequest<CreateCartItemDTO>, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
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

    const saved = await cartItemService.add(newItem, user.id!);

    res.json(saved);
  } catch(err) {
    next(err);
  }
}

export const updateQuantity = async (req: TypedRequest<UpdateQuantityDTO>, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { quantity } = req.body;
    const { id } = req.params;

    const updated = await cartItemService.update(id, { quantity }, user.id!);
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { id } = req.params;
    await cartItemService.remove(id, user.id!);
    res.send();
  } catch(err) {
    next(err);
  }
}