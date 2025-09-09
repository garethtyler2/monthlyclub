import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Users, Calendar, Shield, Zap, TrendingUp, Clock, Heart, Car, Home, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Car Valeting Subscription Software | Monthly Club",
  description: "Build recurring revenue with car valeting subscriptions. Manage car cleaning, detailing, and maintenance services with Monthly Club.",
  keywords: "car valeting subscriptions, car cleaning subscriptions, car detailing software, subscription billing, car valeting business, car wash subscriptions",
  openGraph: {
    title: "Car Valeting Subscription Software | Monthly Club",
    description: "Build recurring revenue with car valeting subscriptions. Manage car cleaning, detailing, and maintenance services with Monthly Club.",
    type: "website",
  },
};

const pricingTiers = [
  {
    name: "Car Valet Basic",
    price: "£35",
    period: "per month",
    description: "Perfect for regular car cleaning and maintenance",
    features: [
      "Monthly car valet",
      "Exterior wash & wax",
      "Interior vacuum & clean",
      "Tire cleaning",
      "Window cleaning"
    ],
    popular: false
  },
  {
    name: "Car Valet Premium",
    price: "£65",
    period: "per month",
    description: "Ideal for comprehensive car care and detailing",
    features: [
      "Bi-weekly car valet",
      "Full exterior wash & wax",
      "Interior deep clean",
      "Tire & wheel cleaning",
      "Dashboard & console cleaning",
      "Air freshener included"
    ],
    popular: true
  },
  {
    name: "Car Care Complete",
    price: "£120",
    period: "per month",
    description: "Full-service car care including premium detailing",
    features: [
      "Weekly car valet",
      "Premium exterior detailing",
      "Interior deep clean & protect",
      "Tire & wheel restoration",
      "Engine bay cleaning",
      "Paint protection",
      "Priority scheduling"
    ],
    popular: false
  }
];

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-brand-purple" />,
    title: "Smart Scheduling",
    description: "Manage car valet appointments, recurring services, and seasonal maintenance with automated reminders."
  },
  {
    icon: <Zap className="h-6 w-6 text-brand-purple" />,
    title: "Automated Billing",
    description: "Charge customers automatically with Stripe-powered recurring payments and seasonal adjustments."
  },
  {
    icon: <Users className="h-6 w-6 text-brand-purple" />,
    title: "Vehicle & Client Management",
    description: "Track vehicle details, service history, and client preferences in one place."
  },
  {
    icon: <Shield className="h-6 w-6 text-brand-purple" />,
    title: "Reliable Payments",
    description: "Reduce payment delays with automated billing and flexible payment options."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-brand-purple" />,
    title: "Growth Analytics",
    description: "Monitor your recurring revenue, customer retention, and identify expansion opportunities."
  },
  {
    icon: <Car className="h-6 w-6 text-brand-purple" />,
    title: "Car Care Excellence",
    description: "Focus on delivering exceptional car care while we handle the business side."
  }
];

const realWorldExamples = [
  {
    business: "Example Car Valeting A",
    setup: "Car Valet Premium + Seasonal",
    revenue: "£3,200/month recurring",
    customers: "50 car owners",
    testimonial: "Monthly Club transformed our car valeting business. We went from one-off bookings to predictable income."
  },
  {
    business: "Example Car Valeting B",
    setup: "Car Care Complete focus",
    revenue: "£4,800/month recurring",
    customers: "40 car owners",
    testimonial: "The automated billing saves us hours every week. Car owners love the convenience and reliability."
  },
  {
    business: "Example Car Valeting C",
    setup: "Car Valet Basic + Premium mix",
    revenue: "£2,100/month recurring",
    customers: "60 car owners",
    testimonial: "We've grown from 20 to 60 customers in 6 months. The recurring model works perfectly for car valeting."
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let car owners build credit for any future car care services with a single flexible subscription",
    examples: [
      "£40/month (adjustable anytime) - use for premium detailing when needed",
      "£30/month (adjustable anytime) - use for additional services and treatments",
      "£50/month (adjustable anytime) - use for seasonal deep cleaning and protection"
    ],
    benefits: ["Predictable income", "Customer commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products",
    description: "Offer annual car care packages with monthly payment plans",
    examples: [
      "Annual car care package (£600) paid over 12 months",
      "Seasonal detailing package (£300) paid over 6 months",
      "Premium car protection package (£800) paid over 12 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Customer convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual services and add-ons alongside subscriptions",
    examples: [
      "One-off car valet (£40-80 per service)",
      "Engine bay cleaning (£60-120 per service)",
      "Paint correction service (£150-300 per service)",
      "Interior protection treatment (£80-150 per service)"
    ],
    benefits: ["Additional revenue", "Customer upsells", "Flexible offerings", "Easy add-ons"]
  }
];

const serviceTypes = [
  {
    title: "Car Valeting Services",
    description: "Regular car cleaning and maintenance",
    services: [
      "Exterior wash & wax",
      "Interior vacuum & clean",
      "Tire & wheel cleaning",
      "Window cleaning",
      "Dashboard cleaning"
    ],
    pricing: "£35-80 per service"
  },
  {
    title: "Car Detailing Services",
    description: "Comprehensive car care and protection",
    services: [
      "Premium exterior detailing",
      "Interior deep clean",
      "Paint protection",
      "Tire & wheel restoration",
      "Engine bay cleaning"
    ],
    pricing: "£80-200 per service"
  },
  {
    title: "Seasonal Services",
    description: "Specialized seasonal car care",
    services: [
      "Spring car preparation",
      "Summer protection treatments",
      "Autumn deep cleaning",
      "Winter protection & storage",
      "Seasonal maintenance"
    ],
    pricing: "£60-150 per service"
  },
  {
    title: "Mobile Car Services",
    description: "Convenient on-location car care",
    services: [
      "Mobile car valeting",
      "At-work car cleaning",
      "Home car detailing",
      "Fleet car services",
      "Emergency car care"
    ],
    pricing: "£50-120 per service"
  }
];

export default function CarValetingSubscriptionSoftware() {
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
              Car Valeting Subscription Software
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Build recurring revenue with car valeting subscriptions. Manage car cleaning, detailing, 
              and maintenance services with Monthly Club.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary w-full sm:w-auto">
                <Link href="/create-a-business">Start Your Car Valeting Business</Link>
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
          <h2 className="text-3xl font-bold text-center mb-4">Car Valeting Services You Can Offer</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            From basic car cleaning to premium detailing, offer comprehensive car care services that car owners love and trust.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceTypes.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-brand-purple/10 rounded-full">
                      <Car className="h-6 w-6 text-brand-purple" />
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
          <h2 className="text-3xl font-bold text-center mb-4">Car Valeting Subscription Plans</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your car valeting business. All plans include automated billing, 
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

      {/* Three Ways to Monetize Your Car Valeting Business */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Three Ways to Monetize Your Car Valeting Business</h2>
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
          <h2 className="text-3xl font-bold text-center mb-4">Real Car Valeting Businesses</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            See how car valeting professionals are using Monthly Club to build recurring revenue and grow their businesses.
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
            Ready to Start Your Car Valeting Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of car valeting professionals who are already growing their businesses with recurring revenue.
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
