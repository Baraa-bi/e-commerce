import { request } from ".";
import { CartItem } from "../types";

export const cartApi = {
  shoppingCart: (userId: number) => {
    return request.get(`/api/v1/cart/${userId}`);
  },
  addCartItem: (cartItem: CartItem) => {
    return request.post(`/api/v1/cart`, cartItem);
  },
  updateCartItem: (cartItem: { id: number; quantity: number }) => {
    return request.put(`/api/v1/cartLine`, cartItem);
  },
  deleteCartItem: (cartLineId: number) => {
    return request.delete(`/api/v1/cartLine/${cartLineId}`);
  },
};
