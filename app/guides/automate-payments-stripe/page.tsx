import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, Lock, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Automate Payments with Stripe | Complete Guide | Monthly Club",
  description: "Learn how Stripe powers automatic recurring payments for your subscription services. No chasing, no invoices — just reliable income with bank-level security.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/automate-payments-stripe"
  },
  openGraph: {
    title: "Automate Payments with Stripe | Complete Guide | Monthly Club",
    description: "Learn how Stripe powers automatic recurring payments for your subscription services. No chasing, no invoices — just reliable income.",
    url: "https://www.monthlyclubhq.com/guides/automate-payments-stripe",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automate Payments with Stripe | Complete Guide | Monthly Club",
    description: "Learn how Stripe powers automatic recurring payments for your subscription services. No chasing, no invoices — just reliable income.",
  },
  keywords: [
    "stripe payments",
    "automated billing",
    "recurring payments",
    "payment automation",
    "stripe integration",
    "subscription billing",
    "payment processing",
    "automatic payments"
  ]
};

export default function AutomatePaymentsStripePage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-green-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CreditCard className="w-4 h-4" />
              Payment Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Automate Payments with Stripe
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Learn how Stripe powers automatic recurring payments for your subscription services. 
              No chasing, no invoices — just reliable income with bank-level security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Automating Payments
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Automated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">7</div>
                <div className="text-sm text-muted-foreground">Days Settlement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Setup Required</div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Stripe */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What is Stripe?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Stripe is a trusted payment platform used by millions of businesses worldwide. 
                Monthly Club uses Stripe to securely handle all your payment processing needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Trusted & Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Used by millions of businesses worldwide, Stripe provides bank-level security 
                      and fraud protection for all transactions.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Security Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• PCI DSS Level 1 compliance</li>
                        <li>• 256-bit SSL encryption</li>
                        <li>• Advanced fraud detection</li>
                        <li>• 3D Secure authentication</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Fully Integrated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Stripe is seamlessly integrated into Monthly Club, so you never need to 
                      manage a separate Stripe account or learn complex payment systems.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">What This Means:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• No separate Stripe account needed</li>
                        <li>• No technical setup required</li>
                        <li>• Everything handled automatically</li>
                        <li>• One dashboard for everything</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How Stripe Works with Monthly Club */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Stripe Works with Monthly Club
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how Stripe handles everything from payment collection to fund transfers, 
                all while you focus on delivering your services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Customer Subscribes */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">1. Customer Subscribes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Customer visits your subscription page and chooses a plan. They enter their 
                      payment details through Stripe's secure checkout form.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">What Happens:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Secure payment form</li>
                        <li>• Card validation</li>
                        <li>• Fraud checks</li>
                        <li>• Instant confirmation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Automatic Billing */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <RefreshCw className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">2. Automatic Billing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Stripe automatically charges the customer's card on schedule. If a payment 
                      fails, Stripe retries with smart retry logic.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Scheduled payments</li>
                        <li>• Smart retry logic</li>
                        <li>• Failed payment handling</li>
                        <li>• Email notifications</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Funds Transfer */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">3. Funds Transfer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Stripe holds the funds for security, then transfers them to your bank account 
                      according to your payout schedule.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Timeline:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 7-day settlement period</li>
                        <li>• Daily or weekly payouts</li>
                        <li>• Automatic transfers</li>
                        <li>• Real-time tracking</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Payment Timing Info */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-transparent">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-3">Important Payment Timing Information</h3>
                    <p className="text-muted-foreground mb-4">
                      When a customer's payment is processed, Stripe typically holds the funds for about 7 days 
                      before transferring them to your bank account. This is standard practice for payment processors 
                      to ensure transaction security and handle any potential disputes.
                    </p>
                    <div className="bg-background/50 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">What This Means:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Payment is processed immediately</li>
                        <li>• Funds are held for security purposes</li>
                        <li>• Transfer to your bank takes ~7 days</li>
                        <li>• This is standard across all payment processors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits of Automation */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Benefits of Payment Automation
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Transform your business operations with automated payments that work 24/7, 
                giving you more time to focus on what you do best.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* No Manual Invoicing */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">No Manual Invoicing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Eliminate the time-consuming process of creating, sending, and tracking invoices.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Time Saved:</h4>
                      <p className="text-sm text-muted-foreground">
                        5-10 hours per week on admin tasks
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reliable Income */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Reliable Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Know exactly when payments will arrive, making financial planning much easier.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                      <p className="text-sm text-muted-foreground">
                        Predictable cash flow and better planning
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fewer Missed Payments */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Fewer Missed Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Stripe's smart retry logic and customer communication reduces payment failures.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Success Rate:</h4>
                      <p className="text-sm text-muted-foreground">
                        95%+ payment success rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bank-Level Security */}
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Bank-Level Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Stripe handles all security and compliance, so you don't have to worry about it.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Protection:</h4>
                      <p className="text-sm text-muted-foreground">
                        PCI compliance and fraud protection
                      </p>
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
                Real-World Payment Success Stories
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how local service businesses have transformed their payment processes 
                with Stripe-powered automation through Monthly Club.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hairdresser */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Sarah's Hair Studio</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Beauty Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Before Stripe:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Chasing payments weekly<br/>
                        • 30% late payments<br/>
                        • 5 hours/week on admin
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">After Stripe:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 100% automated payments<br/>
                        • 95% on-time payments<br/>
                        • 1 hour/week on admin
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 80% reduction in admin time<br/>
                        • 40% increase in revenue<br/>
                        • 90% customer satisfaction
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cleaning Service */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">CleanPro Services</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Cleaning Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Before Stripe:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Manual invoicing system<br/>
                        • 25% payment delays<br/>
                        • Constant follow-ups
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">After Stripe:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Fully automated billing<br/>
                        • 98% payment success<br/>
                        • Zero payment chasing
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 15 hours/week saved<br/>
                        • 50% increase in efficiency<br/>
                        • 100% payment reliability
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Trainer */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">FitLife Training</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Training Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Before Stripe:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Cash and check payments<br/>
                        • 20% no-shows<br/>
                        • Inconsistent income
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">After Stripe:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Automatic monthly billing<br/>
                        • 95% attendance rate<br/>
                        • Predictable income
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 60% increase in retention<br/>
                        • 35% increase in revenue<br/>
                        • 8 hours/week saved
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* No Tech Skills Needed */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                No Tech Skills Needed
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club was built for people who are great at what they do — not developers. 
                Stripe is seamlessly integrated, so you can focus on your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Instant Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No technical configuration required. Stripe is pre-integrated and ready to use.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Simple Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Everything managed through Monthly Club's intuitive dashboard. No separate tools to learn.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Secure by Default</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bank-level security and compliance handled automatically by Stripe.
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-green-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Automate Your Payments?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Start collecting payments automatically with Stripe integration. 
                  No technical setup required — just create your plans and start earning.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Automating Payments
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
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="automate-payments-stripe-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Automate Payments with Stripe | Complete Guide | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/automate-payments-stripe",
          "description": "Learn how Stripe powers automatic recurring payments for your subscription services. No chasing, no invoices — just reliable income with bank-level security.",
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
