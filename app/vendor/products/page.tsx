import Link from "next/link";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { Product, User } from "@/lib/types";
import { productApi } from "@/lib/apis/product";
import SectionTitle from "@/components/section-title";
import DeleteProduct from "@/components/product/delete-product";

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);
  const products = (await productApi
    .allByUserId(user.id)
    .then(({ data }) => data)
    .catch((e) => [])) as Array<Product>;
  return { user, products };
};

export default async function Products() {
  const { user, products } = await getData();
  return (
    <>
      <SectionTitle title="Products">
        <Link
          href={
            user.fullyVerified
              ? "/vendor/products/add-product"
              : "/vendor/payment"
          }
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add Product
        </Link>
      </SectionTitle>
      <div className="relative shadow-xl rounded-xl overflow-x-auto">
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
            {products.map((item) => {
              return (
                <tr key={item.productId} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.productName}
                  </th>
                  <td className="px-6 py-4">{item?.category?.name}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">
                    <img
                      className="rounded-full w-12 h-12 object-contain bg-gray-100 overflow-hidden p-1"
                      src={item.imageUrl}
                    />
                  </td>
                  <td className="px-6 py-4">
                    {item.verified ? "verified" : "not-verified"}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/vendor/products/update-product/${item.productId}`}
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
                    <DeleteProduct productId={item.productId} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
