import { Product } from './product.entity';
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<Product>({
  name: { type: String },
  description: String,
  weight: Number,
  netPrice: Number,
  discount: Number
})

productSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;

    return ret;
  }
});

export const ProductModel = mongoose.model<Product>('Product', productSchema);