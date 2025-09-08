import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "What is a Service Subscription? | Monthly Club",
  description:
    "Discover what service subscriptions are, how they work, and why they’re transforming local businesses. Learn how Monthly Club helps you offer recurring plans easily.",
};

export default function WhatIsAServiceSubscriptionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Head>
        <title>What is a Service Subscription? | Monthly Club</title>
        <meta name="description" content="Learn what service subscriptions are and how they help local service businesses build recurring income. Monthly Club makes it simple." />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/what-is-a-service-subscription" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/guides/what-is-a-service-subscription"
              },
              "headline": "What is a Service Subscription?",
              "description": "Learn what service subscriptions are and how they help local service businesses build recurring income. Monthly Club makes it simple.",
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
              What is a Service Subscription?
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Understand how recurring plans can transform your service business — creating stability, stronger relationships, and predictable income.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>What is a Service Subscription?</h2>
              <p>
                A service subscription is a recurring arrangement where customers pay at regular intervals—weekly, monthly, or otherwise—for a service they use often. Think of it like Netflix, but for services like cleaning, dog walking, haircuts, or gardening.
              </p>

              <h2>Four Ways to Monetize Your Service Business</h2>
              <p>
                Monthly Club offers four flexible product types to help you generate revenue and improve customer experience:
              </p>

              <h3>1. Traditional Subscriptions</h3>
              <p>
                Regular recurring payments for ongoing services. Customers pay monthly for a set number of services or access.
              </p>
              <ul>
                <li>£35/month for monthly haircut</li>
                <li>£80/month for weekly cleaning</li>
                <li>£25/month for gym membership</li>
              </ul>

              <h3>2. Balance Builder Subscriptions</h3>
              <p>
                Customers build credit over time with a single flexible subscription. They can adjust their monthly payment amount anytime and use the accumulated balance for any future services.
              </p>
              <ul>
                <li>£20/month (adjustable) - use for annual membership in 6 months</li>
                <li>£30/month (adjustable) - use for treatments when ready</li>
                <li>£15/month (adjustable) - use for products throughout the year</li>
              </ul>

              <h3>3. Pay It Off Products</h3>
              <p>
                Higher-value packages paid in monthly installments. Perfect for annual memberships, training packages, or treatment programs.
              </p>
              <ul>
                <li>Annual membership (£500) paid over 12 months</li>
                <li>Personal training package (£800) paid over 8 months</li>
                <li>Wedding styling package (£300) paid over 6 months</li>
              </ul>

              <h3>4. One-Time Products</h3>
              <p>
                Individual services and products sold alongside subscriptions. Great for add-ons, walk-ins, and additional revenue.
              </p>
              <ul>
                <li>Single training sessions (£50-80 each)</li>
                <li>Day passes (£10-15 each)</li>
                <li>Hair products (£15-60 items)</li>
              </ul>

              <h2>Why Subscriptions Work for Local Businesses</h2>
              <ul>
                <li>📅 Predictable, recurring revenue</li>
                <li>🧾 Less time spent chasing payments</li>
                <li>📈 Easier to plan your schedule and grow</li>
                <li>🤝 Stronger, longer-term client relationships</li>
                <li>💳 Automated payments powered by Stripe</li>
                <li>🔄 Flexible product types for different customer needs</li>
              </ul>

              <h2>How Monthly Club Makes It Simple</h2>
              <p>
                With Monthly Club, you can create a shareable subscription page for your business in minutes. Add your service plans, connect payments, and let customers subscribe online — no website needed.
              </p>

              <h2>Real-World Subscription Examples</h2>
              <ul>
                <li>🧽 Weekly home cleaning with automated payments</li>
                <li>🌱 Lawn care every two weeks</li>
                <li>✂️ Hairdresser plans with fixed monthly bookings</li>
                <li>🐕 Dog grooming on a subscription schedule</li>
              </ul>

              <h2>Try Monthly Club (Beta)</h2>
              <p>
                We’re currently in beta and welcoming service businesses to join us. You’ll get full access to everything — free during early access — and hands-on support to help you launch your first subscription.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/create-a-business">Start Your Free Early Access</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}