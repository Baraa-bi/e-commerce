"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const DEFAULT_IMAGE =
  "https://gimetalusa.com/assets/images/product/placeholder.jpg";
export default function ProductForm() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/vendor/products");
  };

  return (
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
            >
              <option>Laptops</option>
              <option>Clothes</option>
              <option>Accessories</option>
              <option>Utilities</option>
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
            ></textarea>
            <div className="my-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image url
              </label>
              <input
                onChange={(e) => setImageUrl(e.target.value || DEFAULT_IMAGE)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
              />
            </div>
            <div className="my-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                max={10000}
                min={1}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Add product
            </button>
          </div>
          <div className="relative bg-gray-50 items-center flex h-auto max-h-full overflow-scroll z-0 w-full mb-6 group">
            <img
              src={imageUrl}
              alt="image description"
              className="contain max-h-full max-w-full p-4"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
