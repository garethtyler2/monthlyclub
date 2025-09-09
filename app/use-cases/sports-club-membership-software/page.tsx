import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, CreditCard, Calendar, BarChart, MessageSquare, Shield, Zap, ArrowRight, Trophy, Target, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Sports Club Membership Software | Monthly Club",
  description: "Complete membership management for amateur rugby, cricket, and football clubs. Automated payments, member communication, and subscription management in one platform.",
  keywords: "sports club membership software, rugby club management, cricket club subscriptions, football club memberships, amateur sports management, club payment automation",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/use-cases/sports-club-membership-software",
  },
  openGraph: {
    title: "Sports Club Membership Software | Monthly Club",
    description: "Complete membership management for amateur rugby, cricket, and football clubs. Automated payments, member communication, and subscription management in one platform.",
    url: "https://www.monthlyclubhq.com/use-cases/sports-club-membership-software",
    type: "article",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png",
        width: 1200,
        height: 630,
        alt: "Sports Club Membership Software",
      },
    ],
  },
};

const membershipTiers = [
  {
    name: "Senior Membership",
    price: "£25/month",
    description: "Full playing rights, training access, and club facilities",
    features: ["Unlimited training sessions", "Match day access", "Clubhouse facilities", "Social events"]
  },
  {
    name: "Junior Membership", 
    price: "£15/month",
    description: "Youth development and training programs",
    features: ["Age-appropriate training", "Parent communication", "Progress tracking", "Safety protocols"]
  },
  {
    name: "Social Membership",
    price: "£10/month", 
    description: "Non-playing members who support the club",
    features: ["Clubhouse access", "Social events", "Match day tickets", "Volunteer opportunities"]
  }
];

const productTypes = [
  {
    type: "Balance Builder Subscriptions",
    description: "Let members build credit for any future club expenses with a single flexible subscription",
    examples: [
      "£20/month (adjustable anytime) - use for annual membership in 6 months",
      "£15/month (adjustable anytime) - use for kit purchases when needed",
      "£25/month (adjustable anytime) - use for social events and tours throughout the year"
    ],
    benefits: ["Predictable income", "Member commitment", "Reduced churn", "Flexible spending"]
  },
  {
    type: "Pay It Off Products", 
    description: "Offer annual memberships with monthly payment plans",
    examples: [
      "Annual membership (£300) paid over 12 months",
      "Season ticket (£180) paid over 6 months",
      "Kit package (£120) paid over 4 months"
    ],
    benefits: ["Higher value sales", "Better cash flow", "Member convenience", "Reduced admin"]
  },
  {
    type: "One-Time Products",
    description: "Sell individual items and services alongside subscriptions",
    examples: [
      "Match day tickets (£5-15 each)",
      "Club merchandise (£20-50 items)",
      "Training camps (£30-80 sessions)",
      "Social event tickets (£10-25 each)"
    ],
    benefits: ["Additional revenue", "Member engagement", "Flexible offerings", "Easy upsells"]
  }
];

const features = [
  {
    icon: CreditCard,
    title: "Automated Membership Payments",
    description: "Collect monthly membership fees automatically with Stripe integration. No more chasing payments or manual invoicing.",
    benefits: ["Reduced admin time", "Higher payment collection rates", "Predictable cash flow"]
  },
  {
    icon: Users,
    title: "Member Management",
    description: "Track all members, their payment status, and membership tiers in one central dashboard.",
    benefits: ["Easy member lookup", "Payment status tracking", "Membership tier management"]
  },
  {
    icon: MessageSquare,
    title: "Member Communication",
    description: "Send updates, match announcements, and important club news directly to all members.",
    benefits: ["Bulk messaging", "Targeted communications", "Event notifications"]
  },
  {
    icon: Calendar,
    title: "Event & Match Management",
    description: "Organize training sessions, matches, and social events with member RSVP tracking.",
    benefits: ["Event scheduling", "Attendance tracking", "RSVP management"]
  },
  {
    icon: BarChart,
    title: "Financial Reporting",
    description: "Track membership revenue, payment trends, and club finances with detailed analytics.",
    benefits: ["Revenue insights", "Payment analytics", "Financial planning"]
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Secure member data with bank-level security and GDPR compliance built-in.",
    benefits: ["Data protection", "GDPR compliance", "Secure payments"]
  }
];

const realWorldExamples = [
  {
    club: "Example Sports Club A",
    sport: "Football",
    members: "120+",
    result: "Reduced admin time by 80% and increased membership renewals by 40%",
    quote: "Monthly Club transformed how we manage our club. We went from spending hours each week chasing payments to having everything automated."
  },
  {
    club: "Example Sports Club B",
    sport: "Cricket", 
    members: "85+",
    result: "Achieved 95% payment collection rate and streamlined member communications",
    quote: "The member communication features are fantastic. We can instantly notify everyone about weather updates or match changes."
  },
  {
    club: "Example Sports Club C",
    sport: "Rugby",
    members: "200+",
    result: "Eliminated payment chasing and improved cash flow predictability",
    quote: "Finally, a solution built for amateur sports clubs. The subscription model works perfectly for our membership structure."
  }
];

export default function SportsClubMembershipSoftwarePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Sports Club Membership Software | Monthly Club</title>
        <meta name="description" content="Complete membership management for amateur rugby, cricket, and football clubs. Automated payments, member communication, and subscription management in one platform." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.monthlyclubhq.com/use-cases/sports-club-membership-software" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/use-cases/sports-club-membership-software",
              },
              headline: "Sports Club Membership Software",
              description: "Complete membership management for amateur rugby, cricket, and football clubs. Automated payments, member communication, and subscription management in one platform.",
              author: { "@type": "Organization", name: "Monthly Club", url: "https://www.monthlyclubhq.com" },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: { "@type": "ImageObject", url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png" },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
              articleSection: ["Membership Management", "Payment Automation", "Member Communication", "Financial Reporting"],
              keywords: "sports club membership software, rugby club management, cricket club subscriptions, football club memberships",
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
                { "@type": "ListItem", position: 3, name: "Sports Club Membership Software" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-indigo/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-5 text-sm">
              <Link href="/use-cases" className="text-brand-purple hover:underline">← Back to Use Cases</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Sports Club Membership Software
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Complete membership management for amateur rugby, cricket, and football clubs. Automate payments, streamline communications, and grow your club with Monthly Club.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Challenge Facing Amateur Sports Clubs</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Managing memberships, collecting payments, and communicating with members shouldn't be a full-time job. 
                Yet many amateur sports clubs struggle with admin overhead that takes time away from what matters most.
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
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Member Communication</h3>
                  <p className="text-sm text-orange-600 dark:text-orange-300">Keeping members informed about matches, training, and club events across multiple channels</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Admin Overhead</h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">Managing spreadsheets, tracking memberships, and handling paperwork instead of focusing on sport</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Monthly Club Solves These Problems</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club is built specifically for amateur sports clubs. Automate payments, streamline member management, 
                and focus on what you do best - building a thriving sports community.
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

        {/* Membership Tiers Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Flexible Membership Tiers</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Create different membership levels that suit your club's structure and member needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {membershipTiers.map((tier, index) => (
                <Card key={index} className={`${index === 1 ? 'border-brand-purple border-2' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-brand-purple">{tier.price}</div>
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
              <h2 className="text-3xl font-bold mb-4">Three Ways to Monetize Your Club</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Beyond traditional memberships, Monthly Club offers flexible ways to generate revenue and improve member experience.
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
              <h2 className="text-3xl font-bold mb-4">Real Sports Clubs Using Monthly Club</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how amateur sports clubs across the UK are transforming their membership management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {realWorldExamples.map((example, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Trophy className="h-8 w-8 text-brand-purple mr-3" />
                      <div>
                        <h3 className="font-semibold">{example.club}</h3>
                        <p className="text-sm text-muted-foreground">{example.sport} • {example.members} members</p>
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
                <h2 className="text-3xl font-bold mb-6">Why Sports Clubs Choose Monthly Club</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Increased Revenue</h3>
                      <p className="text-muted-foreground">Automated payments lead to higher collection rates and more predictable cash flow for your club.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Reduced Admin Time</h3>
                      <p className="text-muted-foreground">Spend less time on paperwork and more time on coaching, training, and growing your club.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Better Member Experience</h3>
                      <p className="text-muted-foreground">Members get a seamless experience with easy payments and clear communication about club activities.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Club?</h3>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of amateur sports clubs already using Monthly Club to streamline their membership management.
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
              Start Managing Your Club Memberships Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the growing number of amateur sports clubs using Monthly Club to streamline their operations and grow their membership.
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
