import AddToCart from "@/components/product/add-to-cart";
import { productApi } from "@/lib/apis/product";
import { getUser, getUserFromCookie } from "@/lib/auth";
import { Product } from "@/lib/types";
import {
  RequestCookie,
  RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const getData = async (productId: number) => {
  const user = await getUserFromCookie(cookies() as RequestCookies);
  const product = (await productApi
    .getbyId(productId)
    .then(({ data }) => data)) as Product;
  return { product, user };
};

export default async function Product({ params }: { params: { id: number } }) {
  const { product, user } = await getData(params.id);
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.imageUrl}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product?.category?.name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-bold mb-1">
              {product.productName}
            </h1>
            <p className="my-5 leading-loose">{product.description}</p>
            <div className="flex my-8 items-center justify-between">
              <div className="text-2xl font-semibold">Price</div>
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
            </div>
            <AddToCart
              cartItem={{
                userId: user.id,
                productDTO: { ...product, userId: product.user.userId },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
