import { request } from ".";
import { ORDER_URL } from "../constants";
import { OrderDetails, User } from "../types";

export const orderApi = {
  all: () => {
    return request.get(`${ORDER_URL}/orders`);
  },
  placeOrder: (orderDetails: OrderDetails) => {
    return request.post(`${ORDER_URL}/orders`, orderDetails);
  },
  placeOrderForGuestUser: (userInfo: User, orderDetails: OrderDetails) => {
    return request.post(`${ORDER_URL}/orders/guestUser`, {
      userInfo,
      ...orderDetails,
    });
  },
  getById: (orderId: number) => {
    return request.get(`${ORDER_URL}/orders/${orderId}`);
  },
  ordersByUserId: (userId: number) => {
    return request.get(`${ORDER_URL}/orders/users/${userId}`);
  },
};
