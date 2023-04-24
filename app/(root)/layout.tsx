import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const getData = async () => {
  const user = await getUserFromCookie(cookies() as RequestCookies);
  return user;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getData();
  return (
    <html lang="en">
      <body>
        <Navbar user={user} />
        <div className="m-12 bg-white rounded-3xl shadow p-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
