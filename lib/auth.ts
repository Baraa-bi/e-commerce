import { JWTPayload, decodeJwt } from "jose";
import {
  RequestCookie,
  RequestCookies,
} from "next/dist/server/web/spec-extension/cookies";
import { COOKIE_NAME } from "./constants";
import { User } from "./types";
import cookie from "react-cookies";
export const getUserFromCookie = async (cookies: RequestCookies) => {
  let user = null as any;
  const cookie = (await cookies.get(COOKIE_NAME as string)) as RequestCookie;
  try {
    user = await decodeJwt(cookie.value as string);
  } catch (e) {
    console.log(cookie);
    user = null;
  }
  return user as User;
};

export const getUser = async () => {
  let user = null as any;
  const token = await cookie.load(COOKIE_NAME);
  if (token) user = await decodeJwt(token as string);
  return user as User;
};
