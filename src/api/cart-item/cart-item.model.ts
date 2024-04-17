import { CartItem } from './cart-item.entity';
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema<CartItem>({
  quantity: Number,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user: mongoose.Schema.Types.ObjectId
});

cartItemSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.user;

    return ret;
  }
});

export const CartItemModel = mongoose.model<CartItem>('CartItem', cartItemSchema);