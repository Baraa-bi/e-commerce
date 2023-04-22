import CartItem from "@/components/cart/cart-item";
import Checkout from "@/components/cart/checkout";
import { cartApi } from "@/lib/apis/cart";
import { getUserFromCookie } from "@/lib/auth";
import { Product, ProductLine, ShoppingCart, User } from "@/lib/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import Link from "next/link";

const getData = async () => {
  let shoppingCart = null;
  const user = await getUserFromCookie(cookies() as RequestCookies);
  if (user.id)
    shoppingCart = (await cartApi
      .shoppingCart(user.id)
      .then(({ data }) => data)
      .catch((e) => e)) as ShoppingCart;
  return { shoppingCart, user };
};

export default async function Cart() {
  const { user, shoppingCart } = await getData();
  console.log({ shoppingCart, cc: shoppingCart?.cartLines?.length });
  return (
    <div className="bg-white p-4 rounded m-16">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-10 xl:px-12">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And checkout.</p>
          <div className="relative mt-8 rounded-xl border-indigo-100 border bg-gray-100 px-2 py-4 sm:px-6">
            {shoppingCart?.cartLines.map((productLine: ProductLine) => {
              return (
                <CartItem key={productLine.id} productLine={productLine} />
              );
            })}
            {!shoppingCart?.cartLines?.length && (
              <>
                <div className="left-10">
                  <img
                    className=""
                    src="https://semisearch.in/site-assets/images/no-cart.gif"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {!shoppingCart?.cartLines?.length ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="mb-3 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-blue-400">
                No Cart items..!
              </div>
              <h1 className="mb-8 text-center text-lg text-gray-400 dark:text-white md:text-2xl lg:text-2xl">
                Please add some product in the cart to view
              </h1>
              <div>
                <Link
                  href="/"
                  className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-3.5 text-center mr-2 mb-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        ) : (
          <Checkout shoppingCart={shoppingCart} user={user} />
        )}
      </div>
    </div>
  );
}
