import Axios from "axios";
import { API_BASE_URL, COOKIE_NAME } from "../constants";
import cookie from "react-cookies";

export const request = Axios.create({ 
  headers: {
    pragma: "no-cache",
    Accept: "application/json",
    "Content-Type": "application/json",
    "cache-control": "no-store, no-cache, must-revalidate",
  },
});

const requestInterceptor = request.interceptors.request.use(
  async (config: any) => {
    const token = cookie.load(COOKIE_NAME);
    if (token)
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  }
);

const responseInterceptor = request.interceptors.response.use(
  (response: any) => {
    return Promise.resolve(response);
  },
  async (error: any) => {
    return Promise.reject(error);
  }
);
