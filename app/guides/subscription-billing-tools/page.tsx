

import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Subscription Billing Tools for Small Businesses | Monthly Club",
  description:
    "Explore the best subscription billing tools for local service businesses. Learn how to simplify recurring payments with solutions like Stripe and Monthly Club.",
};

export default function SubscriptionBillingToolsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-brand-muted to-white dark:from-brand-muted/10 dark:to-background">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-brand-purple opacity-10 blur-3xl rounded-full"></div>
          </div>

          <div className="relative container mx-auto px-6 max-w-3xl text-center">
            <div className="mb-6">
              <Link href="/" className="text-brand-purple hover:underline text-sm font-medium">
                ← Back to Monthly Club
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Subscription Billing Tools for Small Businesses
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Discover tools that make recurring billing easy for service providers — from automated payments to seamless plan management.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>Why You Need a Billing Tool</h2>
              <p>
                Handling recurring payments manually is a headache. Subscription billing tools automate invoices, track customer payments, and reduce admin time — giving you space to focus on your service.
              </p>

              <h2>Top Subscription Billing Tools</h2>
              <ul>
                <li><strong>Stripe:</strong> The most popular choice for small businesses. Handles recurring billing, invoices, failed payment recovery, and more.</li>
                <li><strong>GoCardless:</strong> Great for direct debit in the UK and Europe. Ideal for lower-fee, high-volume billing.</li>
                <li><strong>Square:</strong> Easy for in-person service businesses already using Square POS.</li>
                <li><strong>Chargebee / Paddle:</strong> More advanced platforms for software or multi-currency use — not always ideal for local service pros.</li>
              </ul>

              <h2>How Monthly Club Integrates Billing</h2>
              <p>
                Monthly Club uses Stripe behind the scenes — so you don’t need to set anything up manually. Your customers subscribe, get charged automatically, and you see it all in your dashboard.
              </p>
              <p>
                We handle everything from onboarding to failed payments — no spreadsheets or chasing needed.
              </p>

              <h2>Want to Simplify Your Billing?</h2>
              <p>
                Join our free beta to set up your service plans and start taking recurring payments in minutes.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Join the Beta for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}