"use client";

import { productApi } from "@/lib/apis/product";
import { reportApi } from "@/lib/apis/report";
import { ModalContext } from "@/lib/contexts/modal";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function DeleteProduct({
  productId,
  userId,
}: {
  productId: number;
  userId?: number;
}) {
  const { showModal } = useContext(ModalContext);
  const deleteProduct = () => {
    if (userId)
      return showModal({
        title: "Delete Product?",
        text: "Tell us about the reason, so we will tell the vendor about it",
        layout: (h: any) => (
          <DeleteForm userId={userId} productId={productId} hideModal={h} />
        ),
      });
    showModal({
      title: "Delete Product?",
      text: "Are You sure from deleting this product?",
      layout: (h: any) => (
        <DeleteForm userId={userId} productId={productId} hideModal={h} />
      ),
    });
  };

  return (
    <button
      onClick={deleteProduct}
      className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500"
    >
      <svg
        fill="none"
        stroke="currentColor"
        className="w-5 h-5"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        ></path>
      </svg>
      <span className="sr-only">remove</span>
    </button>
  );
}

const DeleteForm = ({ hideModal, productId, userId }: any) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const onDelete = () => {
    hideModal();
    productApi.delete(productId).then(() => {
      if (userId) reportApi.sendEmail(userId, message);
      router.refresh();
    });
  };
  return (
    <>
      {userId && (
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Category description..."
        />
      )}
      <div className="mt-4 gap-4 flex">
        <button
          type="button"
          onClick={onDelete}
          className={`inline-flex bg-red-200 hover:bg-red-200 justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-red-900  focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2`}
        >
          Delete
        </button>
        <button
          type="button"
          onClick={hideModal}
          className={`inline-flex bg-blue-100 hover:bg-blue-200 justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-blue-900  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
        >
          Dismiss
        </button>
      </div>
    </>
  );
};
