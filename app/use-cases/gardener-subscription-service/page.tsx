import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Users, Calendar, Shield, Zap, TrendingUp, Clock, Heart, TreePine, Home, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Gardener Subscription Service Software | Monthly Club",
  description: "Build recurring revenue with gardening subscriptions. Manage lawn care, garden maintenance, and seasonal services with Monthly Club.",
  keywords: "gardener subscription service, garden maintenance subscriptions, lawn care subscriptions, gardening software, subscription billing, gardener business",
  openGraph: {
    title: "Gardener Subscription Service Software | Monthly Club",
    description: "Build recurring revenue with gardening subscriptions. Manage lawn care, garden maintenance, and seasonal services with Monthly Club.",
    type: "website",
  },
};

const pricingTiers = [
  {
    name: "Garden Maintenance Basic",
    price: "£45",
    period: "per month",
    description: "Perfect for small gardens and basic maintenance",
    features: [
      "Monthly garden visit",
      "Lawn mowing & edging",
      "Basic weeding",
      "Leaf clearing",
      "Hedge trimming"
    ],
    popular: false
  },
  {
    name: "Garden Maintenance Premium",
    price: "£85",
    period: "per month",
    description: "Ideal for larger gardens and comprehensive care",
    features: [
      "Bi-weekly garden visits",
      "Lawn mowing & edging",
      "Weeding & pruning",
      "Seasonal planting",
      "Hedge & shrub maintenance",
      "Garden waste removal"
    ],
    popular: true
  },
  {
    name: "Garden Care Complete",
    price: "£150",
    period: "per month",
    description: "Full-service garden care including design",
    features: [
      "Weekly garden visits",
      "Complete lawn care",
      "Plant care & maintenance",
      "Seasonal garden design",
      "Garden waste removal",
      "Plant health monitoring",
      "Priority scheduling"
    ],
    popular: false
  }
];

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-brand-purple" />,
    title: "Seasonal Scheduling",
    description: "Manage garden visits, seasonal tasks, and weather-dependent work with smart scheduling."
  },
  {
    icon: <Zap className="h-6 w-6 text-brand-purple" />,
    title: "Automated Billing",
    description: "Charge customers automatically with Stripe-powered recurring payments and seasonal adjustments."
  },
  {
    icon: <Users className="h-6 w-6 text-brand-purple" />,
    title: "Garden & Client Management",
    description: "Track garden conditions, plant preferences, and client requirements in one place."
  },
  {
    icon: <Shield className="h-6 w-6 text-brand-purple" />,
    title: "Reliable Payments",
    description: "Reduce payment delays with automated billing and seasonal payment plans."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-brand-purple" />,
    title: "Growth Analytics",
    description: "Monitor your recurring revenue, seasonal patterns, and identify expansion opportunities."
  },
  {
    icon: <TreePine className="h-6 w-6 text-brand-purple" />,
    title: "Garden Excellence",
    description: "Focus on creating beautiful gardens while we handle the business side."
  }
];

const realWorldExamples = [
  {
    business: "Example Gardening Business A",
    location: "Major City",
    setup: "Garden Maintenance Premium + Seasonal",
    revenue: "£2,800/month recurring",
    customers: "35 garden clients",
    testimonial: "Monthly Club transformed our gardening business. We went from seasonal chaos to predictable income year-round."
  },
  {
    business: "Example Gardening Business B",
    location: "Major City",
    setup: "Garden Care Complete focus",
    revenue: "£4,200/month recurring",
    customers: "28 garden clients",
    testimonial: "The automated billing saves us hours every week. Garden owners love the convenience and reliability."
  },
  {
    business: "Example Gardening Business C",
    location: "Major City",
    setup: "Garden Maintenance Basic + Premium mix",
    revenue: "£1,900/month recurring",
    customers: "45 garden clients",
    testimonial: "We've grown from 15 to 45 customers in 8 months. The recurring model works perfectly for garden care."
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let garden owners build credit for any future garden services with a single flexible subscription",
    examples: [
      "£30/month (adjustable anytime) - use for seasonal garden makeovers when needed",
      "£25/month (adjustable anytime) - use for additional services and plant purchases",
      "£40/month (adjustable anytime) - use for garden design and landscaping projects"
    ],
    benefits: ["Predictable income", "Customer commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products",
    description: "Offer annual garden care packages with monthly payment plans",
    examples: [
      "Annual garden maintenance package (£800) paid over 12 months",
      "Seasonal garden makeover (£600) paid over 6 months",
      "Garden design project (£1,200) paid over 12 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Customer convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual services and add-ons alongside subscriptions",
    examples: [
      "One-off garden clean-up (£80-150 per visit)",
      "Tree pruning service (£100-300 per tree)",
      "Garden waste removal (£40-80 per load)",
      "Emergency garden repairs (£60-120 per hour)"
    ],
    benefits: ["Additional revenue", "Customer upsells", "Flexible offerings", "Easy add-ons"]
  }
];

const serviceTypes = [
  {
    title: "Lawn Care Services",
    description: "Regular lawn maintenance and care",
    services: [
      "Lawn mowing & edging",
      "Fertilizing & seeding",
      "Aeration & scarifying",
      "Weed control",
      "Seasonal treatments"
    ],
    pricing: "£25-50 per visit"
  },
  {
    title: "Garden Maintenance",
    description: "Ongoing garden care and upkeep",
    services: [
      "Weeding & pruning",
      "Plant care & watering",
      "Hedge trimming",
      "Leaf clearing",
      "Garden tidying"
    ],
    pricing: "£30-60 per visit"
  },
  {
    title: "Seasonal Services",
    description: "Specialized seasonal garden work",
    services: [
      "Spring garden preparation",
      "Summer plant care",
      "Autumn leaf clearing",
      "Winter garden protection",
      "Seasonal planting"
    ],
    pricing: "£50-120 per service"
  },
  {
    title: "Garden Design & Landscaping",
    description: "Creative garden design and installation",
    services: [
      "Garden design consultation",
      "Plant selection & placement",
      "Landscaping projects",
      "Garden makeovers",
      "Plant health monitoring"
    ],
    pricing: "£80-200 per service"
  }
];

export default function GardenerSubscriptionService() {
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
              Gardener Subscription Service Software
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Build recurring revenue with gardening subscriptions. Manage lawn care, garden maintenance, 
              and seasonal services with Monthly Club.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary">
                <Link href="/create-a-business">Start Your Gardening Business</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Garden Services You Can Offer</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            From lawn care to garden design, offer comprehensive gardening services that garden owners love and trust.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceTypes.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-brand-purple/10 rounded-full">
                      <TreePine className="h-6 w-6 text-brand-purple" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Services Include:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {service.services.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t">
                      <span className="font-semibold text-brand-purple">{service.pricing}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800/50">
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
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Garden Maintenance Subscription Plans</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your gardening business. All plans include automated billing, 
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

      {/* Three Ways to Monetize Your Gardening Business */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Three Ways to Monetize Your Gardening Business</h2>
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
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Real Gardening Businesses</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            See how gardening professionals are using Monthly Club to build recurring revenue and grow their businesses.
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
                  <CardDescription className="text-brand-purple font-medium">{example.location}</CardDescription>
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
            Ready to Start Your Gardening Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of gardening professionals who are already growing their businesses with recurring revenue.
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
