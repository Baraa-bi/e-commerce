

import Logout from "@/components/logout";
import { getUserFromCookie } from "@/lib/auth";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { ReactNode } from "react";

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);
  return user;
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getData();
  return (
    <div className="bg-gradient-to-r from-sky-100 via-gray-300 to-pink-100 h-screen w-screen candy-mesh p-5">
      <>
        <aside
          id="default-sidebar"
          className="fixed top-5 bottom-10 left-5 rounded-2xl overflow-hidden shadow z-40 w-64 transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li className="flex py-4 first:pt-0 last:pb-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  alt=""
                />
                <div className="ml-3 overflow-hidden">
                  <p className="uppercase text-sm font-medium text-slate-900">
                    {user.name}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
              </li>
              <li>
                <Link
                  href={"/admin/dashboard"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500  transition duration-75 dark:text-gray-400 group-hover:text-indigo-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/admin/categories"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500  transition duration-75 dark:text-gray-400 group-hover:text-indigo-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Categories
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/admin/vendors"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500  transition duration-75 dark:text-gray-400 group-hover:text-indigo-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Vendors</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/admin/customers"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500  transition duration-75 dark:text-gray-400 group-hover:text-indigo-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Customers
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/admin/products"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500  transition duration-75 dark:text-gray-400 group-hover:text-indigo-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/admin/orders"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-gray-700"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500  transition duration-75 dark:text-gray-400 group-hover:text-indigo-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                </Link>
              </li>
              <li>
                <Logout>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-indigo-200 hover:text-indigo-900 dark:hover:bg-gray-700">
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500  transition duration-75 dark:text-gray-400 group-hover:text-indigo-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Sign out
                    </span>
                  </div>
                </Logout>
              </li>
            </ul>
          </div>
        </aside>
      </>
      <div className="p-2 sm:ml-72">
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
