import ProductForm from "@/components/product/product-form";
import SectionTitle from "@/components/section-title";
import { getUserFromCookie } from "@/lib/auth";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

import { cookies } from "next/headers";

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);
  return user;
};

export default async function AddProduct() {
  const user = await getData();
  return (
    <>
      <SectionTitle title="Add Product" />
      <ProductForm user={user} />
    </>
  );
}
