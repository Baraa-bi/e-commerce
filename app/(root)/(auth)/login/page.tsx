"use client";

import { authApi } from "@/lib/apis/auth";
import Link from "next/link";
import { useState } from "react";
import { COOKIE_NAME } from "@/lib/constants";
import cookie from "react-cookies";
import { useRouter } from "next/navigation";
import { decodeJwt } from "jose";
import { USER_ROLE } from "@/lib/types";

const Page = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    authApi
      .login({ username: userName, password })
      .then(({ data }) => {
        cookie.save(COOKIE_NAME, data, { path: "/" });
        return data;
      })
      .then((jwt) => {
        const user = decodeJwt(jwt) as any;
        if (user?.roles.includes(USER_ROLE.ADMIN))
          router.push("/admin/dashboard");
        if (user?.roles.includes(USER_ROLE.VENDOR))
          router.push("/vendor/dashboard");
        if (user?.roles.includes(USER_ROLE.REGISTERED_USER)) router.push("/");
        router.refresh();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8  bg-white p-8 rounded shadow">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-400.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>

        <form>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 capitalize text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email or username"
              required
              value={userName}
              onChange={(e: any) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => login()}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Login
          </button>
        </form>

        <div className="mx-auto text-center">
          {` Don't have an account? `}

          <Link
            href="/signup"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
