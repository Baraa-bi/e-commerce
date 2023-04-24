import { request } from ".";
import { CART_URL } from "../constants";
import { CartItem } from "../types";

export const cartApi = {
  shoppingCart: (userId: number) => {
    return request.get(`${CART_URL}/api/v1/cart/${userId}`);
  },
  addCartItem: (cartItem: CartItem) => {
    return request.post(`${CART_URL}/api/v1/cart`, cartItem);
  },
  updateCartItem: (cartItem: { id: number; quantity: number }) => {
    return request.put(`${CART_URL}/api/v1/cartLine`, cartItem);
  },
  deleteCartItem: (cartLineId: number) => {
    return request.delete(`${CART_URL}/api/v1/cartLine/${cartLineId}`);
  },
};
