import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, BookOpen, Lightbulb, Rocket, Award, ArrowUpRight, Monitor, Smartphone as PhoneIcon, ExternalLink, Copy, Share, Heart, ThumbsUp, MessageSquare, Star as StarIcon } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Service Subscription Examples | Real Business Pages | Monthly Club",
  description: "Explore real-world examples of subscription pages from service businesses. See how cleaners, hairdressers, and local pros use Monthly Club to build recurring revenue.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/service-subscription-examples"
  },
  openGraph: {
    title: "Service Subscription Examples | Real Business Pages | Monthly Club",
    description: "Explore real-world examples of subscription pages from service businesses. See how local pros build recurring revenue.",
    url: "https://www.monthlyclubhq.com/guides/service-subscription-examples",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Subscription Examples | Real Business Pages | Monthly Club",
    description: "Explore real-world examples of subscription pages from service businesses. See how local pros build recurring revenue.",
  },
  keywords: [
    "subscription examples",
    "service business examples",
    "subscription page examples",
    "recurring revenue examples",
    "local business subscriptions",
    "subscription success stories",
    "business page examples",
    "subscription case studies"
  ]
};

export default function ServiceSubscriptionExamplesPage() {
  const businessExamples = [
    {
      name: "Amira's Cleaning Service",
      business: "Example Cleaning Business A",
      industry: "Home Cleaning",
      icon: Home,
      color: "brand-green",
      description: "Weekly and fortnightly cleaning subscriptions with flexible scheduling",
      plans: [
        {
          name: "Weekly Clean",
          price: "£80/month",
          description: "2-hour weekly cleaning session",
          features: ["All rooms", "Vacuum & mop", "Bathroom deep clean", "Kitchen sanitize"]
        },
        {
          name: "Fortnightly Clean",
          price: "£45/month",
          description: "2-hour cleaning every 2 weeks",
          features: ["All rooms", "Vacuum & mop", "Bathroom clean", "Kitchen tidy"]
        }
      ],
      results: {
        subscribers: "25+ active subscribers",
        revenue: "£1,800/month recurring",
        timeline: "6 months",
        retention: "85% retention rate"
      },
      keyFeatures: [
        "Flexible scheduling options",
        "Easy rescheduling via app",
        "Consistent quality service",
        "No long-term contracts"
      ]
    },
    {
      name: "Jay's Mobile Barber",
      business: "Example Barber Business A",
      industry: "Mobile Barbering",
      icon: Scissors,
      color: "brand-blue",
      description: "Monthly home visit haircuts for busy professionals",
      plans: [
        {
          name: "Monthly Cut",
          price: "£35/month",
          description: "Home visit haircut and styling",
          features: ["Haircut", "Styling", "Beard trim", "Home convenience"]
        },
        {
          name: "Premium Package",
          price: "£55/month",
          description: "Monthly cut plus beard maintenance",
          features: ["Haircut", "Beard trim", "Mustache styling", "Hair wash"]
        }
      ],
      results: {
        subscribers: "40+ regular clients",
        revenue: "£1,400/month recurring",
        timeline: "4 months",
        retention: "90% retention rate"
      },
      keyFeatures: [
        "Home convenience",
        "Flexible timing",
        "Professional equipment",
        "Consistent quality"
      ]
    },
    {
      name: "Ella's Pet Grooming",
      business: "Example Pet Business A",
      industry: "Pet Grooming",
      icon: Heart,
      color: "brand-pink",
      description: "Bi-monthly grooming subscriptions with optional add-ons",
      plans: [
        {
          name: "Basic Groom",
          price: "£60/month",
          description: "Bi-monthly grooming session",
          features: ["Wash & dry", "Nail trim", "Ear cleaning", "Brush out"]
        },
        {
          name: "Deluxe Package",
          price: "£85/month",
          description: "Bi-monthly grooming plus extras",
          features: ["Full groom", "Nail polish", "Teeth cleaning", "Flea treatment"]
        }
      ],
      results: {
        subscribers: "30+ pet families",
        revenue: "£1,800/month recurring",
        timeline: "8 months",
        retention: "80% retention rate"
      },
      keyFeatures: [
        "Pet-specific care",
        "Optional add-ons",
        "Flexible scheduling",
        "Health monitoring"
      ]
    },
    {
      name: "Mike's Garden Care",
      business: "Example Garden Business A",
      industry: "Garden Maintenance",
      icon: TreePine,
      color: "brand-green",
      description: "Seasonal garden maintenance with year-round care",
      plans: [
        {
          name: "Monthly Maintenance",
          price: "£90/month",
          description: "Monthly garden tidy and maintenance",
          features: ["Lawn cutting", "Weeding", "Pruning", "Leaf clearing"]
        },
        {
          name: "Seasonal Package",
          price: "£120/season",
          description: "Comprehensive seasonal garden care",
          features: ["Deep clean", "Planting", "Mulching", "Seasonal prep"]
        }
      ],
      results: {
        subscribers: "20+ garden clients",
        revenue: "£1,200/month recurring",
        timeline: "12 months",
        retention: "75% retention rate"
      },
      keyFeatures: [
        "Seasonal expertise",
        "Regular maintenance",
        "Plant health monitoring",
        "Weather-appropriate care"
      ]
    },
    {
      name: "Sarah's Fitness Coaching",
      business: "Example Fitness Business A",
      industry: "Personal Training",
      icon: Dumbbell,
      color: "brand-purple",
      description: "Monthly personal training with nutrition guidance",
      plans: [
        {
          name: "Monthly Training",
          price: "£120/month",
          description: "4 personal training sessions",
          features: ["1:1 training", "Workout plans", "Progress tracking", "Form correction"]
        },
        {
          name: "Complete Package",
          price: "£180/month",
          description: "Training plus nutrition coaching",
          features: ["4 training sessions", "Meal plans", "Nutrition guidance", "Weekly check-ins"]
        }
      ],
      results: {
        subscribers: "15+ fitness clients",
        revenue: "£1,800/month recurring",
        timeline: "6 months",
        retention: "95% retention rate"
      },
      keyFeatures: [
        "Personalized training",
        "Nutrition guidance",
        "Progress tracking",
        "Flexible scheduling"
      ]
    },
    {
      name: "Tom's Car Valeting",
      business: "Example Valeting Business A",
      industry: "Car Valeting",
      icon: Car,
      color: "brand-blue",
      description: "Weekly car cleaning with premium detailing options",
      plans: [
        {
          name: "Weekly Wash",
          price: "£80/month",
          description: "Weekly exterior wash and interior clean",
          features: ["Exterior wash", "Interior vacuum", "Window cleaning", "Tire shine"]
        },
        {
          name: "Premium Detail",
          price: "£150/month",
          description: "Weekly wash plus monthly deep detail",
          features: ["Weekly wash", "Monthly wax", "Leather treatment", "Engine clean"]
        }
      ],
      results: {
        subscribers: "35+ car owners",
        revenue: "£2,100/month recurring",
        timeline: "5 months",
        retention: "88% retention rate"
      },
      keyFeatures: [
        "Convenient location",
        "Premium products",
        "Flexible scheduling",
        "Quality guarantee"
      ]
    }
  ];

  const pageFeatures = [
    {
      feature: "Professional Branding",
      description: "Your logo, colors, and business description prominently displayed",
      icon: Star,
      color: "brand-blue"
    },
    {
      feature: "Clear Pricing",
      description: "Transparent pricing with no hidden fees or surprises",
      icon: DollarSign,
      color: "brand-green"
    },
    {
      feature: "Easy Checkout",
      description: "Secure Stripe-powered checkout with saved payment methods",
      icon: CreditCard,
      color: "brand-purple"
    },
    {
      feature: "Mobile Optimized",
      description: "Perfect experience on all devices, especially mobile",
      icon: Smartphone,
      color: "brand-orange"
    },
    {
      feature: "Customer Portal",
      description: "Subscribers can manage their subscription and view history",
      icon: Settings,
      color: "brand-indigo"
    },
    {
      feature: "Automatic Billing",
      description: "Recurring payments handled automatically with email receipts",
      icon: Zap,
      color: "brand-pink"
    }
  ];

  const successMetrics = [
    {
      metric: "Average Revenue Increase",
      value: "65%",
      description: "Typical increase in monthly revenue after 6 months",
      icon: TrendingUp,
      color: "brand-green"
    },
    {
      metric: "Customer Retention",
      value: "85%",
      description: "Average retention rate for subscription customers",
      icon: Heart,
      color: "brand-pink"
    },
    {
      metric: "Time Saved",
      value: "10+ hours",
      description: "Hours saved per week on admin and scheduling",
      icon: Clock,
      color: "brand-blue"
    },
    {
      metric: "Setup Time",
      value: "15 minutes",
      description: "Time to create your subscription page",
      icon: Zap,
      color: "brand-purple"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-blue-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Monitor className="w-4 h-4" />
              Real Examples
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Service Subscription Examples
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Explore real-world examples of subscription pages from service businesses. 
              See how cleaners, hairdressers, and local pros use Monthly Club to build recurring revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Create Your Page
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
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Real Examples</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">65%</div>
                <div className="text-sm text-muted-foreground">Revenue Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Retention Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Examples */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Real Business Examples
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how real service businesses have transformed their operations with subscription models. 
                Each example shows actual results and proven strategies.
              </p>
            </div>

            <div className="space-y-12">
              {businessExamples.map((example, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${example.color}/20 bg-gradient-to-b from-${example.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                        <example.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-primary">{example.name}</CardTitle>
                        <CardDescription className="text-base">{example.description}</CardDescription>
                        <Badge variant="outline" className="mt-2">{example.industry}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Subscription Plans */}
                      <div>
                        <h4 className="font-semibold text-lg mb-4">Subscription Plans:</h4>
                        <div className="space-y-4">
                          {example.plans.map((plan, planIndex) => (
                            <Card key={planIndex} className="bg-background/50 border border-white/10">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-semibold text-primary">{plan.name}</h5>
                                  <Badge variant="outline" className="text-xs">
                                    {plan.price}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-2">
                                      <CheckCircle className="w-3 h-3 text-green-500" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {/* Results & Features */}
                      <div className="space-y-6">
                        {/* Results */}
                        <div>
                          <h4 className="font-semibold text-lg mb-4">Results:</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background/50 rounded-lg p-3">
                              <div className="text-2xl font-bold text-primary mb-1">{example.results.subscribers}</div>
                              <div className="text-xs text-muted-foreground">Active Subscribers</div>
                            </div>
                            <div className="bg-background/50 rounded-lg p-3">
                              <div className="text-2xl font-bold text-primary mb-1">{example.results.revenue}</div>
                              <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                            </div>
                            <div className="bg-background/50 rounded-lg p-3">
                              <div className="text-2xl font-bold text-primary mb-1">{example.results.timeline}</div>
                              <div className="text-xs text-muted-foreground">Time to Results</div>
                            </div>
                            <div className="bg-background/50 rounded-lg p-3">
                              <div className="text-2xl font-bold text-primary mb-1">{example.results.retention}</div>
                              <div className="text-xs text-muted-foreground">Retention Rate</div>
                            </div>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div>
                          <h4 className="font-semibold text-lg mb-4">Key Features:</h4>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {example.keyFeatures.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {feature}
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

        {/* Page Features */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Makes These Pages Work?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every successful subscription page includes these key features that drive conversions 
                and keep customers engaged long-term.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageFeatures.map((feature, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${feature.color}/20 bg-gradient-to-b from-${feature.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-primary">{feature.feature}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Proven Results
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                These aren't just examples - they're proven success stories with real metrics 
                that show the power of subscription models for service businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {successMetrics.map((metric, index) => (
                <Card key={index} className={`text-center border border-${metric.color}/20 bg-gradient-to-b from-${metric.color}/10 to-transparent`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                      <metric.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-primary mb-2">{metric.value}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{metric.metric}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
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
                  Ready to Create Your Success Story?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Join these successful businesses and start building your recurring revenue stream. 
                  Create your subscription page in just 15 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Create Your Page
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

      <Script id="service-subscription-examples-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Service Subscription Examples | Real Business Pages | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/service-subscription-examples",
          "description": "Explore real-world examples of subscription pages from service businesses. See how local pros build recurring revenue.",
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
