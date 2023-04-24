import { ModalProvider } from "@/lib/contexts/modal";
import "./globals.css";
import AppModal from "@/components/app-modal";
import { CartProvider } from "@/lib/contexts/cart";
import ApiInterceptor from "@/components/api-intercepter";
export const metadata = {
  title: "Shoppify",
  description: "Welcome to Shoppify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ModalProvider>
        <CartProvider>
          <body>
            {children}
            <AppModal />
            <ApiInterceptor />
          </body>
        </CartProvider>
      </ModalProvider>
    </html>
  );
}
