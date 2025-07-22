import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Features | Tools Built to Power Your Subscription Club",
  description: "Everything you need to run and grow a modern subscription business. AI tools, payments, storefronts, analytics, and more — built for service businesses and creators.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/features"
  },
  openGraph: {
    title: "Features | Tools Built to Power Your Subscription Club",
    description: "Discover the powerful tools included with MonthlyClub: AI, Stripe integration, custom storefronts, analytics, and more.",
    url: "https://www.monthlyclubhq.com/features",
    siteName: "MonthlyClubHQ",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png",
        width: 1200,
        height: 630,
        alt: "MonthlyClub Features"
      }
    ],
    type: "website"
  },
};

const FeaturesPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-subtle">
        {/* Hero */}
        <section className="py-10 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 text-primary-foreground animate-bounce-in">
              <Zap className="w-4 h-4 mr-2" />
              Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Powerful Features Built for Subscription Success
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Modern tools designed to help you launch, manage, and grow your subscription business — with no hassle.
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You Get
            </h2>
            <p className="text-lg text-muted-foreground">
              Every MonthlyClub workspace includes:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              "AI-powered plan and product descriptions",
              "Custom branded storefront",
              "Stripe payment integration",
              "Flexible monthly billing engine",
              "Built-in fraud prevention",
              "Analytics dashboard with trends",
              "Mobile-optimized customer flow",
              "CRM-style member management"
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-1 text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why It Works */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Designed for Service Businesses & Creators
            </h2>
            <p className="text-lg text-muted-foreground">
              You shouldn't need a dev team or expensive tools to sell recurring services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
              {[
                {
                  title: "Fast setup",
                  desc: "Start selling in under 10 minutes. No code, no bloat."
                },
                {
                  title: "Custom & Simple",
                  desc: "Everything works out of the box — and looks like your brand."
                },
                {
                  title: "Built-in Growth",
                  desc: "SEO-ready, mobile-friendly, and easy to share anywhere."
                }
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-0 shadow-glow overflow-hidden relative">
              <CardContent className="p-6 relative z-10">
                <div className="absolute inset-0 bg-black/10"></div>
                <h2 className="text-4xl md:text-5xl gradient-text font-bold mb-6 relative z-10">
                  Start Exploring the Platform
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10">
                  See how easy it is to launch your first subscription plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/how-it-works">
                    <Button className="bg-background text-primary border border-primary hover:bg-background/80">
                      See How It Works
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/create-a-business/step-one">
                    <Button className="hero-button-primary">
                      Start Your Club
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="features-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Features",
          "url": "https://www.monthlyclubhq.com/features",
          "description": "Everything you need to run and grow a modern subscription business. AI tools, payments, storefronts, analytics, and more — built for service businesses and creators."
        })}
      </Script>
    </>
  );
};

export default FeaturesPage;