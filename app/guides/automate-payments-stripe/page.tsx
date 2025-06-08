

"use client";

import { Metadata } from "next";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Automating Customer Payments with Stripe | Monthly Club",
  description:
    "Learn how Stripe powers automatic recurring payments for your subscription services. No chasing, no invoices — just reliable income.",
};

export default function AutomatePaymentsStripePage() {
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
              <a href="/" className="text-brand-purple hover:underline text-sm font-medium">
                ← Back to Monthly Club
              </a>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Automating Customer Payments with Stripe
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Stripe handles your subscription billing behind the scenes — so you can focus on delivering your service, not chasing payments.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>What Is Stripe?</h2>
              <p>
                Stripe is a trusted payment platform used by millions of businesses worldwide. Monthly Club uses Stripe to securely handle card payments, direct debits, and recurring billing — all without you needing a separate Stripe account.
              </p>

              <h2>How Monthly Club Uses Stripe</h2>
              <p>
                When a customer subscribes to your plan, Stripe automatically charges them based on your pricing and frequency (e.g. £40/month). Payments go straight to your connected account, minus Stripe’s small fee.
              </p>

              <h2>Benefits of Automation</h2>
              <ul>
                <li>💳 No manual invoicing or cash collection</li>
                <li>📅 Reliable, on-time monthly income</li>
                <li>📉 Fewer missed payments</li>
                <li>🔐 Bank-level security & fraud protection</li>
              </ul>

              <h2>Getting Paid</h2>
              <p>
                Once you're set up with Monthly Club, you'll connect your payout details and Stripe handles the rest. You’ll get paid out automatically based on their schedule — typically daily or weekly.
              </p>

              <h2>It's All Built In</h2>
              <p>
                You don’t need to touch code, set up Stripe manually, or learn a new platform. Just create your plan, share your page, and Stripe does the rest.
              </p>

              <Button className="hero-button-primary mt-4">
                <a href="/">Join the Beta and Automate Your Income</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}