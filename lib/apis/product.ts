import { request } from ".";
import { Product } from "../types";

export const productApi = {
  all: () => {
    return request.get("/v1/products");
  },
  verified: () => {
    return request.get("/v1/products/verified");
  },
  unverified: () => {
    return request.get("/v1/products/unverified");
  },
  getbyId: (productId: number) => {
    return request.get(`/v1/products/${productId}`);
  },
  create: (product: Product) => {
    return request.post("/v1/products", product);
  },
  update: (productId: number, product: Product) => {
    return request.put(`/v1/product/${productId}`, product);
  },
  delete: (productId: number) => {
    return request.delete(`/v1/products/${productId}`);
  },
  approve: (productId: number) => {
    return request.put(`/v1/products/approve/${productId}`);
  },
};
