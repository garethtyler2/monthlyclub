import Head from "next/head";
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
      <Head>
        <title>Hairdresser Subscription Plans | Monthly Club</title>
        <meta name="description" content="Discover how hairdressers can offer smart subscription plans with Monthly Club. Boost loyalty and income with monthly or weekly appointment options." />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/hairdresser-subscriptions" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/guides/hairdresser-subscriptions"
              },
              "headline": "How to Sell Subscriptions as a Hairdresser",
              "description": "Learn how hairdressers can use Monthly Club to offer subscription plans for regular appointments. More predictable income, less admin.",
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
                  "url": "https://www.monthlyclubhq.com/images/Monthly%20Club%20logo.png"
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
                Hairdressing is built on repeat visits — most clients return every few weeks. A subscription plan gives them peace of mind and gives you the financial security of steady, predictable income.
              </p>
              <p>
                With fewer cancellations and easier scheduling, subscriptions mean you can plan your calendar in advance and spend less time on admin.
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

              <h2>Real Example: Lee the Barber</h2>
              <p>
                Lee runs a small barbershop in Manchester. He launched a “Monthly Trim Plan” with Monthly Club at £30/month. Within two weeks, 8 clients signed up. Now, his Fridays are fully booked in advance — and paid upfront.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Launch Your Subscription Plan Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}