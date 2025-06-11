import Head from "next/head";
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Benefits of Recurring Revenue for Local Businesses | Monthly Club",
  description:
    "Explore how recurring revenue helps service providers grow with predictable income, reduced admin, and stronger customer relationships.",
};

export default function RecurringRevenueBenefitsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Head>
        <title>Benefits of Recurring Revenue for Local Businesses | Monthly Club</title>
        <meta name="description" content="Explore how recurring revenue helps local service businesses stabilize income, reduce admin, and build long-term client loyalty through subscriptions." />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/recurring-revenue-benefits" />
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
              Benefits of Recurring Revenue for Local Businesses
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Find out why more local service providers are shifting to subscription-based income — and how it can transform your business.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>What is Recurring Revenue?</h2>
              <p>
                Recurring revenue means your customers pay you regularly — typically weekly, monthly, or quarterly — instead of booking sporadically. It’s common in industries like software, but now service businesses are using it too.
              </p>

              <h2>Why It’s Powerful for Service Providers</h2>
              <ul>
                <li><strong>Stability:</strong> You can plan months ahead knowing your income won’t suddenly drop.</li>
                <li><strong>Efficiency:</strong> No more constant re-booking, reminders, or chasing invoices.</li>
                <li><strong>Customer Loyalty:</strong> Subscribers tend to stick with you longer and value consistency.</li>
                <li><strong>Cash Flow:</strong> Predictable income makes budgeting and reinvestment easier.</li>
              </ul>

              <h2>Real-World Example</h2>
              <p>
                Sarah runs a dog grooming service in Bristol. She created a £45/month plan for a bi-monthly grooming session. Her regular clients signed up quickly — now she gets paid on the 1st of each month, and her calendar stays full without last-minute gaps or no-shows.
              </p>

              <h2>How Monthly Club Helps</h2>
              <p>
                We make it easy for any service provider to create subscription plans, collect payments automatically, and build a dependable income stream — all without needing tech skills.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Start Your Subscription Journey Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}