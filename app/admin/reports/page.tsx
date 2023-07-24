import Filters from "@/components/filters";
import SectionTitle from "@/components/section-title";
import { authApi } from "@/lib/apis/auth";
import { USER_ROLE, UserDetails } from "@/lib/types";

const getData = async () => {
  return authApi
    .users()
    .then(({ data }) => {
      return data.filter((user: UserDetails) => {
        return user.roles?.[0]?.roleName === USER_ROLE.VENDOR;
      });
    })
    .catch((e) => []);
};

export default async function Reports() {
  const vendors = await getData();
  return (
    <div>
      <SectionTitle title="Reprots" />
      <Filters vendors={vendors} />
    </div>
  );
}
