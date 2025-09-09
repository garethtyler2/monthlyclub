import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Dumbbell, CreditCard, Calendar, BarChart, MessageSquare, Shield, Zap, ArrowRight, Target, TrendingUp, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Personal Trainer Subscription Software | Monthly Club",
  description: "Build recurring revenue with gym memberships and personal training subscriptions. Automated payments, client management, and workout scheduling for fitness professionals.",
  keywords: "personal trainer subscription software, gym membership management, fitness subscription plans, personal training recurring revenue, gym software",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/use-cases/personal-trainers-gym-memberships",
  },
  openGraph: {
    title: "Personal Trainer Subscription Software | Monthly Club",
    description: "Build recurring revenue with gym memberships and personal training subscriptions. Automated payments, client management, and workout scheduling for fitness professionals.",
    url: "https://www.monthlyclubhq.com/use-cases/personal-trainers-gym-memberships",
    type: "article",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png",
        width: 1200,
        height: 630,
        alt: "Personal Trainer Subscription Software",
      },
    ],
  },
};

const trainingPlans = [
  {
    name: "Starter Plan",
    price: "£79/month",
    description: "One personal training session per month with program design",
    features: ["1 PT session monthly", "Custom workout plan", "Nutrition guidance", "Progress tracking"],
    popular: false
  },
  {
    name: "Commitment Plan", 
    price: "£149/month",
    description: "Two personal training sessions per month with ongoing support",
    features: ["2 PT sessions monthly", "Custom meal plan", "Weekly check-ins", "Priority booking"],
    popular: true
  },
  {
    name: "Transformation Plan",
    price: "£249/month",
    description: "Four personal training sessions per month with comprehensive support",
    features: ["4 PT sessions monthly", "Nutrition consultation", "Daily check-ins", "Home workout plans"]
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let clients build credit for any future training services with a single flexible subscription",
    examples: [
      "£30/month (adjustable anytime) - use for additional sessions when needed",
      "£20/month (adjustable anytime) - use for nutrition consultations throughout the year",
      "£35/month (adjustable anytime) - use for special programs and intensives when ready"
    ],
    benefits: ["Predictable income", "Client commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products", 
    description: "Offer training packages with monthly payment plans",
    examples: [
      "12-session package (£600) paid over 6 months",
      "Transformation program (£800) paid over 8 months",
      "Nutrition coaching package (£300) paid over 3 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Client convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual services and products alongside subscriptions",
    examples: [
      "Single training sessions (£50-80 each)",
      "Nutrition consultations (£40-60 sessions)",
      "Workout plans (£25-50 programs)",
      "Supplement recommendations (£15-30 consultations)"
    ],
    benefits: ["Additional revenue", "Client engagement", "Flexible offerings", "Easy upsells"]
  }
];

const features = [
  {
    icon: CreditCard,
    title: "Automated Training Payments",
    description: "Collect monthly training session payments automatically. No more chasing clients for payments.",
    benefits: ["Higher payment collection rates", "Reduced admin time", "Predictable monthly income"]
  },
  {
    icon: Calendar,
    title: "Smart Session Scheduling",
    description: "Manage personal training sessions with automated booking, reminders, and easy rescheduling.",
    benefits: ["Reduced no-shows", "Better time management", "Client convenience"]
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Track client progress, goals, and training history in one comprehensive dashboard.",
    benefits: ["Personalized training", "Progress tracking", "Client retention"]
  },
  {
    icon: MessageSquare,
    title: "Client Communication",
    description: "Send workout reminders, nutrition tips, and training updates directly to your clients.",
    benefits: ["Better engagement", "Reduced no-shows", "Increased motivation"]
  },
  {
    icon: BarChart,
    title: "Training Analytics",
    description: "Track training revenue, session attendance, and client progress with detailed reports.",
    benefits: ["Revenue insights", "Performance tracking", "Business growth planning"]
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
    business: "Example Training Business A",
    type: "Personal Training Studio",
    clients: "80+",
    result: "Increased monthly revenue by 50% and reduced client churn by 40%",
    quote: "The subscription model transformed our business. Clients love the convenience, and we love the predictable income."
  },
  {
    business: "Example Training Business B",
    type: "Full Service Gym",
    clients: "200+",
    result: "Achieved 95% payment collection rate and streamlined membership management",
    quote: "Monthly Club made it easy to offer membership tiers. Our members love the flexibility and we love the steady income."
  },
  {
    business: "Example Training Business C",
    type: "Mobile PT Service",
    clients: "60+",
    result: "Eliminated payment chasing and improved cash flow predictability",
    quote: "Finally, a solution that works for mobile trainers. The automated payments and scheduling features are perfect for our business model."
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Predictable Revenue",
    description: "Know exactly how much you'll earn each month with recurring membership and training income."
  },
  {
    icon: Target,
    title: "Higher Client Retention",
    description: "Subscribers are more likely to stay committed to their fitness goals and continue training."
  },
  {
    icon: Zap,
    title: "Reduced Admin Work",
    description: "Spend less time on payments and paperwork, more time on training and growing your business."
  }
];

export default function PersonalTrainersGymMembershipsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Personal Trainer Subscription Software | Monthly Club</title>
        <meta name="description" content="Build recurring revenue with gym memberships and personal training subscriptions. Automated payments, client management, and workout scheduling for fitness professionals." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.monthlyclubhq.com/use-cases/personal-trainers-gym-memberships" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/use-cases/personal-trainers-gym-memberships",
              },
              headline: "Personal Trainer Subscription Software",
              description: "Build recurring revenue with gym memberships and personal training subscriptions. Automated payments, client management, and workout scheduling for fitness professionals.",
              author: { "@type": "Organization", name: "Monthly Club", url: "https://www.monthlyclubhq.com" },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: { "@type": "ImageObject", url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png" },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
              articleSection: ["Membership Plans", "Client Management", "Payment Automation", "Fitness Analytics"],
              keywords: "personal trainer subscription software, gym membership management, fitness subscription plans, personal training recurring revenue",
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
                { "@type": "ListItem", position: 3, name: "Personal Trainer Subscription Software" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-red/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-5 text-sm">
              <Link href="/use-cases" className="text-brand-purple hover:underline">← Back to Use Cases</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Personal Trainer Subscription Software
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Build recurring revenue with gym memberships and personal training subscriptions. 
              Transform one-off sessions into predictable monthly income while providing exceptional client experiences.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Challenges Facing Fitness Professionals</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Building a successful fitness business involves more than just training clients. 
                Managing memberships, collecting payments, and retaining clients can be overwhelming without the right tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Inconsistent Income</h3>
                  <p className="text-sm text-red-600 dark:text-red-300">Unpredictable revenue from one-off sessions and seasonal fluctuations in client bookings</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Client Retention</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-300">Difficulty keeping clients committed to their fitness goals and regular training sessions</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Admin Overhead</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">Time spent on scheduling, payments, and client communication instead of training</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Subscription Plans Transform Your Fitness Business</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club helps personal trainers and gym owners build predictable recurring revenue 
                while providing clients with convenient, flexible fitness options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-brand-red/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-brand-red" />
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

        {/* Membership Plans Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Training Plans for Personal Trainers</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Create flexible training plans that work for different client needs and fitness goals.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trainingPlans.map((plan, index) => (
                <Card key={index} className={`${plan.popular ? 'border-brand-red border-2' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    {plan.popular && (
                      <div className="bg-brand-red text-white text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-brand-red">{plan.price}</div>
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
              <h2 className="text-3xl font-bold mb-4">Three Ways to Monetize Your Training Business</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond traditional training plans, Monthly Club offers flexible ways to generate revenue and improve client experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productTypes.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-red">{product.type}</CardTitle>
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
              <h2 className="text-3xl font-bold mb-4">Real Fitness Businesses Using Monthly Club</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how personal trainers and gym owners across the UK are building successful subscription businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {realWorldExamples.map((example, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Dumbbell className="h-8 w-8 text-brand-red mr-3" />
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
                <h2 className="text-3xl font-bold mb-6">Why Fitness Professionals Choose Monthly Club</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-4 w-4 text-brand-red" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-red/10 to-brand-blue/10 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Fitness Business?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of personal trainers and gym owners already using Monthly Club to build predictable recurring revenue.
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
                Common questions about subscription plans for fitness businesses.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How do subscription plans work for personal trainers?</h3>
                  <p className="text-muted-foreground">
                    Clients pay a monthly fee for a set number of training sessions or gym access. This gives them priority booking, 
                    discounts, and convenience while providing you with predictable recurring revenue.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What if a client wants to pause their membership?</h3>
                  <p className="text-muted-foreground">
                    Clients can pause their membership for holidays or breaks with no penalties. You can also offer freeze options 
                    while maintaining the relationship and ensuring they return.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I offer different plans for different fitness levels?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! Create beginner, intermediate, and advanced plans with different session frequencies, 
                    equipment access, and support levels to match your clients' needs.
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
        <section className="py-16 md:py-24 bg-gradient-to-r from-brand-red to-brand-blue">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Building Your Fitness Subscription Business
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the growing number of personal trainers and gym owners using Monthly Club to build predictable, recurring revenue.
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
