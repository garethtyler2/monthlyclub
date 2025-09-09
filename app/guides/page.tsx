import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, BookOpen, Lightbulb, Rocket, Award, ArrowUpRight, Scissors, Home, Dumbbell, Building, Sparkles } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Complete Subscription Business Guides | Monthly Club",
  description: "Master subscription business with our comprehensive guides. Learn pricing, marketing, automation, and growth strategies for service businesses. Start earning recurring revenue today.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides"
  },
  openGraph: {
    title: "Complete Subscription Business Guides | Monthly Club",
    description: "Master subscription business with our comprehensive guides. Learn pricing, marketing, automation, and growth strategies for service businesses.",
    url: "https://www.monthlyclubhq.com/guides",
    siteName: "Monthly Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Subscription Business Guides | Monthly Club",
    description: "Master subscription business with our comprehensive guides. Learn pricing, marketing, automation, and growth strategies for service businesses.",
  },
  keywords: [
    "subscription business guides",
    "recurring revenue guides",
    "service subscription tutorials",
    "subscription pricing guides",
    "subscription marketing guides",
    "monthly club guides",
    "subscription business tips",
    "recurring revenue strategies"
  ]
};

export default function GuidesPage() {
  const guideCategories = [
    {
      title: "Getting Started",
      description: "Essential guides to understand and launch your subscription business",
      icon: Rocket,
      color: "brand-blue",
      guides: [
        {
          title: "What is a Service Subscription?",
          description: "Understand the core concept and why recurring revenue works for service businesses",
          href: "/guides/what-is-a-service-subscription",
          readTime: "3 min read",
          difficulty: "Beginner",
          featured: true
        },
        {
          title: "How to Set Up Your Business",
          description: "Complete step-by-step guide to create your business profile and start earning",
          href: "/guides/create-subscription-plan",
          readTime: "4 min read",
          difficulty: "Beginner",
          featured: true
        },
        {
          title: "Benefits of Recurring Revenue",
          description: "Discover the financial and operational advantages of predictable income",
          href: "/guides/recurring-revenue-benefits",
          readTime: "3 min read",
          difficulty: "Beginner",
          featured: true
        },
        {
          title: "How Monthly Club Helps",
          description: "See how we remove admin and tech headaches from your subscription business",
          href: "/guides/how-monthly-club-helps",
          readTime: "2 min read",
          difficulty: "Beginner"
        }
      ]
    },
    {
      title: "Pricing & Strategy",
      description: "Learn how to price your services and develop winning subscription strategies",
      icon: DollarSign,
      color: "brand-green",
      guides: [
        {
          title: "Pricing Subscription Plans",
          description: "Models, anchors, payment days, and example pricing tables for service businesses",
          href: "/guides/pricing-subscription-plans-service-business",
          readTime: "4 min read",
          difficulty: "Intermediate",
          featured: true
        },
        {
          title: "Balance Builder Guide",
          description: "When to use prepaid credit subscriptions and how to price them effectively",
          href: "/guides/balance-builder-subscriptions-guide",
          readTime: "3 min read",
          difficulty: "Intermediate"
        },
        {
          title: "Subscription Launch Checklist",
          description: "Complete checklist from idea to your first 10 subscribers",
          href: "/guides/subscription-launch-checklist",
          readTime: "2 min read",
          difficulty: "Beginner"
        }
      ]
    },
    {
      title: "Marketing & Growth",
      description: "Promote your subscription services and grow your customer base",
      icon: TrendingUp,
      color: "brand-purple",
      guides: [
        {
          title: "Marketing Subscription Services",
          description: "Proven strategies to promote your plans to local customers",
          href: "/guides/marketing-subscription-services",
          readTime: "4 min read",
          difficulty: "Intermediate",
          featured: true
        },
        {
          title: "Subscription Ideas for Service Businesses",
          description: "Creative inspiration from five unique industries and business models",
          href: "/guides/subscription-ideas-for-service-businesses",
          readTime: "3 min read",
          difficulty: "Beginner"
        },
        {
          title: "Service Subscription Examples",
          description: "Real-world examples of successful Monthly Club users and their strategies",
          href: "/guides/service-subscription-examples",
          readTime: "3 min read",
          difficulty: "Beginner"
        }
      ]
    },
    {
      title: "Technical & Automation",
      description: "Understand the technology and automation behind subscription businesses",
      icon: Settings,
      color: "brand-orange",
      guides: [
        {
          title: "Automate Payments with Stripe",
          description: "How Monthly Club uses Stripe to handle all your payment processing automatically",
          href: "/guides/automate-payments-stripe",
          readTime: "3 min read",
          difficulty: "Beginner",
          featured: true
        },
        {
          title: "Subscription Billing Tools",
          description: "Overview of popular billing platforms and how they compare to Monthly Club",
          href: "/guides/subscription-billing-tools",
          readTime: "4 min read",
          difficulty: "Intermediate"
        }
      ]
    }
  ];

  const featuredGuides = guideCategories
    .flatMap(category => category.guides.filter(guide => guide.featured))
    .slice(0, 6);

  const useCaseExamples = [
    {
      title: "Sports Clubs",
      description: "See how amateur sports clubs use subscriptions for membership management",
      href: "/use-cases/sports-club-membership-software",
      icon: Users,
      color: "brand-blue"
    },
    {
      title: "Hairdressers",
      description: "See how salons and barbers use subscription plans for regular clients",
      href: "/use-cases/hairdressers-subscription-software",
      icon: Scissors,
      color: "brand-purple"
    },
    {
      title: "Cleaning Services",
      description: "See how cleaners use recurring revenue for steady income",
      href: "/use-cases/cleaning-subscription-software",
      icon: Home,
      color: "brand-green"
    },
    {
      title: "Personal Trainers",
      description: "See how fitness professionals use subscriptions for training sessions",
      href: "/use-cases/personal-trainers-gym-memberships",
      icon: Dumbbell,
      color: "brand-orange"
    },
    {
      title: "Gym Memberships",
      description: "See how local gyms use subscription management for members",
      href: "/use-cases/gym-membership-software",
      icon: Building,
      color: "brand-indigo"
    },
    {
      title: "Beauty Salons",
      description: "See how aestheticians and beauty therapists use subscriptions",
      href: "/use-cases/beauty-salon-subscription-software",
      icon: Sparkles,
      color: "brand-pink"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-indigo-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Knowledge Hub
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Master Your Subscription Business
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Complete guides to help you understand, launch, price, market, and grow your 
              subscription-based service business. From beginner basics to advanced strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Your Business
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/use-cases">
                <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Browse Use Cases
                </Button>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Comprehensive Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Expert Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Free Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Tech Skills Required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Guides */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Guides
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Start with these essential guides to understand subscription businesses 
                and launch your own recurring revenue stream.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredGuides.map((guide, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {guide.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={guide.href}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        Read Guide
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guide Categories */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive collection of guides organized by topic. 
                Whether you're just starting or looking to scale, we have the resources you need.
              </p>
            </div>

            <div className="space-y-12">
              {guideCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-background rounded-lg flex items-center justify-center`}>
                      <category.icon className={`w-6 h-6 text-primary`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.guides.map((guide, guideIndex) => (
                      <Card key={guideIndex} className={`group hover:shadow-lg transition-all duration-300 border border-${category.color}/20 bg-gradient-to-b from-${category.color}/10 to-transparent`}>
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {guide.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {guide.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {guide.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link href={guide.href}>
                            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                              Read Guide
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                See Real-World Examples
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore how different industries use Monthly Club to build recurring revenue 
                and grow their businesses. Get inspired by real success stories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCaseExamples.map((example, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${example.color}/20 bg-gradient-to-b from-${example.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                      <example.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {example.title}
                    </CardTitle>
                    <CardDescription>
                      {example.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={example.href}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        View Example
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-indigo-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Start Your Subscription Business?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Use these guides to master subscription business, then create your own 
                  recurring revenue stream in just 15 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Your Business
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/use-cases">
                    <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Browse Use Cases
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="guides-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Complete Subscription Business Guides | Monthly Club",
          "description": "Master subscription business with our comprehensive guides. Learn pricing, marketing, automation, and growth strategies for service businesses.",
          "url": "https://www.monthlyclubhq.com/guides",
          "publisher": {
            "@type": "Organization",
            "name": "Monthly Club",
            "url": "https://www.monthlyclubhq.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png"
            }
          },
          "mainEntity": {
            "@type": "ItemList",
            "name": "Subscription Business Guides",
            "description": "Comprehensive collection of guides for subscription businesses",
            "numberOfItems": 15,
            "itemListElement": guideCategories.flatMap(category => 
              category.guides.map(guide => ({
                "@type": "Article",
                "name": guide.title,
                "description": guide.description,
                "url": `https://www.monthlyclubhq.com${guide.href}`,
                "author": {
                  "@type": "Organization",
                  "name": "Monthly Club"
                }
              }))
            )
          }
        })}
      </Script>
    </>
  );
}
