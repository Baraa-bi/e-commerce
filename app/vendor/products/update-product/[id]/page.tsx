import ProductForm from "@/components/product/product-form";
import SectionTitle from "@/components/section-title";
import { productApi } from "@/lib/apis/product";
import { Product, USER_ROLE } from "@/lib/types";

const getData = (productId: number) => {
  return productApi
    .getbyId(productId)
    .then(({ data }) => data)
    .catch((e) => {});
};

export default async function UpdateProduct({
  params,
}: {
  params: { id: number };
}) {
  const product = await getData(params.id);
  console.log(product, "df");
  return (
    <div>
      <SectionTitle title="Update Product" />
      <div className="bg-white p-8">
        <ProductForm role={USER_ROLE.VENDOR} product={product} />
      </div>
    </div>
  );
}
