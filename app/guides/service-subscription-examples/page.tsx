
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Examples of Service-Based Subscription Pages | Monthly Club",
  description:
    "Explore real-world examples of subscription pages for service businesses. See how cleaners, hairdressers, and other local pros use Monthly Club to grow recurring income.",
};

export default function ServiceSubscriptionExamplesPage() {
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
              Examples of Service-Based Subscription Pages
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              See how real local businesses are turning services into stable, recurring income with Monthly Club.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>What Do Subscription Pages Look Like?</h2>
              <p>
                Monthly Club pages are simple, clean, and focused on conversions. Each page includes your branding, service options, pricing, and a built-in checkout powered by Stripe.
              </p>

              <h2>Example 1: Amira – Domestic Cleaner</h2>
              <p>
                Amira offers weekly and fortnightly cleaning slots. Her subscription page lets customers choose a plan, enter details, and subscribe — all without back-and-forth messages.
              </p>

              <h2>Example 2: Jay – Mobile Barber</h2>
              <p>
                Jay offers monthly home visit haircuts for busy professionals. He sends his Monthly Club link to regulars, and they stay subscribed for months at a time.
              </p>

              <h2>Example 3: Ella – Dog Groomer</h2>
              <p>
                Ella set up a bi-monthly grooming subscription for loyal customers. She added optional add-ons (like nail trimming) and now earns steady income between appointments.
              </p>

              <h2>More Coming Soon</h2>
              <p>
                As more providers join the platform, we’ll showcase live pages to inspire your own setup. Want to be featured? Just reach out!
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Join the Beta and Create Your Page</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}