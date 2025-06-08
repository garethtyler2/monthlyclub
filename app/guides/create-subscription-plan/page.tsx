

"use client";

import { Metadata } from "next";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Create a Subscription Plan with Monthly Club",
  description:
    "Follow this step-by-step guide to create and publish your first subscription plan using Monthly Club. No tech skills required.",
};

export default function CreateSubscriptionPlanPage() {
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
              How to Create a Subscription Plan with Monthly Club
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Learn how to launch your first plan in just a few clicks — no website or coding needed.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>Step 1: Sign in to Your Dashboard</h2>
              <p>
                Head to your Monthly Club dashboard and sign in using your email. No passwords needed — just a magic link to keep it simple.
              </p>

              <h2>Step 2: Click “Create a New Plan”</h2>
              <p>
                Once you're logged in, hit the button to start a new subscription plan. You'll be guided through a clean, simple setup process.
              </p>

              <h2>Step 3: Add the Plan Details</h2>
              <ul>
                <li><strong>Plan name:</strong> e.g., “Weekly Cleaning” or “Monthly Haircut”</li>
                <li><strong>Description:</strong> Let customers know exactly what’s included</li>
                <li><strong>Price & frequency:</strong> Choose weekly, bi-weekly, monthly, etc.</li>
              </ul>

              <h2>Step 4: Set Availability & Rules</h2>
              <p>
                You can set limits on how many people can subscribe, or even include free trials or one-off fees (like for setup).
              </p>

              <h2>Step 5: Publish and Share</h2>
              <p>
                Once your plan is saved, you'll get a public page you can send to your customers. They'll be able to sign up instantly and pay via Stripe.
              </p>

              <Button className="hero-button-primary mt-4">
                <a href="/">Create Your First Plan Now</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}