"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  Product,
  ProductLine,
  ShoppingCart,
  USER_ROLE,
  UserRole,
} from "../types";
import { cartApi } from "../apis/cart";
import { CartItem } from "../types";
import { ModalContext } from "./modal";
import { useRouter } from "next/navigation";

export const CartContext = React.createContext<any>({
  totalPrice: 0,
  cartLines: [],
  addItemToCart: (_: CartItem, role: USER_ROLE) => {},
});

export const CartProvider = (props: { children: any }) => {
  const router = useRouter();
  const { showModal } = useContext(ModalContext);
  const [productLines, setProductLines] = useState<any>({});

  const addItemToCart = (cartItem: CartItem, role: USER_ROLE) => {
    if (role === USER_ROLE.GUEST) {
      setProductLines((c: any) => {
        return {
          ...c,
          [cartItem.productDTO.productId]: {
            quantity: cartItem.quantity,
            productInfo: JSON.stringify(cartItem.productDTO),
          },
        };
      });
      return showAddedToCartModal();
    }
    cartApi.addCartItem(cartItem).then(() => {
      showAddedToCartModal();
    });
  };

  const updateCartItem = (
    cartItem: { id: number; quantity: number },
    role: USER_ROLE
  ) => {
    if (role === USER_ROLE.GUEST) {
      return setProductLines((c: any) => {
        const productLines = { ...c };
        productLines[cartItem.id] = {
          ...productLines[cartItem.id],
          quantity: cartItem.quantity,
        };
        return productLines;
      });
    }
    cartApi.updateCartItem(cartItem).then(() => {
      router.refresh();
    });
  };

  const deleteCartItem = (id: number, role: USER_ROLE) => {
    if (role === USER_ROLE.GUEST)
      return setProductLines((p: any) => {
        const productLines = { ...p };
        delete productLines[id];
        return productLines;
      });
    return cartApi.deleteCartItem(id).then(() => {
      router.refresh();
    });
  };

  const showAddedToCartModal = () => {
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
  };

  const totalPrice = useMemo(() => {
    return Object.keys(productLines).reduce(function (acc, key) {
      const product = JSON.parse(productLines?.[key]?.productInfo);
      return acc + productLines[key].quantity * product?.price;
    }, 0);
  }, [productLines]);

  console.log({ productLines });

  return (
    <CartContext.Provider
      value={{
        totalPrice,
        productLines,
        addItemToCart,
        updateCartItem,
        deleteCartItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
