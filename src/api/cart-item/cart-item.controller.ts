import { NextFunction, Request, Response } from "express";
import productService from "../product/product.service";
import cartItemService from './cart-item.service';
import { CartItem } from "./cart-item.entity";

export const list = async (req: Request, res: Response, next: NextFunction) => {

}

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity } = req.body;

  console.log(productId, quantity);

  //controllare che il prodotto esista
  const product = await productService.getById(productId);
  if (!product) {
    res.send(404);
    return;
  }

  const newItem: CartItem = {
    product: productId,
    quantity
  }

  const saved = await cartItemService.add(newItem);
  //controllare se il prodotto è già nel carrello
  //se c'è già sommo le quantità

  //se non c'è aggiungo al carrello
  res.json(saved);
}

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
  
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  
}