import { request } from ".";
import { OrderDetails, User } from "../types";

export const orderApi = {
  all: (params?: any) => {
    return request.get(`/api/v1/orders`, { params });
  },
  placeOrder: (orderDetails: OrderDetails) => {
    return request.post(`/api/v1/orders`, orderDetails);
  },
  placeOrderForGuestUser: (userInfo: User, orderDetails: any) => {
    return request.post(`/api/v1/orders/guestUser`, {
      userInfo,
      ...orderDetails,
    });
  },
  getById: (orderId: number) => {
    return request.get(`/api/v1/orders/${orderId}`);
  },
  ordersByUserId: (userId: number) => {
    return request.get(`/api/v1/orders/users/${userId}`);
  },
};
