"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
//@ts-ignore
import AnimatedNumber from "react-animated-number";
import SectionTitle from "@/components/section-title";

const inter = Inter({ subsets: ["latin"] });
const data = [
  {
    id: 1,
    title: "Total Sales",
    count: 1234,
  },
  {
    id: 2,
    title: "Annual Profit",
    count: 55,
  }, 
  {
    id: 4,
    title: "Annual revenue",
    count: 354,
  },
];
export default function Admin() {
  return (
    <>
      <SectionTitle title="Dashboard" />
      <div className="grid grid-cols-3 gap-4 mb-4">
        {data.map((item) => {
          return (
            <div className="shadow-xl justify-center  p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-400">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3333 9.33334H28M28 9.33334V20M28 9.33334L17.3333 20L12 14.6667L4 22.6667"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold mt-1 text-gray-900">
                    <AnimatedNumber
                      component="text"
                      value={item.count}
                      style={{
                        color: "black",
                        transition: "0.8s ease-out",
                        transitionProperty: "background-color, color, opacity",
                      }}
                      duration={600}
                      formatValue={(n: string) => parseInt(n ?? 0)}
                    />
                  </div>
                  <div className="text-gray-400"> {item.title}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
