import { request } from ".";
import { CartItem } from "../types";

export const cartApi = {
  addProduct: (cartItem: CartItem) => {
    return request.post("/cart", cartItem);
  },
  checkout: () => {
    return null;
  },
};
