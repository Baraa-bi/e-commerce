import SectionTitle from "@/components/section-title";
import CategoryForm from "@/components/category/add-category";

export default function AddCateogry() {
  return (
    <>
      <SectionTitle title="Add Category" />
      <div className="bg-white p-8">
        <CategoryForm />
      </div>
    </>
  );
}
