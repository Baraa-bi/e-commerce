import { categoriesApi } from "@/lib/apis/category";
import { Category } from "@/lib/types";
import SectionTitle from "@/components/section-title";
import CategoryForm from "@/components/category/add-category";

const getData = (categoryId: number) => {
  return categoriesApi
    .getbyId(categoryId)
    .then(({ data }) => data)
    .catch((e) => {});
};

export default async function ProductForm({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const category = (await getData(params.id)) as Category;
  return (
    <>
      <SectionTitle title="Update Category" />
      <div className="bg-white p-8">
        <CategoryForm category={category} />
      </div>
    </>
  );
}
