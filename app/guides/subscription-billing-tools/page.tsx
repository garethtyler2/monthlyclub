import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, BookOpen, Lightbulb, Rocket, Award, ArrowUpRight, Wrench, Cog, Database, FileText, AlertTriangle, CheckCircle2, XCircle, ExternalLink, ArrowUpRight as ArrowUpRightIcon, RefreshCw } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Subscription Billing Tools | Complete Guide | Monthly Club",
  description: "Discover the best subscription billing tools for service businesses. Compare Stripe, Square, PayPal and learn how Monthly Club simplifies recurring payments.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/subscription-billing-tools"
  },
  openGraph: {
    title: "Subscription Billing Tools | Complete Guide | Monthly Club",
    description: "Discover the best subscription billing tools for service businesses. Compare Stripe, Square, PayPal and learn how Monthly Club simplifies recurring payments.",
    url: "https://www.monthlyclubhq.com/guides/subscription-billing-tools",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription Billing Tools | Complete Guide | Monthly Club",
    description: "Discover the best subscription billing tools for service businesses. Compare Stripe, Square, PayPal and learn how Monthly Club simplifies recurring payments.",
  },
  keywords: [
    "subscription billing tools",
    "recurring payment tools",
    "billing software",
    "payment processing",
    "subscription management",
    "automated billing",
    "payment automation",
    "billing solutions"
  ]
};

export default function SubscriptionBillingToolsPage() {
  const billingTools = [
    {
      name: "Stripe",
      description: "The most popular choice for small businesses with powerful features",
      icon: CreditCard,
      color: "brand-blue",
      pros: [
        "Most popular and trusted",
        "Powerful recurring billing features",
        "Excellent failed payment recovery",
        "Comprehensive reporting",
        "Strong security and compliance"
      ],
      cons: [
        "Can be complex to set up",
        "Requires technical knowledge",
        "Higher fees for small volumes"
      ],
      pricing: "2.9% + 30p per transaction",
      bestFor: "Growing businesses, tech-savvy users",
      features: ["Recurring billing", "Failed payment recovery", "Multi-currency", "Advanced reporting", "Webhooks"]
    },
    {
      name: "Square",
      description: "Great for businesses already using Square POS systems",
      icon: Smartphone,
      color: "brand-green",
      pros: [
        "Easy integration with Square POS",
        "Simple setup process",
        "Good for in-person services",
        "Familiar to many customers"
      ],
      cons: [
        "Limited advanced features",
        "Tied to Square ecosystem",
        "Less flexible than Stripe"
      ],
      pricing: "2.9% + 30p per transaction",
      bestFor: "Existing Square users, simple needs",
      features: ["POS integration", "Basic recurring billing", "Customer management", "Simple reporting"]
    },
    {
      name: "PayPal",
      description: "Familiar to customers and easy to get started",
      icon: Wallet,
      color: "brand-purple",
      pros: [
        "Very familiar to customers",
        "Easy to set up and use",
        "Good for small businesses",
        "Wide customer acceptance"
      ],
      cons: [
        "Limited customization",
        "Higher fees than competitors",
        "Less advanced features",
        "Customer account required"
      ],
      pricing: "3.4% + 30p per transaction",
      bestFor: "Small businesses, customer familiarity",
      features: ["PayPal integration", "Basic recurring billing", "Customer accounts", "Simple setup"]
    },
    {
      name: "Monthly Club",
      description: "All-in-one solution designed specifically for service businesses",
      icon: Settings,
      color: "brand-orange",
      pros: [
        "Built for service businesses",
        "No technical setup required",
        "Includes business page creation",
        "Customer management included",
        "Stripe-powered backend"
      ],
      cons: [
        "Newer platform",
        "Limited to service businesses",
        "Less customization options"
      ],
      pricing: "Stripe fees + Monthly Club fee",
      bestFor: "Service businesses wanting simplicity",
      features: ["Business page creation", "Customer management", "Stripe integration", "No technical setup", "Service-focused"]
    }
  ];

  const billingFeatures = [
    {
      feature: "Automated Recurring Billing",
      description: "Set up once and payments are collected automatically",
      icon: Zap,
      color: "brand-blue",
      importance: "Essential"
    },
    {
      feature: "Failed Payment Recovery",
      description: "Automatically retry failed payments and notify customers",
      icon: RefreshCw,
      color: "brand-green",
      importance: "Essential"
    },
    {
      feature: "Customer Management",
      description: "Track customer information and subscription history",
      icon: Users,
      color: "brand-purple",
      importance: "Important"
    },
    {
      feature: "Invoice Generation",
      description: "Automatically generate and send invoices to customers",
      icon: FileText,
      color: "brand-orange",
      importance: "Important"
    },
    {
      feature: "Payment Method Updates",
      description: "Allow customers to update their payment information",
      icon: CreditCard,
      color: "brand-pink",
      importance: "Important"
    },
    {
      feature: "Reporting & Analytics",
      description: "Track revenue, churn, and other key metrics",
      icon: BarChart3,
      color: "brand-indigo",
      importance: "Nice to Have"
    },
    {
      feature: "Multi-Currency Support",
      description: "Accept payments in multiple currencies",
      icon: Globe,
      color: "brand-teal",
      importance: "Nice to Have"
    },
    {
      feature: "Webhook Integration",
      description: "Connect with other tools and systems",
      icon: Wrench,
      color: "brand-slate",
      importance: "Advanced"
    }
  ];

  const implementationSteps = [
    {
      step: 1,
      title: "Choose Your Tool",
      description: "Select the billing tool that best fits your business needs and technical comfort level",
      icon: Target,
      color: "brand-blue",
      tasks: [
        "Evaluate your technical skills",
        "Consider your business size and growth plans",
        "Compare pricing and features",
        "Check integration requirements"
      ]
    },
    {
      step: 2,
      title: "Set Up Your Account",
      description: "Create your account and complete the verification process",
      icon: Settings,
      color: "brand-green",
      tasks: [
        "Create account with chosen provider",
        "Complete identity verification",
        "Add your bank account details",
        "Configure basic settings"
      ]
    },
    {
      step: 3,
      title: "Create Your Products",
      description: "Set up your subscription plans and pricing",
      icon: DollarSign,
      color: "brand-purple",
      tasks: [
        "Define your subscription plans",
        "Set pricing and billing intervals",
        "Add product descriptions",
        "Configure trial periods if needed"
      ]
    },
    {
      step: 4,
      title: "Test Your Setup",
      description: "Test the entire billing flow to ensure everything works correctly",
      icon: CheckCircle,
      color: "brand-orange",
      tasks: [
        "Create test subscriptions",
        "Verify payment processing",
        "Test failed payment scenarios",
        "Check email notifications"
      ]
    },
    {
      step: 5,
      title: "Go Live",
      description: "Launch your subscription billing and start collecting payments",
      icon: Rocket,
      color: "brand-pink",
      tasks: [
        "Switch to live mode",
        "Share your subscription page",
        "Monitor initial transactions",
        "Provide customer support"
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Not Testing Thoroughly",
      description: "Failing to test all payment scenarios before going live",
      impact: "High",
      solution: "Always test with real £1 transactions before launching"
    },
    {
      mistake: "Ignoring Failed Payments",
      description: "Not setting up proper failed payment recovery",
      impact: "High",
      solution: "Enable automatic retry and customer notifications"
    },
    {
      mistake: "Complex Pricing Structure",
      description: "Making pricing too complicated for customers to understand",
      impact: "Medium",
      solution: "Keep pricing simple and transparent"
    },
    {
      mistake: "Poor Customer Communication",
      description: "Not explaining billing changes or subscription terms clearly",
      impact: "Medium",
      solution: "Send clear emails about billing and subscription management"
    },
    {
      mistake: "No Backup Plan",
      description: "Not having a plan for when payments fail or customers cancel",
      impact: "Medium",
      solution: "Have retention strategies and alternative payment options"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-blue-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Wrench className="w-4 h-4" />
              Billing Tools Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Subscription Billing Tools
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover the best subscription billing tools for service businesses. 
              Compare Stripe, Square, PayPal and learn how Monthly Club simplifies recurring payments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Billing Today
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
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Billing Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">8</div>
                <div className="text-sm text-muted-foreground">Key Features</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-sm text-muted-foreground">Setup Steps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why You Need Billing Tools */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why You Need Subscription Billing Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Manual billing is a headache that costs you time and money. 
                Automated billing tools handle the complexity so you can focus on your service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-red/20 bg-gradient-to-b from-brand-red/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Without Billing Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Manual Invoicing</h4>
                        <p className="text-sm text-muted-foreground">Creating and sending invoices manually every month</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Chasing Payments</h4>
                        <p className="text-sm text-muted-foreground">Following up on late payments and failed charges</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Admin Overhead</h4>
                        <p className="text-sm text-muted-foreground">Hours spent on billing instead of serving customers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Human Error</h4>
                        <p className="text-sm text-muted-foreground">Mistakes in invoicing and payment tracking</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">With Billing Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Automated Billing</h4>
                        <p className="text-sm text-muted-foreground">Payments collected automatically on schedule</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Failed Payment Recovery</h4>
                        <p className="text-sm text-muted-foreground">Automatic retry and customer notifications</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Time Savings</h4>
                        <p className="text-sm text-muted-foreground">Focus on service delivery, not admin tasks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Accurate Tracking</h4>
                        <p className="text-sm text-muted-foreground">Real-time reporting and customer management</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Billing Tools Comparison */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Top Subscription Billing Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Compare the most popular billing tools for service businesses. 
                Each has different strengths and is suited for different business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {billingTools.map((tool, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${tool.color}/20 bg-gradient-to-b from-${tool.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                        <tool.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-primary">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {tool.pricing}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {tool.bestFor}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Pros and Cons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-green-600">Pros:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {tool.pros.map((pro, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-red-600">Cons:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {tool.cons.map((con, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {tool.features.map((feature, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
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

        {/* Essential Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Essential Billing Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                These features are crucial for successful subscription billing. 
                Make sure your chosen tool includes the essentials for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {billingFeatures.map((feature, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${feature.color}/20 bg-gradient-to-b from-${feature.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-primary">{feature.feature}</CardTitle>
                      <Badge 
                        variant={feature.importance === "Essential" ? "default" : feature.importance === "Important" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {feature.importance}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How to Set Up Billing
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these steps to successfully implement subscription billing for your service business. 
                Each step builds on the previous one to ensure a smooth setup.
              </p>
            </div>

            <div className="space-y-8">
              {implementationSteps.map((step, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${step.color}/20 bg-gradient-to-b from-${step.color}/10 to-transparent`}>
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">{step.step}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
                        <p className="text-muted-foreground mb-6">{step.description}</p>
                        <div>
                          <h4 className="font-semibold text-sm mb-3">Tasks to Complete:</h4>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {step.tasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Common Billing Mistakes
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Avoid these common pitfalls that can hurt your subscription business. 
                Learn from others' mistakes to ensure smooth billing operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {commonMistakes.map((mistake, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-primary">{mistake.mistake}</CardTitle>
                      <Badge 
                        variant={mistake.impact === "High" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {mistake.impact} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{mistake.description}</p>
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Solution:</h4>
                        <p className="text-sm text-muted-foreground">{mistake.solution}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-0 shadow-glow overflow-hidden relative">
              <CardContent className="p-8 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-blue-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Simplify Your Billing?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Stop wasting time on manual billing. Choose the right tool for your business 
                  and start automating your recurring payments today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Billing Today
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
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="subscription-billing-tools-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Subscription Billing Tools | Complete Guide | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/subscription-billing-tools",
          "description": "Discover the best subscription billing tools for service businesses. Compare Stripe, Square, PayPal and learn how Monthly Club simplifies recurring payments.",
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
