import Axios from "axios";

export const request = Axios.create({
  baseURL: APP_BASE_URL,
  headers: {
    pragma: "no-cache",
    Accept: "application/json",
    "Content-Type": "application/json",
    "cache-control": "no-store, no-cache, must-revalidate",
  },
});
