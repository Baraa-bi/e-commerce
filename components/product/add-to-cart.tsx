"use client";

import { CartContext } from "@/lib/contexts/cart";
import { CartItem, USER_ROLE } from "@/lib/types";
import { useContext, useState } from "react";

export default function AddToCart({ cartItem }: { cartItem: CartItem }) {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useContext(CartContext);
  return (
    <>
      <div className="flex my-8 items-center justify-between">
        <div className="text-2xl font-semibold">Quantity</div>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setQuantity((c) => (c === 1 ? c : c - 1))}
            className="inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            -
          </button>
          <div className="inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-white border-t border-b border-gray-200">
            {quantity}
          </div>
          <button
            type="button"
            onClick={() => setQuantity((c) => (c === 3 ? c : c + 1))}
            className="inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex mt-10">
        <button
          onClick={() =>
            addItemToCart(
              { ...cartItem, quantity },
              cartItem?.userId ? USER_ROLE.REGISTERED_USER : USER_ROLE.GUEST
            )
          }
          type="button"
          className="w-full uppercase text-white bg-gradient-to-br from-purple-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-base px-6 py-3.5 text-center mr-2 mb-2"
        >
          Add To Cart
        </button>
      </div>
    </>
  );
}
