import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { APP_NAME } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: "Track your weekly progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='antialiased'
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
