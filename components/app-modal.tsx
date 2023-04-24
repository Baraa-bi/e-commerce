"use client";

import { ModalContext } from "@/lib/contexts/modal";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useMemo } from "react";

export default function AppModal() {
  const { hideModal, isVisible, title, layout, text, actions } =
    useContext(ModalContext);

  const renderActions = useMemo(() => {
    return actions?.map((item: any, idx: number) => (
      <button
        key={idx}
        type="button"
        onClick={() => item.onPress(hideModal)}
        className={`inline-flex  justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-blue-900  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          item.primary
            ? "bg-blue-100 hover:bg-blue-200"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {item.title}
      </button>
    ));
  }, [actions]);

  return (
    <>
      <Transition appear show={isVisible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <img
                    src="https://i.pinimg.com/originals/12/4d/e3/124de3d1b5e12f1d8fcec1685e634361.gif"
                    className="absolute -z-10"
                  />
                  <div className="mt-2 text-gray-400">{text}</div>

                  {!!layout && <div className="mt-4">{layout(hideModal)}</div>}
                  <div className="mt-4 gap-4 flex">{renderActions}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
