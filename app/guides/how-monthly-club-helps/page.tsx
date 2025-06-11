
import Head from "next/head";

import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How Monthly Club Helps Service Providers Grow | Monthly Club",
  description:
    "Discover how Monthly Club empowers local businesses to create, manage, and grow subscription plans. Less admin, more recurring revenue.",
};

export default function HowMonthlyClubHelpsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Head>
        <title>How Monthly Club Helps Service Businesses | Monthly Club</title>
        <meta name="description" content="Monthly Club helps local service providers grow recurring income with easy-to-use tools: subscriptions, payment automation, and public service pages." />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/how-monthly-club-helps" />
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
              How Monthly Club Helps Service Providers Grow
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Monthly Club is built to help small service businesses move from one-off jobs to reliable, recurring income — all with minimal admin.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>Built for Local Pros</h2>
              <p>
                Whether you're a mobile hairdresser, a dog walker, or a local cleaner — Monthly Club helps you turn one-time jobs into steady, recurring income. You can build and sell subscription plans your customers can sign up to in seconds.
              </p>

              <h2>Everything You Need to Launch</h2>
              <ul>
                <li>A public service page you can share anywhere</li>
                <li>Stripe-powered payments and recurring billing</li>
                <li>Plan creation with pricing, frequency, and details</li>
                <li>Email login — no passwords or tech skills needed</li>
              </ul>

              <h2>Grow Without the Hassle</h2>
              <p>
                Instead of chasing bookings or unpaid invoices, you’ll see your income arrive on schedule. You can focus on doing the work — not managing spreadsheets.
              </p>

              <h2>Built to Be Simple</h2>
              <p>
                We designed Monthly Club for the non-techy business owner. Everything is streamlined, clean, and built to help you earn more with less friction.
              </p>

              <h2>Real Example: Priya the Mobile Therapist</h2>
              <p>
                Priya used to spend hours a week chasing appointments. After setting up a “Monthly Massage Plan” with Monthly Club, she booked 12 clients who now pay automatically each month — and she no longer deals with late cancellations or gaps.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Start Growing with Monthly Club</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}