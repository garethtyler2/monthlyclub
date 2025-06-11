import Head from "next/head";
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cleaning Business Subscription Models | Monthly Club",
  description:
    "See how cleaning professionals can use subscriptions to earn stable income. Explore pricing ideas, plan types, and benefits of recurring clients.",
};

export default function CleaningSubscriptionModelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Head>
        <title>Cleaning Subscription Models | Monthly Club</title>
        <meta name="description" content="Learn how cleaners can boost income with subscriptions. Explore weekly, bi-weekly, and deep-clean plans tailored for predictable revenue." />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/cleaning-subscription-model" />
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
              Cleaning Business Subscription Models
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Build a consistent income stream by turning one-off cleans into recurring subscription plans your clients can sign up to online.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>Why Subscriptions Work for Cleaners</h2>
              <p>
                Cleaning is a service people need on a regular basis — and that makes it perfect for subscriptions. Whether it’s a weekly tidy-up or a monthly deep clean, giving clients the ability to “set it and forget it” means fewer gaps in your calendar and steadier income for your business.
              </p>
              <p>
                Instead of quoting one job at a time, subscriptions let you build lasting client relationships and reduce admin stress.
              </p>

              <h2>Popular Cleaning Plan Ideas</h2>
              <ul>
                <li><strong>Weekly Clean:</strong> 2-hour clean every week — £160/month</li>
                <li><strong>Fortnightly Clean:</strong> 3-hour visit every 2 weeks — £90/month</li>
                <li><strong>Deep Clean Plan:</strong> One 5-hour deep clean per month — £120/month</li>
                <li><strong>Pet-Friendly Plan:</strong> Extra hair/dander care included</li>
              </ul>

              <h2>Benefits for Your Business</h2>
              <ul>
                <li>🧾 Predictable income</li>
                <li>📅 Easier scheduling</li>
                <li>💳 No chasing invoices</li>
                <li>🔁 Higher client retention</li>
              </ul>

              <h2>Using Monthly Club to Offer Plans</h2>
              <p>
                Monthly Club gives you a clean, branded page where clients can view your services and subscribe in seconds. Payments are powered by Stripe, and everything is managed for you — no tech setup needed.
              </p>

              <h2>Real Example: Jo’s Cleaning Service</h2>
              <p>
                Jo runs a small cleaning business in Leeds. After switching to Monthly Club, she set up a simple £160/month weekly clean subscription. Within the first month, five regulars signed up. Now she spends less time doing quotes and more time delivering great service — knowing her income is locked in ahead of time.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Start Earning Recurring Income Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}