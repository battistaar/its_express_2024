import { CartItem } from "./cart-item.entity";
import productService from "../product/product.service";
import { isPopulated } from "../../utils/is-populated-obj";

const CART: CartItem[] = [];

export class CartItemService {

  async list(): Promise<CartItem[]> {
    const promises = CART.map(item => {
      return this.populateCartItem(item);
    });
    return Promise.all(promises);
  }

  async getById(id: string): Promise<CartItem | null> {
    const item = CART.find(element => element.id === id);
    if (!item) {
      return null;
    }

    return this.populateCartItem(item);
  }

  protected async populateCartItem(item: CartItem) {
    const id = isPopulated(item.product) ? item.product.id : item.product;
    const product = await productService.getById(id);
    return {
      ...item,
      product: product!
    };
  }

  async add(item: CartItem): Promise<CartItem> {
    const existing = CART.find(element => element.product === item.product);

    if (existing) {
      return this.update(
        existing.id!,
        {
          quantity: existing.quantity + item.quantity
        }
      );
    }

    const toAdd = {
      id: `${CART.length}`,
      ...item
    }

    CART.push(toAdd);

    const newItem = await this.getById(toAdd.id);
    return newItem!;
  }

  async update(id: string, data: Partial<Omit<CartItem, 'id' | 'product'>>): Promise<CartItem> {
    
    const existing = CART.find(element => element.id === id);
    if (!existing) {
      throw new Error('Not Found');
    }

    Object.assign(existing, data);
    const updated = await this.getById(id);
    return updated!;
  }

}

export default new CartItemService();