import CartItem from "@/components/cart/cart-item";
import Checkout from "@/components/cart/checkout";
import GuestCartItems from "@/components/cart/guest-cart-items";
import GuestCheckout from "@/components/cart/guest-checkout";
import { cartApi } from "@/lib/apis/cart";
import { getUserFromCookie } from "@/lib/auth";
import { ProductLine, ShoppingCart, User } from "@/lib/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const getData = async () => {
  let shoppingCart = { cartLines: [] } as any;
  const user = await getUserFromCookie(cookies() as RequestCookies);
  if (user?.userId)
    shoppingCart = (await cartApi
      .shoppingCart(user.userId)
      .then(({ data }) => data)
      .catch((e) => {
        return { cartLines: [] };
      })) as ShoppingCart;
  return { shoppingCart, user };
};

export default async function Cart() {
  const { user, shoppingCart } = await getData();
  return (
    <div className="bg-white p-4 rounded m-16">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-10 xl:px-12">
        <div className="px-4 pt-8">
          <div className="relative mt-8 rounded-xl border-indigo-100 border  px-2 py-4 sm:px-6">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And checkout.</p>
            {user ? (
              !shoppingCart?.cartLines?.length ? (
                <>
                  <div className="left-10">
                    <img
                      className=""
                      src="https://semisearch.in/site-assets/images/no-cart.gif"
                    />
                  </div>
                </>
              ) : (
                shoppingCart?.cartLines?.map((productLine: ProductLine) => {
                  return (
                    <div className="bg-gray-100">
                      <CartItem
                        key={productLine.id}
                        productLine={productLine}
                      />
                    </div>
                  );
                })
              )
            ) : (
              <GuestCartItems />
            )}
          </div>
        </div>
        {user ? (
          <Checkout shoppingCart={shoppingCart} user={user} />
        ) : (
          <GuestCheckout />
        )}
      </div>
    </div>
  );
}
