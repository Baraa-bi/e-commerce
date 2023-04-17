"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
//@ts-ignore
import AnimatedNumber from "react-animated-number";

const inter = Inter({ subsets: ["latin"] });
const data = [
  {
    id: 1,
    title: "Total Orders",
    count: 12,
  },
  {
    id: 2,
    title: "Total Revenue",
    count: 55,
  },
  {
    id: 3,
    title: "Sales by product vendor",
    count: 414,
  },
  {
    id: 4,
    title: "Total Customers",
    count: 354,
  },
  {
    id: 5,
    title: "Total Vendors",
    count: 344,
  },
  {
    id: 6,
    title: "Sales by product vendor",
    count: 445,
  },
];
export default function Admin() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className=" justify-center  p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <AnimatedNumber
              component="text"
              value={item.count}
              style={{
                color: "black",
                transition: "0.8s ease-out",
                fontSize: 40,
                transitionProperty: "background-color, color, opacity",
              }}
              duration={600}
              formatValue={(n: string) => parseInt(n)}
            />
            <p className="text-2xl text-gray-400 dark:text-gray-400">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
