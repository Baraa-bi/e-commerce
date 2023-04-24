"use client";
import { categoriesApi } from "@/lib/apis/category";
import { Category } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CategoryForm({ category }: { category?: Category }) {
  const router = useRouter();

  const [formData, setFormData] = useState<Category>(
    category
      ? category
      : {
          name: "",
          description: "",
        }
  );

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (category?.categoryId)
      return categoriesApi.update(category.categoryId, formData).then(() => {
        router.back();
        router.refresh();
      });
    categoriesApi.create(formData).then(() => {
      router.back();
      router.refresh();
    });
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div className="grid md:grid-cols-3 md:gap-6">
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
              value={formData.name}
              onChange={(e) =>
                setFormData((f: any) => {
                  return { ...f, name: e.target.value };
                })
              }
            />
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData((f: any) => {
                return { ...f, description: e.target.value };
              })
            }
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Category description..."
          ></textarea>

          <button
            type="submit"
            className="mt-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            {category ? "Update Category" : "Add Category"}
          </button>
        </div>
      </div>
    </form>
  );
}
