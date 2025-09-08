"use client";

import { Activity, Shield, Clipboard, Brain, Target, BarChart, Newspaper, MessageCircle, CreditCard, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const featureItems = [
  {
    icon: BarChart,
    title: "Reliable Income",
    description: "With recurring payments, you know exactly what you'll earn and when—no more chasing payments.",
    className: "border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent",
    delay: 600,
    link: "/guides/recurring-revenue-benefits"
  },
  {
    icon: Clipboard,
    title: "Create Service Plans",
    description: "Easily build subscription plans for any service—from beauty to gardening—in minutes.",
    className: "border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent",
    delay: 0,
    link: "/guides/create-subscription-plan"
  },
  {
    icon: Shield,
    title: "Stripe Payment Integration",
    description: "Accept card payments and recurring billing with automated dunning management through Stripe.",
    className: "border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent",
    delay: 100,
    link: "/guides/automate-payments-stripe"
  },
  {
    icon: Newspaper,
    title: "Subscriber-only Posts",
    description: "Publish updates, photos and links to your paying subscribers with a built-in feed.",
    className: "border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent",
    delay: 150,
    link: "/features/messaging-community"
  },
  {
    icon: BarChart,
    title: "Tax Analytics & Reporting",
    description: "Track your active subscribers, earnings, and plan performance with detailed analytics.",
    className: "border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent",
    delay: 200,
    link: "/features/tax-analytics"
  },
  {
    icon: Target,
    title: "Business Branding",
    description: "Create your professional business page with logo, description, and products.",
    className: "border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent",
    delay: 300,
    link: "/features/business-branding"
  },
  {
    icon: Activity,
    title: "Balance Builder Subscriptions",
    description: "Let customers build up credit for future services with our unique pay-it-off system.",
    className: "border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent",
    delay: 400,
    link: "/features/balance-builder"
  },
  {
    icon: CreditCard,
    title: "Pay It Off Plans",
    description: "Break down expensive services into manageable monthly payments for customers.",
    className: "border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent",
    delay: 450,
    link: "/features/pay-it-off"
  },
  {
    icon: ShoppingCart,
    title: "One-Time Purchases",
    description: "Perfect for add-ons, one-off services, or standalone products.",
    className: "border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent",
    delay: 500,
    link: "/features/one-time-purchases"
  },
  {
    icon: Shield,
    title: "Stripe Billing",
    description: "Handle all payments, subscriptions, and billing automatically with Stripe.",
    className: "border-brand-slate/20 bg-gradient-to-b from-brand-slate/10 to-transparent",
    delay: 550,
    link: "/features/stripe-billing"
  },
  {
    icon: Brain,
    title: "Built for Service Businesses",
    description: "Perfect for cleaners, groomers, beauty pros, and anyone who works on repeat bookings.",
    className: "border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent",
    delay: 600,
    link: "/use-cases/"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 animate-fade-in">
            Why <span className="gradient-text">Monthly Club</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            We make it easy for small service businesses to launch, sell, and manage subscriptions online—without the tech headaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureItems.map((feature, index) => (
            <Card 
              key={index} 
              className={cn(
                "border rounded-xl overflow-hidden animate-fade-in", 
                feature.className
              )} 
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
                {feature.link !== "/" && (
                  <Link href={feature.link} className="text-brand-purple hover:underline text-sm mt-4 inline-block">
                    Learn more →
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;