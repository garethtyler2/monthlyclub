import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Recurring Revenue Benefits | Complete Guide | Monthly Club",
  description: "Discover how recurring revenue transforms local service businesses with predictable income, reduced admin, and stronger customer relationships. Learn the financial benefits of subscriptions.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/recurring-revenue-benefits"
  },
  openGraph: {
    title: "Recurring Revenue Benefits | Complete Guide | Monthly Club",
    description: "Discover how recurring revenue transforms local service businesses with predictable income, reduced admin, and stronger customer relationships.",
    url: "https://www.monthlyclubhq.com/guides/recurring-revenue-benefits",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recurring Revenue Benefits | Complete Guide | Monthly Club",
    description: "Discover how recurring revenue transforms local service businesses with predictable income, reduced admin, and stronger customer relationships.",
  },
  keywords: [
    "recurring revenue",
    "subscription benefits",
    "predictable income",
    "service business revenue",
    "subscription model",
    "recurring payments",
    "business stability",
    "customer retention"
  ]
};

export default function RecurringRevenueBenefitsPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-green-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <DollarSign className="w-4 h-4" />
              Financial Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Benefits of Recurring Revenue
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how recurring revenue transforms local service businesses with predictable income, 
              reduced admin, and stronger customer relationships that drive long-term growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Your Journey
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
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Revenue Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">90%</div>
                <div className="text-sm text-muted-foreground">Less Admin</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3x</div>
                <div className="text-sm text-muted-foreground">Customer Retention</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Automated</div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Recurring Revenue */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What is Recurring Revenue?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Recurring revenue means your customers pay you regularly — typically weekly, monthly, or quarterly — 
                instead of booking sporadically. It's the foundation of subscription-based business models.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Traditional vs Recurring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-50/20 border border-red-200/20 rounded-lg p-4">
                      <h4 className="font-semibold text-red-200 mb-2">❌ Traditional Model</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Inconsistent bookings</li>
                        <li>• Chasing payments constantly</li>
                        <li>• Unpredictable income</li>
                        <li>• High customer acquisition costs</li>
                      </ul>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-4">
                      <h4 className="font-semibold text-green-200 mb-2">✅ Recurring Model</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Predictable monthly income</li>
                        <li>• Automated payments</li>
                        <li>• Stable cash flow</li>
                        <li>• Lower acquisition costs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Why It's Powerful</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Financial Stability</h4>
                        <p className="text-sm text-muted-foreground">Plan months ahead knowing your income won't suddenly drop</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Operational Efficiency</h4>
                        <p className="text-sm text-muted-foreground">No more constant re-booking, reminders, or chasing invoices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Customer Loyalty</h4>
                        <p className="text-sm text-muted-foreground">Subscribers stick with you longer and value consistency</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Better Cash Flow</h4>
                        <p className="text-sm text-muted-foreground">Predictable income makes budgeting and reinvestment easier</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Financial Benefits */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Financial Benefits of Recurring Revenue
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Transform your business finances with predictable income streams that grow over time 
                and provide the stability needed for long-term success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Predictable Income */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Predictable Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Know exactly what you'll earn each month, making it easier to plan, budget, and invest in growth.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Example:</h4>
                      <p className="text-sm text-muted-foreground">
                        Instead of £2,000-£8,000/month (unpredictable), you know you'll earn £5,500/month consistently.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reduced Admin Costs */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Reduced Admin Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Automated payments and scheduling reduce the time spent on administrative tasks by up to 90%.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Time Savings:</h4>
                      <p className="text-sm text-muted-foreground">
                        Save 10+ hours per week on invoicing, payment chasing, and rebooking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Higher Customer Value */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Higher Customer Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Subscribers typically spend 3x more over their lifetime compared to one-time customers.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Lifetime Value:</h4>
                      <p className="text-sm text-muted-foreground">
                        One-time customer: £200 | Subscriber: £600+ over 12 months
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Better Cash Flow */}
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Better Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Consistent monthly income makes it easier to manage expenses and plan for growth investments.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Planning Power:</h4>
                      <p className="text-sm text-muted-foreground">
                        Know exactly when you can hire, expand, or invest in new equipment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lower Churn Rate */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Lower Churn Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Subscribers are 3x more likely to stay with your business long-term compared to one-time customers.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Retention:</h4>
                      <p className="text-sm text-muted-foreground">
                        One-time: 20% return | Subscribers: 60%+ retention
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Easier Scaling */}
              <Card className="border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Easier Scaling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Predictable revenue makes it easier to secure loans, hire staff, and plan expansion.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Growth Planning:</h4>
                      <p className="text-sm text-muted-foreground">
                        Banks and investors prefer businesses with recurring revenue models.
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
                Real-World Success Stories
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how local service businesses have transformed their operations and finances 
                by implementing recurring revenue models.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Dog Grooming Service */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Dog Grooming Service</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Grooming Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Before (Traditional):</h4>
                      <p className="text-sm text-muted-foreground">
                        • Inconsistent bookings<br/>
                        • Chasing payments weekly<br/>
                        • £2,000-£4,000/month income<br/>
                        • High no-show rate
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">After (Recurring):</h4>
                      <p className="text-sm text-muted-foreground">
                        • £45/month bi-monthly plans<br/>
                        • Automated payments<br/>
                        • £5,400/month predictable income<br/>
                        • 90% reduction in no-shows
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 35% increase in revenue<br/>
                        • 10 hours/week saved on admin<br/>
                        • 95% customer retention rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cleaning Service */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Cleaning Service</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Cleaning Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Before (Traditional):</h4>
                      <p className="text-sm text-muted-foreground">
                        • Irregular weekly bookings<br/>
                        • Constant rebooking calls<br/>
                        • £3,000-£6,000/month income<br/>
                        • High customer acquisition costs
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">After (Recurring):</h4>
                      <p className="text-sm text-muted-foreground">
                        • £80/month weekly plans<br/>
                        • Automated scheduling<br/>
                        • £8,000/month predictable income<br/>
                        • 60% reduction in acquisition costs
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 33% increase in revenue<br/>
                        • 15 hours/week saved on admin<br/>
                        • 85% customer retention rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Training */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Personal Training</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Training Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Before (Traditional):</h4>
                      <p className="text-sm text-muted-foreground">
                        • Session-by-session bookings<br/>
                        • Manual payment collection<br/>
                        • £1,500-£3,500/month income<br/>
                        • High client turnover
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">After (Recurring):</h4>
                      <p className="text-sm text-muted-foreground">
                        • £120/month training plans<br/>
                        • Automated monthly billing<br/>
                        • £6,000/month predictable income<br/>
                        • 70% reduction in client turnover
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 71% increase in revenue<br/>
                        • 8 hours/week saved on admin<br/>
                        • 80% client retention rate
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Implementation Benefits */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Implementation Benefits
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond financial gains, recurring revenue models provide operational and strategic 
                advantages that transform how you run your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Operational Benefits */}
              <Card className="border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Operational Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Automated Scheduling</h4>
                        <p className="text-sm text-muted-foreground">No more manual rebooking or reminder calls</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Reduced No-Shows</h4>
                        <p className="text-sm text-muted-foreground">Subscribers are more committed to their appointments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Better Planning</h4>
                        <p className="text-sm text-muted-foreground">Know your schedule weeks in advance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Streamlined Admin</h4>
                        <p className="text-sm text-muted-foreground">One-time setup, automated ongoing management</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strategic Benefits */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Strategic Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Competitive Advantage</h4>
                        <p className="text-sm text-muted-foreground">Stand out from competitors with better service</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Business Valuation</h4>
                        <p className="text-sm text-muted-foreground">Recurring revenue increases business value</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Growth Planning</h4>
                        <p className="text-sm text-muted-foreground">Easier to secure funding and plan expansion</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Customer Insights</h4>
                        <p className="text-sm text-muted-foreground">Better data for improving your services</p>
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
                Transform your service business with recurring revenue in minutes, not months. 
                No technical skills or complex setup required.
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
                    Create your business page and subscription plans in under 10 minutes. 
                    No coding or technical knowledge required.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">2. Automated Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Integrate with Stripe for secure, automated payment processing. 
                    Get paid on time, every time.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">3. Start Growing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Share your subscription page with customers and start building 
                    predictable revenue immediately.
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
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Join thousands of service businesses already using Monthly Club to build 
                  predictable revenue and stronger customer relationships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Your Journey
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

      <Script id="recurring-revenue-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Benefits of Recurring Revenue for Local Businesses",
          "url": "https://www.monthlyclubhq.com/guides/recurring-revenue-benefits",
          "description": "Discover how recurring revenue transforms local service businesses with predictable income, reduced admin, and stronger customer relationships.",
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
