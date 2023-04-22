"use client";

import React, { useContext, useMemo, useState } from "react";
import { Product, ProductLine, ShoppingCart } from "../types";
import { cartApi } from "../apis/cart";
import { CartItem } from "../types";
import { ModalContext } from "./modal";
import { useRouter } from "next/navigation";

export const CartContext = React.createContext<any>({
  totalPrice: 0,
  cartLines: [],
  addItemToCart: (_: CartItem) => {},
});

export const CartProvider = (props: { children: any }) => {
  const router = useRouter();
  const { showModal } = useContext(ModalContext);
  const [cartLines, setCartLines] = useState<any>([]);

  const addItemToCart = (cartItem: CartItem) => {
    cartApi.addCartItem(cartItem).finally(() => {
      setCartLines((c: any) => {
        return [...c, { ...cartItem }];
      });
      showModal({
        title: "Added To Cart",
        text: "Your Product has been added to cart successfully",
        actions: [
          {
            primary: true,
            title: "Go To Cart",
            onPress: (h: any) => {
              h();
              router.push("/cart");
            },
          },
          {
            title: "Dismiss",
            onPress: (h: any) => h(),
          },
        ],
      });
    });
  };

  const totalPrice = useMemo(() => {
    return cartLines?.reduce(
      (acc: number, c: ProductLine) => acc + c.price * c.quantity,
      0
    );
  }, [cartLines]);

  const deleteCartItem = (productLine: ProductLine) => {
    return cartApi.deleteCartItem(productLine.id).then(() => {
      router.refresh();
    });
  };

  return (
    <CartContext.Provider
      value={{ deleteCartItem, totalPrice, cartLines, addItemToCart }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
