
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Sell Subscriptions as a Hairdresser | Monthly Club",
  description:
    "Learn how hairdressers can use Monthly Club to offer subscription plans for regular appointments. More predictable income, less admin.",
};

export default function HairdresserSubscriptionsPage() {
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
              How to Sell Subscriptions as a Hairdresser
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Turn one-off bookings into repeat visits with simple subscription plans for your regular clients.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>Why Subscriptions Work for Hairdressers</h2>
              <p>
                Most clients return every few weeks — so why not offer them a fixed plan? Subscriptions give your regulars peace of mind (and a guaranteed slot), while you get predictable monthly income.
              </p>

              <h2>Example Plans You Can Offer</h2>
              <ul>
                <li><strong>Classic Cut Plan:</strong> One haircut every 4 weeks for £35/month</li>
                <li><strong>Premium Plan:</strong> Haircut + beard trim + head massage, monthly</li>
                <li><strong>Family Plan:</strong> Two adult cuts and one child’s cut each month</li>
              </ul>

              <h2>Benefits for You</h2>
              <ul>
                <li>📅 Fewer last-minute cancellations</li>
                <li>💸 Reliable income every month</li>
                <li>⏳ Less time spent chasing appointments</li>
                <li>🤝 Stronger client relationships</li>
              </ul>

              <h2>How to Get Started</h2>
              <p>
                Monthly Club gives you a public page to list your plans, take subscriptions, and get paid through Stripe. You can send your link via WhatsApp, Instagram, or email.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Join the Beta and Try it Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}