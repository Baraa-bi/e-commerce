"use client";
import { authApi } from "@/lib/apis/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import AppModal from "./app-modal";
import { ModalContext } from "@/lib/contexts/modal";

export default function VerifyVendor({ vendorId }: { vendorId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showModal } = useContext(ModalContext);
  const verifyVendor = () => {
    setLoading(true);
    authApi.verifyVendor(vendorId).then(() => {
      setLoading(false);
      showModal({
        title: "Vendor Updated Successfully",
        text: "The status of the vendor changed successfully",
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
        disabled={loading}
        onClick={verifyVendor}
        className="text-emerald-700 disabled:cursor-default cursor-pointer border border-emerald-700 hover:bg-emerald-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-emerald-500 dark:text-emerald-500 dark:hover:text-white dark:focus:ring-emerald-800 dark:hover:bg-emerald-500"
      >
        {loading ? (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#059669"
            />
          </svg>
        ) : (
          <>
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
          </>
        )}
      </button>
    </>
  );
}
