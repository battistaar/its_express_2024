import { CartItem } from "./cart-item.entity";

const CART: CartItem[] = [];

export class CartItemService {

  async add(item: CartItem) {
    const existing = CART.find(element => element.product === item.product);

    if (existing) {
      existing.quantity += item.quantity;
      return existing;
    }

    const toAdd = {
      id: `${CART.length}`,
      ...item
    }

    CART.push(toAdd);

    console.log(CART);
    return toAdd;
  }

}

export default new CartItemService();