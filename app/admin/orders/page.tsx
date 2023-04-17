import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Orders() {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Category
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
            {data.map((item) => {
              return (
                <tr key={item.id} className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4">{item.customer}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

const data = [
  {
    id: 21,
    name: "Macbook pro M2",
    category: "Laptops",
    price: 3000,
    customer: "Baraa",
  },
  {
    id: 25,
    name: "Macbook pro M2",
    category: "Laptops",
    price: 3000,
    customer: "Godwin",
  },
  {
    id: 23,
    name: "Macbook pro M2",
    category: "Laptops",
    price: 3000,
    customer: "Godwin",
  },
  {
    id: 13,
    name: "Macbook pro M2",
    category: "Laptops",
    price: 3000,
    customer: "Baraa",
  },
  {
    id: 8,
    name: "Macbook pro M2",
    category: "Laptops",
    price: 3000,
    customer: "Godwin",
  },
  {
    id: 9,
    name: "Macbook pro M2",
    category: "Laptops",
    price: 3000,
    customer: "Godwin",
  },
];
