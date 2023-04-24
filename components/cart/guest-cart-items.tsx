"use client";
import { CartContext } from "@/lib/contexts/cart";
import { useContext } from "react";
import CartItem from "./cart-item";
import { USER_ROLE } from "@/lib/types";

export default function GuestCartItems() {
  const { productLines } = useContext(CartContext);

  if (!Object.keys(productLines)?.length)
    return (
      <div className="left-10">
        <img
          className=""
          src="https://semisearch.in/site-assets/images/no-cart.gif"
        />
      </div>
    );

  return (
    <>
      {Object.keys(productLines).map((key) => {
        const productLine = productLines[key];
        return (
          <div key={key} className="bg-gray-100">
            <CartItem
              role={USER_ROLE.GUEST}
              key={productLine.id}
              productLine={productLine}
            />
          </div>
        );
      })}
    </>
  );
}
