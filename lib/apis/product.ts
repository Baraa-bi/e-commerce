import { request } from ".";
import { Product } from "../types";

export const productApi = {
  all: () => {
    return request.get(`/api/v1/products`);
  },
  allByUserId: (userId: number) => {
    return request.get(`/api/v1/products`, {
      params: { userId },
    });
  },
  verified: () => {
    return request.get(`/api/v1/products/verified`);
  },
  unverified: () => {
    return request.get(`/api/v1/products/unverified`);
  },
  getbyId: (productId: number) => {
    return request.get(`/api/v1/products/${productId}`);
  },
  create: (product: Product) => {
    return request.post(`/api/v1/products`, product);
  },
  update: (productId: number, product: Product) => {
    return request.put(`/api/v1/products/${productId}`, product);
  },
  delete: (productId: number) => {
    return request.delete(`/api/v1/products/${productId}`);
  },
  approve: (productId: number) => {
    return request.put(`/api/v1/products/approve?productId=${productId}`);
  },
};
