import { request } from ".";

export const orderApis = {
  all: () => {
    return request.get("/orders");
  },
  placeOrder: (orderDetails: OrderDetails) => {
    return request.post("/orders", orderDetails);
  },
};
