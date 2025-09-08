import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CreditCard, CheckCircle, Star, Users, TrendingUp, Shield, Zap, Globe, Lock } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Stripe Billing | Automated Payment Processing | MonthlyClub",
  description: "Powerful Stripe integration for automated recurring payments, billing management, and secure payment processing. Handle all payments seamlessly.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/features/stripe-billing"
  },
  openGraph: {
    title: "Stripe Billing | Automated Payment Processing | MonthlyClub",
    description: "Powerful Stripe integration for automated recurring payments and billing management.",
    url: "https://www.monthlyclubhq.com/features/stripe-billing",
    siteName: "Monthly Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stripe Billing | Automated Payment Processing | MonthlyClub",
    description: "Powerful Stripe integration for automated recurring payments and billing management.",
  },
  keywords: [
    "stripe integration",
    "payment processing",
    "recurring billing",
    "automated payments",
    "subscription billing",
    "payment management",
    "stripe payments",
    "billing automation"
  ]
};

export default function StripeBillingPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-blue-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CreditCard className="w-4 h-4" />
              Stripe Billing Feature
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Stripe Billing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Powerful Stripe integration for automated recurring payments, billing management, 
              and secure payment processing. Handle all payments seamlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-lg px-8 py-4">
                  Start Processing Payments
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
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Stripe Billing Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Seamlessly integrated Stripe payment processing that handles everything from 
                subscription billing to one-time payments. All security and compliance is handled by Stripe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="text-center border border-brand-slate/20 bg-gradient-to-b from-brand-slate/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">1. Secure Payment Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Customers enter their payment details through Stripe's secure, 
                    PCI-compliant payment forms. Monthly Club never handles sensitive payment data.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">2. Automated Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stripe automatically processes payments, handles retries for failed 
                    transactions, and manages subscription renewals. Monthly Club provides the interface.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">3. Real-time Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track all payment activity, revenue, and customer data in real-time 
                    through Monthly Club's interface, powered by Stripe's data.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Payment Features */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Comprehensive Payment Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to handle payments professionally and securely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Subscription Billing */}
              <Card className="border border-brand-slate/20 bg-gradient-to-b from-brand-slate/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Subscription Billing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Automated recurring payments for all subscription types.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Monthly recurring payments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Flexible billing cycles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Proration handling</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Trial periods</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Accept payments from customers worldwide with multiple methods.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Credit & debit cards</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Digital wallets (Apple Pay, Google Pay)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Bank transfers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Buy now, pay later</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security & Compliance */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Stripe's Security & Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Stripe handles all security and compliance requirements. Monthly Club uses modern security practices but never handles payment data.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Stripe's PCI DSS Level 1 compliance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Stripe's end-to-end encryption</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Stripe's fraud detection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Stripe's 3D Secure authentication</span>
                      </div>
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
                See how different businesses use Stripe billing to process payments and grow revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hair Salon Example */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Beauty Salon</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Beauty Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Payment Setup:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Monthly subscription: £80<br/>
                        • One-time services: £25-£150<br/>
                        • Add-on products: £15-£60<br/>
                        • Payment methods: Cards, Apple Pay
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 99.5% payment success rate<br/>
                        • 2.9% + 20p transaction fees<br/>
                        • Automated recurring billing<br/>
                        • Zero payment disputes
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 40% increase in payment efficiency
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
                      <h4 className="font-semibold">Payment Setup:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Monthly training: £120<br/>
                        • Package deals: £300-£1,800<br/>
                        • Group classes: £15 per session<br/>
                        • Payment methods: Cards, Google Pay
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 98.8% payment success rate<br/>
                        • Automated retry for failed payments<br/>
                        • Instant payment notifications<br/>
                        • Seamless subscription management
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 50% reduction in payment issues
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
                      <h4 className="font-semibold">Payment Setup:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Weekly cleaning: £60<br/>
                        • Deep clean: £120<br/>
                        • One-time services: £40-£200<br/>
                        • Payment methods: Cards, bank transfers
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 99.2% payment success rate<br/>
                        • Automated invoice generation<br/>
                        • Real-time payment tracking<br/>
                        • Customer payment history
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 60% faster payment processing
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
                Why Stripe Billing Matters
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Professional payment processing is essential for business growth and customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Customers */}
              <Card className="border border-brand-slate/20 bg-gradient-to-b from-brand-slate/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Secure Payments</h4>
                        <p className="text-sm text-muted-foreground">Stripe's bank-level security protects their data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Multiple Payment Options</h4>
                        <p className="text-sm text-muted-foreground">Pay how they want with various methods</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Seamless Experience</h4>
                        <p className="text-sm text-muted-foreground">Quick and easy checkout process</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Payment Management</h4>
                        <p className="text-sm text-muted-foreground">Easy to update payment methods</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Business */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Automated Processing</h4>
                        <p className="text-sm text-muted-foreground">No manual payment handling required</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Reduced Churn</h4>
                        <p className="text-sm text-muted-foreground">Smart retry logic for failed payments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Real-time Analytics</h4>
                        <p className="text-sm text-muted-foreground">Track revenue and payment performance</p>
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
                        <h4 className="font-semibold">Global Reach</h4>
                        <p className="text-sm text-muted-foreground">Accept payments from customers worldwide</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built-in Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to process payments professionally and securely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Payment Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Secure payment processing with multiple payment methods.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Automated Billing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automated recurring payments and subscription management.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Stripe's Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Stripe's PCI DSS Level 1 compliance and fraud protection.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Analytics & Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Real-time payment analytics powered by Stripe's data.
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
                  Start Processing Payments
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Get started with professional payment processing powered by Stripe's secure infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-lg px-8 py-4">
                      Start Processing Payments
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="stripe-billing-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Stripe Billing Feature",
          "url": "https://www.monthlyclubhq.com/features/stripe-billing",
          "description": "Stripe integration for automated recurring payments and billing management. Monthly Club provides the interface, Stripe handles security and compliance.",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Stripe Billing",
            "description": "Stripe integration for payment processing and billing management",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web"
          }
        })}
      </Script>
    </>
  );
}
