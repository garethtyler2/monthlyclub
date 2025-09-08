import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Users, Calendar, Shield, Zap, TrendingUp, Clock, Heart, PawPrint, Home, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pet Services Subscription Software | Monthly Club",
  description: "Build recurring revenue with pet services subscriptions. Manage dog walking, pet sitting, grooming, and pet care with automated billing and Monthly Club.",
  keywords: "pet services subscriptions, dog walking subscriptions, pet sitting subscriptions, pet grooming subscriptions, pet care software, subscription billing, pet services business",
  openGraph: {
    title: "Pet Services Subscription Software | Monthly Club",
    description: "Build recurring revenue with pet services subscriptions. Manage dog walking, pet sitting, grooming, and pet care with automated billing and Monthly Club.",
    type: "website",
  },
};

const pricingTiers = [
  {
    name: "Pet Services Basic",
    price: "£45",
    period: "per month",
    description: "Perfect for regular dog walking and basic pet care",
    features: [
      "3 dog walks per week",
      "30 minutes per walk",
      "Basic pet sitting visits",
      "Photo updates included",
      "Flexible scheduling"
    ],
    popular: false
  },
  {
    name: "Pet Services Premium",
    price: "£85",
    period: "per month",
    description: "Ideal for comprehensive pet care and peace of mind",
    features: [
      "Daily dog walks",
      "Pet sitting visits",
      "Feeding & medication",
      "Photo & video updates",
      "Emergency contact included",
      "Grooming sessions"
    ],
    popular: true
  },
  {
    name: "Pet Services Complete",
    price: "£150",
    period: "per month",
    description: "Full-service pet care including all services",
    features: [
      "Unlimited dog walks",
      "Pet sitting visits",
      "Monthly grooming sessions",
      "Pet taxi services",
      "Photo & video updates",
      "Emergency contact included",
      "Priority booking",
      "Pet supplies delivery"
    ],
    popular: false
  }
];

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-brand-purple" />,
    title: "Smart Booking System",
    description: "Manage pet sitting visits, grooming appointments, and recurring schedules all in one place."
  },
  {
    icon: <Zap className="h-6 w-6 text-brand-purple" />,
    title: "Automated Billing",
    description: "Charge pet owners automatically with Stripe-powered recurring payments and one-time bookings."
  },
  {
    icon: <Users className="h-6 w-6 text-brand-purple" />,
    title: "Pet & Owner Profiles",
    description: "Track pet preferences, medical needs, feeding schedules, and owner contact information."
  },
  {
    icon: <Shield className="h-6 w-6 text-brand-purple" />,
    title: "Insurance & Safety",
    description: "Built-in safety protocols, emergency contacts, and insurance documentation management."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-brand-purple" />,
    title: "Growth Analytics",
    description: "Monitor your recurring revenue, customer retention, and identify expansion opportunities."
  },
  {
    icon: <Heart className="h-6 w-6 text-brand-purple" />,
    title: "Pet Care Excellence",
    description: "Focus on what you love - caring for pets - while we handle the business side."
  }
];

const realWorldExamples = [
  {
    business: "Example Pet Services A",
    location: "Major City",
    setup: "Dog Walking + Pet Sitting + Grooming",
    revenue: "£3,200/month recurring",
    customers: "40 pet families",
    testimonial: "Monthly Club transformed our pet services business. We went from chaotic bookings to predictable income."
  },
  {
    business: "Example Pet Services B",
    location: "Major City",
    setup: "Full Pet Services Complete",
    revenue: "£4,800/month recurring",
    customers: "32 pet families",
    testimonial: "The automated billing saves us hours every week. Pet owners love the convenience and reliability."
  },
  {
    business: "Example Pet Services C",
    location: "Major City",
    setup: "Dog Walking + Pet Sitting mix",
    revenue: "£2,100/month recurring",
    customers: "50 pet families",
    testimonial: "We've grown from 20 to 50 customers in 8 months. The recurring model works perfectly for pet services."
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let pet owners build credit for any future pet care services with a single flexible subscription",
    examples: [
      "£25/month (adjustable anytime) - use for emergency pet sitting when needed",
      "£20/month (adjustable anytime) - use for grooming sessions throughout the year",
      "£35/month (adjustable anytime) - use for holiday pet care and special services"
    ],
    benefits: ["Predictable income", "Customer commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products",
    description: "Offer annual pet care packages with monthly payment plans",
    examples: [
      "Annual pet sitting package (£400) paid over 12 months",
      "Holiday pet care package (£200) paid over 6 months",
      "Grooming membership (£300) paid over 12 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Customer convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual services and add-ons alongside subscriptions",
    examples: [
      "Emergency pet sitting (£40-80 per visit)",
      "Grooming add-on (£30-60 per session)",
      "Pet taxi service (£20-40 per trip)",
      "Pet photography session (£50-100 per session)"
    ],
    benefits: ["Additional revenue", "Customer upsells", "Flexible offerings", "Easy add-ons"]
  }
];

const serviceTypes = [
  {
    title: "Dog Walking Services",
    description: "Regular exercise and outdoor time for dogs",
    services: [
      "Daily or weekly dog walks",
      "Group or solo walking options",
      "Exercise and socialization",
      "Photo updates from walks",
      "Flexible scheduling"
    ],
    pricing: "£12-20 per walk"
  },
  {
    title: "Pet Sitting Services",
    description: "In-home care for pets when owners are away",
    services: [
      "Daily feeding and medication",
      "Exercise and play time",
      "Litter box cleaning",
      "Photo and video updates",
      "Emergency contact support"
    ],
    pricing: "£15-25 per visit"
  },
  {
    title: "Pet Grooming Services",
    description: "Professional grooming to keep pets clean and healthy",
    services: [
      "Bathing and drying",
      "Nail trimming",
      "Ear cleaning",
      "Brushing and de-shedding",
      "Sanitary trimming"
    ],
    pricing: "£30-80 per session"
  },
  {
    title: "Additional Pet Care",
    description: "Extra services to provide comprehensive pet care",
    services: [
      "Pet taxi and transportation",
      "Pet photography",
      "Pet training sessions",
      "Pet supplies delivery",
      "Emergency pet care"
    ],
    pricing: "£20-100 per service"
  }
];

export default function PetSitterSubscriptionSoftware() {
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
              Pet Services Subscription Software
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Build recurring revenue with pet services subscriptions. Manage dog walking, pet sitting, 
              grooming, and pet care with automated billing and Monthly Club.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary">
                <Link href="/create-a-business">Start Your Pet Care Business</Link>
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
          <h2 className="text-3xl font-bold text-center mb-4">Pet Services You Can Offer</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            From dog walking to pet sitting and grooming, offer comprehensive pet services that pet owners love and trust.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceTypes.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-brand-purple/10 rounded-full">
                      <PawPrint className="h-6 w-6 text-brand-purple" />
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
          <h2 className="text-3xl font-bold text-center mb-4">Pet Services Subscription Plans</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your pet services business. All plans include automated billing, 
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

      {/* Three Ways to Monetize Your Pet Care Business */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Three Ways to Monetize Your Pet Services Business</h2>
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
          <h2 className="text-3xl font-bold text-center mb-4">Real Pet Services Businesses</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            See how pet services professionals are using Monthly Club to build recurring revenue and grow their businesses.
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
            Ready to Start Your Pet Services Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of pet services professionals who are already growing their businesses with recurring revenue.
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
