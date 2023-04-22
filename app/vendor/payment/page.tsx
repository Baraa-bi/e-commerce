"use client";
import { authApi } from "@/lib/apis/auth";
import { paymentApi } from "@/lib/apis/payment";
import { getUser } from "@/lib/auth";
import { COOKIE_NAME, VERNDOR_REGISTRATION_FEE } from "@/lib/constants";
import { ModalContext } from "@/lib/contexts/modal";
import { Payment } from "@/lib/types";
import cookie from "react-cookies";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useMemo, useState } from "react";

//@ts-ignore
import AnimatedNumber from "react-animated-number";

const INIT_STATE = {
  cardNumber: "",
  nameOnCard: "",
  cardExpiry: "",
  ccv: "",
  amount: VERNDOR_REGISTRATION_FEE,
};
const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;

export default function Payment() {
  const router = useRouter();
  const { showModal } = useContext(ModalContext);
  const [formData, setFormData] = useState<Payment>(INIT_STATE);

  const cardNumberIcon = useMemo(() => {
    if (visaRegEx.test(formData.cardNumber)) return <VisaCardIcon />;
    if (mastercardRegEx.test(formData.cardNumber)) return <MasterCardIcon />;
    return <GenericCardIcon />;
  }, [formData.cardNumber]);

  const onSubmitPayment = (e: FormEvent) => {
    e.preventDefault();
    const user = getUser();
    paymentApi
      .vendorRegistrationFee(user?.id, formData)
      .then(() => {
        authApi.fullyVerifyVendor(user.id).then(({ data }) => {
          cookie.save(COOKIE_NAME, data, { path: "/" });
          router.push("/vendor/products/add-product");
        });
      })
      .catch((e) => {
        showModal({
          text: e.response.data,
          actions: [
            {
              title: "OK",
              onPress: (h: any) => {
                h();
              },
            },
          ],
        });
      });
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h1 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-5xl">
        You need to pay{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-blue-400">
          $
          <AnimatedNumber
            component="text"
            duration={1000}
            value={VERNDOR_REGISTRATION_FEE}
            formatValue={(n: string) => parseInt(n ?? 0).toLocaleString()}
          />
        </span>
        <br />
        in order to manage your products
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Our system requires from you as a vendor to pay $20,000 USD as a down
        payment in order to be verified on our system and be able to manage your
        products.
      </p>

      <form
        onSubmit={onSubmitPayment}
        className="flex flex-wrap gap-3 w-full mt-5"
      >
        <label className="relative w-full flex flex-col">
          <span className="font-bold mb-3 capitalize">Card holder name</span>
          <input
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
            type="text"
            required
            name="card_holder_name"
            max={16}
            placeholder="Alex M "
            value={formData.nameOnCard}
            onChange={(e) =>
              setFormData((f) => {
                return { ...f, nameOnCard: e.target.value };
              })
            }
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </label>
        <label className="relative w-full flex flex-col">
          <span className="font-bold mb-3">Card number</span>
          <input
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
            type="text"
            required
            name="card_number"
            maxLength={16}
            placeholder="0000 0000 0000"
            value={formData.cardNumber}
            onChange={(e) =>
              setFormData((f) => {
                return { ...f, cardNumber: e.target.value };
              })
            }
          />
          {cardNumberIcon}
        </label>

        <label className="relative flex-1 flex flex-col">
          <span className="font-bold mb-3">Expire date</span>
          <input
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
            type="text"
            required
            name="expire_date"
            placeholder="MM/YY"
            value={formData.cardExpiry}
            onChange={(e) =>
              setFormData((f) => {
                return { ...f, cardExpiry: e.target.value };
              })
            }
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </label>

        <label className="relative flex-1 flex flex-col">
          <span className="font-bold flex items-center gap-3 mb-3">
            CVC/CVV
            <span className="relative group">
              <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white">
                {" "}
                Hey ceci est une infobulle !
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </span>
          <input
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300"
            type="number"
            name="card_cvc"
            max={999}
            value={formData.ccv}
            onChange={(e) =>
              setFormData((f) => {
                return { ...f, ccv: e.target.value };
              })
            }
            placeholder="&bull;&bull;&bull;"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </label>
        <div className="mt-8 w-full">
          <button
            type="submit"
            className="text-white text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
            Make a Payment
          </button>
        </div>
      </form>
    </div>
  );
}

const VisaCardIcon = () => {
  return (
    <svg
      enable-background="new 0 0 780 500"
      height="500"
      viewBox="0 0 780 500"
      width="780"
      className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m40 0h700c22.092 0 40 17.909 40 40v420c0 22.092-17.908 40-40 40h-700c-22.091 0-40-17.908-40-40v-420c0-22.091 17.909-40 40-40z"
        fill="#0e4595"
      />
      <path
        d="m293.2 348.73 33.361-195.76h53.36l-33.385 195.76zm246.11-191.54c-10.57-3.966-27.137-8.222-47.822-8.222-52.725 0-89.865 26.55-90.18 64.603-.299 28.13 26.514 43.822 46.752 53.186 20.771 9.595 27.752 15.714 27.654 24.283-.131 13.121-16.586 19.116-31.922 19.116-21.357 0-32.703-2.967-50.227-10.276l-6.876-3.11-7.489 43.823c12.463 5.464 35.51 10.198 59.438 10.443 56.09 0 92.5-26.246 92.916-66.882.199-22.269-14.016-39.216-44.801-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.668-16.839 30.557-16.839 17.449-.27 30.09 3.535 39.938 7.5l4.781 2.26zm137.31-4.223h-41.232c-12.773 0-22.332 3.487-27.941 16.234l-79.244 179.4h56.031s9.16-24.123 11.232-29.418c6.125 0 60.555.084 68.338.084 1.596 6.853 6.49 29.334 6.49 29.334h49.514l-43.188-195.64zm-65.418 126.41c4.412-11.279 21.26-54.723 21.26-54.723-.316.522 4.379-11.334 7.074-18.684l3.605 16.879s10.219 46.729 12.354 56.528zm-363.3-126.41-52.24 133.5-5.567-27.13c-9.725-31.273-40.025-65.155-73.898-82.118l47.766 171.2 56.456-.064 84.004-195.39h-56.521"
        fill="#fff"
      />
      <path
        d="m146.92 152.96h-86.041l-.681 4.073c66.938 16.204 111.23 55.363 129.62 102.41l-18.71-89.96c-3.23-12.395-12.597-16.094-24.186-16.527"
        fill="#f2ae14"
      />
    </svg>
  );
};

const MasterCardIcon = () => {
  return (
    <svg
      enable-background="new 0 0 780 500"
      height="500"
      viewBox="0 0 780 500"
      width="780"
      className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m0 0h780v500h-780z" fill="#16366f" />
      <path
        d="m449.01 250c0 99.143-80.37 179.5-179.51 179.5s-179.5-80.361-179.5-179.5c0-99.133 80.362-179.5 179.5-179.5 99.137 0 179.51 80.37 179.51 179.5"
        fill="#d9222a"
      />
      <path
        d="m510.49 70.496c-46.38 0-88.643 17.596-120.5 46.466-6.49 5.889-12.548 12.237-18.125 18.996h36.266c4.966 6.037 9.536 12.388 13.685 19.013h-63.635c-3.827 6.121-7.28 12.469-10.341 19.008h84.312c2.893 6.185 5.431 12.53 7.6 19.004h-99.512c-2.091 6.235-3.832 12.581-5.217 19.009h109.94c2.689 12.49 4.044 25.231 4.041 38.008 0 19.934-3.254 39.113-9.254 57.02h-99.512c2.164 6.479 4.7 12.825 7.595 19.01h84.317c-3.064 6.54-6.52 12.889-10.347 19.013h-63.625c4.154 6.629 8.73 12.979 13.685 18.996h36.258c-5.57 6.772-11.63 13.126-18.13 19.012 31.86 28.867 74.118 46.454 120.5 46.454 99.138-.001 179.51-80.362 179.51-179.5 0-99.13-80.37-179.5-179.51-179.5"
        fill="#ee9f2d"
      />
      <path d="m666.08 350.06c0-3.201 2.592-5.801 5.796-5.801s5.796 2.6 5.796 5.801c0 3.199-2.592 5.799-5.796 5.799-3.202-.001-5.797-2.598-5.796-5.799zm5.796 4.408c2.435-.001 4.407-1.975 4.408-4.408 0-2.433-1.972-4.404-4.404-4.404h-.004c-2.429-.004-4.4 1.963-4.404 4.392v.013c-.003 2.432 1.967 4.406 4.399 4.408.001-.001.003-.001.005-.001zm-.783-1.86h-1.188v-5.094h2.149c.45 0 .908 0 1.305.254.413.278.646.77.646 1.278 0 .57-.337 1.104-.883 1.312l.937 2.25h-1.315l-.78-2.016h-.87v2.016zm0-2.89h.658c.246 0 .504.02.725-.1.196-.125.296-.359.296-.584 0-.195-.12-.42-.288-.516-.207-.131-.536-.101-.758-.101h-.633zm-443.5-80.063c-2.045-.237-2.945-.301-4.35-.301-11.045 0-16.637 3.789-16.637 11.268 0 4.611 2.73 7.546 6.987 7.546 7.938 0 13.659-7.56 14-18.513zm14.171 32.996h-16.146l.371-7.676c-4.925 6.067-11.496 8.95-20.425 8.95-10.562 0-17.804-8.25-17.804-20.229 0-18.024 12.596-28.54 34.217-28.54 2.208 0 5.041.2 7.941.569.605-2.441.763-3.486.763-4.8 0-4.908-3.396-6.738-12.5-6.738-9.533-.108-17.396 2.271-20.625 3.334.204-1.23 2.7-16.658 2.7-16.658 9.712-2.846 16.117-3.917 23.325-3.917 16.733 0 25.596 7.512 25.58 21.712.032 3.805-.597 8.5-1.58 14.671-1.692 10.731-5.32 33.718-5.817 39.322zm-62.158 0h-19.488l11.163-69.997-24.925 69.997h-13.28l-1.64-69.597-11.734 69.597h-18.242l15.238-91.054h28.02l1.7 50.966 17.092-50.966h31.167zm354.98-32.996c-2.037-.237-2.942-.301-4.342-.301-11.041 0-16.634 3.789-16.634 11.268 0 4.611 2.726 7.546 6.983 7.546 7.939 0 13.664-7.56 13.993-18.513zm14.183 32.996h-16.145l.365-7.676c-4.925 6.067-11.5 8.95-20.42 8.95-10.566 0-17.8-8.25-17.8-20.229 0-18.024 12.587-28.54 34.212-28.54 2.208 0 5.037.2 7.934.569.604-2.441.763-3.486.763-4.8 0-4.908-3.392-6.738-12.496-6.738-9.533-.108-17.388 2.271-20.63 3.334.205-1.23 2.709-16.658 2.709-16.658 9.713-2.846 16.113-3.917 23.312-3.917 16.741 0 25.604 7.512 25.588 21.712.032 3.805-.597 8.5-1.58 14.671-1.682 10.731-5.32 33.718-5.812 39.322zm-220.39-1.125c-5.334 1.68-9.492 2.399-14 2.399-9.963 0-15.4-5.725-15.4-16.267-.142-3.27 1.433-11.879 2.67-19.737 1.125-6.917 8.45-50.53 8.45-50.53h19.371l-2.262 11.209h11.7l-2.643 17.796h-11.742c-2.25 14.083-5.454 31.625-5.491 33.95 0 3.817 2.037 5.483 6.67 5.483 2.221 0 3.941-.226 5.255-.7zm59.391-.6c-6.654 2.033-13.075 3.017-19.879 3-21.683-.021-32.987-11.346-32.987-33.032 0-25.313 14.38-43.947 33.9-43.947 15.97 0 26.17 10.433 26.17 26.796 0 5.429-.7 10.729-2.387 18.212h-38.575c-1.304 10.742 5.57 15.217 16.837 15.217 6.935 0 13.188-1.43 20.142-4.663zm-10.887-43.9c.107-1.543 2.054-13.217-9.013-13.217-6.171 0-10.583 4.704-12.38 13.217zm-123.42-5.017c0 9.367 4.541 15.825 14.841 20.676 7.892 3.709 9.113 4.809 9.113 8.17 0 4.617-3.48 6.7-11.192 6.7-5.812 0-11.22-.907-17.458-2.92 0 0-2.563 16.32-2.68 17.101 4.43.966 8.38 1.861 20.28 2.19 20.562 0 30.058-7.829 30.058-24.75 0-10.175-3.975-16.146-13.737-20.633-8.171-3.75-9.109-4.588-9.109-8.046 0-4.004 3.238-6.046 9.538-6.046 3.825 0 9.05.408 14 1.113l2.775-17.175c-5.046-.8-12.696-1.442-17.15-1.442-21.8 0-29.346 11.387-29.279 25.062m229.09-23.116c5.413 0 10.459 1.42 17.413 4.92l3.187-19.762c-2.854-1.12-12.904-7.7-21.416-7.7-13.042 0-24.066 6.47-31.82 17.15-11.31-3.746-15.959 3.825-21.659 11.367l-5.062 1.179c.383-2.483.73-4.95.613-7.446h-17.896c-2.445 22.917-6.779 46.13-10.171 69.075l-.884 4.976h19.496c3.254-21.143 5.038-34.681 6.121-43.842l7.342-4.084c1.096-4.08 4.529-5.458 11.416-5.292-.926 5.008-1.389 10.09-1.383 15.184 0 24.225 13.071 39.308 34.05 39.308 5.404 0 10.042-.712 17.221-2.657l3.431-20.76c-6.46 3.18-11.761 4.676-16.561 4.676-11.328 0-18.183-8.362-18.183-22.184-.001-20.05 10.195-34.108 24.745-34.108" />
      <path
        d="m185.21 297.24h-19.491l11.17-69.988-24.925 69.988h-13.282l-1.642-69.588-11.733 69.588h-18.243l15.238-91.042h28.02l.788 56.362 18.904-56.362h30.267z"
        fill="#fff"
      />
      <path d="m647.52 211.6-4.319 26.308c-5.33-7.012-11.054-12.087-18.612-12.087-9.834 0-18.784 7.454-24.642 18.425-8.158-1.692-16.597-4.563-16.597-4.563l-.004.067c.658-6.133.92-9.875.862-11.146h-17.9c-2.437 22.917-6.77 46.13-10.157 69.075l-.893 4.976h19.492c2.633-17.097 4.65-31.293 6.133-42.551 6.659-6.017 9.992-11.267 16.721-10.917-2.979 7.206-4.725 15.504-4.725 24.017 0 18.513 9.367 30.725 23.534 30.725 7.141 0 12.62-2.462 17.966-8.17l-.912 6.884h18.433l14.842-91.043zm-24.37 73.942c-6.634 0-9.983-4.909-9.983-14.597 0-14.553 6.271-24.875 15.112-24.875 6.695 0 10.32 5.104 10.32 14.508.001 14.681-6.369 24.964-15.449 24.964z" />
      <path
        d="m233.19 264.26c-2.042-.236-2.946-.3-4.346-.3-11.046 0-16.634 3.788-16.634 11.267 0 4.604 2.73 7.547 6.98 7.547 7.945-.001 13.666-7.559 14-18.514zm14.179 32.984h-16.146l.367-7.663c-4.921 6.054-11.5 8.95-20.421 8.95-10.567 0-17.804-8.25-17.804-20.229 0-18.032 12.591-28.542 34.216-28.542 2.209 0 5.042.2 7.938.571.604-2.442.762-3.487.762-4.808 0-4.908-3.391-6.73-12.496-6.73-9.537-.108-17.395 2.272-20.629 3.322.204-1.226 2.7-16.638 2.7-16.638 9.709-2.858 16.121-3.93 23.321-3.93 16.738 0 25.604 7.518 25.588 21.705.029 3.82-.605 8.512-1.584 14.675-1.687 10.725-5.32 33.725-5.812 39.317zm261.38-88.592-3.192 19.767c-6.95-3.496-12-4.921-17.407-4.921-14.551 0-24.75 14.058-24.75 34.107 0 13.821 6.857 22.181 18.183 22.181 4.8 0 10.096-1.492 16.554-4.677l-3.42 20.75c-7.184 1.959-11.816 2.672-17.226 2.672-20.976 0-34.05-15.084-34.05-39.309 0-32.55 18.059-55.3 43.888-55.3 8.507.001 18.562 3.609 21.42 4.73m31.442 55.608c-2.041-.236-2.941-.3-4.346-.3-11.042 0-16.634 3.788-16.634 11.267 0 4.604 2.729 7.547 6.984 7.547 7.937-.001 13.662-7.559 13.996-18.514zm14.179 32.984h-16.15l.37-7.663c-4.924 6.054-11.5 8.95-20.42 8.95-10.563 0-17.804-8.25-17.804-20.229 0-18.032 12.595-28.542 34.212-28.542 2.213 0 5.042.2 7.941.571.601-2.442.763-3.487.763-4.808 0-4.908-3.392-6.73-12.496-6.73-9.533-.108-17.396 2.272-20.629 3.322.204-1.226 2.704-16.638 2.704-16.638 9.709-2.858 16.116-3.93 23.316-3.93 16.742 0 25.604 7.518 25.583 21.705.034 3.82-.595 8.512-1.579 14.675-1.682 10.725-5.324 33.725-5.811 39.317zm-220.39-1.122c-5.338 1.68-9.496 2.409-14 2.409-9.963 0-15.4-5.726-15.4-16.266-.138-3.281 1.437-11.881 2.675-19.738 1.12-6.926 8.446-50.533 8.446-50.533h19.367l-2.259 11.212h9.942l-2.646 17.788h-9.975c-2.25 14.091-5.463 31.619-5.496 33.949 0 3.83 2.042 5.483 6.671 5.483 2.22 0 3.938-.217 5.254-.692zm59.392-.591c-6.65 2.033-13.08 3.013-19.88 3-21.684-.021-32.987-11.346-32.987-33.033 0-25.321 14.38-43.95 33.9-43.95 15.97 0 26.17 10.429 26.17 26.8 0 5.433-.7 10.733-2.382 18.212h-38.575c-1.306 10.741 5.569 15.221 16.837 15.221 6.93 0 13.188-1.434 20.137-4.676zm-10.892-43.912c.117-1.538 2.059-13.217-9.013-13.217-6.166 0-10.579 4.717-12.375 13.217zm-123.42-5.004c0 9.365 4.542 15.816 14.842 20.675 7.891 3.708 9.112 4.812 9.112 8.17 0 4.617-3.483 6.7-11.187 6.7-5.817 0-11.225-.908-17.467-2.92 0 0-2.554 16.32-2.67 17.1 4.42.967 8.374 1.85 20.274 2.191 20.567 0 30.059-7.829 30.059-24.746 0-10.18-3.971-16.15-13.738-20.637-8.167-3.758-9.112-4.583-9.112-8.046 0-4 3.245-6.058 9.541-6.058 3.821 0 9.046.42 14.004 1.125l2.771-17.18c-5.041-.8-12.691-1.441-17.146-1.441-21.804 0-29.345 11.379-29.283 25.067m398.45 50.629h-18.437l.917-6.893c-5.347 5.717-10.825 8.18-17.967 8.18-14.168 0-23.53-12.213-23.53-30.725 0-24.63 14.521-45.393 31.709-45.393 7.558 0 13.28 3.088 18.604 10.096l4.325-26.308h19.221zm-28.745-17.109c9.075 0 15.45-10.283 15.45-24.953 0-9.405-3.63-14.509-10.325-14.509-8.838 0-15.116 10.317-15.116 24.875-.001 9.686 3.357 14.587 9.991 14.587zm-56.843-56.929c-2.439 22.917-6.773 46.13-10.162 69.063l-.891 4.975h19.491c6.971-45.275 8.658-54.117 19.588-53.009 1.742-9.266 4.982-17.383 7.399-21.479-8.163-1.7-12.721 2.913-18.688 11.675.471-3.787 1.334-7.466 1.163-11.225zm-160.42 0c-2.446 22.917-6.78 46.13-10.167 69.063l-.887 4.975h19.5c6.962-45.275 8.646-54.117 19.569-53.009 1.75-9.266 4.992-17.383 7.4-21.479-8.154-1.7-12.716 2.913-18.678 11.675.47-3.787 1.325-7.466 1.162-11.225zm254.57 68.242c0-3.214 2.596-5.8 5.796-5.8 3.197-.003 5.792 2.587 5.795 5.785v.015c-.001 3.2-2.595 5.794-5.795 5.796-3.2-.002-5.794-2.596-5.796-5.796zm5.796 4.404c2.432.001 4.403-1.97 4.403-4.401v-.002c.003-2.433-1.968-4.406-4.399-4.408h-.004c-2.435.001-4.408 1.974-4.409 4.408.003 2.432 1.976 4.403 4.409 4.403zm-.784-1.87h-1.188v-5.084h2.154c.446 0 .908.008 1.296.254.416.283.654.767.654 1.274 0 .575-.338 1.113-.888 1.317l.941 2.236h-1.319l-.78-2.008h-.87v2.008zm0-2.88h.654c.245 0 .513.018.729-.1.195-.125.295-.361.295-.587-.009-.21-.115-.404-.287-.524-.204-.117-.542-.085-.763-.085h-.629v1.296z"
        fill="#fff"
      />
    </svg>
  );
};

const GenericCardIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
};
