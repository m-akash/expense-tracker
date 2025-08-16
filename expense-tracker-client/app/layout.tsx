import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "sonner";
import InstallPrompt from "@/components/installprompt/InstallPrompt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/expense-fav-32.ico",
    apple: "/pwa-192.png",
  },
  title: "Personal Expense Tracker",
  description:
    "Easily track expenses, manage budgets, and see where your money goes. Simple, smart, and secure.",
  applicationName: "SpendKeeper",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SpendKeeper",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#000000",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/pwa-192.png" />
        <link rel="shortcut icon" href="/expense-fav-32.ico" />
      </head>
      <body className={`${inter.className} bg-gray-900`}>
        <AuthProvider>
          {children}
          <InstallPrompt />
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
