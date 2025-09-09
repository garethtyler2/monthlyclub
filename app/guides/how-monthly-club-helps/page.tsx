import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How Monthly Club Helps Service Businesses | Complete Guide | Monthly Club",
  description: "Discover how Monthly Club empowers local service businesses to create, manage, and grow subscription plans. Less admin, more recurring revenue with our simple platform.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/how-monthly-club-helps"
  },
  openGraph: {
    title: "How Monthly Club Helps Service Businesses | Complete Guide | Monthly Club",
    description: "Discover how Monthly Club empowers local service businesses to create, manage, and grow subscription plans. Less admin, more recurring revenue.",
    url: "https://www.monthlyclubhq.com/guides/how-monthly-club-helps",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Monthly Club Helps Service Businesses | Complete Guide | Monthly Club",
    description: "Discover how Monthly Club empowers local service businesses to create, manage, and grow subscription plans. Less admin, more recurring revenue.",
  },
  keywords: [
    "monthly club platform",
    "subscription management",
    "service business tools",
    "recurring revenue platform",
    "local business software",
    "subscription billing",
    "service provider tools",
    "business automation"
  ]
};

export default function HowMonthlyClubHelpsPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-purple-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Platform Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              How Monthly Club Helps Service Businesses
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how Monthly Club empowers local service businesses to create, manage, and grow 
              subscription plans with minimal admin and maximum results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Growing Today
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
                <div className="text-3xl font-bold text-primary mb-2">5min</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">90%</div>
                <div className="text-sm text-muted-foreground">Less Admin</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Product Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Automated</div>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Local Pros */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built for Local Service Professionals
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Whether you're a mobile hairdresser, dog walker, cleaner, or personal trainer — 
                Monthly Club helps you turn one-time jobs into steady, recurring income.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Who It's For</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Mobile service providers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Local business owners</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Solo entrepreneurs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Small team leaders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Non-techy business owners</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">What It Solves</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Inconsistent bookings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Payment chasing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Admin overwhelm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Unpredictable income</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Customer retention</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Everything You Need */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything You Need to Launch
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club provides all the tools you need to start offering subscriptions 
                without any technical knowledge or complex setup.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Public Service Page */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Public Service Page</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      A professional page you can share anywhere — social media, email, business cards.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Your logo and description</li>
                        <li>• All subscription plans</li>
                        <li>• Customer reviews</li>
                        <li>• Contact information</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stripe Integration */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Stripe-Powered Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Secure, automated payment processing with recurring billing handled by Stripe.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Automatic recurring billing</li>
                        <li>• Multiple payment methods</li>
                        <li>• Secure payment forms</li>
                        <li>• Failed payment retry</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plan Creation */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Easy Plan Creation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Create subscription plans with pricing, frequency, and details in minutes.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 4 flexible product types</li>
                        <li>• Custom pricing options</li>
                        <li>• Flexible scheduling</li>
                        <li>• Easy plan management</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Simple Login */}
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Simple Email Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      No passwords or tech skills needed — just your email address.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Email-only login</li>
                        <li>• No passwords to remember</li>
                        <li>• Mobile-friendly interface</li>
                        <li>• Instant access</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Management */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Customer Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Track all your subscribers, their plans, and payment history in one place.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Customer database</li>
                        <li>• Subscription tracking</li>
                        <li>• Payment history</li>
                        <li>• Communication tools</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics & Reports */}
              <Card className="border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Analytics & Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Simple reports to track your revenue, customer growth, and business performance.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Revenue tracking</li>
                        <li>• Customer analytics</li>
                        <li>• Tax reports</li>
                        <li>• CSV export</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Grow Without the Hassle */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Grow Without the Hassle
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Instead of chasing bookings or unpaid invoices, you'll see your income arrive on schedule. 
                Focus on doing the work — not managing spreadsheets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Before Monthly Club */}
              <Card className="border border-red-500/20 bg-gradient-to-b from-red-500/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-400 mb-4">❌ Before Monthly Club</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-red-400">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-200">Chasing Bookings</h4>
                        <p className="text-sm text-muted-foreground">Hours spent calling, texting, and following up</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-red-400">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-200">Payment Chasing</h4>
                        <p className="text-sm text-muted-foreground">Sending invoices, following up on late payments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-red-400">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-200">Unpredictable Income</h4>
                        <p className="text-sm text-muted-foreground">Never knowing what you'll earn each month</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-red-400">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-200">Admin Overwhelm</h4>
                        <p className="text-sm text-muted-foreground">Spreadsheets, calendars, payment tracking</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* After Monthly Club */}
              <Card className="border border-green-500/20 bg-gradient-to-b from-green-500/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-400 mb-4">✅ After Monthly Club</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-green-400">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-200">Automated Bookings</h4>
                        <p className="text-sm text-muted-foreground">Customers book and pay automatically</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-green-400">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-200">Automatic Payments</h4>
                        <p className="text-sm text-muted-foreground">Money arrives on schedule, every time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-green-400">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-200">Predictable Income</h4>
                        <p className="text-sm text-muted-foreground">Know exactly what you'll earn each month</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-green-400">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-200">Minimal Admin</h4>
                        <p className="text-sm text-muted-foreground">Everything automated, focus on your work</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Real-World Success Stories
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how local service professionals have transformed their businesses 
                with Monthly Club's subscription platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mobile Therapist */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Mobile Therapist</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Therapy Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Challenge:</h4>
                      <p className="text-sm text-muted-foreground">
                        Spending hours chasing appointments and dealing with late cancellations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Solution:</h4>
                      <p className="text-sm text-muted-foreground">
                        Created "Monthly Massage Plan" with automatic bookings and payments.
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 12 recurring clients<br/>
                        • 15 hours/week saved<br/>
                        • 90% reduction in cancellations<br/>
                        • 40% increase in revenue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dog Walker */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Dog Walker</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Pet Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Challenge:</h4>
                      <p className="text-sm text-muted-foreground">
                        Inconsistent bookings and difficulty managing multiple clients.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Solution:</h4>
                      <p className="text-sm text-muted-foreground">
                        Set up weekly and monthly walking plans with automated scheduling.
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 20 regular clients<br/>
                        • 10 hours/week saved<br/>
                        • 95% client retention<br/>
                        • 50% increase in income
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Hairdresser */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Mobile Hairdresser</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Beauty Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Challenge:</h4>
                      <p className="text-sm text-muted-foreground">
                        Managing bookings across multiple clients and locations.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Solution:</h4>
                      <p className="text-sm text-muted-foreground">
                        Created monthly cut & style plans with Balance Builder options.
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 15 recurring clients<br/>
                        • 8 hours/week saved<br/>
                        • 80% reduction in no-shows<br/>
                        • 35% increase in revenue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Built to Be Simple */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built to Be Simple
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We designed Monthly Club for the non-techy business owner. Everything is streamlined, 
                clean, and built to help you earn more with less friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Quick Setup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get started in under 10 minutes. No technical knowledge or complex setup required.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Mobile-First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Designed for mobile use. Manage your business from anywhere, anytime.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Automated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Set it and forget it. Everything runs automatically once configured.
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-purple-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Join thousands of service professionals already using Monthly Club to build 
                  predictable revenue and grow their businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Growing Today
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
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="how-monthly-club-helps-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "How Monthly Club Helps Service Businesses",
          "url": "https://www.monthlyclubhq.com/guides/how-monthly-club-helps",
          "description": "Discover how Monthly Club empowers local service businesses to create, manage, and grow subscription plans. Less admin, more recurring revenue.",
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
