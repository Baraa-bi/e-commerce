"use client";
import cookie from "react-cookies";
import { useRouter } from "next/navigation";
import { COOKIE_NAME } from "@/lib/constants";

export default function Logout({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const logout = () => {
    cookie.remove(COOKIE_NAME, { path: "/" });
    router.replace("/login");
  };
  return (
    <div className="cursor-pointer" onClick={logout}>
      {children}
    </div>
  );
}
