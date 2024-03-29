import SectionTitle from "@/components/section-title";
import { reportApi } from "@/lib/apis/report";
import AppAnimatedNumber from "@/components/animated-number";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const STATS_NAMES = {
  noOfSales: "Total Sales",
  annualProfit: "Annual Profit",
  annualRevenue: "Annual revenue",
};

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);
  return reportApi
    .summary(user.userId)
    .then(({ data }) => data)
    .catch((e) => console.log(e.response));
};

export default async function Admin() {
  const stats = (await getData()) as any;
  return (
    <>
      <SectionTitle title="Dashboard" />
      <div className="grid grid-cols-3 gap-4 mb-4">
        {Object.keys(stats).map((key: any) => {
          //@ts-ignore
          const statName = STATS_NAMES[key];
          if (key === "annualLoss") return null;
          return (
            <div
              key={key}
              className="shadow-xl justify-center  p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
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
                    <AppAnimatedNumber count={stats[key]} />
                  </div>
                  <div className="text-gray-400"> {statName}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
