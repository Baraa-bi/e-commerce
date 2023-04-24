import { request } from ".";
import { ORDER_URL } from "../constants";
import { OrderDetails, User } from "../types";

export const orderApi = {
  all: () => {
    return request.get(`${ORDER_URL}/api/v1/orders`);
  },
  placeOrder: (orderDetails: OrderDetails) => {
    return request.post(`${ORDER_URL}/api/v1/orders`, orderDetails);
  },
  placeOrderForGuestUser: (userInfo: User, orderDetails: OrderDetails) => {
    return request.post(`${ORDER_URL}/api/v1/orders/guestUser`, {
      userInfo,
      ...orderDetails,
    });
  },
  getById: (orderId: number) => {
    return request.get(`${ORDER_URL}/api/v1/orders/${orderId}`);
  },
  ordersByUserId: (userId: number) => {
    return request.get(`${ORDER_URL}/api/v1/orders/users/${userId}`);
  },
};
