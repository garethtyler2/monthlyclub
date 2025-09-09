import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CreditCard, CheckCircle, Star, Users, TrendingUp, Calendar, DollarSign, Clock, Shield } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pay It Off | Buy Now Pay Later for Service Businesses | MonthlyClub",
  description: "Break down expensive services into manageable monthly payments. Pay It Off feature lets customers spread costs over time with flexible installment plans.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/features/pay-it-off"
  },
  openGraph: {
    title: "Pay It Off | Buy Now Pay Later for Service Businesses | MonthlyClub",
    description: "Break down expensive services into manageable monthly payments with flexible installment plans.",
    url: "https://www.monthlyclubhq.com/features/pay-it-off",
    siteName: "Monthly Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pay It Off | Buy Now Pay Later for Service Businesses | MonthlyClub",
    description: "Break down expensive services into manageable monthly payments with flexible installment plans.",
  },
  keywords: [
    "buy now pay later",
    "installment payments",
    "service business financing",
    "monthly payment plans",
    "flexible payment options",
    "subscription billing",
    "payment plans",
    "customer financing"
  ]
};

export default function PayItOffPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-purple-50/20 via-background to-pink-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CreditCard className="w-4 h-4" />
              Pay It Off Feature
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Pay It Off
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Break down expensive services into manageable monthly payments. 
              Make high-value packages accessible to more customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Offering Installments
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  View All Features
                </Button>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2-18</div>
                <div className="text-sm text-muted-foreground">Month Plans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0%</div>
                <div className="text-sm text-muted-foreground">Interest</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Secure</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Pay It Off Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Transform expensive services into affordable monthly payments. 
                Perfect for high-value packages that customers want but can't afford upfront.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="text-center border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">1. Set Package Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create high-value service packages (e.g., £1,200 tattoo sleeve, 
                    £800 personal training package, £600 beauty treatment plan).
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">2. Choose Payment Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Offer flexible installment options (2, 3, 4, 6, 12 or 18 months). 
                    Customers choose what works for their budget.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">3. Automated Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stripe handles recurring monthly payments automatically. 
                    You get paid upfront, customers pay over time.
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
                Why Pay It Off is Powerful
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                This feature opens up your high-value services to customers who might otherwise 
                not be able to afford them, while improving your cash flow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Customers */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Access to Premium Services</h4>
                        <p className="text-sm text-muted-foreground">Afford expensive packages they want</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">No Interest Charges</h4>
                        <p className="text-sm text-muted-foreground">Pay the same total price, just spread out</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Flexible Terms</h4>
                        <p className="text-sm text-muted-foreground">Choose 2, 3, 4, 6, 12 or 18 month plans</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Secure Payments</h4>
                        <p className="text-sm text-muted-foreground">Protected by Stripe's security</p>
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
                        <h4 className="font-semibold">Higher Average Order Value</h4>
                        <p className="text-sm text-muted-foreground">Sell more expensive packages</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Immediate Cash Flow*</h4>
                        <p className="text-sm text-muted-foreground">Get paid upfront, deliver over time</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          *Payment processed immediately, funds typically reach your bank account within 7 days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Reduced Price Objections</h4>
                        <p className="text-sm text-muted-foreground">£200/month sounds better than £2,400</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Customer Commitment</h4>
                        <p className="text-sm text-muted-foreground">Longer-term customer relationships</p>
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
                See how different businesses are using Pay It Off to sell more high-value packages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Tattoo Artist Example */}
              <Card className="border border-brand-slate/20 bg-gradient-to-b from-brand-slate/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Tattoo Artist</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Tattoo Studio A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Package:</h4>
                      <p className="text-lg font-bold text-primary">Full Sleeve Tattoo</p>
                      <p className="text-2xl font-bold text-primary">£2,400</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Payment Options:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 6 months: £400/month<br/>
                        • 12 months: £200/month<br/>
                        • 18 months: £133/month
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 3x more sleeve bookings, higher customer satisfaction
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
                      <h4 className="font-semibold">Package:</h4>
                      <p className="text-lg font-bold text-primary">6-Month Transformation</p>
                      <p className="text-2xl font-bold text-primary">£1,800</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Payment Options:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 3 months: £600/month<br/>
                        • 6 months: £300/month<br/>
                        • 9 months: £200/month
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 40% increase in package sales
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Beauty Salon Example */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Beauty Salon</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Beauty Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Package:</h4>
                      <p className="text-lg font-bold text-primary">Complete Makeover</p>
                      <p className="text-2xl font-bold text-primary">£1,200</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Payment Options:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 4 months: £300/month<br/>
                        • 6 months: £200/month<br/>
                        • 12 months: £100/month
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 60% more premium bookings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Payment Plans Comparison */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Flexible Payment Plans
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Offer multiple payment options to suit different customer budgets and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">3 Months</CardTitle>
                  <p className="text-2xl font-bold text-primary">33%</p>
                  <p className="text-sm text-muted-foreground">of total price</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Perfect for customers who want to pay off quickly.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">6 Months</CardTitle>
                  <p className="text-2xl font-bold text-primary">17%</p>
                  <p className="text-sm text-muted-foreground">of total price</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Most popular option for balanced payments.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">9 Months</CardTitle>
                  <p className="text-2xl font-bold text-primary">11%</p>
                  <p className="text-sm text-muted-foreground">of total price</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Great for higher-value packages.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">12 Months</CardTitle>
                  <p className="text-2xl font-bold text-primary">8%</p>
                  <p className="text-sm text-muted-foreground">of total price</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lowest monthly payments for maximum accessibility.
                  </p>
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
                Everything you need to manage Pay It Off subscriptions seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Stripe Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Bank-level security for all payment processing.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Payment Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Real-time tracking of payment progress and history.
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
                    Self-service portal for managing payment plans.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Auto-Retry</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automatic retry for failed payments with smart dunning.
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
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Start Selling More High-Value Packages
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Make your expensive services accessible to more customers with flexible payment plans.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Offering Installments
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Explore All Features
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="pay-it-off-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Pay It Off Feature",
          "url": "https://www.monthlyclubhq.com/features/pay-it-off",
          "description": "Break down expensive services into manageable monthly payments with flexible installment plans.",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Pay It Off",
            "description": "Buy now pay later system for service businesses",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web"
          }
        })}
      </Script>
    </>
  );
}
