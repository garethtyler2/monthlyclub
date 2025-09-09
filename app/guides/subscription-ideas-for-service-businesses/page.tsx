import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, BookOpen, Lightbulb, Rocket, Award, ArrowUpRight, Heart, Car, Home, Dumbbell, Scissors, Wrench, GraduationCap, Sparkles, Coffee, Music, Camera, Paintbrush, Briefcase, Dog, TreePine, Droplets, BookOpen as BookIcon, Zap as ZapIcon } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Subscription Ideas for Service Businesses | Complete Guide | Monthly Club",
  description: "Discover 50+ creative subscription ideas for service-based businesses. Get inspired with real examples, pricing strategies, and implementation tips for recurring revenue.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/subscription-ideas-for-service-businesses"
  },
  openGraph: {
    title: "Subscription Ideas for Service Businesses | Complete Guide | Monthly Club",
    description: "Discover 50+ creative subscription ideas for service-based businesses. Get inspired with real examples and pricing strategies.",
    url: "https://www.monthlyclubhq.com/guides/subscription-ideas-for-service-businesses",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription Ideas for Service Businesses | Complete Guide | Monthly Club",
    description: "Discover 50+ creative subscription ideas for service-based businesses. Get inspired with real examples and pricing strategies.",
  },
  keywords: [
    "subscription ideas",
    "service business subscriptions",
    "recurring revenue ideas",
    "subscription business ideas",
    "local service subscriptions",
    "subscription examples",
    "service business models",
    "recurring income ideas"
  ]
};

export default function SubscriptionIdeasPage() {
  const businessCategories = [
    {
      title: "Pet Services",
      description: "Perfect for pet owners who want consistent care for their furry friends",
      icon: Dog,
      color: "brand-orange",
      ideas: [
        {
          name: "Weekly Dog Walks",
          price: "£60/month",
          description: "2 walks per week, 30 minutes each",
          benefits: ["Consistent exercise", "Socialization", "Peace of mind"]
        },
        {
          name: "Monthly Grooming",
          price: "£45/month",
          description: "Bath, brush, nail trim, and ear cleaning",
          benefits: ["Regular maintenance", "Health monitoring", "Convenience"]
        },
        {
          name: "Pet Sitting Credits",
          price: "£80/month",
          description: "4 hours of pet sitting per month",
          benefits: ["Flexible scheduling", "Emergency coverage", "Trusted care"]
        },
        {
          name: "Training Sessions",
          price: "£50/month",
          description: "Monthly training refresh and new skills",
          benefits: ["Behavior improvement", "Ongoing support", "Bonding time"]
        }
      ]
    },
    {
      title: "Home & Garden",
      description: "Ideal for maintaining beautiful outdoor spaces year-round",
      icon: TreePine,
      color: "brand-green",
      ideas: [
        {
          name: "Fortnightly Lawn Care",
          price: "£90/month",
          description: "Lawn cutting, edging, and basic maintenance",
          benefits: ["Consistent appearance", "Time savings", "Professional results"]
        },
        {
          name: "Monthly Garden Tidy",
          price: "£70/month",
          description: "Weeding, pruning, and seasonal planting",
          benefits: ["Year-round beauty", "Expert knowledge", "Seasonal variety"]
        },
        {
          name: "Seasonal Deep Clean",
          price: "£120/season",
          description: "Comprehensive garden preparation and cleanup",
          benefits: ["Major improvements", "Seasonal preparation", "Value for money"]
        },
        {
          name: "Pest Control Service",
          price: "£65/month",
          description: "Bi-monthly pest and weed control treatment",
          benefits: ["Preventive care", "Expert application", "Peace of mind"]
        }
      ]
    },
    {
      title: "Automotive Services",
      description: "Keep vehicles in top condition with regular maintenance",
      icon: Car,
      color: "brand-blue",
      ideas: [
        {
          name: "Weekly Car Wash",
          price: "£80/month",
          description: "Exterior wash and basic interior cleaning",
          benefits: ["Always clean", "Convenience", "Protects paintwork"]
        },
        {
          name: "Monthly Deep Clean",
          price: "£60/month",
          description: "Comprehensive interior and exterior detailing",
          benefits: ["Thorough cleaning", "Value for money", "Professional finish"]
        },
        {
          name: "Seasonal Shine Package",
          price: "£180/quarter",
          description: "Premium detailing with wax and protection",
          benefits: ["Premium service", "Long-lasting results", "Seasonal preparation"]
        },
        {
          name: "Fleet Maintenance",
          price: "Custom pricing",
          description: "Regular cleaning for business vehicles",
          benefits: ["Bulk discounts", "Scheduled service", "Professional image"]
        }
      ]
    },
    {
      title: "Education & Coaching",
      description: "Build lasting relationships through ongoing learning and development",
      icon: GraduationCap,
      color: "brand-purple",
      ideas: [
        {
          name: "Weekly Tutoring",
          price: "£120/month",
          description: "One-on-one academic support sessions",
          benefits: ["Personalized learning", "Consistent progress", "Flexible scheduling"]
        },
        {
          name: "Monthly Progress Review",
          price: "£40/month",
          description: "Assessment and goal-setting sessions",
          benefits: ["Track progress", "Adjust strategies", "Stay motivated"]
        },
        {
          name: "Homework Support",
          price: "£60/month",
          description: "Regular homework help and study guidance",
          benefits: ["Academic support", "Reduced stress", "Better grades"]
        },
        {
          name: "Group Coaching",
          price: "£30/month",
          description: "Monthly group accountability and motivation calls",
          benefits: ["Peer support", "Cost-effective", "Community building"]
        }
      ]
    },
    {
      title: "Beauty & Wellness",
      description: "Help clients maintain their self-care routines consistently",
      icon: Sparkles,
      color: "brand-pink",
      ideas: [
        {
          name: "Monthly Massage",
          price: "£55/month",
          description: "Relaxing massage therapy session",
          benefits: ["Stress relief", "Muscle tension", "Regular self-care"]
        },
        {
          name: "Fortnightly Brow Care",
          price: "£40/month",
          description: "Eyebrow shaping and maintenance",
          benefits: ["Always groomed", "Convenience", "Professional results"]
        },
        {
          name: "Mini Treatments Package",
          price: "£75/month",
          description: "Mix of facials, manicures, and other treatments",
          benefits: ["Variety", "Value for money", "Complete care"]
        },
        {
          name: "Wellness Credits",
          price: "£50/month",
          description: "Flexible credits for yoga, meditation, or spa services",
          benefits: ["Flexibility", "Personal choice", "Holistic approach"]
        }
      ]
    },
    {
      title: "Creative Services",
      description: "Support creative professionals with ongoing project work",
      icon: Paintbrush,
      color: "brand-indigo",
      ideas: [
        {
          name: "Monthly Photography",
          price: "£150/month",
          description: "Regular photo sessions for families or businesses",
          benefits: ["Document growth", "Professional quality", "Consistent memories"]
        },
        {
          name: "Content Creation",
          price: "£200/month",
          description: "Regular social media content and marketing materials",
          benefits: ["Consistent branding", "Time savings", "Professional quality"]
        },
        {
          name: "Design Retainer",
          price: "£100/month",
          description: "Ongoing design support for small projects",
          benefits: ["Quick turnaround", "Consistent style", "Cost-effective"]
        },
        {
          name: "Music Lessons",
          price: "£80/month",
          description: "Weekly music instruction and practice support",
          benefits: ["Skill development", "Regular practice", "Personal growth"]
        }
      ]
    }
  ];

  const pricingStrategies = [
    {
      strategy: "Flat Rate Pricing",
      description: "One simple price for a defined service package",
      example: "£60/month for 2 dog walks per week",
      pros: ["Simple to understand", "Predictable revenue", "Easy to sell"],
      cons: ["May not suit all customers", "Fixed service level"],
      bestFor: "Consistent, predictable services"
    },
    {
      strategy: "Tiered Pricing",
      description: "Multiple price points for different service levels",
      example: "Basic (£40), Standard (£60), Premium (£80)",
      pros: ["Appeals to different budgets", "Higher revenue potential", "Clear upgrade path"],
      cons: ["More complex to manage", "Decision paralysis"],
      bestFor: "Services with varying complexity"
    },
    {
      strategy: "Credit-Based System",
      description: "Customers buy credits to use flexibly",
      example: "£100/month for 4 hours of any service",
      pros: ["Maximum flexibility", "Reduces waste", "Higher perceived value"],
      cons: ["Complex to track", "May not use all credits"],
      bestFor: "Variable or seasonal services"
    },
    {
      strategy: "Usage-Based Pricing",
      description: "Pricing based on actual usage or consumption",
      example: "£20 per visit, minimum 2 visits per month",
      pros: ["Fair pricing", "Scales with value", "Encourages usage"],
      cons: ["Unpredictable revenue", "Complex billing"],
      bestFor: "Highly variable services"
    }
  ];

  const implementationTips = [
    {
      tip: "Start Simple",
      description: "Begin with 1-2 subscription options to test the market",
      icon: Target,
      color: "brand-blue"
    },
    {
      tip: "Test Pricing",
      description: "Survey existing customers about pricing before launching",
      icon: DollarSign,
      color: "brand-green"
    },
    {
      tip: "Clear Benefits",
      description: "Make the value proposition crystal clear in your marketing",
      icon: Lightbulb,
      color: "brand-yellow"
    },
    {
      tip: "Easy Cancellation",
      description: "Make it easy to cancel to reduce friction and build trust",
      icon: Shield,
      color: "brand-purple"
    },
    {
      tip: "Regular Communication",
      description: "Keep subscribers engaged with regular updates and tips",
      icon: MessageCircle,
      color: "brand-pink"
    },
    {
      tip: "Track Metrics",
      description: "Monitor churn rate, customer lifetime value, and satisfaction",
      icon: BarChart3,
      color: "brand-indigo"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-purple-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              Ideas & Inspiration
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Subscription Ideas for Service Businesses
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover 50+ creative subscription ideas for service-based businesses. 
              Get inspired with real examples, pricing strategies, and implementation tips for recurring revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Try These Ideas
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
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Ideas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Pricing Strategies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Categories */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Subscription Ideas by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore subscription ideas across different service industries. 
                Each category includes multiple pricing options and real-world examples.
              </p>
            </div>

            <div className="space-y-12">
              {businessCategories.map((category, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${category.color}/20 bg-gradient-to-b from-${category.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-primary">{category.title}</CardTitle>
                        <CardDescription className="text-base">{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.ideas.map((idea, ideaIndex) => (
                        <Card key={ideaIndex} className="bg-background/50 border border-white/10">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold text-primary">{idea.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {idea.price}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{idea.description}</p>
                            <div>
                              <h5 className="font-medium text-sm mb-2">Key Benefits:</h5>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {idea.benefits.map((benefit, benefitIndex) => (
                                  <li key={benefitIndex} className="flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Strategies */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pricing Strategies
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose the right pricing strategy for your subscription service. 
                Each approach has different benefits and works best for specific types of services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pricingStrategies.map((strategy, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{strategy.strategy}</CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Example:</h4>
                        <p className="text-sm text-muted-foreground">{strategy.example}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-green-600">Pros:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {strategy.pros.map((pro, i) => (
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
                            {strategy.cons.map((con, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Best For:</h4>
                        <p className="text-sm text-muted-foreground">{strategy.bestFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Tips */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Implementation Tips
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these proven tips to successfully launch and manage your subscription service. 
                These strategies will help you build a sustainable recurring revenue stream.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {implementationTips.map((tip, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${tip.color}/20 bg-gradient-to-b from-${tip.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                      <tip.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-primary">{tip.tip}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-purple-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Launch Your Subscription?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Use these ideas as inspiration for your own subscription service. 
                  Start with one simple plan and grow from there.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Try These Ideas
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

      <Script id="subscription-ideas-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Subscription Ideas for Service Businesses | Complete Guide | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/subscription-ideas-for-service-businesses",
          "description": "Discover 50+ creative subscription ideas for service-based businesses. Get inspired with real examples and pricing strategies.",
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
