import { request } from ".";
import { Payment } from "../types";

export const paymentApi = {
  vendorRegistrationFee: (userId: number, payment: Payment) => {
    return request.post(`/api/v1/payments/payRegistrationFee`, {
      userId,
      ...payment,
    });
  },
};
