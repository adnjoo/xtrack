import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import MyNavbar from "@/app/components/MyNavbar";
import MyFooter from "@/app/components/MyFooter";
import { APP_NAME } from "@/app/lib/constants";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Track your expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <MyNavbar />
          <main className="min-h-screen">{children}</main>
          <MyFooter />
        </body>
      </html>
    </ClerkProvider>
  );
}
