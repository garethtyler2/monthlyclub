import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Users, Calendar, Shield, Zap, TrendingUp, Clock, Heart, Palette, Home, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tattoo Artist Buy Now Pay Later Software | Monthly Club",
  description: "Transform your tattoo business with flexible payment plans. Offer buy now pay later, installment plans, and recurring sessions with Monthly Club.",
  keywords: "tattoo artist buy now pay later, tattoo payment plans, tattoo installment payments, tattoo subscription software, tattoo artist software, tattoo business",
  openGraph: {
    title: "Tattoo Artist Buy Now Pay Later Software | Monthly Club",
    description: "Transform your tattoo business with flexible payment plans. Offer buy now pay later, installment plans, and recurring sessions with Monthly Club.",
    type: "website",
  },
};

const pricingTiers = [
  {
    name: "Tattoo Consultation",
    price: "£50",
    period: "per session",
    description: "Perfect for initial consultations and small pieces",
    features: [
      "Design consultation",
      "Size and placement advice",
      "Price estimation",
      "Scheduling flexibility",
      "Design revisions included"
    ],
    popular: false
  },
  {
    name: "Tattoo Session Package",
    price: "£200-500",
    period: "per session",
    description: "Ideal for medium to large tattoo work",
    features: [
      "2-4 hour sessions",
      "Professional tattoo work",
      "Aftercare instructions",
      "Touch-up included",
      "Flexible scheduling"
    ],
    popular: true
  },
  {
    name: "Full Sleeve Project",
    price: "£1,500-3,000",
    period: "total project",
    description: "Complete sleeve or large piece projects",
    features: [
      "Multiple sessions",
      "Custom design work",
      "Progress tracking",
      "Aftercare package",
      "Lifetime touch-ups"
    ],
    popular: false
  }
];

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-brand-purple" />,
    title: "Session Scheduling",
    description: "Manage multiple tattoo sessions, consultations, and follow-ups with automated reminders."
  },
  {
    icon: <Zap className="h-6 w-6 text-brand-purple" />,
    title: "Flexible Payment Plans",
    description: "Offer buy now pay later, installment plans, and recurring payments for ongoing work."
  },
  {
    icon: <Users className="h-6 w-6 text-brand-purple" />,
    title: "Client Portfolio Management",
    description: "Track client preferences, tattoo history, and project progress in one place."
  },
  {
    icon: <Shield className="h-6 w-6 text-brand-purple" />,
    title: "Secure Payments",
    description: "Process large payments safely with Stripe-powered secure payment processing."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-brand-purple" />,
    title: "Revenue Growth",
    description: "Increase average order value with flexible payment options and recurring clients."
  },
  {
    icon: <Palette className="h-6 w-6 text-brand-purple" />,
    title: "Focus on Art",
    description: "Spend more time creating amazing tattoos while we handle the business side."
  }
];

const realWorldExamples = [
  {
    business: "Example Tattoo Studio A",
    setup: "Pay It Off + Balance Builder focus",
    revenue: "£1,500/month recurring",
    customers: "45 active clients",
    testimonial: "Monthly Club transformed our tattoo business. Clients love the payment flexibility and we get paid upfront*."
  },
  {
    business: "Example Tattoo Studio B",
    setup: "Full payment plan options",
    revenue: "£2,200/month recurring",
    customers: "20 active clients",
    testimonial: "The installment plans increased our average order value by 40%. Clients can afford bigger pieces now."
  },
  {
    business: "Example Tattoo Studio C",
    setup: "Balance Builder + One-time",
    revenue: "£3,800/month recurring",
    customers: "35 active clients",
    testimonial: "We've grown from walk-ins to a loyal client base. The recurring model works perfectly for tattoo work."
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let clients build credit for future tattoo work with a single flexible subscription",
    examples: [
      "£100/month (adjustable anytime) - use for sleeve work in 6 months",
      "£50/month (adjustable anytime) - use for touch-ups and small pieces",
      "£150/month (adjustable anytime) - use for large projects when ready"
    ],
    benefits: ["Predictable income", "Client commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products",
    description: "Offer large tattoo projects with monthly payment plans",
    examples: [
      "Full sleeve project (£2,500) paid over 10 months",
      "Back piece project (£1,800) paid over 8 months",
      "Leg sleeve project (£3,200) paid over 12 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Client convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual services and add-ons alongside payment plans",
    examples: [
      "Single tattoo session (£200-500 per session)",
      "Touch-up sessions (£50-150 per session)",
      "Design consultations (£50-100 per session)",
      "Aftercare products (£20-60 per kit)"
    ],
    benefits: ["Additional revenue", "Client upsells", "Flexible offerings", "Easy add-ons"]
  }
];

const serviceTypes = [
  {
    title: "Tattoo Consultations",
    description: "Initial design and planning sessions",
    services: [
      "Design consultation",
      "Size and placement advice",
      "Price estimation",
      "Scheduling planning",
      "Design revisions"
    ],
    pricing: "£50-100 per consultation"
  },
  {
    title: "Tattoo Sessions",
    description: "Actual tattoo work and application",
    services: [
      "Professional tattoo work",
      "Color and shading",
      "Line work and detail",
      "Aftercare instructions",
      "Progress photos"
    ],
    pricing: "£200-500 per session"
  },
  {
    title: "Large Projects",
    description: "Multi-session tattoo projects",
    services: [
      "Full sleeves and back pieces",
      "Custom design work",
      "Multiple sessions",
      "Progress tracking",
      "Lifetime touch-ups"
    ],
    pricing: "£1,500-5,000 per project"
  },
  {
    title: "Aftercare & Maintenance",
    description: "Ongoing care and touch-up services",
    services: [
      "Touch-up sessions",
      "Aftercare products",
      "Healing check-ups",
      "Color refreshes",
      "Maintenance advice"
    ],
    pricing: "£50-200 per service"
  }
];

export default function TattooArtistBuyNowPayLater() {
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
              Tattoo Artist Buy Now Pay Later Software
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your tattoo business with flexible payment plans. Offer buy now pay later, 
              installment plans, and recurring sessions with Monthly Club.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary">
                <Link href="/create-a-business">Start Your Tattoo Business</Link>
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
          <h2 className="text-3xl font-bold text-center mb-4">Tattoo Services You Can Offer</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            From consultations to large projects, offer comprehensive tattoo services with flexible payment options.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceTypes.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-brand-purple/10 rounded-full">
                      <Palette className="h-6 w-6 text-brand-purple" />
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
          <h2 className="text-3xl font-bold text-center mb-4">Tattoo Service Pricing</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Flexible pricing options for different types of tattoo work. All services include 
            automated billing and client management.
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

      {/* Three Ways to Monetize Your Tattoo Business */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Three Ways to Monetize Your Tattoo Business</h2>
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
          <h2 className="text-3xl font-bold text-center mb-4">Real Tattoo Businesses</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            See how tattoo artists are using Monthly Club to build recurring revenue and grow their businesses.
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
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              *Payment processed immediately, funds typically reach your bank account within 7 days
            </p>
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
            Ready to Transform Your Tattoo Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of tattoo artists who are already growing their businesses with flexible payment plans.
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
