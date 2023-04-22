"use client";
import { authApi } from "@/lib/apis/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import AppModal from "../app-modal";
import { productApi } from "@/lib/apis/product";
import { ModalContext } from "@/lib/contexts/modal";
import { reportApi } from "@/lib/apis/report";

export default function VerifyProduct({
  productId,
  userId,
}: {
  productId: number;
  userId: number;
}) {
  const { showModal } = useContext(ModalContext);
  const router = useRouter();
  const verifyProduct = () => {
    productApi.approve(productId).then(() => {
      reportApi.sendEmail(userId);
      showModal({
        title: "Product Updated Successfully",
        text: "The status of the product changed successfully",
        actions: [
          {
            title: "Ok",
            onPress: (h: any) => {
              router.refresh();
              h();
            },
          },
        ],
      });
    });
  };

  return (
    <>
      <button
        onClick={verifyProduct}
        className="text-emerald-700 cursor-pointer border border-emerald-700 hover:bg-emerald-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-emerald-500 dark:text-emerald-500 dark:hover:text-white dark:focus:ring-emerald-800 dark:hover:bg-emerald-500"
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
        <span className="sr-only">verify</span>
      </button>
    </>
  );
}
