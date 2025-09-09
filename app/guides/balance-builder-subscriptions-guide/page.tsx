import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, BookOpen, Lightbulb, Rocket, Award, ArrowUpRight, PiggyBank, Coins, Gift, RefreshCw, AlertTriangle, Info, Car, Home, Heart, Dumbbell, Briefcase } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Balance Builder Subscriptions | Complete Guide | Monthly Club",
  description: "Master Balance Builder subscriptions with our complete guide. Learn how to price, position, and launch prepaid service credit plans that build customer loyalty and increase revenue.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/balance-builder-subscriptions-guide"
  },
  openGraph: {
    title: "Balance Builder Subscriptions | Complete Guide | Monthly Club",
    description: "Master Balance Builder subscriptions with our complete guide. Learn how to price, position, and launch prepaid service credit plans.",
    url: "https://www.monthlyclubhq.com/guides/balance-builder-subscriptions-guide",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balance Builder Subscriptions | Complete Guide | Monthly Club",
    description: "Master Balance Builder subscriptions with our complete guide. Learn how to price, position, and launch prepaid service credit plans.",
  },
  keywords: [
    "balance builder subscriptions",
    "prepaid service credit",
    "service wallet",
    "flexible subscriptions",
    "irregular service patterns",
    "subscription credit",
    "prepaid balance",
    "service credit plans"
  ]
};

export default function BalanceBuilderGuidePage() {
  const useCases = [
    {
      title: "Irregular Visit Patterns",
      description: "Perfect for customers who need services at varying intervals",
      examples: ["Beauty treatments", "Car detailing", "Pet grooming", "Home maintenance"],
      icon: Calendar,
      color: "brand-blue"
    },
    {
      title: "High-Value Services",
      description: "Ideal for expensive but infrequent services",
      examples: ["Deep cleaning", "Full car detail", "Hair coloring", "Home renovation"],
      icon: Star,
      color: "brand-purple"
    },
    {
      title: "Seasonal Services",
      description: "Great for spreading seasonal costs across months",
      examples: ["Garden maintenance", "Holiday decorations", "Pool cleaning", "HVAC maintenance"],
      icon: RefreshCw,
      color: "brand-green"
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      amount: "£20/month",
      description: "Perfect for occasional services",
      example: "Build credit for a basic treatment every 3 months",
      bonus: "No bonus",
      color: "brand-blue"
    },
    {
      name: "Standard",
      amount: "£40/month",
      description: "Great for regular maintenance",
      example: "Build credit for a standard service every 2 months",
      bonus: "Small top-up bonus",
      color: "brand-green"
    },
    {
      name: "Premium",
      amount: "£60/month",
      description: "Ideal for high-value services",
      example: "Build credit for a premium service monthly",
      bonus: "£5 bonus credit",
      color: "brand-purple"
    }
  ];

  const industryExamples = [
    {
      industry: "Beauty & Hair",
      tiers: ["£20", "£40", "£60"],
      use: "Build toward color, facial, or 3rd blow-dry",
      timeline: "2-3 months for full service",
      icon: Star,
      color: "brand-pink"
    },
    {
      industry: "Auto Care",
      tiers: ["£25", "£50", "£75"],
      use: "Detailing every 2-3 months",
      timeline: "3-4 months for full detail",
      icon: Car,
      color: "brand-blue"
    },
    {
      industry: "Home Services",
      tiers: ["£20", "£40", "£80"],
      use: "Deep clean, gutter clear, or seasonal jobs",
      timeline: "2-6 months depending on service",
      icon: Home,
      color: "brand-green"
    },
    {
      industry: "Pet Services",
      tiers: ["£15", "£30", "£60"],
      use: "Full groom every few months",
      timeline: "2-4 months for full groom",
      icon: Heart,
      color: "brand-orange"
    },
    {
      industry: "Fitness & Wellness",
      tiers: ["£30", "£60", "£90"],
      use: "Personal training packages or spa treatments",
      timeline: "1-3 months for packages",
      icon: Dumbbell,
      color: "brand-indigo"
    },
    {
      industry: "Professional Services",
      tiers: ["£50", "£100", "£150"],
      use: "Consulting hours or project work",
      timeline: "1-2 months for service blocks",
      icon: Briefcase,
      color: "brand-slate"
    }
  ];

  const messagingTips = [
    {
      do: "Use 'build service credit'",
      dont: "Avoid 'credit score' or 'credit report'",
      reason: "Clear it's prepaid store credit, not financial credit"
    },
    {
      do: "Say 'prepaid balance' or 'wallet'",
      dont: "Don't say 'loan' or 'borrowing'",
      reason: "Emphasizes it's their money, not borrowed funds"
    },
    {
      do: "Explain 'redeem for services'",
      dont: "Avoid 'credit agencies' or 'reporting'",
      reason: "Makes it clear this is only for your services"
    },
    {
      do: "Use 'flexible spending'",
      dont: "Don't say 'credit building'",
      reason: "Focuses on convenience, not financial benefits"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-purple-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <PiggyBank className="w-4 h-4" />
              Balance Builder Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Balance Builder Subscriptions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master Balance Builder subscriptions with our complete guide. Learn how to price, position, 
              and launch prepaid service credit plans that build customer loyalty and increase revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Set Up Balance Builder
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Browse All Guides
                </Button>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Pricing Tiers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Industry Examples</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Flexible</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Balance Builder */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What is Balance Builder?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Balance Builder lets customers prepay into a wallet they can use later for services. 
                It's perfect for irregular visit patterns and high-value services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Customers make fixed monthly contributions (e.g., £20/£40/£60) that build up as 
                      service credit in their wallet. They can redeem this credit for any of your services later.
                    </p>
                    <div className="bg-background/50 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">Key Points:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Fixed monthly contributions</li>
                        <li>• Builds service credit over time</li>
                        <li>• Redeemable for any service</li>
                        <li>• Not a loan or credit report</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Balance Builder provides flexibility for customers while ensuring predictable 
                      revenue for your business. It's perfect for irregular service patterns.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Flexible service timing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Predictable monthly revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Higher customer retention</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Reduced scheduling conflicts</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* When to Use Balance Builder */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                When to Use Balance Builder
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Balance Builder is perfect for specific business scenarios where traditional 
                subscriptions don't fit customer needs or service patterns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${useCase.color}/20 bg-gradient-to-b from-${useCase.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                      <useCase.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Examples:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {useCase.examples.map((example, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {example}
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

        {/* Pricing Strategy */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How to Price Balance Builder
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Offer 3 tiers with clear examples of what each contribution level achieves. 
                Include bonuses for higher tiers to encourage larger contributions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${tier.color}/20 bg-gradient-to-b from-${tier.color}/10 to-transparent`}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">{tier.amount}</div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Example Goal:</h4>
                        <p className="text-sm text-muted-foreground">{tier.example}</p>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Bonus:</h4>
                        <p className="text-sm text-muted-foreground">{tier.bonus}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Examples */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Industry Examples
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how different industries implement Balance Builder subscriptions. 
                Use these examples as starting points for your own pricing strategy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industryExamples.map((example, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${example.color}/20 bg-gradient-to-b from-${example.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                      <example.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{example.industry}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Tiers:</h4>
                        <div className="flex gap-2">
                          {example.tiers.map((tier, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tier}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Typical Use:</h4>
                        <p className="text-sm text-muted-foreground">{example.use}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Timeline:</h4>
                        <p className="text-sm text-muted-foreground">{example.timeline}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Messaging Guidelines */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Messaging Guidelines
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Use clear, friendly language that emphasizes service credit, not financial credit. 
                Avoid terms that might confuse customers about credit reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {messagingTips.map((tip, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">Messaging Tip {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                          <h4 className="font-semibold text-green-200 text-sm mb-2">✓ Do:</h4>
                          <p className="text-sm text-muted-foreground">"{tip.do}"</p>
                        </div>
                        <div className="bg-red-50/20 border border-red-200/20 rounded-lg p-3">
                          <h4 className="font-semibold text-red-200 text-sm mb-2">✗ Don't:</h4>
                          <p className="text-sm text-muted-foreground">"{tip.dont}"</p>
                        </div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Why:</h4>
                        <p className="text-sm text-muted-foreground">{tip.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Tips */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Implementation Tips
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these best practices to successfully launch and manage your Balance Builder 
                subscriptions for maximum customer satisfaction and business growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Launch Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Start with Existing Customers</h4>
                        <p className="text-sm text-muted-foreground">Migrate customers who skip months or frequently reschedule</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Keep Traditional Plans</h4>
                        <p className="text-sm text-muted-foreground">Offer Balance Builder as a flexible alternative, not a replacement</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Announce Clearly</h4>
                        <p className="text-sm text-muted-foreground">Post an announcement explaining who should switch and why</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Customer Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Show Flexibility</h4>
                        <p className="text-sm text-muted-foreground">Highlight that customers can use their balance for any service</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Set Clear Goals</h4>
                        <p className="text-sm text-muted-foreground">Show example goals like "Save up for a deluxe treatment"</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Use Friendly Language</h4>
                        <p className="text-sm text-muted-foreground">Terms like "wallet," "service credit," or "prepaid balance"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-0 shadow-glow overflow-hidden relative">
              <CardContent className="p-8 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-purple-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Launch Balance Builder?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Use these strategies to create flexible subscription plans that work for irregular 
                  service patterns and build stronger customer relationships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Set Up Balance Builder
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/guides">
                    <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Explore More Guides
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="balance-builder-subscriptions-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Balance Builder Subscriptions | Complete Guide | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/balance-builder-subscriptions-guide",
          "description": "Master Balance Builder subscriptions with our complete guide. Learn how to price, position, and launch prepaid service credit plans.",
          "author": {
            "@type": "Organization",
            "name": "Monthly Club",
            "url": "https://www.monthlyclubhq.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Monthly Club",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png"
            }
          },
          "datePublished": "2024-06-01",
          "dateModified": "2025-01-15"
        })}
      </Script>
    </>
  );
}
