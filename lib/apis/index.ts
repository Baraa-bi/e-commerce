import Axios from "axios";
import { API_BASE_URL } from "../constants";

export const request = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    pragma: "no-cache",
    Accept: "application/json",
    "Content-Type": "application/json",
    "cache-control": "no-store, no-cache, must-revalidate",
  },
});
