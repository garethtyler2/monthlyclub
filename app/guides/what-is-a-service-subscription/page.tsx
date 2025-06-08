


import { Metadata } from "next";
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

              <h2>Why Subscriptions Work for Local Businesses</h2>
              <ul>
                <li>📅 Predictable, recurring revenue</li>
                <li>🧾 Less time spent chasing payments</li>
                <li>📈 Easier to plan your schedule and grow</li>
                <li>🤝 Stronger, longer-term client relationships</li>
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
                We’re currently in beta and inviting small businesses to join early. You’ll get full access to the platform — free during early access — and support from our team to help you set up.
              </p>

              <Button className="hero-button-primary mt-4">
                <a href="/">Join the Beta for Free</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}