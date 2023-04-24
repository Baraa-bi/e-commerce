import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./lib/constants";
import { USER_ROLE, User } from "./lib/types";
const PUBLIC_FILE = /\.(.*)$/;

const verifyJWT = async (jwt: string) => {
  const user: any = decodeJwt(jwt);
  return user as User;
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(COOKIE_NAME as string);

  if (!jwt) {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    const user = await verifyJWT(jwt.value);

    const role = user.roles as any;

    if (pathname.startsWith("/admin") && !role.includes(USER_ROLE.ADMIN)) {
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }

    if (pathname.startsWith("/vendor") && !role.includes(USER_ROLE.VENDOR)) {
      req.nextUrl.pathname = "/login";
      return NextResponse.redirect(req.nextUrl);
    }

    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
}
