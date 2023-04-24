import ProductForm from "@/components/product/product-form";
import SectionTitle from "@/components/section-title";
import { categoriesApi } from "@/lib/apis/category";
import { getUserFromCookie } from "@/lib/auth";
import { USER_ROLE } from "@/lib/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

import { cookies } from "next/headers";

const getData = async () => {
  const categories = await categoriesApi
    .all()
    .then(({ data }: any) => data)
    .catch((e) => []);
  const user = await getUserFromCookie(cookies() as RequestCookies);
  return { categories, user };
};

export default async function AddProduct() {
  const { categories, user } = await getData();
  return (
    <>
      <SectionTitle title="Add Product" />
      <ProductForm
        user={user}
        role={USER_ROLE.VENDOR}
        categories={categories}
      />
    </>
  );
}
