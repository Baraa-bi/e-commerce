"use client";

import { CartContext } from "@/lib/contexts/cart";
import { Product, ProductLine } from "@/lib/types";
import { useContext, useState } from "react";

export default function CartItem({
  productLine,
}: {
  productLine: ProductLine;
}) {
  const [quantity, setQuantity] = useState(productLine.quantity);
  const product = JSON.parse(productLine.productInfo) as Product;

  const { deleteCartItem } = useContext(CartContext);

  return (
    <div className="flex mt-3 relative flex-col border shadow p-3 rounded-lg bg-white sm:flex-row">
      <img
        alt=""
        src={product.imageUrl}
        className="m-2 h-32 w-32 rounded-md border object-cover object-center"
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="font-semibold">{product.productName}</span>
        <span className="float-right text-gray-400">
          {product.category?.name}
        </span>
        <p className="mt-auto text-lg font-bold">
          <div className="flex items-center justify-between">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setQuantity((c) => (c === 1 ? c : c - 1))}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                -
              </button>
              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                {quantity}
              </div>
              <button
                type="button"
                onClick={() => setQuantity((c) => (c === 3 ? c : c + 1))}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                +
              </button>
            </div>
            <div className="text-indigo-500 font-medium">
              ${product.price}
            </div>
          </div>
        </p>
      </div>

      <div className="absolute right-5 ">
        <button
          type="button"
          onClick={() => deleteCartItem(productLine)}
          className="text-white bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            className="w-5 h-5 text-rose-500"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            ></path>
          </svg>
        </button>
        <div></div>
      </div>
    </div>
  );
}
