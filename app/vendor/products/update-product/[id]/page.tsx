import ProductForm from "@/components/product/product-form";
import SectionTitle from "@/components/section-title";
import { categoriesApi } from "@/lib/apis/category";
import { productApi } from "@/lib/apis/product";
import { USER_ROLE } from "@/lib/types";

const getData = async (productId: number) => {
  const categories = await categoriesApi
    .all()
    .then(({ data }: any) => data)
    .catch((e) => []);
  const product = await productApi
    .getbyId(productId)
    .then(({ data }) => data)
    .catch((e) => {});
  return { categories, product };
};

export default async function UpdateProduct({
  params,
}: {
  params: { id: number };
}) {
  const { categories, product } = await getData(params.id);

  return (
    <div>
      <SectionTitle title="Update Product" />
      <div className="bg-white p-8">
        <ProductForm
          product={product}
          categories={categories}
          role={USER_ROLE.VENDOR}
        />
      </div>
    </div>
  );
}
