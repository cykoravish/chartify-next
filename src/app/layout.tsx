import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/AuthProvider";
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          <main>{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
