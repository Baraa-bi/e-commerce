import SignupForm from "@/components/signup/signup-form";
import { authApi } from "@/lib/apis/auth";

const getData = () => {
  return authApi
    .roles()
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      console.log(e.response.data);
      return [];
    });
};

export default async function Signup() {
  const roles = await getData();
  return (
    <div>
      <SignupForm roles={roles} />
    </div>
  );
}
