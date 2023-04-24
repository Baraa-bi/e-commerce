import Axios from "axios";

export const request = Axios.create({
  headers: {
    pragma: "no-cache",
    Accept: "application/json",
    "Content-Type": "application/json",
    "cache-control": "no-store, no-cache, must-revalidate",
  },
});
