import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Scissors, CreditCard, Calendar, BarChart, MessageSquare, Shield, Zap, ArrowRight, Star, Target, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Hairdresser Subscription Software | Monthly Club",
  description: "Transform your salon with subscription plans for haircuts, styling, and treatments. Automated payments, client management, and recurring revenue for hairdressers and barbers.",
  keywords: "hairdresser subscription software, barber subscription plans, salon membership management, hair salon recurring revenue, beauty subscription software",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/use-cases/hairdressers-subscription-software",
  },
  openGraph: {
    title: "Hairdresser Subscription Software | Monthly Club",
    description: "Transform your salon with subscription plans for haircuts, styling, and treatments. Automated payments, client management, and recurring revenue for hairdressers and barbers.",
    url: "https://www.monthlyclubhq.com/use-cases/hairdressers-subscription-software",
    type: "article",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png",
        width: 1200,
        height: 630,
        alt: "Hairdresser Subscription Software",
      },
    ],
  },
};

const subscriptionPlans = [
  {
    name: "Essential Cut Plan",
    price: "£35/month",
    description: "One haircut every 4 weeks with priority booking",
    features: ["Monthly haircut", "Priority booking", "10% off additional services", "Easy rescheduling"],
    popular: false
  },
  {
    name: "Premium Style Plan", 
    price: "£65/month",
    description: "Two appointments per month including cut and style",
    features: ["2 appointments monthly", "Cut + blow dry", "Free consultation", "15% off treatments"],
    popular: true
  },
  {
    name: "Complete Care Plan",
    price: "£99/month",
    description: "Full service package with cut, color, and treatments",
    features: ["3 appointments monthly", "Cut, color, style", "Free treatments", "20% off products"]
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let clients build credit for any future salon services with a single flexible subscription",
    examples: [
      "£25/month (adjustable anytime) - use for color treatments when ready",
      "£15/month (adjustable anytime) - use for hair products throughout the year",
      "£30/month (adjustable anytime) - use for special occasions styling when needed"
    ],
    benefits: ["Predictable income", "Client commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products", 
    description: "Offer annual packages with monthly payment plans",
    examples: [
      "Annual color package (£600) paid over 12 months",
      "Wedding styling package (£300) paid over 6 months",
      "Hair care product bundle (£120) paid over 4 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Client convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual services and products alongside subscriptions",
    examples: [
      "Walk-in haircuts (£25-45 each)",
      "Hair products (£15-60 items)",
      "Special occasion styling (£50-150 sessions)",
      "Hair treatments (£30-80 services)"
    ],
    benefits: ["Additional revenue", "Client engagement", "Flexible offerings", "Easy upsells"]
  }
];

const features = [
  {
    icon: CreditCard,
    title: "Automated Payment Collection",
    description: "Collect monthly subscription fees automatically. No more chasing payments or handling cash.",
    benefits: ["Higher payment collection rates", "Reduced admin time", "Predictable monthly income"]
  },
  {
    icon: Calendar,
    title: "Smart Appointment Scheduling",
    description: "Manage recurring appointments with automatic booking reminders and easy rescheduling.",
    benefits: ["Reduced no-shows", "Better calendar management", "Client convenience"]
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Track client preferences, service history, and subscription status in one place.",
    benefits: ["Personalized service", "Service history tracking", "Client retention"]
  },
  {
    icon: MessageSquare,
    title: "Client Communication",
    description: "Send appointment reminders, style tips, and salon updates directly to subscribers.",
    benefits: ["Better client engagement", "Reduced no-shows", "Increased loyalty"]
  },
  {
    icon: BarChart,
    title: "Revenue Analytics",
    description: "Track subscription revenue, client retention, and service popularity with detailed reports.",
    benefits: ["Revenue insights", "Client behavior analysis", "Business growth planning"]
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Bank-level security for client data and payments with GDPR compliance built-in.",
    benefits: ["Data protection", "Client trust", "Regulatory compliance"]
  }
];

const realWorldExamples = [
  {
    salon: "Example Salon A",
    type: "Independent Salon",
    clients: "150+",
    result: "Increased monthly revenue by 40% and reduced no-shows by 60%",
    quote: "The subscription model transformed our business. Clients love the convenience, and we love the predictable income."
  },
  {
    salon: "Example Salon B",
    type: "Barbershop",
    clients: "200+",
    result: "Achieved 90% client retention and streamlined appointment management",
    quote: "Monthly Club made it easy to offer membership plans. Our regulars love the priority booking and we love the steady income."
  },
  {
    salon: "Example Salon C",
    type: "Full Service Salon",
    clients: "300+",
    result: "Eliminated payment chasing and improved cash flow predictability",
    quote: "Finally, a solution that works for salons. The automated payments and client management features are game-changers."
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Predictable Revenue",
    description: "Know exactly how much you'll earn each month with recurring subscription income."
  },
  {
    icon: Target,
    title: "Higher Client Retention",
    description: "Subscribers are more likely to stay loyal and book regular appointments."
  },
  {
    icon: Zap,
    title: "Reduced Admin Work",
    description: "Spend less time on payments and paperwork, more time on what you love - styling hair."
  }
];

export default function HairdressersSubscriptionSoftwarePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Hairdresser Subscription Software | Monthly Club</title>
        <meta name="description" content="Transform your salon with subscription plans for haircuts, styling, and treatments. Automated payments, client management, and recurring revenue for hairdressers and barbers." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.monthlyclubhq.com/use-cases/hairdressers-subscription-software" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/use-cases/hairdressers-subscription-software",
              },
              headline: "Hairdresser Subscription Software",
              description: "Transform your salon with subscription plans for haircuts, styling, and treatments. Automated payments, client management, and recurring revenue for hairdressers and barbers.",
              author: { "@type": "Organization", name: "Monthly Club", url: "https://www.monthlyclubhq.com" },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: { "@type": "ImageObject", url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png" },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
              articleSection: ["Subscription Plans", "Client Management", "Payment Automation", "Revenue Analytics"],
              keywords: "hairdresser subscription software, barber subscription plans, salon membership management, hair salon recurring revenue",
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
                { "@type": "ListItem", position: 3, name: "Hairdresser Subscription Software" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-purple/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-5 text-sm">
              <Link href="/use-cases" className="text-brand-purple hover:underline">← Back to Use Cases</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Hairdresser Subscription Software
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Transform your salon with subscription plans for haircuts, styling, and treatments. 
              Build predictable recurring revenue while providing exceptional client experiences.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Challenges Facing Hair Salons</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Running a successful salon involves more than just cutting hair. Managing appointments, 
                collecting payments, and retaining clients can be overwhelming without the right tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Inconsistent Income</h3>
                  <p className="text-sm text-red-600 dark:text-red-300">Unpredictable revenue from one-off appointments and seasonal fluctuations in bookings</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Client Retention</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-300">Difficulty keeping clients coming back regularly and building long-term relationships</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Admin Overhead</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">Time spent on scheduling, payments, and client communication instead of styling</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Subscription Plans Transform Your Salon</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club helps hairdressers and barbers build predictable recurring revenue 
                while providing clients with convenient, flexible service options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-brand-purple" />
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

        {/* Subscription Plans Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Subscription Plans for Salons</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Create flexible subscription plans that work for different client needs and budgets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan, index) => (
                <Card key={index} className={`${plan.popular ? 'border-brand-purple border-2' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    {plan.popular && (
                      <div className="bg-brand-purple text-white text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-brand-purple">{plan.price}</div>
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
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Three Ways to Monetize Your Salon</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond traditional subscriptions, Monthly Club offers flexible ways to generate revenue and improve client experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productTypes.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-purple">{product.type}</CardTitle>
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
              <h2 className="text-3xl font-bold mb-4">Real Salons Using Monthly Club</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how hairdressers and barbers across the UK are building successful subscription businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {realWorldExamples.map((example, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Scissors className="h-8 w-8 text-brand-purple mr-3" />
                      <div>
                        <h3 className="font-semibold">{example.salon}</h3>
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
                <h2 className="text-3xl font-bold mb-6">Why Hair Salons Choose Monthly Club</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-4 w-4 text-brand-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Salon?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of hairdressers and barbers already using Monthly Club to build predictable recurring revenue.
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
                Common questions about subscription plans for hair salons.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How do subscription plans work for hair salons?</h3>
                  <p className="text-muted-foreground">
                    Clients pay a monthly fee for a set number of appointments or services. This gives them priority booking, 
                    discounts, and convenience while providing you with predictable recurring revenue.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What if a client wants to cancel their subscription?</h3>
                  <p className="text-muted-foreground">
                    Clients can cancel anytime with no penalties. You can also offer pause options for holidays or 
                    temporary breaks while maintaining the relationship.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I customize subscription plans for different services?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! Create different plans for cuts, colors, treatments, or combinations. You can also 
                    offer add-ons and upgrades to increase revenue per client.
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
        <section className="py-16 md:py-24 bg-gradient-to-r from-brand-purple to-brand-blue">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Building Your Salon Subscription Business
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the growing number of hairdressers and barbers using Monthly Club to build predictable, recurring revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary w-full sm:w-auto">
                <Link href="/create-a-business">
                  Create Your Account
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
