import { request } from ".";
import { Category } from "../types";

export const categoriesApi = {
  all: () => {
    return request.get("/v1/categories");
  },
  getbyId: (categoryId: number) => {
    return request.get(`/v1/categories/${categoryId}`);
  },
  create: (category: Category) => {
    return request.post("/v1/categories", category);
  },
  update: (categoryId: number, category: Category) => {
    return request.put(`/v1/categories/${categoryId}`, category);
  },
  delete: (categoryId: number) => {
    return request.delete(`/v1/categories/${categoryId}`);
  },
};
