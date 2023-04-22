import Link from "next/link";
import { authApi } from "@/lib/apis/auth";
import { USER_ROLE, User, UserDetails } from "@/lib/types";
import VerifyVendor from "@/components/verify-vendor";

import { Inter } from "next/font/google";
import SectionTitle from "@/components/section-title";
import DeleteUser from "@/components/delete-user";
const inter = Inter({ subsets: ["latin"] });

const getData = async () => {
  return authApi
    .users()
    .then(({ data }) => {
      return data.filter((user: UserDetails) => {
        const roleName = user.roles?.[0]?.roleName;
        return (
          roleName === USER_ROLE.REGISTERED_USER || roleName === USER_ROLE.GUEST
        );
      });
    })
    .catch((e) => []);
};

export default async function Customers() {
  const customers = await getData();
  return (
    <>
      <SectionTitle title="Customers" />
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
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item: UserDetails) => {
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
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/customers/update-customer/${item.userId}`}
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
        {!customers.length && (
          <div className="text-lg capitalize text-gray-500 bg-white w-full p-8 h-64 flex flex-col items-center justify-center">
            no data found
          </div>
        )}
      </div>
    </>
  );
}
