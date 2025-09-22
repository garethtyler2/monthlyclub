"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, DollarSign, CreditCard, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const pricingFeatures = [
  "No monthly fees",
  "Pay only when you earn",
  "Stripe payment processing",
  "Unlimited subscriptions",
  "Custom branding",
  "Analytics & reporting"
];

const PricingPreview = () => {
  const [ctaHref, setCtaHref] = useState("/login");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setCtaHref("/create-a-business");
      } else {
        setCtaHref("/login?redirect=/create-a-business");
      }
    };

    checkUser();
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute top-1/4 -right-32 w-64 h-64 bg-brand-purple/20 rounded-full blur-[96px] -z-10" />
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-brand-blue/20 rounded-full blur-[96px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="mb-4 animate-fade-in">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            Start free, pay only when you earn. No hidden fees, no monthly charges, no surprises.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent animate-fade-in">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-brand-purple/20 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-brand-purple" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Start Free</CardTitle>
                <div className="text-4xl font-bold text-white mt-2">£0</div>
                <p className="text-muted-foreground">No setup fees, no monthly charges</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={ctaHref}
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Pay-As-You-Go */}
            <Card className="border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-brand-blue/20 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-brand-blue" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Pay As You Go</CardTitle>
                <div className="text-4xl font-bold text-white mt-2">2.9%</div>
                <p className="text-muted-foreground">Only when you receive payments</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Stripe processing fee</span>
                      <span className="font-medium">1.5% + 20p</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Monthly Club fee</span>
                      <span className="font-medium">1.5%</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    Total: 3% + 20p per transaction
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className="w-full border border-white/20 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>View Full Pricing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p className="text-muted-foreground mb-4">
              Ready to turn your services into recurring revenue?
            </p>
            <Link
              href="/create-a-business"
              className="hero-button-primary"
            >
              <span>Start Your Business Today</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
