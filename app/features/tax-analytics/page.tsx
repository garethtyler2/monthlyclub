import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, CheckCircle, Star, Users, TrendingUp, Calculator, PieChart, FileText, DollarSign } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Tax Analytics | Simple Tax Reports | MonthlyClub",
  description: "View all transactions and subscriptions with basic tax calculations. Export simple reports in CSV format for your accountant.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/features/tax-analytics"
  },
  openGraph: {
    title: "Tax Analytics | Simple Tax Reports | MonthlyClub",
    description: "View all transactions and subscriptions with basic tax calculations. Export simple reports in CSV format.",
    url: "https://www.monthlyclubhq.com/features/tax-analytics",
    siteName: "Monthly Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Analytics | Simple Tax Reports | MonthlyClub",
    description: "View all transactions and subscriptions with basic tax calculations. Export simple reports in CSV format.",
  },
  keywords: [
    "tax reports",
    "transaction history",
    "subscription tracking",
    "CSV export",
    "basic analytics",
    "tax calculations",
    "simple reporting",
    "business records"
  ]
};

export default function TaxAnalyticsPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-teal-50/20 via-background to-blue-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Tax Analytics Feature
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Tax Analytics
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Simple tax reports for your subscription business. 
              View all transactions, see tax calculations, and export basic reports in CSV format.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Tracking Analytics
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
                <div className="text-3xl font-bold text-primary mb-2">All</div>
                <div className="text-sm text-muted-foreground">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1</div>
                <div className="text-sm text-muted-foreground">Simple Chart</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">CSV</div>
                <div className="text-sm text-muted-foreground">Export</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Tax Analytics Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Simple, straightforward tax reporting. View all your transactions, 
                see basic tax calculations, and export what you need for your accountant.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="text-center border border-brand-teal/20 bg-gradient-to-b from-brand-teal/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">1. View All Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See all your transactions and subscriptions in one place. 
                    Simple, straightforward list of everything that's happened.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">2. Basic Tax Calculation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    See tax calculations based on your selected tax year. 
                    One simple chart shows what you need to know.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">3. Export CSV</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Export your data in CSV format for your accountant. 
                    Simple, basic reports that get the job done.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Analytics Features */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Basic Tax Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Simple, straightforward tax reporting tools that give you what you need without the complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Revenue Tracking */}
              <Card className="border border-brand-teal/20 bg-gradient-to-b from-brand-teal/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Revenue Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Track all revenue streams and understand your income patterns.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Monthly revenue trends</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Subscription vs one-time sales</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Customer lifetime value</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Revenue forecasting</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tax Calculations */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Tax Calculations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Automatic tax calculations and compliance reporting.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Basic tax calculations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Tax-exempt transactions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Quarterly tax summaries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Tax liability tracking</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Insights */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <PieChart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Business Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Deep insights into your business performance and growth opportunities.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Customer acquisition costs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Churn rate analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Profit margin tracking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Growth recommendations</span>
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
                See how different businesses use tax analytics to make better decisions and grow faster.
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
                      <h4 className="font-semibold">Key Metrics Tracked:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Monthly revenue: £8,500<br/>
                        • Average customer value: £120<br/>
                        • Tax liability: £1,700/month<br/>
                        • Profit margin: 65%
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Insights Discovered:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Subscription customers spend 40% more<br/>
                        • Peak revenue on weekends<br/>
                        • Best-selling service: hair coloring
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 25% increase in profit margins
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
                      <h4 className="font-semibold">Key Metrics Tracked:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Monthly revenue: £12,000<br/>
                        • Client retention rate: 85%<br/>
                        • Tax liability: £2,400/month<br/>
                        • Profit margin: 70%
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Insights Discovered:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Group sessions are 3x more profitable<br/>
                        • New clients convert best in January<br/>
                        • Referral program generates 30% of revenue
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 40% increase in revenue
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
                      <h4 className="font-semibold">Key Metrics Tracked:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Monthly revenue: £15,000<br/>
                        • Customer lifetime value: £480<br/>
                        • Tax liability: £3,000/month<br/>
                        • Profit margin: 55%
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Insights Discovered:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Commercial clients are most profitable<br/>
                        • Seasonal demand peaks in spring<br/>
                        • Add-on services increase value by 60%
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 35% increase in customer value
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
                Why Tax Analytics Matter
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Understanding your financial performance is crucial for making informed decisions and growing your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Business Growth */}
              <Card className="border border-brand-teal/20 bg-gradient-to-b from-brand-teal/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Business Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Data-Driven Decisions</h4>
                        <p className="text-sm text-muted-foreground">Make informed choices based on real data</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Identify Opportunities</h4>
                        <p className="text-sm text-muted-foreground">Spot trends and growth opportunities early</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Optimize Pricing</h4>
                        <p className="text-sm text-muted-foreground">Set prices based on profit margins and demand</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Track Progress</h4>
                        <p className="text-sm text-muted-foreground">Monitor growth and measure success</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Compliance */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Tax Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Automatic Calculations</h4>
                        <p className="text-sm text-muted-foreground">No more manual tax calculations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Audit Trail</h4>
                        <p className="text-sm text-muted-foreground">Complete record of all transactions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Report Generation</h4>
                        <p className="text-sm text-muted-foreground">Basic reports for your accountant</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Peace of Mind</h4>
                        <p className="text-sm text-muted-foreground">Stay compliant without stress</p>
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
                Everything you need to track, analyze, and report on your business performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Simple Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    One basic chart showing your tax calculations for the selected year.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Tax Calculations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Basic tax calculations based on your selected tax year.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Export Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Export your data in CSV format for your accountant.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <PieChart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View all your transactions and subscriptions in one simple list.
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
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Start Tracking Your Success
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Get the basic tax information you need with simple, straightforward reporting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Tracking Analytics
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="tax-analytics-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Tax Analytics Feature",
          "url": "https://www.monthlyclubhq.com/features/tax-analytics",
          "description": "Simple tax reports for your subscription business. View transactions, see tax calculations, and export CSV.",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Tax Analytics",
            "description": "Simple tax reporting and basic analytics tools",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web"
          }
        })}
      </Script>
    </>
  );
}
