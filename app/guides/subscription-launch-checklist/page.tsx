import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, BookOpen, Lightbulb, Rocket, Award, ArrowUpRight, ClipboardCheck, Play, Mail, Megaphone, TestTube, Users2, MessageSquare, Share, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Subscription Launch Checklist | Complete Guide | Monthly Club",
  description: "Follow this complete checklist to launch your subscription business successfully. From idea validation to first 10 subscribers - step-by-step guide with templates.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/subscription-launch-checklist"
  },
  openGraph: {
    title: "Subscription Launch Checklist | Complete Guide | Monthly Club",
    description: "Follow this complete checklist to launch your subscription business successfully. From idea validation to first 10 subscribers.",
    url: "https://www.monthlyclubhq.com/guides/subscription-launch-checklist",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription Launch Checklist | Complete Guide | Monthly Club",
    description: "Follow this complete checklist to launch your subscription business successfully. From idea validation to first 10 subscribers.",
  },
  keywords: [
    "subscription launch checklist",
    "launch subscription business",
    "first subscribers",
    "subscription launch guide",
    "launch templates",
    "subscription marketing",
    "business launch",
    "subscription startup"
  ]
};

export default function SubscriptionLaunchChecklistPage() {
  const checklistSteps = [
    {
      step: 1,
      title: "Validate Your Offer & Audience",
      description: "Test your idea with real customers before building",
      icon: Target,
      color: "brand-blue",
      tasks: [
        "Write your one-sentence value proposition",
        "Create 3 plan names with prices",
        "Ask 5-10 target customers for feedback",
        "Capture and address common objections",
        "Decide on plan structure (flat vs. tiered)"
      ],
      tips: [
        "Use quick calls or DMs for feedback",
        "Focus on pain points and benefits",
        "Test pricing with real customers"
      ]
    },
    {
      step: 2,
      title: "Create Plans in Monthly Club",
      description: "Set up your subscription plans and business profile",
      icon: Settings,
      color: "brand-green",
      tasks: [
        "Create your business profile",
        "Add 1-2 starter subscription plans",
        "Write compelling plan descriptions",
        "Set clear benefits and inclusions",
        "Configure payment day preferences"
      ],
      tips: [
        "Start simple with 1-2 plans",
        "Use clear, benefit-focused copy",
        "Enable Balance Builder if relevant"
      ]
    },
    {
      step: 3,
      title: "Stripe Setup & Test Payments",
      description: "Ensure payment processing works perfectly",
      icon: CreditCard,
      color: "brand-purple",
      tasks: [
        "Connect your Stripe account",
        "Create a real £1 test product",
        "Subscribe yourself with a real card",
        "Verify payment method updates work",
        "Test cancellation flows",
        "Check emails and receipts render correctly"
      ],
      tips: [
        "Use £1 for testing - you'll get most back after fees",
        "Test on mobile devices",
        "Verify all links work properly",
        "Check email formatting"
      ]
    },
    {
      step: 4,
      title: "Warm Up Your Audience",
      description: "Build anticipation with strategic content",
      icon: Megaphone,
      color: "brand-orange",
      tasks: [
        "Publish 3-5 behind-the-scenes posts",
        "Create first-month offer content",
        "Answer common FAQ questions",
        "Include 1 image per post",
        "Add links back to plan pages"
      ],
      tips: [
        "Pin your best converting post",
        "Reshare top content on launch day",
        "Engage with comments and questions"
      ]
    },
    {
      step: 5,
      title: "Launch with Templates",
      description: "Use proven templates for maximum impact",
      icon: Mail,
      color: "brand-pink",
      tasks: [
        "Send announcement email to your list",
        "Post on all social media platforms",
        "Share with existing customers first",
        "Schedule posts for optimal timing",
        "Track first 10 signups closely"
      ],
      tips: [
        "Personalize messages for each platform",
        "Include clear call-to-action buttons",
        "Monitor and respond to questions quickly"
      ]
    }
  ];

  const launchTemplates = [
    {
      type: "Email Announcement",
      subject: "We're launching memberships!",
      content: `Hi [Name],

I'm excited to launch our new membership program! 

Get [benefit] for just [price]/month with:
• [Benefit 1]
• [Benefit 2] 
• [Benefit 3]

👉 Join here: [plan link]

Questions? Just reply to this email - I'd love to hear from you!

Best,
[Your Name]`,
      icon: Mail,
      color: "brand-blue"
    },
    {
      type: "Social Media Post",
      subject: "Membership Launch",
      content: `🚀 We're launching memberships!

After months of planning, I'm excited to offer:
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

Founding offer this month only → [plan link]

Who's ready to join? Drop a comment below! 👇`,
      icon: Share,
      color: "brand-green"
    },
    {
      type: "WhatsApp/Text",
      subject: "Quick Update",
      content: `Hey [Name]! 

Quick update - I've launched a new membership program that I think you'd love. 

[Brief benefit description] for just [price]/month.

Check it out: [plan link]

Let me know what you think!`,
      icon: MessageSquare,
      color: "brand-purple"
    }
  ];

  const preLaunchChecklist = [
    "Value proposition is clear and tested",
    "Pricing validated with target customers",
    "Plan descriptions are compelling",
    "Payment processing tested thoroughly",
    "Business profile is complete and professional",
    "Social media accounts are active",
    "Email list is ready for announcements",
    "Launch templates are prepared",
    "Launch day is scheduled",
    "Support system is in place for questions"
  ];

  const postLaunchActions = [
    "Track first 10 signups and their feedback",
    "Note common objections and refine messaging",
    "Engage with all comments and questions",
    "Follow up with customers who showed interest",
    "Analyze which channels drove the most signups",
    "Plan follow-up content for non-converters",
    "Celebrate early wins and share success stories",
    "Iterate and improve based on feedback"
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-blue-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ClipboardCheck className="w-4 h-4" />
              Launch Checklist
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Subscription Launch Checklist
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Follow this complete checklist to launch your subscription business successfully. 
              From idea validation to first 10 subscribers - step-by-step guide with templates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Your Launch
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
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-sm text-muted-foreground">Launch Steps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10</div>
                <div className="text-sm text-muted-foreground">First Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
            </div>
          </div>
        </section>

        {/* Launch Steps */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your 5-Step Launch Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these proven steps to launch your subscription business successfully. 
                Each step builds on the previous one to ensure a smooth launch.
              </p>
            </div>

            <div className="space-y-8">
              {checklistSteps.map((step, index) => (
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              Tasks to Complete:
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              {step.tasks.map((task, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-yellow-500" />
                              Pro Tips:
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                              {step.tips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Launch Templates */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready-to-Use Launch Templates
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Copy these proven templates and customize them for your business. 
                These messages have been tested and optimized for maximum conversion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {launchTemplates.map((template, index) => (
                <Card key={index} className={`group hover:shadow-lg transition-all duration-300 border border-${template.color}/20 bg-gradient-to-b from-${template.color}/10 to-transparent`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                      <template.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{template.type}</CardTitle>
                    <CardDescription>Subject: {template.subject}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background/50 rounded-lg p-4">
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                        {template.content}
                      </pre>
                    </div>
                    <div className="mt-4">
                      <Badge variant="outline" className="text-xs">
                        Copy & Customize
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-Launch Checklist */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pre-Launch Checklist
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Complete these final checks before launching to ensure everything runs smoothly. 
                Don't skip any of these critical steps!
              </p>
            </div>

            <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {preLaunchChecklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-background rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Post-Launch Actions */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Post-Launch Actions
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Your launch doesn't end when you hit publish. Follow these actions to maximize 
                your success and learn from your first subscribers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Immediate Actions (First 24 Hours)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {postLaunchActions.slice(0, 4).map((action, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{action}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Follow-Up Actions (First Week)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {postLaunchActions.slice(4).map((action, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{action}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Track Your Success
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monitor these key metrics to measure your launch success and identify 
                areas for improvement in future launches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">10</h3>
                  <p className="text-sm text-muted-foreground">First Subscribers</p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">80%</h3>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">5%</h3>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                </CardContent>
              </Card>

              <Card className="text-center border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">7</h3>
                  <p className="text-sm text-muted-foreground">Days to Launch</p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-blue-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Launch Your Subscription?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Follow this proven checklist to launch your subscription business successfully. 
                  From validation to first subscribers - everything you need is here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Your Launch
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

      <Script id="subscription-launch-checklist-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Subscription Launch Checklist | Complete Guide | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/subscription-launch-checklist",
          "description": "Follow this complete checklist to launch your subscription business successfully. From idea validation to first 10 subscribers.",
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
