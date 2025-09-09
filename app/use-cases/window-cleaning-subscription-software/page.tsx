import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Users, Calendar, Shield, Zap, TrendingUp, Clock, Home, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Window Cleaning Subscription Software | Monthly Club",
  description: "Transform your window cleaning business with recurring revenue. Manage subscriptions, automate billing, and grow your customer base with Monthly Club.",
  keywords: "window cleaning subscriptions, recurring window cleaning, window cleaning software, subscription billing, window cleaning business",
  openGraph: {
    title: "Window Cleaning Subscription Software | Monthly Club",
    description: "Transform your window cleaning business with recurring revenue. Manage subscriptions, automate billing, and grow your customer base with Monthly Club.",
    type: "website",
  },
};

const pricingTiers = [
  {
    name: "Residential Basic",
    price: "£25",
    period: "per month",
    description: "Perfect for small homes and apartments",
    features: [
      "Monthly window cleaning",
      "Up to 10 windows",
      "Interior & exterior",
      "Basic frame cleaning",
      "Streak-free guarantee"
    ],
    popular: false
  },
  {
    name: "Residential Premium",
    price: "£45",
    period: "per month",
    description: "Ideal for larger homes and regular maintenance",
    features: [
      "Bi-weekly window cleaning",
      "Up to 20 windows",
      "Interior & exterior",
      "Frame & sill cleaning",
      "Screen cleaning included",
      "Priority scheduling"
    ],
    popular: true
  },
  {
    name: "Commercial",
    price: "£120",
    period: "per month",
    description: "Professional service for offices and retail",
    features: [
      "Weekly window cleaning",
      "Unlimited windows",
      "Interior & exterior",
      "Frame & sill cleaning",
      "Screen cleaning included",
      "Flexible scheduling",
      "Monthly reports"
    ],
    popular: false
  }
];

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-brand-purple" />,
    title: "Automated Scheduling",
    description: "Set up recurring appointments that sync with your calendar and send reminders to customers."
  },
  {
    icon: <Zap className="h-6 w-6 text-brand-purple" />,
    title: "Instant Billing",
    description: "Automatically charge customers on their chosen payment day with Stripe-powered recurring payments."
  },
  {
    icon: <Users className="h-6 w-6 text-brand-purple" />,
    title: "Customer Management",
    description: "Track customer preferences, service history, and special requirements in one place."
  },
  {
    icon: <Shield className="h-6 w-6 text-brand-purple" />,
    title: "Reliable Payments",
    description: "Reduce no-shows and late payments with automated billing and failed payment recovery."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-brand-purple" />,
    title: "Growth Analytics",
    description: "Monitor your recurring revenue, customer retention, and identify growth opportunities."
  },
  {
    icon: <Clock className="h-6 w-6 text-brand-purple" />,
    title: "Time Savings",
    description: "Spend less time on admin and more time cleaning windows with automated processes."
  }
];

const realWorldExamples = [
  {
    business: "Example Window Cleaning A",
    setup: "Residential Premium + Commercial",
    revenue: "£3,200/month recurring",
    customers: "45 residential + 8 commercial",
    testimonial: "Monthly Club transformed our business. We went from chasing payments to predictable income."
  },
  {
    business: "Example Window Cleaning B",
    setup: "Commercial focus",
    revenue: "£8,500/month recurring",
    customers: "25 commercial clients",
    testimonial: "The automated billing saves us 10 hours per week. Our customers love the convenience."
  },
  {
    business: "Example Window Cleaning C",
    setup: "Residential Basic + Premium",
    revenue: "£1,800/month recurring",
    customers: "60 residential clients",
    testimonial: "We've grown from 20 to 60 customers in 6 months. The recurring model works perfectly."
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let customers build credit for any future window cleaning services with a single flexible subscription",
    examples: [
      "£20/month (adjustable anytime) - use for deep cleaning services when needed",
      "£15/month (adjustable anytime) - use for additional windows or special treatments",
      "£30/month (adjustable anytime) - use for seasonal deep cleans and maintenance"
    ],
    benefits: ["Predictable income", "Customer commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products",
    description: "Offer annual window cleaning packages with monthly payment plans",
    examples: [
      "Annual deep clean package (£400) paid over 12 months",
      "Seasonal maintenance package (£200) paid over 6 months",
      "Commercial contract (£1,200) paid over 12 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Customer convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual services and add-ons alongside subscriptions",
    examples: [
      "One-off deep clean (£80-150 per property)",
      "Gutter cleaning add-on (£40-80 per property)",
      "Window frame painting (£120-300 per property)",
      "Emergency call-out (£60-100 per visit)"
    ],
    benefits: ["Additional revenue", "Customer upsells", "Flexible offerings", "Easy add-ons"]
  }
];

export default function WindowCleaningSubscriptionSoftware() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Back to Use Cases */}
      <div className="container mx-auto px-6 pt-6">
        <Link href="/use-cases" className="text-brand-purple hover:underline">← Back to Use Cases</Link>
      </div>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
              Window Cleaning Subscription Software
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your window cleaning business with recurring revenue. Manage subscriptions, 
              automate billing, and grow your customer base with Monthly Club.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary w-full sm:w-auto">
                <Link href="/create-a-business">Start Your Window Cleaning Business</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Grow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-brand-purple/10 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Window Cleaning Subscription Plans</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your window cleaning business. All plans include automated billing, 
            customer management, and growth analytics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'ring-2 ring-brand-purple shadow-lg' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-brand-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground ml-2">{tier.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full mt-6" variant={tier.popular ? "default" : "outline"}>
                    <Link href="/create-a-business">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Three Ways to Monetize Your Window Cleaning Business */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Three Ways to Monetize Your Window Cleaning Business</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Monthly Club offers flexible product types to help you generate revenue and improve customer experience.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {productTypes.map((product, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-brand-purple">{product.type}</CardTitle>
                  <CardDescription className="text-base">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {product.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start">
                            <span className="text-brand-purple mr-2">•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.benefits.map((benefit, benefitIndex) => (
                          <span key={benefitIndex} className="bg-brand-purple/10 text-brand-purple px-2 py-1 rounded text-xs">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Real Window Cleaning Businesses</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            See how window cleaning professionals are using Monthly Club to build recurring revenue and grow their businesses.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {realWorldExamples.map((example, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{example.business}</CardTitle>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">Setup: </span>
                      <span className="text-muted-foreground">{example.setup}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Revenue: </span>
                      <span className="text-green-600 font-bold">{example.revenue}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Customers: </span>
                      <span className="text-muted-foreground">{example.customers}</span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-sm italic text-muted-foreground">"{example.testimonial}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learn More About Subscriptions */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Learn More About Subscriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>What is a Service Subscription?</CardTitle>
                <CardDescription>Understand the basics of subscription business models and how they work</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/guides/what-is-a-service-subscription">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Pricing Your Plans</CardTitle>
                <CardDescription>Learn how to price your subscription services effectively</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/guides/pricing-subscription-plans-service-business">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Balance Builder Guide</CardTitle>
                <CardDescription>Understand prepaid credit subscriptions and when to use them</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/guides/balance-builder-subscriptions-guide">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-brand-purple to-brand-blue text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Window Cleaning Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of window cleaning professionals who are already growing their businesses with recurring revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="hero-button-primary">
              <Link href="/create-a-business">Start Your Business Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-purple">
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
