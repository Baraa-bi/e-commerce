"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { USER_ROLE } from "@/lib/types";
import { authApi } from "@/lib/apis/auth";

export default function UserForm({ user }: { user: any }) {
  const router = useRouter();

  const [formData, setFormData] = useState(user);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    delete formData.authorities;
    authApi.updateUser(user.userId, { ...formData }).then(() => {
      router.back();
      router.refresh();
    });
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={onFormSubmit}>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative z-0 col-span-2 w-full mb-6 group">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((f: any) => {
                    return { ...f, name: e.target.value };
                  })
                }
              />
            </div>
            <div className="my-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                email
              </label>
              <input
                type="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="example@gmail.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((f: any) => {
                    return { ...f, email: e.target.value };
                  })
                }
              />
            </div>
            <div className="my-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                telephone number
              </label>
              <input
                type="number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Mac Book Pro"
                required
                value={formData.telephoneNumber}
                onChange={(e) =>
                  setFormData((f: any) => {
                    return { ...f, telephoneNumber: e.target.value };
                  })
                }
              />
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Update{" "}
              {user.roles?.[0]?.roleName === USER_ROLE.VENDOR
                ? "Vendor"
                : "Customer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
