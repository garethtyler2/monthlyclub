import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShoppingCart, CheckCircle, Star, Users, TrendingUp, Plus, Package, Zap } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "One-Time Purchases | Individual Services & Add-ons | MonthlyClub",
  description: "Sell individual services, add-ons, and standalone products alongside subscriptions. Perfect for one-off services and additional revenue streams.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/features/one-time-purchases"
  },
  openGraph: {
    title: "One-Time Purchases | Individual Services & Add-ons | MonthlyClub",
    description: "Sell individual services, add-ons, and standalone products alongside subscriptions.",
    url: "https://www.monthlyclubhq.com/features/one-time-purchases",
    siteName: "Monthly Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One-Time Purchases | Individual Services & Add-ons | MonthlyClub",
    description: "Sell individual services, add-ons, and standalone products alongside subscriptions.",
  },
  keywords: [
    "one-time purchases",
    "individual services",
    "add-on products",
    "standalone services",
    "service business sales",
    "one-off services",
    "additional revenue",
    "product catalog"
  ]
};

export default function OneTimePurchasesPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-50/20 via-background to-blue-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShoppingCart className="w-4 h-4" />
              One-Time Purchases Feature
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              One-Time Purchases
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Sell individual services, add-ons, and standalone products alongside your subscriptions. 
              Perfect for additional revenue streams and customer flexibility.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-lg px-8 py-4">
                  Start Selling Products
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
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Flexible</div>
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
                How One-Time Purchases Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Complement your subscription business with individual products and services. 
                Perfect for add-ons, one-off services, and standalone offerings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">1. Create Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Add individual services, add-ons, or standalone products to your catalog. 
                    Set prices, descriptions, and availability.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">2. Customer Purchase</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Customers can buy individual products anytime, alongside or instead of 
                    subscriptions. One-click checkout with Stripe.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="text-center border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">3. Instant Fulfillment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get paid immediately* and deliver the service. 
                    Perfect for one-off bookings and add-on services.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    *Payment processed immediately, funds typically reach your bank account within 7 days
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Perfect for These Use Cases
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                One-time purchases work alongside subscriptions to maximize revenue and customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Add-ons */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Add-on Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Enhance subscription services with additional offerings.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Extra cleaning sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Premium hair treatments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Additional training sessions</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* One-off Services */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">One-off Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Perfect for customers who prefer individual bookings.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Single appointments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Emergency services</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Trial sessions</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Standalone Products */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Standalone Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Sell physical or digital products alongside services.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Skincare products</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Cleaning supplies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Digital guides</span>
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
                See how different businesses use one-time purchases to boost revenue and customer satisfaction.
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
                      <h4 className="font-semibold">Subscription:</h4>
                      <p className="text-sm text-muted-foreground">Monthly hair maintenance (£80/month)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">One-Time Products:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Premium hair treatment: £45<br/>
                        • Eyebrow threading: £15<br/>
                        • Hair products: £25-£60<br/>
                        • Special occasion styling: £80
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 35% increase in average order value
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
                      <h4 className="font-semibold">Subscription:</h4>
                      <p className="text-sm text-muted-foreground">Weekly cleaning (£60/month)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">One-Time Products:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Deep clean: £120<br/>
                        • Window cleaning: £40<br/>
                        • Oven cleaning: £80<br/>
                        • Cleaning supplies: £15-£30
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 50% more revenue per customer
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
                      <h4 className="font-semibold">Subscription:</h4>
                      <p className="text-sm text-muted-foreground">Monthly training sessions (£120/month)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">One-Time Products:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Nutrition consultation: £75<br/>
                        • Body composition analysis: £50<br/>
                        • Workout plans: £25<br/>
                        • Supplements: £30-£80
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 40% increase in customer value
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
                Why One-Time Purchases Matter
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Complement your subscription business with individual products to maximize revenue and customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Customers */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Complete Flexibility</h4>
                        <p className="text-sm text-muted-foreground">Buy individual services when needed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Try Before Committing</h4>
                        <p className="text-sm text-muted-foreground">Test services before subscribing</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Add-on Convenience</h4>
                        <p className="text-sm text-muted-foreground">Enhance subscription services easily</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">No Commitment Pressure</h4>
                        <p className="text-sm text-muted-foreground">One-time purchases with no strings</p>
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
                        <h4 className="font-semibold">Higher Revenue Per Customer</h4>
                        <p className="text-sm text-muted-foreground">Increase average order value</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Customer Acquisition</h4>
                        <p className="text-sm text-muted-foreground">Lower barrier to entry for new customers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Upselling Opportunities</h4>
                        <p className="text-sm text-muted-foreground">Convert one-time buyers to subscribers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Inventory Management</h4>
                        <p className="text-sm text-muted-foreground">Sell physical products alongside services</p>
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
                Everything you need to manage one-time purchases seamlessly alongside subscriptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Instant Checkout</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    One-click purchasing with Stripe's secure payment processing.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Product Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Easy-to-manage product catalog with descriptions and pricing.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track sales performance and popular products.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Customer History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Complete purchase history for better customer service.
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
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Start Selling Individual Products
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Complement your subscriptions with one-time purchases and watch your revenue grow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-lg px-8 py-4">
                      Start Selling Products
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="one-time-purchases-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "One-Time Purchases Feature",
          "url": "https://www.monthlyclubhq.com/features/one-time-purchases",
          "description": "Sell individual services, add-ons, and standalone products alongside subscriptions.",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "One-Time Purchases",
            "description": "Individual product sales system for service businesses",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web"
          }
        })}
      </Script>
    </>
  );
}
