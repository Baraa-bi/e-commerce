"use client";

import { request } from "@/lib/apis";
import { COOKIE_NAME } from "@/lib/constants";
import { ModalContext } from "@/lib/contexts/modal";
import { useContext, useEffect } from "react";
import cookie from "react-cookies";

export default function ApiInterceptor() {
  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    const requestInterceptor = request.interceptors.request.use(
      async (config: any) => {
        const token = cookie.load(COOKIE_NAME);
        if (token)
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        return config;
      }
    );

    const responseInterceptor = request.interceptors.response.use(
      (response: any) => {
        return Promise.resolve(response);
      },
      async (error: any) => {
        console.log(error?.response?.data);
        showModal({
          title: "Something went wrong",
          text: `${error?.response?.data}`,
          actions: [
            {
              title: "Ok",
              onPress: (h: any) => h(),
            },
          ],
        });
        return Promise.reject(error);
      }
    );

    return () => {
      request.interceptors.request.eject(requestInterceptor);
      request.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return null;
}
