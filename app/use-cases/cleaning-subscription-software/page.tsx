import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles, CreditCard, Calendar, BarChart, MessageSquare, Shield, Zap, ArrowRight, Star, Target, TrendingUp, Users, Home, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Cleaning Subscription Software | Monthly Club",
  description: "Build recurring revenue with cleaning services, housekeeping, and maintenance subscriptions. Perfect for cleaners, housekeepers, and cleaning companies.",
  keywords: "cleaning subscription software, housekeeping subscriptions, cleaning service management, recurring cleaning revenue, cleaning business automation",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/use-cases/cleaning-subscription-software",
  },
  openGraph: {
    title: "Cleaning Subscription Software | Monthly Club",
    description: "Build recurring revenue with cleaning services, housekeeping, and maintenance subscriptions. Perfect for cleaners, housekeepers, and cleaning companies.",
    url: "https://www.monthlyclubhq.com/use-cases/cleaning-subscription-software",
    type: "article",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png",
        width: 1200,
        height: 630,
        alt: "Cleaning Subscription Software",
      },
    ],
  },
};

const cleaningPlans = [
  {
    name: "Weekly Clean Plan",
    price: "£160/month",
    description: "Regular weekly cleaning service for consistent maintenance",
    features: ["2-hour weekly clean", "All standard cleaning", "Priority scheduling", "10% off additional services"],
    popular: false
  },
  {
    name: "Fortnightly Clean Plan", 
    price: "£90/month",
    description: "Bi-weekly cleaning service for busy households",
    features: ["3-hour bi-weekly clean", "Deep clean included", "Flexible scheduling", "15% off add-ons"],
    popular: true
  },
  {
    name: "Monthly Deep Clean Plan",
    price: "£120/month",
    description: "Comprehensive monthly deep cleaning service",
    features: ["5-hour monthly clean", "All deep cleaning tasks", "Kitchen & bathroom focus", "20% off products"]
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let clients build credit for any future cleaning services with a single flexible subscription",
    examples: [
      "£30/month (adjustable anytime) - use for deep cleans when needed",
      "£20/month (adjustable anytime) - use for additional services throughout the year",
      "£25/month (adjustable anytime) - use for special occasion cleaning when ready"
    ],
    benefits: ["Predictable income", "Client commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products", 
    description: "Offer cleaning packages with monthly payment plans",
    examples: [
      "Annual cleaning package (£1,200) paid over 12 months",
      "Spring cleaning package (£300) paid over 3 months",
      "Move-in/move-out package (£200) paid over 2 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Client convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual cleaning services and products alongside subscriptions",
    examples: [
      "One-off deep cleans (£80-150 each)",
      "End of tenancy cleaning (£120-200 each)",
      "Window cleaning (£40-80 each)",
      "Carpet cleaning (£60-120 each)"
    ],
    benefits: ["Additional revenue", "Client engagement", "Flexible offerings", "Easy upsells"]
  }
];

const features = [
  {
    icon: CreditCard,
    title: "Automated Cleaning Payments",
    description: "Collect monthly cleaning payments automatically. No more chasing clients for payments or handling cash.",
    benefits: ["Higher payment collection rates", "Reduced admin time", "Predictable monthly income"]
  },
  {
    icon: Calendar,
    title: "Smart Cleaning Scheduling",
    description: "Manage cleaning appointments with automated booking, reminders, and easy rescheduling.",
    benefits: ["Reduced no-shows", "Better time management", "Client convenience"]
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Track client preferences, cleaning history, and subscription status in one comprehensive dashboard.",
    benefits: ["Personalized service", "Cleaning history tracking", "Client retention"]
  },
  {
    icon: MessageSquare,
    title: "Client Communication",
    description: "Send cleaning reminders, tips, and service updates directly to your clients.",
    benefits: ["Better engagement", "Reduced no-shows", "Increased loyalty"]
  },
  {
    icon: BarChart,
    title: "Cleaning Analytics",
    description: "Track cleaning revenue, client retention, and popular services with detailed reports.",
    benefits: ["Revenue insights", "Service popularity analysis", "Business growth planning"]
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Bank-level security for client data and payments with GDPR compliance built-in.",
    benefits: ["Data protection", "Client trust", "Regulatory compliance"]
  }
];

const realWorldExamples = [
  {
    business: "Example Cleaning Business A",
    type: "Solo Cleaner",
    clients: "25+",
    result: "Increased monthly revenue by 60% and reduced admin time by 70%",
    quote: "The subscription model transformed my cleaning business. Clients love the convenience of regular cleaning, and I love the predictable income."
  },
  {
    business: "Example Cleaning Business B",
    type: "Cleaning Company",
    clients: "80+",
    result: "Achieved 95% payment collection rate and streamlined cleaning management",
    quote: "Monthly Club made it easy to offer cleaning packages. Our clients love the flexibility and we love the steady income."
  },
  {
    business: "Example Cleaning Business C",
    type: "Mobile Cleaner",
    clients: "40+",
    result: "Eliminated payment chasing and improved cash flow predictability",
    quote: "Finally, a solution that works for mobile cleaners. The automated payments and client management features are perfect for my business."
  }
];

const businessTypes = [
  {
    icon: Home,
    title: "Solo Cleaners",
    description: "Individual cleaners working independently or for cleaning companies",
    features: ["Home-based cleaning", "Flexible scheduling", "Personal client relationships", "Direct service delivery"]
  },
  {
    icon: Building,
    title: "Cleaning Companies",
    description: "Cleaning businesses with multiple cleaners and team management",
    features: ["Team coordination", "Multiple cleaners", "Scalable operations", "Professional management"]
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Predictable Revenue",
    description: "Know exactly how much you'll earn each month with recurring cleaning income."
  },
  {
    icon: Target,
    title: "Higher Client Retention",
    description: "Subscribers are more likely to stay committed to their cleaning schedule and continue services."
  },
  {
    icon: Zap,
    title: "Reduced Admin Work",
    description: "Spend less time on payments and paperwork, more time on providing exceptional cleaning services."
  }
];

export default function CleaningSubscriptionSoftwarePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Cleaning Subscription Software | Monthly Club</title>
        <meta name="description" content="Build recurring revenue with cleaning services, housekeeping, and maintenance subscriptions. Perfect for cleaners, housekeepers, and cleaning companies." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.monthlyclubhq.com/use-cases/cleaning-subscription-software" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/use-cases/cleaning-subscription-software",
              },
              headline: "Cleaning Subscription Software",
              description: "Build recurring revenue with cleaning services, housekeeping, and maintenance subscriptions. Perfect for cleaners, housekeepers, and cleaning companies.",
              author: { "@type": "Organization", name: "Monthly Club", url: "https://www.monthlyclubhq.com" },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: { "@type": "ImageObject", url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png" },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
              articleSection: ["Cleaning Plans", "Client Management", "Payment Automation", "Cleaning Analytics"],
              keywords: "cleaning subscription software, housekeeping subscriptions, cleaning service management, recurring cleaning revenue",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.monthlyclubhq.com/" },
                { "@type": "ListItem", position: 2, name: "Use Cases", item: "https://www.monthlyclubhq.com/use-cases" },
                { "@type": "ListItem", position: 3, name: "Cleaning Subscription Software" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-green/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-5 text-sm">
              <Link href="/use-cases" className="text-brand-purple hover:underline">← Back to Use Cases</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Cleaning Subscription Software
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Build recurring revenue with cleaning services, housekeeping, and maintenance subscriptions. 
              Perfect for cleaners, housekeepers, and cleaning companies looking to grow their business.
            </p>
          </div>
        </section>

        {/* Business Types Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perfect for Every Cleaning Professional</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Whether you work solo or run a cleaning company, Monthly Club adapts to your business model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {businessTypes.map((type, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-brand-green/10 flex items-center justify-center">
                        <type.icon className="h-6 w-6 text-brand-green" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{type.title}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Challenges Facing Cleaning Professionals</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Building a successful cleaning business involves more than just providing great service. 
                Managing appointments, collecting payments, and retaining clients can be overwhelming without the right tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Inconsistent Income</h3>
                  <p className="text-sm text-red-600 dark:text-red-300">Unpredictable revenue from one-off cleaning jobs and seasonal fluctuations in demand</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Client Retention</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-300">Difficulty keeping clients committed to regular cleaning schedules</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Admin Overhead</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">Time spent on scheduling, payments, and client communication instead of cleaning</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Subscription Plans Transform Your Cleaning Business</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club helps cleaning professionals build predictable recurring revenue 
                while providing clients with convenient, flexible cleaning options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-brand-green/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-brand-green" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{feature.description}</CardDescription>
                    <ul className="space-y-1">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cleaning Plans Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Cleaning Plans for Professionals</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Create flexible cleaning plans that work for different client needs and schedules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cleaningPlans.map((plan, index) => (
                <Card key={index} className={`${plan.popular ? 'border-brand-green border-2' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    {plan.popular && (
                      <div className="bg-brand-green text-white text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-brand-green">{plan.price}</div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Product Types Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Three Ways to Monetize Your Cleaning Business</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond traditional cleaning plans, Monthly Club offers flexible ways to generate revenue and improve client experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productTypes.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-green">{product.type}</CardTitle>
                    <CardDescription className="text-base">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {product.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Real World Examples */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Real Cleaning Professionals Using Monthly Club</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how cleaners and cleaning companies across the UK are building successful subscription businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {realWorldExamples.map((example, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-8 w-8 text-brand-green mr-3" />
                      <div>
                        <h3 className="font-semibold">{example.business}</h3>
                        <p className="text-sm text-muted-foreground">{example.type} • {example.clients} clients</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 italic">"{example.quote}"</p>
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">{example.result}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Cleaning Professionals Choose Monthly Club</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-4 w-4 text-brand-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-green/10 to-brand-purple/10 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Cleaning Business?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of cleaning professionals already using Monthly Club to build predictable recurring revenue.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Set up in under 10 minutes</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>No monthly fees - pay as you go</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Stripe-powered secure payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions about subscription plans for cleaning professionals.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How do subscription plans work for cleaners?</h3>
                  <p className="text-muted-foreground">
                    Clients pay a monthly fee for a set number of cleaning visits. This gives them convenience and priority booking 
                    while providing you with predictable recurring revenue and better client retention.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I offer different plans for different cleaning types?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! Create plans for weekly cleaning, deep cleans, or specialized services. You can also offer add-ons 
                    and upgrades to increase revenue per client.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What if a client wants to pause their cleaning plan?</h3>
                  <p className="text-muted-foreground">
                    Clients can pause their plan for holidays or breaks with no penalties. You can also offer freeze options 
                    while maintaining the relationship and ensuring they return when ready.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Learn More Section */}
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
        <section className="py-16 md:py-24 bg-gradient-to-r from-brand-green to-brand-purple">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Building Your Cleaning Subscription Business
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the growing number of cleaning professionals using Monthly Club to build predictable, recurring revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary w-full sm:w-auto">
                <Link href="/create-a-business">
                  Create Your Business
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto">
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
