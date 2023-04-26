"use client";

import { useRef, useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Order, User } from "@/lib/types";
import Button from "./buttont";
import { orderApi } from "@/lib/apis/orders";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import AdminDashboard from "@/app/admin/dashboard/page";

const fromOptions = {
  title: "Select From Date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-gray-200",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "en",
};
const toOptions = {
  title: "Select To Date",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-gray-200",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "en",
};

export default function Filters({ vendors }: { vendors?: Array<User> }) {
  const ref = useRef(null);
  const [showFrom, setShowFrom] = useState<boolean>(false);
  const [showTo, setShowTo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Array<any>>([]);
  const [selectedVendor, setSelectedVendor] = useState({
    userId: null,
    name: "Select Vendor",
  });

  const handleChange = (selectedDate: Date, type: "FROM" | "TO") => {
    console.log(selectedDate);
  };

  const handleFromClose = (state: boolean) => {
    setShowFrom(state);
  };
  const handleToClose = (state: boolean) => {
    setShowTo(state);
  };

  const generateReport = () => {
    setLoading(true);
    return orderApi
      .all({
        initialDate: "2023-04-24",
        finalDate: "2023-04-25",
        vendorId: selectedVendor.userId,
      })
      .then(({ data }) => setOrders(data?.orderList))
      .catch((e) => [])
      .finally(() => setLoading(false));
  };

  const downloadPDF = async () => {
    //@ts-ignore
    const dataUrl = await htmlToImage.toPng(ref.current);

    // download image
    const link = document.createElement("a");
    link.download = "report.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="flex bg-white gap-4">
          <div className="w-full">
            <div>From</div>
            <Datepicker
              show={showFrom}
              options={fromOptions}
              setShow={handleFromClose}
              onChange={(date) => handleChange(date, "FROM")}
            />
          </div>
          <div className="w-full">
            <div>To</div>
            <Datepicker
              show={showTo}
              options={toOptions}
              setShow={handleToClose}
              onChange={(date) => handleChange(date, "TO")}
            />
          </div>
          {vendors?.length && (
            <div className="w-full">
              <div>Vendor</div>
              <ListOfVendors
                vendors={vendors}
                selectedVendor={selectedVendor}
                setSelectedVendor={setSelectedVendor}
              />
            </div>
          )}
        </div>
        <Button
          type="button"
          onClick={generateReport}
          className="mt-8 w-72 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-3 text-center mr-2 mb-2"
        >
          Generate Report
        </Button>
      </div>
      {!!orders.length && (
        <div className="mt-4 rounded-lg bg-white p-8">
          <div ref={ref}>
            <div className="bg-white p-4">
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl">
                Report ID:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-blue-400">
                  #234234
                </span>{" "}
              </h1>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                in this report you can see the orders by the range you selected
                and also by the vendor you had selected, at the bottom you can
                download that report into PDF.
              </p>

              <div className="p-8">
                <Orders orders={orders} />
              </div>
              <div className="flex justify-between items-center">
                <div></div>
                <div>
                  <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    Total Sales {"  "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                      234.44
                    </span>{" "}
                  </h1>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div></div>
                <div>
                  <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    Total Revenue {"  "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-blue-400">
                      234.44
                    </span>{" "}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div></div>
            <div>
              <Button
                type="button"
                onClick={downloadPDF}
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xl px-5 py-3 text-center mr-2 mb-2"
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ListOfVendors({
  vendors,
  selectedVendor,
  setSelectedVendor,
}: {
  vendors: Array<User>;
  selectedVendor: any;
  setSelectedVendor: any;
}) {
  return (
    <div>
      <Listbox value={selectedVendor} onChange={setSelectedVendor}>
        <div className="relative shadow">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-100 py-3 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedVendor.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {vendors.map((vendor) => (
                <Listbox.Option
                  key={vendor.userId}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                    }`
                  }
                  value={vendor}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {vendor.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

function Orders({ orders }: { orders: Array<Order> }) {
  return (
    <div className="m-4">
      <div className="rounded-xl  relative overflow-x-auto">
        <table className="rounded-xl w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
              const user = JSON.parse(item.userInfo) as User;
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
                  <td className="px-6 py-4">{user?.name}</td>
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
