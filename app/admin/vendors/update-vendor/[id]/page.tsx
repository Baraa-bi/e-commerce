import SectionTitle from "@/components/section-title";
import UserForm from "@/components/user-form";
import { authApi } from "@/lib/apis/auth";
import { User } from "@/lib/types";

const getData = (userId: number) => {
  return authApi
    .userById(userId)
    .then(({ data }) => data)
    .catch((e) => null);
};

export default async function UpdateVendor({
  params,
}: {
  params: { id: number };
}) {
  const user = (await getData(params.id)) as User;
  return (
    <>
      <SectionTitle title="Update Vendor" />
      <UserForm user={user} />
    </>
  );
}
