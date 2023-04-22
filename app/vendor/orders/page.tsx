import SectionTitle from "@/components/section-title";
import { orderApi } from "@/lib/apis/orders";
import { getUserFromCookie } from "@/lib/auth";
import { Order } from "@/lib/types";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);
  return orderApi
    .ordersByUserId(user.id)
    .then(({ data }) => data)
    .catch((e) => []);
};

export default async function Orders() {
  const orders = await getData();
  return (
    <div>
      <SectionTitle title="Orders" />
      <div className="shadow-xl rounded-xl  relative overflow-x-auto">
        <table className="shadow-xl rounded-xl w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item: Order) => {
              return (
                <tr key={item.id} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.orderDate}</td>
                  <td className="px-6 py-4">{item.orderStatus}</td>
                  <td className="px-6 py-4">${item.totalPrice}</td>
                  <td className="px-6 py-4">{item?.userInfo?.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!orders.length && (
          <div className="text-lg capitalize text-gray-500 bg-white w-full p-8 h-64 flex flex-col items-center justify-center">
            no data found
          </div>
        )}
      </div>
    </div>
  );
}
