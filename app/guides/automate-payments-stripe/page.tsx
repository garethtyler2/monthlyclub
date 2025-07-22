import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
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
      <Head>
        <title>Automating Payments with Stripe | Monthly Club</title>
        <meta name="description" content="Automate payments for your subscription service using Stripe. Discover how Monthly Club makes recurring income easy for local businesses." />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/automate-payments-stripe" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/guides/automate-payments-stripe"
              },
              "headline": "Automating Payments with Stripe",
              "description": "Automate payments for your subscription service using Stripe. Discover how Monthly Club makes recurring income easy for local businesses.",
              "author": {
                "@type": "Organization",
                "name": "Monthly Club",
                "url": "https://www.monthlyclubhq.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Monthly Club",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png"
                }
              },
              "datePublished": "2024-06-01",
              "dateModified": "2025-06-10"
            })
          }}
        />
      </Head>
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
                Let’s say you’re a hairdresser offering a “Monthly Blowdry Plan” at £40/month. When a customer signs up, Stripe handles everything — charging their card automatically every month, transferring funds to your account, and even retrying if a payment fails. You don’t need to chase anyone, send invoices, or track overdue payments.
              </p>
              <p>
                Stripe is fully integrated with Monthly Club, so you never have to touch code or manage a separate Stripe dashboard. Your customers pay through a branded checkout, and Stripe does the rest behind the scenes.
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

              <h2>Fully Integrated – No Tech Skills Needed</h2>
              <p>
                Monthly Club was built for people who are great at what they do — not developers. Stripe is baked right into the platform, so you don’t need to learn a new tool. Simply choose your plan pricing, publish your page, and Stripe begins collecting payments from your subscribers.
              </p>
              <p>
                Want to offer weekly lawn cuts, monthly grooming packages, or quarterly home cleanings? You’re covered — and your customers never need to worry about paying manually.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Get Started with Stripe & Monthly Club</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}