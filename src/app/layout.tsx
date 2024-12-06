"use client"
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

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
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Chartify - Alternative to chartable</title>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
            </Suspense>
            <main>{children}</main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
