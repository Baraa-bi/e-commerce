import ProductForm from "@/components/product/product-form";
import SectionTitle from "@/components/section-title";
import { productApi } from "@/lib/apis/product";
import { Product } from "@/lib/types";

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
  return (
    <div>
      <SectionTitle title="Update Product" />
      <ProductForm product={product} />
    </div>
  );
}
