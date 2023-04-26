import { request } from ".";
import { Category } from "../types";

export const categoriesApi = {
  all: () => {
    return request.get(`/api/v1/categories`);
  },
  getbyId: (categoryId: number) => {
    return request.get(`/api/v1/categories/${categoryId}`);
  },
  create: (category: Category) => {
    return request.post(`/api/v1/categories`, category);
  },
  update: (categoryId: number, category: Category) => {
    return request.put(`/api/v1/categories/${categoryId}`, category);
  },
  delete: (categoryId: number) => {
    return request.delete(`/api/v1/categories/${categoryId}`);
  },
};
