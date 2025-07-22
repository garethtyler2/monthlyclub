import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pricing | Simple Pay-As-You-Go Model",
  description: "No subscriptions or hidden fees. Just 1.5% + 20p for Stripe and 1.5% for MonthlyClub per transaction. See exactly how pricing works.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/pricing"
  },
  openGraph: {
    title: "Pricing | Simple Pay-As-You-Go Model",
    description: "No monthly fees—just a small % per transaction. Built for growing businesses.",
    url: "https://www.monthlyclubhq.com/pricing",
    siteName: "MonthlyClubHQ",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png",
        width: 1200,
        height: 630,
        alt: "MonthlyClub Pricing"
      }
    ],
    type: "website"
  },
};

const PricingPage = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero */}
      <section className="py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 text-primary-foreground animate-bounce-in">
            <Zap className="w-4 h-4 mr-2" />
            Pricing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            No monthly fee. Just pay when you get paid.
          </p>
        </div>
      </section>

      {/* Pricing Breakdown */}
      <section className="py-4 px-4">
        <div className="max-w-3xl mx-auto grid gap-6">
          <Card className="shadow-primary">
            <CardContent className="p-6 space-y-4">
         <div className="text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-purple to-brand-indigo rounded-full shadow-lg animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

          </div>
              <div className="flex justify-center mb-2">
              </div>
              <h2 className="text-2xl font-bold text-center text-foreground">Pay-As-You-Go</h2>
              <p className="gradient-text text-center text-base">
                One simple rate. No tiers. No surprises.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Stripe fee: 1.5% + 20p per transaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">MonthlyClub fee: 1.5% per transaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">No subscription or setup fees</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Included Features */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What's Included
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to launch and grow your subscription club.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            "Custom branded storefront",
            "AI-powered product descriptions",
            "Stripe integration for secure payments",
            "Mobile-optimized checkout",
            "Dashboard with analytics",
            "Recurring billing engine",
            "Flexible customer management",
            "Built-in fraud protection"
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-1 text-primary" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Still have questions? We've got answers.
          </p>
        </div>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              q: "Do I need to pay anything upfront?",
              a: "Nope! MonthlyClub is free to start. You only pay a small percentage when you make a sale."
            },
            {
              q: "How does Stripe billing work?",
              a: "Stripe charges 1.5% + 20p per transaction. MonthlyClub integrates directly so you don’t have to manage billing."
            },
            {
              q: "Can I cancel at any time?",
              a: "Yes — there are no contracts or lock-ins. You can pause or stop anytime."
            },
            {
              q: "Is there a minimum number of subscribers?",
              a: "No, you can start with just one paying customer."
            }
          ].map((item, i) => (
            <details key={i} className="bg-muted/30 p-4 rounded-lg shadow">
              <summary className="font-semibold text-foreground cursor-pointer">
                {item.q}
              </summary>
              <p className="mt-2 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

            {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-glow overflow-hidden relative">
            <CardContent className="p-6 relative z-10">
              <div className="absolute inset-0 bg-black/10"></div>
              <h2 className="text-4xl md:text-5xl gradient-text font-bold mb-6 relative z-10">
                Start for Free Today
              </h2>
              <p className="text-xl mb-8 opacity-90 relative z-10">
                Only pay when you earn. It's that simple.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
               <Link href="/create-a-business/step-one">
                <Button className="hero-button-primary bg-white text-primary hover:bg-white/90">
                  Start Creating Now
                <Sparkles className="w-5 h-5 ml-2" />
                </Button>
             </Link>

          
              </div>
            </CardContent>
            
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          </Card>
        </div>
      </section>
    </div>

    <Script id="pricing-schema" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Pricing",
        "url": "https://www.monthlyclubhq.com/pricing",
        "description": "No subscriptions or hidden fees. Just 1.5% + 20p for Stripe and 1.5% for MonthlyClub per transaction."
      })}
    </Script>
    </>
  );
};

export default PricingPage;