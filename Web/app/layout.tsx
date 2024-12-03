import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeartGuard AI",
  description: "HeartGuard AI is a free and open-source AI-powered platform that helps you predict your heart disease risk with accurate and reliable results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppBar/>
        {children}
        <Footer/>
        <Toaster/>
        </body>
    </html>
  );
}
