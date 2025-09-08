import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Wallet, CheckCircle, Star, Users, TrendingUp, CreditCard, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Balance Builder | Flexible Prepaid Credit System | MonthlyClub",
  description: "Revolutionary Balance Builder subscription model. Customers pay an adjustable monthly amount to build credit for any future service. Perfect for service businesses.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/features/balance-builder"
  },
  openGraph: {
    title: "Balance Builder | Flexible Prepaid Credit System | MonthlyClub",
    description: "Revolutionary Balance Builder subscription model. Customers pay an adjustable monthly amount to build credit for any future service.",
    url: "https://www.monthlyclubhq.com/features/balance-builder",
    siteName: "Monthly Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balance Builder | Flexible Prepaid Credit System | MonthlyClub",
    description: "Revolutionary Balance Builder subscription model. Customers pay an adjustable monthly amount to build credit for any future service.",
  },
  keywords: [
    "balance builder subscription",
    "prepaid credit system",
    "flexible subscription model",
    "service business subscriptions",
    "monthly credit building",
    "subscription billing",
    "recurring payments",
    "customer retention"
  ]
};

export default function BalanceBuilderPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50/20 via-background to-purple-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Wallet className="w-4 h-4" />
              Balance Builder Feature
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Balance Builder
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The revolutionary subscription model that lets customers build credit for any future service. 
              One flexible subscription, unlimited possibilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-lg px-8 py-4">
                  Start Building Credit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" className="text-lg px-8 py-4">
                  View All Features
                </Button>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Flexible</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Uses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Balance Builder Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Unlike traditional subscriptions, Balance Builder gives customers complete flexibility 
                over how and when they use their credit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">1. Set Monthly Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Customers choose how much they want to pay monthly (e.g., £50, £100, £200). 
                    They can change this amount anytime.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">2. Build Credit Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each monthly payment adds to their credit balance. 
                    The balance grows over time and never expires.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="text-center border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">3. Use for Any Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Customers can use their credit for any service you offer, 
                    whenever they want. Complete flexibility.
                  </p>
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
                Why Balance Builder is Game-Changing
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                This innovative model solves the biggest problems with traditional subscriptions 
                while creating new opportunities for growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Customers */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Complete Flexibility</h4>
                        <p className="text-sm text-muted-foreground">Use credit for any service, anytime</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">No Commitment Pressure</h4>
                        <p className="text-sm text-muted-foreground">No need to use services monthly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Adjustable Payments</h4>
                        <p className="text-sm text-muted-foreground">Change monthly amount anytime</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Never Expires</h4>
                        <p className="text-sm text-muted-foreground">Credit balance grows indefinitely</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Business */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Predictable Revenue</h4>
                        <p className="text-sm text-muted-foreground">Monthly payments regardless of usage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Higher Customer Lifetime Value</h4>
                        <p className="text-sm text-muted-foreground">Customers build larger balances over time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Reduced Churn</h4>
                        <p className="text-sm text-muted-foreground">Less pressure = happier customers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Cash Flow Advantage*</h4>
                        <p className="text-sm text-muted-foreground">Get paid before delivering services</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          *Payment processed immediately, funds typically reach your bank account within 7 days
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-slate-50/5 via-background to-blue-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Platform Integration
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything happens seamlessly within Monthly Club - from building credit to using it for services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Management */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">For Your Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Easy Credit Management</h4>
                        <p className="text-sm text-muted-foreground">Charge customer credit directly when providing services</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Real-Time Tracking</h4>
                        <p className="text-sm text-muted-foreground">See all customer balances and transaction history instantly</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Automated Billing</h4>
                        <p className="text-sm text-muted-foreground">Monthly payments collected automatically via Stripe</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Secure Settlement</h4>
                        <p className="text-sm text-muted-foreground">Funds typically reach your bank account within 7 days</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Customer Communication</h4>
                        <p className="text-sm text-muted-foreground">Built-in messaging to notify customers about their balance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Experience */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">For Your Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Always Know Your Balance</h4>
                        <p className="text-sm text-muted-foreground">Check current credit balance anytime in their dashboard</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Transaction History</h4>
                        <p className="text-sm text-muted-foreground">See all deposits and service charges in one place</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Flexible Usage</h4>
                        <p className="text-sm text-muted-foreground">Use credit for any service you offer, whenever they want</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Easy Adjustments</h4>
                        <p className="text-sm text-muted-foreground">Change monthly payment amount or pause anytime</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How It Works in Practice */}
            <div className="mt-12">
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary text-center">How It Works in Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-primary">1</span>
                      </div>
                      <h4 className="font-semibold mb-2">Customer Builds Credit</h4>
                      <p className="text-sm text-muted-foreground">Monthly payments automatically add to their balance</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-primary">2</span>
                      </div>
                      <h4 className="font-semibold mb-2">Service is Provided</h4>
                      <p className="text-sm text-muted-foreground">You provide the service and charge their credit</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-primary">3</span>
                      </div>
                      <h4 className="font-semibold mb-2">Balance Updates</h4>
                      <p className="text-sm text-muted-foreground">Both parties see the updated balance and transaction</p>
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
                Real-World Examples
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how different businesses are using Balance Builder to transform their revenue model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hair Salon Example */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Beauty Salon</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Salon A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Monthly Payment:</h4>
                      <p className="text-2xl font-bold text-primary">£80</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Credit Usage:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Haircut + color (6 months later)<br/>
                        • Facial treatment (3 months later)<br/>
                        • Manicure (2 months later)
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: £480 credit built, used flexibly over 6 months
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Trainer Example */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Personal Trainer</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Training Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Monthly Payment:</h4>
                      <p className="text-2xl font-bold text-primary">£120</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Credit Usage:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 3 personal training sessions<br/>
                        • Nutrition consultation<br/>
                        • 2 group classes
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: £720 credit built, used for various services
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cleaning Service Example */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Cleaning Service</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Cleaning Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Monthly Payment:</h4>
                      <p className="text-2xl font-bold text-primary">£60</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Credit Usage:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 2 regular cleanings<br/>
                        • Deep clean (when needed)<br/>
                        • Window cleaning add-on
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: £360 credit built, used as needed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built-in Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to manage Balance Builder subscriptions seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Stripe Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automated monthly payments with Stripe's secure payment processing.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Real-time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Customers can see their balance and usage history in real-time.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Flexible Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Customers can book services using their credit whenever they want.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Customer Portal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Self-service portal for managing payments and viewing balance.
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Revolutionize Your Business?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Start offering Balance Builder subscriptions and watch your customer lifetime value soar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-lg px-8 py-4">
                      Start Building Credit
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button variant="outline" className="text-lg px-8 py-4">
                      Explore All Features
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="balance-builder-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Balance Builder Feature",
          "url": "https://www.monthlyclubhq.com/features/balance-builder",
          "description": "Revolutionary Balance Builder subscription model. Customers pay an adjustable monthly amount to build credit for any future service.",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Balance Builder",
            "description": "Flexible prepaid credit system for service businesses",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web"
          }
        })}
      </Script>
    </>
  );
}
