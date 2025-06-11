"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";

const CTAFeatures = [
  {
    icon: ShieldCheck,
    title: "Launch Fast",
    description: "Get your subscription service online in minutes—no devs needed."
  },
  {
    icon: Activity,
    title: "Earn Recurring Revenue",
    description: "Stop chasing invoices. Customers subscribe once and pay automatically."
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Use your branded service page to attract and retain loyal clients."
  }
];

const CTAButtons = [
  {
    text: "Create a Plan",
    link: "/get-started"
  },
  {
    text: "See How It Works",
    link: "/how-it-works"
  },
  {
    text: "View Examples",
    link: "/examples"
  }
];

const CTA = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto animate-fade-in">
          <h2 className="mb-4">
            Why Choose <span className="gradient-text">Monthly Club</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Monthly Club helps you turn one-off customers into reliable recurring income. No tech skills required—just set up your services, share your link, and start earning.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {CTAFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <feature.icon className="h-10 w-10 mb-4 text-brand-purple" />
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          

          
          <div className="mt-10">
            <h3 className="text-xl font-medium mb-4">Made for Service Providers</h3>
            <p className="text-muted-foreground mb-6">
              Whether you're cleaning homes or cutting hair, Monthly Club gives you modern tools to scale your service—without adding complexity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-white/10 bg-white/5 rounded-xl p-6">
                <h4 className="font-medium mb-2">Any Service</h4>
                <p className="text-sm text-muted-foreground">From mobile groomers to personal trainers—if it's repeatable, it's billable.</p>
              </div>
              <div className="border border-white/10 bg-white/5 rounded-xl p-6">
                <h4 className="font-medium mb-2">Zero Overhead</h4>
                <p className="text-sm text-muted-foreground">We handle the subscriptions. You just deliver your service.</p>
                <p className="mt-2 text-xs text-brand-purple">
                  <Link href="/guides/automate-payments-stripe" className="hover:underline">How automated payments work →</Link>
                </p>
              </div>
            </div>
          </div>
          <Button asChild className="mt-6 w-1/2 hero-button-primary">
            <Link href="/guides">Explore the Guides</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;