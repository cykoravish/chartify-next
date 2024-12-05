"use client";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          <main>{children}</main>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
