import Head from "next/head";
import Features from "@/components/Homepage/Features";
import Hero from "@/components/Homepage/HeroSection";
import Testimonials from "@/components/Homepage/Testimonials";
import Metrics from "@/components/Homepage/Metrics"; 
import MultiCTASection from "@/components/Homepage/MultiCTASection";
import CommunityFeature from "@/components/Homepage/Learn&Grow";
import ExampleUseCase from "@/components/Homepage/ExampleUseCase";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Monthly Club | Subscription Tools for Local Service Businesses & Creators</title>
        <meta
          name="description"
          content="Create, promote, and grow subscription-based plans for your service business or content brand. Monthly Club is built for sports clubs, hairdressers, beauticians, content creators, and more."
        />
        <link rel="canonical" href="https://www.monthlyclubhq.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Monthly Club",
              "url": "https://www.monthlyclubhq.com",
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
        <meta property="og:title" content="Monthly Club | Subscription Tools for Local Service Businesses & Creators" />
        <meta property="og:description" content="Create, promote, and grow subscription-based plans for your service business or content brand." />
        <meta property="og:url" content="https://www.monthlyclubhq.com/" />
        <meta property="og:image" content="https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Monthly Club" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Monthly Club | Subscription Tools for Local Service Businesses & Creators" />
        <meta name="twitter:description" content="Create, promote, and grow subscription-based plans for your service business or content brand." />
        <meta name="twitter:image" content="https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png" />
      </Head>
      <Hero />
      <Features />
      <CommunityFeature />
      <ExampleUseCase />
      <Metrics />
      <Testimonials />
      <MultiCTASection />
    </>
  );
}
