import { NotFoundError } from "../../errors/not-found";
import { CartItem } from "./cart-item.entity";
import { CartItemModel } from "./cart-item.model";

export class CartItemService {

  async list(userId: string): Promise<CartItem[]> {
    return CartItemModel.find({user: userId}).populate('product');
  }

  async getById(id: string, userId: string): Promise<CartItem | null> {
    const item = await CartItemModel.findOne({_id: id, user: userId}).populate('product');
    if (!item) {
      return null;
    }
    return item;
  }

  async add(item: CartItem, userId: string): Promise<CartItem> {
    const existing = await CartItemModel.findOne({ product: item.product, user: userId });

    if (existing) {
      return this.update(
        existing.id!,
        {
          quantity: existing.quantity + item.quantity
        },
        userId
      );
    }

    const newItem = await CartItemModel.create({...item, user: userId});

    return (await this.getById(newItem.id, userId))!;
  }

  async update(id: string, data: Partial<Omit<CartItem, 'id' | 'product'>>, userId: string): Promise<CartItem> {
    
    const existing = await CartItemModel.findOne({_id: id, user: userId});
    if (!existing) {
      throw new NotFoundError();
    }

    Object.assign(existing, data);
    await existing.save();
    const updated = await this.getById(id, userId);
    return updated!;
  }

  async remove(id: string, userId: string) {
    const existing = await CartItemModel.findOne({_id: id, user: userId});
    if (!existing) {
      throw new NotFoundError();
    }

    await CartItemModel.deleteOne({_id: id});
  }

}

export default new CartItemService();