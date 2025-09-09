import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "What is a Service Subscription? | Complete Guide | Monthly Club",
  description: "Discover what service subscriptions are, how they work, and why they're transforming local businesses. Learn the 4 types of subscription products and how to implement them.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/what-is-a-service-subscription"
  },
  openGraph: {
    title: "What is a Service Subscription? | Complete Guide | Monthly Club",
    description: "Discover what service subscriptions are, how they work, and why they're transforming local businesses. Learn the 4 types of subscription products.",
    url: "https://www.monthlyclubhq.com/guides/what-is-a-service-subscription",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is a Service Subscription? | Complete Guide | Monthly Club",
    description: "Discover what service subscriptions are, how they work, and why they're transforming local businesses. Learn the 4 types of subscription products.",
  },
  keywords: [
    "service subscription",
    "recurring revenue",
    "subscription business",
    "local business subscriptions",
    "service business model",
    "recurring payments",
    "subscription plans",
    "monthly subscriptions"
  ]
};

export default function WhatIsAServiceSubscriptionPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-blue-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Complete Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              What is a Service Subscription?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how recurring plans can transform your service business — creating stability, 
              stronger relationships, and predictable income that grows over time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Your Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Browse All Guides
                </Button>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Product Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Automated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10min</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* What is a Service Subscription */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What is a Service Subscription?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A service subscription is a recurring arrangement where customers pay at regular intervals 
                for services they use often. Think Netflix, but for local services like cleaning, 
                dog walking, haircuts, or gardening.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Customer Subscribes</h4>
                        <p className="text-sm text-muted-foreground">They choose a plan and payment schedule</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Automatic Payments</h4>
                        <p className="text-sm text-muted-foreground">Stripe handles recurring billing automatically</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">You Provide Service</h4>
                        <p className="text-sm text-muted-foreground">Deliver your service on schedule, no chasing payments</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Why It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Predictable, recurring revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Less time chasing payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Stronger client relationships</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Easier to plan and grow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Automated payment processing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Four Product Types */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Four Ways to Monetize Your Service Business
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club offers four flexible product types to help you generate revenue 
                and improve customer experience across different business models.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional Subscriptions */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">1. Traditional Subscriptions</CardTitle>
                  <CardDescription>
                    Regular recurring payments for ongoing services with set schedules.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• £35/month for monthly haircut</li>
                        <li>• £80/month for weekly cleaning</li>
                        <li>• £25/month for gym membership</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Fixed monthly payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Predictable revenue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Balance Builder */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">2. Balance Builder</CardTitle>
                  <CardDescription>
                    Flexible prepaid subscriptions where customers build credit for any future service.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• £20/month (adjustable) - use for annual membership</li>
                        <li>• £30/month (adjustable) - use for treatments when ready</li>
                        <li>• £15/month (adjustable) - use for products throughout year</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Adjustable monthly amounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Use credit for any service</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pay It Off */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">3. Pay It Off Products</CardTitle>
                  <CardDescription>
                    Higher-value packages paid in monthly installments over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Annual membership (£500) paid over 12 months</li>
                        <li>• Personal training package (£800) paid over 8 months</li>
                        <li>• Wedding styling package (£300) paid over 6 months</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Flexible payment schedules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Upfront payment collection</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* One-Time Purchases */}
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">4. One-Time Purchases</CardTitle>
                  <CardDescription>
                    Individual services and products sold alongside subscriptions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Single training sessions (£50-80 each)</li>
                        <li>• Day passes (£10-15 each)</li>
                        <li>• Hair products (£15-60 items)</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Instant payment processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Add-on services</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Real-World Subscription Examples
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how different service businesses are using subscriptions to build 
                predictable revenue and stronger customer relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cleaning Service */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Cleaning Service</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Cleaning Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Subscription Setup:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Weekly cleaning: £60/month<br/>
                        • Bi-weekly cleaning: £40/month<br/>
                        • One-time deep clean: £120
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 85% of customers on subscriptions<br/>
                        • 40% increase in revenue<br/>
                        • 90% reduction in payment chasing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hair Salon */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Hair Salon</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Beauty Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Subscription Setup:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Monthly cut & style: £45/month<br/>
                        • Balance Builder: £30/month<br/>
                        • One-time treatments: £25-£150
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 70% subscription adoption<br/>
                        • 25% increase in average spend<br/>
                        • 60% reduction in no-shows
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Trainer */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Personal Trainer</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Training Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Subscription Setup:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Monthly training: £120/month<br/>
                        • Pay It Off: £800 package over 8 months<br/>
                        • Single sessions: £50 each
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 80% of clients on subscriptions<br/>
                        • 50% increase in retention<br/>
                        • 35% increase in revenue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Subscriptions Work for Local Businesses
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Transform your service business with predictable revenue, stronger relationships, 
                and automated processes that work 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Your Business */}
              <Card className="border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Predictable Revenue</h4>
                        <p className="text-sm text-muted-foreground">Know exactly what you'll earn each month</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Reduced Admin</h4>
                        <p className="text-sm text-muted-foreground">No more chasing payments or sending invoices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Better Planning</h4>
                        <p className="text-sm text-muted-foreground">Easier to schedule, hire, and grow your business</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Automated Payments</h4>
                        <p className="text-sm text-muted-foreground">Stripe handles all payment processing securely</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Your Customers */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Convenience</h4>
                        <p className="text-sm text-muted-foreground">Set it and forget it - no manual payments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Better Value</h4>
                        <p className="text-sm text-muted-foreground">Often get better rates with subscription plans</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Priority Service</h4>
                        <p className="text-sm text-muted-foreground">Guaranteed slots and preferred scheduling</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Flexibility</h4>
                        <p className="text-sm text-muted-foreground">Easy to pause, modify, or cancel anytime</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How Monthly Club Helps */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Monthly Club Makes It Simple
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Create a professional subscription page in minutes, not months. 
                No website needed, no technical skills required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">1. Quick Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create your business page and add subscription plans in under 10 minutes. 
                    No coding or technical knowledge required.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">2. Connect Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Integrate with Stripe for secure, automated payment processing. 
                    Accept cards, digital wallets, and more.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">3. Start Selling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Share your subscription page with customers and start collecting 
                    recurring payments immediately.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-0 shadow-glow overflow-hidden relative">
              <CardContent className="p-8 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-blue-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Start Your Subscription Business?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Join thousands of service businesses already using Monthly Club to build 
                  predictable revenue and stronger customer relationships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Your Free Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/guides">
                    <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Explore More Guides
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="service-subscription-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "What is a Service Subscription?",
          "url": "https://www.monthlyclubhq.com/guides/what-is-a-service-subscription",
          "description": "Discover what service subscriptions are, how they work, and why they're transforming local businesses. Learn the 4 types of subscription products.",
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
              "url": "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png"
            }
          },
          "datePublished": "2024-06-01",
          "dateModified": "2025-01-15"
        })}
      </Script>
    </>
  );
}
