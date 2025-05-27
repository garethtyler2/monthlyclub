import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Rehab",
    template: "%s | AI Rehab",
  },
  description: "AI Rehab is your AI-powered physiotherapy assistant. Explore exercises, injury insights, and recovery plans tailored to your needs.",
  metadataBase: new URL("https://ai-rehab.co.uk"),
  openGraph: {
    title: "AI Rehab",
    description: "AI-powered physiotherapy guidance for injury recovery and rehabilitation.",
    url: "https://ai-rehab.co.uk",
    siteName: "AI Rehab",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head /> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-20 bg-background text-foreground min-h-screen`}>
        <Navbar />
        <main className="">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
