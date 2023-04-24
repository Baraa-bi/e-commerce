import Link from "next/link";
import { authApi } from "@/lib/apis/auth";
import { USER_ROLE, User, UserDetails } from "@/lib/types";
import VerifyVendor from "@/components/verify-vendor";

import { Inter } from "next/font/google";
import SectionTitle from "@/components/section-title";
import DeleteUser from "@/components/delete-user";
import { Suspense } from "react";
import Loading from "../loading";
const inter = Inter({ subsets: ["latin"] });

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

export default async function Vendors() {
  const vendors = await getData();
  return (
    <>
      <SectionTitle title="Vendors" />
      <div className="shadow-xl rounded-xl relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                telephone number
              </th>
              <th scope="col" className="px-6 py-3">
                username
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                verify
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((item: UserDetails) => {
              return (
                <tr key={item.userId} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.telephoneNumber}</td>
                  <td className="px-6 py-4">{item.username ?? "-"}</td>
                  <td className="px-6 py-4">
                    {item.isFullyVerified
                      ? "fully-verified"
                      : item.isVerified
                      ? "verified"
                      : "not-verified"}
                  </td>
                  <td className="px-6 py-4">
                    {!item.isVerified ? (
                      <VerifyVendor vendorId={item.userId} />
                    ) : (
                      <button
                        disabled
                        type="button"
                        className="py-2.5 px-2.5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                      >
                        <svg
                          fill="none"
                          className="h-5 w-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                          ></path>
                        </svg>
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/vendors/update-vendor/${item.userId}`}
                      type="button"
                      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        ></path>
                      </svg>
                      <span className="sr-only">edit</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <DeleteUser userId={item.userId} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!vendors.length && (
          <div className="text-lg capitalize text-gray-500 bg-white w-full p-8 h-64 flex flex-col items-center justify-center">
            no data found
          </div>
        )}
      </div>
    </>
  );
}
