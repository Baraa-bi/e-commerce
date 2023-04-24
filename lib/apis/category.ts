import { request } from ".";
import { CATEGORY_URL } from "../constants";
import { Category } from "../types";

export const categoriesApi = {
  all: () => {
    return request.get(`${CATEGORY_URL}/api/v1/categories`);
  },
  getbyId: (categoryId: number) => {
    return request.get(`${CATEGORY_URL}/api/v1/categories/${categoryId}`);
  },
  create: (category: Category) => {
    return request.post(`${CATEGORY_URL}/api/v1/categories`, category);
  },
  update: (categoryId: number, category: Category) => {
    return request.put(
      `${CATEGORY_URL}/api/v1/categories/${categoryId}`,
      category
    );
  },
  delete: (categoryId: number) => {
    return request.delete(`${CATEGORY_URL}/api/v1/categories/${categoryId}`);
  },
};
