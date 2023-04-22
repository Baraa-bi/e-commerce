import SignupForm from "@/components/signup/signup-form";
import { authApi } from "@/lib/apis/auth";
import { useState } from "react";

const getData = () => {
  return authApi
    .roles()
    .then(({ data }) => {
      return data;
    })
    .catch((e) => []);
};

export default async function Signup() {
  const roles = await getData();
  return (
    <div>
      <SignupForm roles={roles} />
    </div>
  );
}
