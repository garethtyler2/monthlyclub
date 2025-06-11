import Head from "next/head";
import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Marketing Your Subscription Services Online | Monthly Club",
  description:
    "Learn how to effectively promote your subscription services as a local business. Strategies, tools, and real-world examples to grow your recurring income.",
};

export default function MarketingSubscriptionServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Head>
        <title>Marketing Your Subscription Services Online | Monthly Club</title>
        <meta name="description" content="Grow your local service business with proven subscription marketing tips. Leverage social media, referrals, and real-world examples to gain subscribers." />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/marketing-subscription-services" />
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
              Marketing Your Subscription Services Online
            </h1>

            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
              Discover strategies to grow your recurring income by promoting your service subscriptions to new and existing customers.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>Step 1: Start With Your Existing Clients</h2>
              <p>
                Your current customers are your best early subscribers. Let them know you're offering subscriptions, explain the benefits (priority booking, ease, savings), and send them your Monthly Club page link.
              </p>

              <h2>Step 2: Share Your Page on Social Media</h2>
              <p>
                Post about your subscription options regularly on Instagram, Facebook, or WhatsApp. Share testimonials and highlight ease of use. Stories and short videos work especially well for service businesses.
              </p>

              <h2>Step 3: Use Local Community Platforms</h2>
              <p>
                Sites like Nextdoor, local Facebook groups, or small business directories are ideal for spreading the word in your area. Be helpful and informative, not salesy.
              </p>

              <h2>Step 4: Add It to Your Email Signature & Cards</h2>
              <p>
                Include your Monthly Club page link in your email footer, on your business card, or even on appointment reminder texts.
              </p>

              <h2>Bonus: Offer an Incentive</h2>
              <p>
                Encourage signups with a small bonus. For example: “Subscribe this week and get a free add-on service” or “Get 50% off your first month.” It helps nudge people who are on the fence.
              </p>

              <h2>Grow Steadily Over Time</h2>
              <p>
                Building a subscriber base is a long-term game. The key is consistency: talk about it often, keep the experience simple, and remind people of the benefits.
              </p>

              <h2>Real Example: Jasmine the Mobile Nail Tech</h2>
              <p>
                Jasmine started posting about her subscription plans twice a week on Instagram. She added a link to her Monthly Club page in her bio and started getting one or two signups a week. Within two months, she had over 20 subscribers and a steady monthly income.
              </p>

              <Button className="hero-button-primary mt-4">
                <Link href="/">Start Growing Your Subscribers Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}