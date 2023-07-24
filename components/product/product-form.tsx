"use client";
import { productApi } from "@/lib/apis/product";
import { Category, Product, USER_ROLE, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const DEFAULT_IMAGE =
  "https://gimetalusa.com/assets/images/product/placeholder.jpg";
export default function ProductForm({
  categories,
  product,
  user,
  role,
}: {
  product?: Product;
  user?: User;
  role: USER_ROLE;
  categories: Array<Category>;
}) {
  //@ts-ignore
  const userId = product?.user?.userId;
  const [formData, setFormData] = useState(
    product
      ? { ...product, userId, categoryId: product?.category?.categoryId }
      : {
          productName: "",
          price: 0,
          qty: 0,
          itemCost: 0,
          description: "",
          imageUrl: "",
          categoryId: categories[0].categoryId,
        }
  );

  const router = useRouter();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (product?.productId)
      return productApi.update(product.productId, formData as any).then(() => {
        router.push(
          role === USER_ROLE.ADMIN ? "/admin/products" : "/vendor/products"
        );
        router.refresh();
      });
    productApi.create({ ...formData, userId: user?.userId } as any).then(() => {
      router.push(
        role === USER_ROLE.ADMIN ? "/admin/products" : "/vendor/products"
      );
      router.refresh();
    });
  };

  return (
    <div className="shadow-xl rounded-xl bg-white p-8">
      <form onSubmit={onFormSubmit}>
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="relative z-0 col-span-2 w-full mb-6 group">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
                value={formData.productName}
                onChange={(e: any) =>
                  setFormData((f) => {
                    return { ...f, productName: e.target.value };
                  })
                }
              />
            </div>

            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              id="countries"
              className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.categoryId}
              onChange={(e: any) =>
                setFormData((f) => {
                  return { ...f, categoryId: e.target.value };
                })
              }
            >
              {categories.map((category) => {
                return (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Product description..."
              value={formData.description}
              onChange={(e: any) =>
                setFormData((f) => {
                  return { ...f, description: e.target.value };
                })
              }
            ></textarea>
            <div className="my-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image url
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
                value={formData.imageUrl}
                onChange={(e: any) =>
                  setFormData((f) => {
                    return { ...f, imageUrl: e.target.value || DEFAULT_IMAGE };
                  })
                }
              />
            </div>
            <div className="my-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Cost
              </label>
              <input
                type="number"
                max={10000}
                min={1}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
                value={formData.itemCost}
                onChange={(e: any) =>
                  setFormData((f) => {
                    return { ...f, itemCost: e.target.value };
                  })
                }
              />
            </div>
            <div className="my-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Selling Price
              </label>
              <input
                type="number"
                max={10000}
                min={1}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
                value={formData.price}
                onChange={(e: any) =>
                  setFormData((f) => {
                    return { ...f, price: e.target.value };
                  })
                }
              />
            </div>
            <div className="my-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quantity
              </label>
              <input
                type="number"
                max={10000}
                min={1}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
                value={formData.qty}
                onChange={(e: any) =>
                  setFormData((f) => {
                    return { ...f, qty: e.target.value };
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {product ? `Update Product` : `Add Product`}
            </button>
          </div>
          <div className="relative shadow overflow-hidden rounded-3xl bg-gray-100 col-span-2 items-center flex h-auto max-h-full z-0 w-full mb-6 group">
            <img
              src={formData.imageUrl ? formData.imageUrl : DEFAULT_IMAGE}
              alt="image description"
              className="w-full max-h-full max-w-full p-8 "
            />
          </div>
        </div>
      </form>
    </div>
  );
}
