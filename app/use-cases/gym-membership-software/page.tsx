import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Dumbbell, CreditCard, Calendar, BarChart, MessageSquare, Shield, Zap, ArrowRight, Target, TrendingUp, Users, Clock, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Gym Membership Software | Monthly Club",
  description: "Complete gym membership management with automated payments, member access control, and facility management. Perfect for local gyms and fitness centers.",
  keywords: "gym membership software, fitness center management, gym subscription software, membership management system, gym payment automation",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/use-cases/gym-membership-software",
  },
  openGraph: {
    title: "Gym Membership Software | Monthly Club",
    description: "Complete gym membership management with automated payments, member access control, and facility management. Perfect for local gyms and fitness centers.",
    url: "https://www.monthlyclubhq.com/use-cases/gym-membership-software",
    type: "article",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png",
        width: 1200,
        height: 630,
        alt: "Gym Membership Software",
      },
    ],
  },
};

const membershipTiers = [
  {
    name: "Basic Membership",
    price: "£29/month",
    description: "Access to gym facilities during standard hours",
    features: ["Gym access", "Basic equipment", "Locker room", "Free weights area"],
    popular: false
  },
  {
    name: "Premium Membership", 
    price: "£49/month",
    description: "Full access plus group classes and additional amenities",
    features: ["All gym facilities", "Group classes", "Sauna access", "Guest passes"],
    popular: true
  },
  {
    name: "VIP Membership",
    price: "£79/month",
    description: "Premium access with personal training sessions included",
    features: ["All facilities", "2 PT sessions monthly", "Priority booking", "Nutrition consultation"]
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let members build credit for any future gym services with a single flexible subscription",
    examples: [
      "£20/month (adjustable anytime) - use for personal training when ready",
      "£15/month (adjustable anytime) - use for additional classes throughout the year",
      "£25/month (adjustable anytime) - use for nutrition consultations when needed"
    ],
    benefits: ["Predictable income", "Member commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products", 
    description: "Offer annual memberships with monthly payment plans",
    examples: [
      "Annual membership (£500) paid over 12 months",
      "Personal training package (£800) paid over 8 months",
      "Nutrition program (£300) paid over 6 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Member convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual services and products alongside memberships",
    examples: [
      "Day passes (£10-15 each)",
      "Personal training sessions (£40-60 each)",
      "Nutrition consultations (£30-50 sessions)",
      "Gym merchandise (£20-80 items)"
    ],
    benefits: ["Additional revenue", "Member engagement", "Flexible offerings", "Easy upsells"]
  }
];

const features = [
  {
    icon: CreditCard,
    title: "Automated Membership Payments",
    description: "Collect monthly membership fees automatically. No more chasing members for payments or handling cash.",
    benefits: ["Higher payment collection rates", "Reduced admin time", "Predictable monthly income"]
  },
  {
    icon: Users,
    title: "Member Management",
    description: "Track all members, their membership status, and access levels in one comprehensive dashboard.",
    benefits: ["Easy member lookup", "Membership tier management", "Access control"]
  },
  {
    icon: Calendar,
    title: "Class & Event Scheduling",
    description: "Manage group classes, personal training sessions, and special events with member booking.",
    benefits: ["Reduced no-shows", "Better capacity planning", "Member convenience"]
  },
  {
    icon: MessageSquare,
    title: "Member Communication",
    description: "Send gym updates, class schedules, and important announcements directly to all members.",
    benefits: ["Better engagement", "Reduced no-shows", "Increased member satisfaction"]
  },
  {
    icon: BarChart,
    title: "Gym Analytics",
    description: "Track membership revenue, facility usage, and member retention with detailed reports.",
    benefits: ["Revenue insights", "Usage analytics", "Business growth planning"]
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Bank-level security for member data and payments with GDPR compliance built-in.",
    benefits: ["Data protection", "Member trust", "Regulatory compliance"]
  }
];

const realWorldExamples = [
  {
    gym: "Example Gym A",
    type: "Full Service Gym",
    members: "300+",
    result: "Increased monthly revenue by 45% and reduced member churn by 35%",
    quote: "The subscription model transformed our gym. Members love the convenience, and we love the predictable income."
  },
  {
    gym: "Example Gym B",
    type: "Specialized Studio",
    members: "150+",
    result: "Achieved 98% payment collection rate and streamlined membership management",
    quote: "Monthly Club made it easy to offer different membership tiers. Our members love the flexibility and we love the steady income."
  },
  {
    gym: "Example Gym C",
    type: "Multi-Purpose Facility",
    members: "500+",
    result: "Eliminated payment chasing and improved cash flow predictability",
    quote: "Finally, a solution that works for community facilities. The automated payments and member management features are perfect for our diverse membership base."
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Predictable Revenue",
    description: "Know exactly how much you'll earn each month with recurring membership income."
  },
  {
    icon: Target,
    title: "Higher Member Retention",
    description: "Subscribers are more likely to stay committed to their fitness goals and continue their membership."
  },
  {
    icon: Zap,
    title: "Reduced Admin Work",
    description: "Spend less time on payments and paperwork, more time on growing your gym and serving members."
  }
];

export default function GymMembershipSoftwarePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Gym Membership Software | Monthly Club</title>
        <meta name="description" content="Complete gym membership management with automated payments, member access control, and facility management. Perfect for local gyms and fitness centers." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.monthlyclubhq.com/use-cases/gym-membership-software" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/use-cases/gym-membership-software",
              },
              headline: "Gym Membership Software",
              description: "Complete gym membership management with automated payments, member access control, and facility management. Perfect for local gyms and fitness centers.",
              author: { "@type": "Organization", name: "Monthly Club", url: "https://www.monthlyclubhq.com" },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: { "@type": "ImageObject", url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png" },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
              articleSection: ["Membership Management", "Payment Automation", "Member Communication", "Gym Analytics"],
              keywords: "gym membership software, fitness center management, gym subscription software, membership management system",
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
                { "@type": "ListItem", position: 3, name: "Gym Membership Software" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-blue/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-5 text-sm">
              <Link href="/use-cases" className="text-brand-purple hover:underline">← Back to Use Cases</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Gym Membership Software
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Complete gym membership management with automated payments, member access control, and facility management. 
              Perfect for local gyms and fitness centers looking to streamline operations.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Challenges Facing Local Gyms</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Running a successful gym involves more than just providing equipment. 
                Managing memberships, collecting payments, and retaining members can be overwhelming without the right tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Payment Collection</h3>
                  <p className="text-sm text-red-600 dark:text-red-300">Chasing monthly membership fees, dealing with bounced payments, and managing different payment methods</p>
                </CardContent>
              </Card>
              <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Member Retention</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-300">Difficulty keeping members engaged and committed to their fitness goals long-term</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Admin Overhead</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">Time spent on membership management, class scheduling, and member communication</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Membership Software Transforms Your Gym</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club helps gym owners build predictable recurring revenue 
                while providing members with convenient, flexible membership options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-brand-blue" />
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

        {/* Membership Tiers Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Membership Tiers for Gyms</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Create flexible membership tiers that work for different member needs and budgets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipTiers.map((tier, index) => (
                <Card key={index} className={`${tier.popular ? 'border-brand-blue border-2' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    {tier.popular && (
                      <div className="bg-brand-blue text-white text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">
                        Most Popular
                      </div>
                    )}
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-brand-blue">{tier.price}</div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tier.features.map((feature, idx) => (
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
              <h2 className="text-3xl font-bold mb-4">Three Ways to Monetize Your Gym</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond traditional memberships, Monthly Club offers flexible ways to generate revenue and improve member experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productTypes.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-blue">{product.type}</CardTitle>
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
              <h2 className="text-3xl font-bold mb-4">Real Gyms Using Monthly Club</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how gyms and fitness centers across the UK are building successful membership businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {realWorldExamples.map((example, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Building className="h-8 w-8 text-brand-blue mr-3" />
                      <div>
                        <h3 className="font-semibold">{example.gym}</h3>
                        <p className="text-sm text-muted-foreground">{example.type} • {example.members} members</p>
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
                <h2 className="text-3xl font-bold mb-6">Why Gyms Choose Monthly Club</h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="h-4 w-4 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Gym?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of gym owners already using Monthly Club to build predictable recurring revenue.
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
                Common questions about membership management for gyms.
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How do gym membership subscriptions work?</h3>
                  <p className="text-muted-foreground">
                    Members pay a monthly fee for access to your gym facilities. This gives them convenience and priority access 
                    while providing you with predictable recurring revenue and better member retention.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I offer different membership tiers?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! Create basic, premium, and VIP tiers with different access levels, amenities, and pricing 
                    to match your members' needs and maximize revenue per member.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What if a member wants to freeze their membership?</h3>
                  <p className="text-muted-foreground">
                    Members can pause their membership for holidays or breaks with no penalties. You can also offer freeze options 
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
        <section className="py-16 md:py-24 bg-gradient-to-r from-brand-blue to-brand-purple">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Managing Your Gym Memberships Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the growing number of gym owners using Monthly Club to build predictable, recurring revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary">
                <Link href="/create-a-business">
                  Create Your Gym Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
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
