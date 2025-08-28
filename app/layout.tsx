import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Monthly Club",
    template: "%s | Monthly Club",
  },
  description: "Monthly Club helps local service businesses offer subscriptions online. Create, sell, and manage recurring service plans with ease.",
  metadataBase: new URL("https://www.monthlyclubhq.com"),
  openGraph: {
    title: "Monthly Club",
    description: "Subscription tools for local service businesses. Empowering recurring revenue through modern online service plans.",
    url: "https://www.monthlyclubhq.com",
    siteName: "Monthly Club",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://qnecyousolguftvceaao.supabase.co" />
      </head> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pt-20 bg-background text-foreground min-h-screen`}>
        <Navbar />
        <main className="">{children}</main>
        <Analytics />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
