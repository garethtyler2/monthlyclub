import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, BookOpen, Lightbulb, Rocket, Award, ArrowUpRight, Megaphone, Instagram, Facebook, Mail, MessageSquare, Share, Heart, ThumbsUp, Users2, MapPin, Phone, Mail as MailIcon } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Marketing Subscription Services | Complete Guide | Monthly Club",
  description: "Master subscription marketing with our complete guide. Learn proven strategies to promote your service subscriptions, grow your customer base, and increase recurring revenue.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/marketing-subscription-services"
  },
  openGraph: {
    title: "Marketing Subscription Services | Complete Guide | Monthly Club",
    description: "Master subscription marketing with our complete guide. Learn proven strategies to promote your service subscriptions and grow recurring revenue.",
    url: "https://www.monthlyclubhq.com/guides/marketing-subscription-services",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Subscription Services | Complete Guide | Monthly Club",
    description: "Master subscription marketing with our complete guide. Learn proven strategies to promote your service subscriptions and grow recurring revenue.",
  },
  keywords: [
    "subscription marketing",
    "service business marketing",
    "recurring revenue marketing",
    "subscription promotion",
    "local business marketing",
    "subscription growth",
    "marketing strategies",
    "customer acquisition"
  ]
};

export default function MarketingSubscriptionServicesPage() {
  const marketingChannels = [
    {
      name: "Existing Clients",
      description: "Your current customers are your best early subscribers",
      icon: Users,
      color: "brand-blue",
      strategies: [
        "Send personalized emails about subscription benefits",
        "Mention subscriptions during appointments",
        "Share your Monthly Club page link",
        "Explain priority booking and savings"
      ],
      effort: "Low",
      effectiveness: "High"
    },
    {
      name: "Social Media",
      description: "Post regularly about your subscription options",
      icon: Instagram,
      color: "brand-pink",
      strategies: [
        "Share testimonials and success stories",
        "Post behind-the-scenes content",
        "Use stories and short videos",
        "Include clear call-to-action links"
      ],
      effort: "Medium",
      effectiveness: "High"
    },
    {
      name: "Local Community",
      description: "Leverage local platforms and groups",
      icon: MapPin,
      color: "brand-green",
      strategies: [
        "Join local Facebook groups",
        "Post on Nextdoor",
        "List in business directories",
        "Attend local networking events"
      ],
      effort: "Medium",
      effectiveness: "Medium"
    },
    {
      name: "Email & Messaging",
      description: "Include subscription info in all communications",
      icon: Mail,
      color: "brand-purple",
      strategies: [
        "Add link to email signature",
        "Include in appointment reminders",
        "Send dedicated subscription emails",
        "Use WhatsApp for local customers"
      ],
      effort: "Low",
      effectiveness: "Medium"
    }
  ];

  const contentIdeas = [
    {
      type: "Before & After",
      description: "Show the transformation your service provides",
      example: "Clean home before vs. after your service",
      platforms: ["Instagram", "Facebook", "TikTok"]
    },
    {
      type: "Customer Testimonials",
      description: "Share real customer experiences and results",
      example: "Video testimonials about subscription benefits",
      platforms: ["All platforms", "Stories", "Reels"]
    },
    {
      type: "Behind the Scenes",
      description: "Show your process and expertise",
      example: "Time-lapse of cleaning process, tool setup",
      platforms: ["Instagram", "TikTok", "YouTube Shorts"]
    },
    {
      type: "Educational Content",
      description: "Teach something related to your service",
      example: "Cleaning tips, maintenance advice, seasonal guides",
      platforms: ["Instagram", "Facebook", "Blog posts"]
    },
    {
      type: "Subscription Benefits",
      description: "Highlight convenience and savings",
      example: "Show scheduling ease, cost savings, priority booking",
      platforms: ["All platforms", "Email", "Website"]
    },
    {
      type: "Local Community",
      description: "Engage with local events and causes",
      example: "Community cleanups, local business spotlights",
      platforms: ["Facebook", "Nextdoor", "Local groups"]
    }
  ];

  const realWorldExamples = [
    {
      business: "Jasmine's Mobile Nail Tech",
      location: "Example Beauty Business A",
      strategy: "Instagram-focused marketing",
      results: {
        subscribers: "20+ subscribers",
        timeline: "2 months",
        income: "40% increase in monthly income"
      },
      tactics: [
        "Posted 2x per week about subscriptions",
        "Added Monthly Club link to bio",
        "Shared customer nail art photos",
        "Offered first-month discount"
      ]
    },
    {
      business: "CleanPro Home Services",
      location: "Example Cleaning Business A",
      strategy: "Multi-channel approach",
      results: {
        subscribers: "35+ subscribers",
        timeline: "3 months",
        income: "60% increase in recurring revenue"
      },
      tactics: [
        "Email campaigns to existing clients",
        "Facebook group participation",
        "Nextdoor community engagement",
        "Referral program implementation"
      ]
    },
    {
      business: "FitLife Personal Training",
      location: "Example Training Business A",
      strategy: "Content marketing focus",
      results: {
        subscribers: "15+ subscribers",
        timeline: "6 weeks",
        income: "50% increase in client retention"
      },
      tactics: [
        "Fitness transformation posts",
        "Workout video content",
        "Nutrition tips and meal plans",
        "Client success story features"
      ]
    }
  ];

  const incentives = [
    {
      type: "First-Month Discount",
      description: "10-20% off the first month",
      example: "Get 20% off your first month when you subscribe",
      effectiveness: "High",
      bestFor: "New customers, price-sensitive market"
    },
    {
      type: "Free Add-On Service",
      description: "Include an extra service for free",
      example: "Subscribe and get a free deep clean this month",
      effectiveness: "High",
      bestFor: "Established customers, high-value services"
    },
    {
      type: "Priority Booking",
      description: "Guaranteed preferred time slots",
      example: "Subscribers get first choice of appointment times",
      effectiveness: "Medium",
      bestFor: "Busy services, time-sensitive customers"
    },
    {
      type: "Referral Rewards",
      description: "Reward customers who refer others",
      example: "Refer a friend and get one month free",
      effectiveness: "High",
      bestFor: "All businesses, word-of-mouth growth"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-pink-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Megaphone className="w-4 h-4" />
              Marketing Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Marketing Subscription Services
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master subscription marketing with our complete guide. Learn proven strategies to promote 
              your service subscriptions, grow your customer base, and increase recurring revenue.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Marketing Your Services
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
                <div className="text-sm text-muted-foreground">Marketing Channels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Content Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Real Examples</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Channels */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Marketing Channels That Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Focus on these proven marketing channels to promote your subscription services. 
                Start with existing clients, then expand to social media and local community platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {marketingChannels.map((channel, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${channel.color}/20 bg-gradient-to-b from-${channel.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                        <channel.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-primary">{channel.name}</CardTitle>
                        <CardDescription>{channel.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {channel.effort} Effort
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {channel.effectiveness} Effectiveness
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Key Strategies:</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {channel.strategies.map((strategy, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            {strategy}
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

        {/* Content Ideas */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Content Ideas That Convert
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Create engaging content that showcases your expertise and highlights the benefits 
                of your subscription services. Mix different content types for maximum impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contentIdeas.map((idea, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary group-hover:text-primary transition-colors">
                      {idea.type}
                    </CardTitle>
                    <CardDescription>{idea.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Example:</h4>
                        <p className="text-sm text-muted-foreground">{idea.example}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Best Platforms:</h4>
                        <div className="flex flex-wrap gap-1">
                          {idea.platforms.map((platform, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {platform}
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

        {/* Incentives & Promotions */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Incentives That Drive Signups
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Use these proven incentives to encourage customers to subscribe. Choose the right 
                incentive based on your service type and customer base.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {incentives.map((incentive, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-primary">{incentive.type}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {incentive.effectiveness} Effectiveness
                      </Badge>
                    </div>
                    <CardDescription>{incentive.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Example:</h4>
                        <p className="text-sm text-muted-foreground">"{incentive.example}"</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Best For:</h4>
                        <p className="text-sm text-muted-foreground">{incentive.bestFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Real Marketing Success Stories
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how other service businesses have successfully marketed their subscription 
                services and grown their recurring revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realWorldExamples.map((example, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary group-hover:text-primary transition-colors">
                      {example.business}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{example.location}</p>
                    <Badge variant="outline" className="w-fit mt-2">
                      {example.strategy}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                        <h4 className="font-semibold text-green-200 mb-2">Results:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• {example.results.subscribers}</li>
                          <li>• {example.results.timeline}</li>
                          <li>• {example.results.income}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Tactics:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {example.tactics.map((tactic, i) => (
                            <li key={i}>• {tactic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Marketing Best Practices
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these proven strategies to maximize your subscription marketing efforts 
                and build a loyal customer base.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Consistency is Key</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Post Regularly</h4>
                        <p className="text-sm text-muted-foreground">Aim for 2-3 posts per week across all platforms</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Stay Top of Mind</h4>
                        <p className="text-sm text-muted-foreground">Regularly remind customers about subscription benefits</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Track What Works</h4>
                        <p className="text-sm text-muted-foreground">Monitor which content gets the most engagement and signups</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Build Relationships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Engage Authentically</h4>
                        <p className="text-sm text-muted-foreground">Respond to comments, answer questions, and show personality</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Share Your Story</h4>
                        <p className="text-sm text-muted-foreground">Let customers get to know you and your business journey</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Ask for Feedback</h4>
                        <p className="text-sm text-muted-foreground">Regularly ask customers what they love and what could improve</p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-pink-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Market Your Subscriptions?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Use these proven marketing strategies to grow your subscription business. 
                  Start with existing clients, then expand to social media and local community platforms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Marketing Your Services
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
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="marketing-subscription-services-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Marketing Subscription Services | Complete Guide | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/marketing-subscription-services",
          "description": "Master subscription marketing with our complete guide. Learn proven strategies to promote your service subscriptions and grow recurring revenue.",
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
