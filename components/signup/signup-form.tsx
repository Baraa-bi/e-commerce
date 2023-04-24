"use client";

import VendorModal from "@/components/vendor-modal";
import { authApi } from "@/lib/apis/auth";
import { ModalContext } from "@/lib/contexts/modal";
import { USER_ROLE, USER_ROLE_NAME, User, UserRole } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import Button from "../buttont";

const INIT_STATE = {
  name: "",
  email: "",
  password: "",
  telephoneNumber: "",
  username: "",
  roles: "",
};

export default function SignupForm({ roles }: { roles: Array<any> }) {
  const [loading, setLoading] = useState(false);
  const { showModal } = useContext(ModalContext);
  const [userRole, setUserRole] = useState(roles?.[0] ?? {});
  const [formData, setFormData] = useState(INIT_STATE);
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const router = useRouter();
  const onRegister = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = { ...formData, roles: [userRole] } as User;
    authApi
      .register(user)
      .then((res) => {
        if (userRole.roleName === USER_ROLE.VENDOR)
          return setVendorModalOpen(true);
        showModal({
          title: "Thank you",
          text: "You are now registered, please login",
          actions: [
            {
              title: "Login now!",
              onPress: (h: any) => {
                h();
                router.push("/login");
              },
            },
          ],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-full flex shadow-3xl first-letter:items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md shadow-2xl w-full space-y-8  bg-white p-12 rounded-2xl">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-400.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-900">
            Register a new account
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="inline-flex rounded-full border shadow-sm overflow-hidden"
            role="group"
          >
            {roles.map((role: UserRole) => {
              if (role.roleName === USER_ROLE.GUEST) return null;
              return (
                <button
                  type="button"
                  key={role.roleId}
                  onClick={() => setUserRole(role)}
                  className={`px-4 py-2 text-sm font-medium border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
                    userRole.roleName === role.roleName
                      ? "bg-blue-100 text-blue-700"
                      : "bg-white text-gray-900"
                  }`}
                >
                  {USER_ROLE_NAME[role.roleName]}
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={onRegister}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block capitalize mb-2 text-sm font-medium text-indigo-900 dark:text-white"
            >
              name
            </label>
            <input
              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Alex"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((f: any) => {
                  return { ...f, name: e.target.value };
                })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block capitalize mb-2 text-sm font-medium text-indigo-900 dark:text-white"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@shoppify.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((f: any) => {
                  return { ...f, email: e.target.value };
                })
              }
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block capitalize mb-2 text-sm font-medium text-indigo-900 dark:text-white"
            >
              telephone Number
            </label>
            <input
              type="text"
              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@shoppify.com"
              required
              value={formData.telephoneNumber}
              onChange={(e) =>
                setFormData((f: any) => {
                  return { ...f, telephoneNumber: e.target.value };
                })
              }
            />
          </div>
          {userRole.roleName !== USER_ROLE.VENDOR && (
            <div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block capitalize mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((f: any) => {
                      return { ...f, password: e.target.value };
                    })
                  }
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3.5 text-center mr-2 mb-2"
          >
            Register
          </Button>
        </form>

        <div className="mx-auto text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Login now
          </Link>
        </div>
        <VendorModal isOpen={vendorModalOpen} setIsOpen={setVendorModalOpen} />
      </div>
    </div>
  );
}
