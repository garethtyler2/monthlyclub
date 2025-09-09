import Head from "next/head";
import Features from "@/components/Homepage/Features";
import Hero from "@/components/Homepage/HeroSection";
import Testimonials from "@/components/Homepage/Testimonials";
import Metrics from "@/components/Homepage/Metrics"; 
import MultiCTASection from "@/components/Homepage/MultiCTASection";
import CommunityFeature from "@/components/Homepage/Learn&Grow";
import ExampleUseCase from "@/components/Homepage/ExampleUseCase";
import VerticalShowcase from "@/components/Homepage/VerticalShowcase";
import PricingPreview from "@/components/Homepage/PricingPreview";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Monthly Club | Recurring Payments & Subscription Platform for Local Businesses</title>
        <meta
          name="description"
          content="Transform your service business with automated recurring payments and subscription management powered by Stripe. Perfect for hairdressers, cleaners, sports clubs, and local service providers. No coding required."
        />
        <meta name="keywords" content="subscription billing software, recurring payments, Stripe integration, membership management, local business subscriptions, service business automation" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Monthly Club",
              "url": "https://www.monthlyclubhq.com",
              "description": "Recurring payments and subscription platform for local service businesses powered by Stripe",
              "publisher": {
                "@type": "Organization",
                "name": "Monthly Club",
                "url": "https://www.monthlyclubhq.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png"
                }
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Monthly Club",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Subscription billing and recurring payment platform for local service businesses powered by Stripe",
              "url": "https://www.monthlyclubhq.com",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "GBP",
                "description": "Free to start, pay-as-you-go pricing"
              },
              "featureList": [
                "Automated recurring payments",
                "Stripe payment integration",
                "Balance builder subscriptions",
                "One-time payment options",
                "Custom branding",
                "Subscriber messaging",
                "Tax analytics"
              ]
            })
          }}
        />
        <meta property="og:title" content="Monthly Club | Recurring Payments & Subscription Platform for Local Businesses" />
        <meta property="og:description" content="Transform your service business with automated recurring payments and subscription management powered by Stripe. Perfect for hairdressers, cleaners, sports clubs, and local service providers." />
        <meta property="og:url" content="https://www.monthlyclubhq.com/" />
        <meta property="og:image" content="https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Monthly Club" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Monthly Club | Recurring Payments & Subscription Platform for Local Businesses" />
        <meta name="twitter:description" content="Transform your service business with automated recurring payments and subscription management powered by Stripe. Perfect for hairdressers, cleaners, sports clubs, and local service providers." />
        <meta name="twitter:image" content="https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png" />
      </Head>
      <Hero />
      <Features />
      <PricingPreview />
      <VerticalShowcase />
      <CommunityFeature />
      <ExampleUseCase />
      <Metrics />
      <Testimonials />
      <MultiCTASection />
    </>
  );
}
