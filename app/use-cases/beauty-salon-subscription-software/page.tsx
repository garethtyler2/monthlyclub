import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Sparkles, CreditCard, Calendar, BarChart, MessageSquare, Shield, Zap, ArrowRight, Star, Target, TrendingUp, Users, Home, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Beauty Salon & Aesthetician Subscription Software | Monthly Club",
  description: "Build recurring revenue with beauty treatments, aesthetic procedures, and salon services. Perfect for solo aestheticians, beauty therapists, and salon owners.",
  keywords: "beauty salon subscription software, aesthetician subscription plans, beauty therapist software, salon membership management, aesthetic treatments recurring revenue",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/use-cases/beauty-salon-subscription-software",
  },
  openGraph: {
    title: "Beauty Salon & Aesthetician Subscription Software | Monthly Club",
    description: "Build recurring revenue with beauty treatments, aesthetic procedures, and salon services. Perfect for solo aestheticians, beauty therapists, and salon owners.",
    url: "https://www.monthlyclubhq.com/use-cases/beauty-salon-subscription-software",
    type: "article",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png",
        width: 1200,
        height: 630,
        alt: "Beauty Salon & Aesthetician Subscription Software",
      },
    ],
  },
};

const treatmentPlans = [
  {
    name: "Maintenance Plan",
    price: "£89/month",
    description: "Regular treatments to maintain results",
    features: ["Monthly facial", "Skin consultation", "10% off additional treatments", "Priority booking"],
    popular: false
  },
  {
    name: "Aesthetic Care Plan", 
    price: "£149/month",
    description: "Comprehensive aesthetic treatment package",
    features: ["2 treatments monthly", "Botox/filler maintenance", "Skin analysis", "15% off products"],
    popular: true
  },
  {
    name: "Premium Beauty Plan",
    price: "£249/month",
    description: "Full-service beauty and aesthetic package",
    features: ["3 treatments monthly", "All aesthetic procedures", "Personalized skincare", "20% off everything"]
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let clients build credit for any future beauty treatments with a single flexible subscription",
    examples: [
      "£30/month (adjustable anytime) - use for aesthetic procedures when ready",
      "£20/month (adjustable anytime) - use for skincare products throughout the year",
      "£35/month (adjustable anytime) - use for special occasion treatments when needed"
    ],
    benefits: ["Predictable income", "Client commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products", 
    description: "Offer treatment packages with monthly payment plans",
    examples: [
      "Annual facial package (£800) paid over 12 months",
      "Botox maintenance program (£600) paid over 6 months",
      "Skincare product bundle (£300) paid over 4 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Client convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual treatments and products alongside subscriptions",
    examples: [
      "Single treatments (£40-120 each)",
      "Skincare products (£20-80 items)",
      "Special occasion styling (£60-200 sessions)",
      "Consultation appointments (£30-60 each)"
    ],
    benefits: ["Additional revenue", "Client engagement", "Flexible offerings", "Easy upsells"]
  }
];

const features = [
  {
    icon: CreditCard,
    title: "Automated Treatment Payments",
    description: "Collect monthly treatment payments automatically. No more chasing clients for payments or handling cash.",
    benefits: ["Higher payment collection rates", "Reduced admin time", "Predictable monthly income"]
  },
  {
    icon: Calendar,
    title: "Smart Appointment Scheduling",
    description: "Manage treatment appointments with automated booking, reminders, and easy rescheduling.",
    benefits: ["Reduced no-shows", "Better time management", "Client convenience"]
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Track client treatment history, skin concerns, and preferences in one comprehensive dashboard.",
    benefits: ["Personalized treatments", "Treatment history tracking", "Client retention"]
  },
  {
    icon: MessageSquare,
    title: "Client Communication",
    description: "Send appointment reminders, skincare tips, and treatment updates directly to your clients.",
    benefits: ["Better engagement", "Reduced no-shows", "Increased loyalty"]
  },
  {
    icon: BarChart,
    title: "Treatment Analytics",
    description: "Track treatment revenue, client retention, and popular services with detailed reports.",
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
    business: "Example Beauty Business A",
    type: "Solo Aesthetician",
    clients: "80+",
    result: "Increased monthly revenue by 55% and reduced client churn by 45%",
    quote: "The subscription model transformed my practice. Clients love the convenience of regular treatments, and I love the predictable income."
  },
  {
    business: "Example Beauty Business B",
    type: "Full Service Salon",
    clients: "200+",
    result: "Achieved 92% payment collection rate and streamlined treatment management",
    quote: "Monthly Club made it easy to offer treatment packages. Our clients love the flexibility and we love the steady income."
  },
  {
    business: "Example Beauty Business C",
    type: "Mobile Aesthetician",
    clients: "60+",
    result: "Eliminated payment chasing and improved cash flow predictability",
    quote: "Finally, a solution that works for mobile aestheticians. The automated payments and client management features are perfect for my home-based practice."
  }
];

const businessTypes = [
  {
    icon: Home,
    title: "Solo Practitioners",
    description: "Aestheticians and beauty therapists working from home or mobile",
    features: ["Home-based treatments", "Mobile services", "Flexible scheduling", "Personal client relationships"]
  },
  {
    icon: Building,
    title: "Salon Professionals",
    description: "Beauty therapists and aestheticians working in salons or clinics",
    features: ["Salon-based treatments", "Team collaboration", "Shared resources", "Professional environment"]
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Predictable Revenue",
    description: "Know exactly how much you'll earn each month with recurring treatment income."
  },
  {
    icon: Target,
    title: "Higher Client Retention",
    description: "Subscribers are more likely to stay committed to their skincare routine and continue treatments."
  },
  {
    icon: Zap,
    title: "Reduced Admin Work",
    description: "Spend less time on payments and paperwork, more time on providing exceptional treatments."
  }
];

export default function BeautySalonSubscriptionSoftwarePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Beauty Salon & Aesthetician Subscription Software | Monthly Club</title>
        <meta name="description" content="Build recurring revenue with beauty treatments, aesthetic procedures, and salon services. Perfect for solo aestheticians, beauty therapists, and salon owners." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.monthlyclubhq.com/use-cases/beauty-salon-subscription-software" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/use-cases/beauty-salon-subscription-software",
              },
              headline: "Beauty Salon & Aesthetician Subscription Software",
              description: "Build recurring revenue with beauty treatments, aesthetic procedures, and salon services. Perfect for solo aestheticians, beauty therapists, and salon owners.",
              author: { "@type": "Organization", name: "Monthly Club", url: "https://www.monthlyclubhq.com" },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: { "@type": "ImageObject", url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png" },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
              articleSection: ["Treatment Plans", "Client Management", "Payment Automation", "Treatment Analytics"],
              keywords: "beauty salon subscription software, aesthetician subscription plans, beauty therapist software, salon membership management",
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
                { "@type": "ListItem", position: 3, name: "Beauty Salon & Aesthetician Subscription Software" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-pink/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-5 text-sm">
              <Link href="/use-cases" className="text-brand-purple hover:underline">← Back to Use Cases</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Beauty Salon & Aesthetician Subscription Software
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Build recurring revenue with beauty treatments, aesthetic procedures, and salon services. 
              Perfect for solo aestheticians, beauty therapists, and salon owners looking to grow their practice.
            </p>
          </div>
        </section>

        {/* Business Types Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perfect for Every Beauty Professional</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Whether you work solo from home or in a salon, Monthly Club adapts to your business model.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {businessTypes.map((type, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-brand-pink/10 flex items-center justify-center">
                        <type.icon className="h-6 w-6 text-brand-pink" />
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
              <h2 className="text-3xl font-bold mb-4">The Challenges Facing Beauty Professionals</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Building a successful beauty practice involves more than just providing treatments. 
                Managing appointments, collecting payments, and retaining clients can be overwhelming without the right tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Inconsistent Income</h3>
                  <p className="text-sm text-red-600 dark:text-red-300">Unpredictable revenue from one-off treatments and seasonal fluctuations in bookings</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Client Retention</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-300">Difficulty keeping clients committed to their skincare routine and regular treatments</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Admin Overhead</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">Time spent on scheduling, payments, and client communication instead of treatments</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Subscription Plans Transform Your Beauty Practice</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club helps beauty professionals build predictable recurring revenue 
                while providing clients with convenient, flexible treatment options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-brand-pink/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-brand-pink" />
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

        {/* Treatment Plans Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Treatment Plans for Beauty Professionals</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Create flexible treatment plans that work for different client needs and skincare goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {treatmentPlans.map((plan, index) => (
                <Card key={index} className={`${plan.popular ? 'border-brand-pink border-2' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    {plan.popular && (
                      <div className="bg-brand-pink text-white text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-brand-pink">{plan.price}</div>
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
              <h2 className="text-3xl font-bold mb-4">Three Ways to Monetize Your Beauty Practice</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond traditional treatment plans, Monthly Club offers flexible ways to generate revenue and improve client experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productTypes.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-pink">{product.type}</CardTitle>
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
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Real Beauty Professionals Using Monthly Club</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how aestheticians and beauty therapists across the UK are building successful subscription businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {realWorldExamples.map((example, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-8 w-8 text-brand-pink mr-3" />
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
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Beauty Professionals Choose Monthly Club</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-4 w-4 text-brand-pink" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Beauty Practice?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of beauty professionals already using Monthly Club to build predictable recurring revenue.
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
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Common questions about subscription plans for beauty professionals.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How do subscription plans work for aestheticians?</h3>
                  <p className="text-muted-foreground">
                    Clients pay a monthly fee for a set number of treatments or aesthetic procedures. This gives them convenience and priority booking 
                    while providing you with predictable recurring revenue and better client retention.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I offer different plans for different treatments?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! Create plans for facials, Botox maintenance, filler treatments, or combinations. You can also offer add-ons 
                    and upgrades to increase revenue per client.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What if a client wants to pause their treatment plan?</h3>
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
        <section className="py-16 md:py-24 bg-gradient-to-r from-brand-pink to-brand-purple">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Building Your Beauty Subscription Business
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the growing number of beauty professionals using Monthly Club to build predictable, recurring revenue.
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
