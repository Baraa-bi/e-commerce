"use client";

import { orderApi } from "@/lib/apis/orders";
import { ModalContext } from "@/lib/contexts/modal";
import { ShoppingCart, User } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

export default function Checkout({
  user,
  shoppingCart,
}: {
  user: User;
  shoppingCart: ShoppingCart;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showModal } = useContext(ModalContext);
  const [formData, setFormData] = useState<any>({
    paymentInfoDTO: {
      cardNumber: "",
      nameOnCard: "",
      cardExpiry: "",
      ccv: "",
    },
    ...(user
      ? { userId: user.userId }
      : {
          userInfo: {
            name: "",
            email: "",
            telephoneNumber: "",
          },
        }),
  });

  const updateCardInfoValue = (key: string, value: string) => {
    setFormData((f: any) => {
      const paymentInfoDTO = { ...f.paymentInfoDTO } as any;
      paymentInfoDTO[key] = value;
      return { ...f, paymentInfoDTO };
    });
  };

  const updateUserInfo = (key: string, value: string) => {
    setFormData((f: any) => {
      const userInfo = { ...f.userInfo } as any;
      userInfo[key] = value;
      return { ...f, userInfo };
    });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    orderApi
      .placeOrder(formData)
      .then(() => {
        showModal({
          title: "Your Order Placed Successfully",
          text: "Thank you, your order has been placed",
          actions: [
            {
              title: "Go To My Orders",
              onPress: (h: any) => {
                h();
                router.push("/orders");
              },
            },
          ],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!shoppingCart?.cartLines?.length)
    return (
      <>
        <div className="flex h-full flex-col items-center justify-center">
          <div className="mb-3 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-blue-400">
            No Cart items..!
          </div>
          <h1 className="mb-8 text-center text-lg text-gray-400 dark:text-white md:text-2xl lg:text-2xl">
            Please add some product in the cart to view
          </h1>
          <div>
            <Link
              href="/"
              className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-3.5 text-center mr-2 mb-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );

  return (
    <form onSubmit={onFormSubmit}>
      {" "}
      <div className="mt-10 bg-gray-100 shadow-lg border rounded-lg  px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-400">
          Complete your order by providing your payment details.
        </p>
        {!user && (
          <>
            {" "}
            <div className="flex gap-2">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your.email@gmail.com"
                    onChange={(e) => updateUserInfo("name", e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Telephone Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="number"
                    name="number"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+1 641 123 1233"
                    onChange={(e) =>
                      updateUserInfo("telephoneNumber", e.target.value)
                    }
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => updateUserInfo("email", e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
        <label
          htmlFor="card-holder"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Card Holder
        </label>
        <div className="relative">
          <input
            type="text"
            id="card-holder"
            name="card-holder"
            maxLength={30}
            onChange={(e) => {
              updateCardInfoValue("nameOnCard", e.target.value);
            }}
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your full name here"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
              />
            </svg>
          </div>
        </div>
        <label
          htmlFor="card-no"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Card Details
        </label>
        <div className="flex">
          <div className="relative w-7/12 flex-shrink-0">
            <input
              type="text"
              id="card-no"
              name="card-no"
              maxLength={16}
              className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              onChange={(e) => {
                updateCardInfoValue("cardNumber", e.target.value);
              }}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
              </svg>
            </div>
          </div>
          <input
            type="text"
            name="credit-expiry"
            className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="MM/YY"
            maxLength={4}
            onChange={(e) => {
              updateCardInfoValue("cardExpiry", e.target.value);
            }}
          />
          <input
            type="text"
            maxLength={3}
            name="credit-cvc"
            className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="CVC"
            onChange={(e) => {
              updateCardInfoValue("ccv", e.target.value);
            }}
          />
        </div>
        <label
          htmlFor="billing-address"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Billing Address
        </label>
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-shrink-0 sm:w-7/12">
            <input
              type="text"
              id="billing-address"
              name="billing-address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Street Address"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img
                className="h-4 w-4 object-contain"
                src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                alt=""
              />
            </div>
          </div>
          <select
            name="billing-state"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="State">State</option>
            <option value="State">Iowa</option>
          </select>
          <input
            type="text"
            name="billing-zip"
            maxLength={5}
            className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="ZIP"
          />
        </div>

        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">
              $ ${parseFloat(`${shoppingCart.totalPrice}`).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            ${parseFloat(`${shoppingCart.totalPrice}`).toFixed(2)}
          </p>
        </div>
        <button
          type="submit"
          loading={loading}
          className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3.5 font-medium text-white"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}
