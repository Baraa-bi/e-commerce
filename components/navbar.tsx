import { getUserFromCookie } from "@/lib/auth";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import Link from "next/link";
import HeaderMenu from "./Menu";
import { User } from "@/lib/types";

export default function Navbar({ user }: { user: User }) {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Shoppify
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <HeaderMenu user={user} />
        </div>
      </div>
    </nav>
  );
}
