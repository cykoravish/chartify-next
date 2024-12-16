"use client";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import LoadingPage from "@/components/LoadingPage";
import { Toaster as Tos } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Ensures the component only mounts on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <html lang="en">
        <body>
          <div>
            <LoadingPage />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Chartify - Alternative to chartable</title>
      </head>
      <body className="font-serif bg-gradient-to-br from-purple-50 to-green-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Suspense fallback={<LoadingPage />}>
              <Navbar />
            </Suspense>
            <main>{children}</main>
            <Tos />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
