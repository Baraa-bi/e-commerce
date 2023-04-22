import { request } from ".";
import { PAYMENT_URL } from "../constants";
import { Payment } from "../types";

export const paymentApi = {
  vendorRegistrationFee: (userId: number, payment: Payment) => {
    return request.post(`${PAYMENT_URL}/api/v1/payments/payRegistrationFee`, {
      userId,
      ...payment,
    });
  },
};

/*
DwlM2g
IK4Ge7KI
*/