

"use client";

import { Metadata } from "next";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Subscription Ideas for Service Businesses | Monthly Club",
  description:
    "Explore creative subscription ideas for service-based businesses. See examples for pet services, gardening, mobile valeting, tutoring, and wellness.",
};

export default function SubscriptionIdeasPage() {
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
              Subscription Ideas for Service Businesses
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Not sure how to turn your service into a subscription? Here are real-world ideas to help you launch — and grow — your recurring income.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-12">

              <div>
                <h2>🐶 Pet Services</h2>
                <p>
                  From dog walking to grooming and training, pet services are perfect for recurring plans. Pet owners love convenience — and peace of mind.
                </p>
                <ul>
                  <li>Weekly dog walks — £60/month</li>
                  <li>Monthly bath + brush — £45/month</li>
                  <li>Pet sitting credits (4 hrs/month) — £80/month</li>
                  <li>Training refresh session monthly — £50/month</li>
                </ul>
              </div>

              <div>
                <h2>🌿 Gardening & Lawn Care</h2>
                <p>
                  Regular upkeep is key for gardens. Subscriptions make it easy to stay booked through the year — even in off-seasons.
                </p>
                <ul>
                  <li>Fortnightly lawn cuts — £90/month</li>
                  <li>Monthly garden tidy-up — £70/month</li>
                  <li>Seasonal planting & prep — £120/season</li>
                  <li>Bi-monthly weed/pest control — £65/month</li>
                </ul>
              </div>

              <div>
                <h2>🚗 Mobile Car Valeting</h2>
                <p>
                  Many car owners want to keep their vehicle fresh without thinking about it. Set up recurring cleans and build long-term loyalty.
                </p>
                <ul>
                  <li>Exterior wash every week — £80/month</li>
                  <li>Monthly interior deep clean — £60/month</li>
                  <li>Seasonal shine package — £180/quarter</li>
                  <li>Fleet plan for small businesses — custom pricing</li>
                </ul>
              </div>

              <div>
                <h2>📚 Tutors & Coaches</h2>
                <p>
                  Whether academic or personal development, coaching subscriptions keep clients on track and engaged over time.
                </p>
                <ul>
                  <li>Weekly 1:1 session — £120/month</li>
                  <li>Monthly progress review — £40/month</li>
                  <li>Homework support package — £60/month</li>
                  <li>Group accountability call — £30/month</li>
                </ul>
              </div>

              <div>
                <h2>💆‍♀️ Beauty & Wellness (Non-Hairdresser)</h2>
                <p>
                  Build relaxation into your client’s routine. Monthly treatments, skincare upkeep, or bundled sessions make for easy repeat visits.
                </p>
                <ul>
                  <li>Monthly massage or facial — £55/month</li>
                  <li>Fortnightly brow/lash tidy — £40/month</li>
                  <li>Mini treatments package — £75/month</li>
                  <li>Yoga or meditation credits — £50/month</li>
                </ul>
              </div>

              <div className="text-center pt-4">
                <Button className="hero-button-primary mt-6">
                  <a href="/">Start Building Your Plan</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}