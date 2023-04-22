"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { categoriesApi } from "@/lib/apis/category";
import { Category } from "@/lib/types";
import SectionTitle from "@/components/section-title";

export default function ProductForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
  });

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    categoriesApi.create(formData).then(() => {
      router.back();
      router.refresh();
    });
  };

  return (
    <>
      <SectionTitle title="Add Category" />

      <div className="bg-white p-8">
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
                onChange={(e) =>
                  setFormData((f: any) => {
                    return { ...f, description: e.target.value };
                  })
                }
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product description..."
              ></textarea>

              <button
                type="submit"
                className="mt-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Add Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
