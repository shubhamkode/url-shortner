import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linkify",
  description: "Best URL Shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
