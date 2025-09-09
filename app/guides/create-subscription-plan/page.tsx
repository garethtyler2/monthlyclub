import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, Lock, RefreshCw, AlertCircle, Upload, Image, Sparkles } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How to Set Up Your Business | Step-by-Step Guide | Monthly Club",
  description: "Follow this comprehensive step-by-step guide to set up your business profile, add products, and start earning recurring revenue. No tech skills required, start earning today.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/create-subscription-plan"
  },
  openGraph: {
    title: "How to Set Up Your Business | Step-by-Step Guide | Monthly Club",
    description: "Follow this comprehensive step-by-step guide to set up your business profile, add products, and start earning recurring revenue.",
    url: "https://www.monthlyclubhq.com/guides/create-subscription-plan",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Set Up Your Business | Step-by-Step Guide | Monthly Club",
    description: "Follow this comprehensive step-by-step guide to set up your business profile, add products, and start earning recurring revenue.",
  },
  keywords: [
    "business setup guide",
    "subscription business setup",
    "monthly club setup",
    "business profile creation",
    "stripe onboarding",
    "recurring revenue setup",
    "service business guide",
    "subscription management"
  ]
};

export default function CreateSubscriptionPlanPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-indigo-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Settings className="w-4 h-4" />
              Business Setup Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              How to Set Up Your Business
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Follow this comprehensive step-by-step guide to set up your business profile, add products, 
              and start earning recurring revenue. No tech skills required — start earning today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Your Business Setup
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
                <div className="text-sm text-muted-foreground">Simple Steps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5min</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">0</div>
                <div className="text-sm text-muted-foreground">Tech Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Product Types</div>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How to Set Up Your Business
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these 6 simple steps to create your business profile, add products, 
                and start earning recurring revenue from your service business.
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">1</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-4">Login or Sign Up</h3>
                      <p className="text-muted-foreground mb-4">
                        Start by logging into Monthly Club or creating a new account. 
                        No passwords needed — just your email address and a magic link.
                      </p>
                      <div className="bg-background/50 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">What You'll See:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Clean, intuitive dashboard</li>
                          <li>• "Create Business" button prominently displayed</li>
                          <li>• Simple email-based authentication</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">2</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-4">Click "Create Business"</h3>
                      <p className="text-muted-foreground mb-4">
                        Once you're logged in, click the "Create Business" button to start setting up 
                        your service business profile.
                      </p>
                      <div className="bg-background/50 rounded-lg p-4">
                        <h4 className="font-semibold text-sm mb-2">What Happens Next:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Business setup wizard opens</li>
                          <li>• Step-by-step guidance provided</li>
                          <li>• Save progress at any time</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">3</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-4">Add Your Business Details</h3>
                      <p className="text-muted-foreground mb-4">
                        Upload your logo (or any image as a business profile picture) and add your business description. 
                        Our AI can help spruce up your description to make it more appealing.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Business Logo
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">Upload any image:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Company logo</li>
                            <li>• Professional headshot</li>
                            <li>• Service-related image</li>
                            <li>• Any relevant photo</li>
                          </ul>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Business Description
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">Tell customers about:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• What services you offer</li>
                            <li>• Your experience & expertise</li>
                            <li>• What makes you unique</li>
                            <li>• AI can help improve it</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">4</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-4">Add Your Products</h3>
                      <p className="text-muted-foreground mb-4">
                        Create your subscription products using all 4 different types available: 
                        Traditional Subscriptions, Balance Builder, Pay It Off, and One-Time Purchases.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Product Types</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Traditional Subscriptions</li>
                            <li>• Balance Builder</li>
                            <li>• Pay It Off Plans</li>
                            <li>• One-Time Purchases</li>
                          </ul>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">For Each Product</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Set pricing and frequency</li>
                            <li>• Add descriptions</li>
                            <li>• Configure availability</li>
                            <li>• Set any special rules</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 5 */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">5</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-4">Complete Stripe Onboarding</h3>
                      <p className="text-muted-foreground mb-4">
                        Set up your Stripe account to accept payments. Stripe will handle all payment processing 
                        and pay you out according to their schedule.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Stripe Setup</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Add bank account details</li>
                            <li>• Verify business information</li>
                            <li>• Complete identity verification</li>
                            <li>• Set payout preferences</li>
                          </ul>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">What Stripe Handles</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Payment processing</li>
                            <li>• Security & compliance</li>
                            <li>• Automatic payouts</li>
                            <li>• Failed payment retry</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 6 */}
              <Card className="border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">6</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-4">Get Your Shareable Link</h3>
                      <p className="text-muted-foreground mb-4">
                        Once Stripe setup is complete, you'll see a successful business setup page with 
                        a shareable link to your business page. Start earning immediately!
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Success Page</h4>
                          <p className="text-sm text-muted-foreground">
                            Confirmation that everything is set up and ready to go.
                          </p>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Shareable Link</h4>
                          <p className="text-sm text-muted-foreground">
                            Get your business page URL to share with customers.
                          </p>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-sm mb-2">Start Earning</h4>
                          <p className="text-sm text-muted-foreground">
                            Customers can subscribe and pay immediately through Stripe.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Plan Types Overview */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Product Types
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Monthly Club offers four flexible product types to match different business models 
                and customer preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional Subscriptions */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Traditional Subscriptions</CardTitle>
                  <CardDescription>
                    Regular recurring payments for ongoing services with set schedules.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Best For:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Weekly cleaning services</li>
                        <li>• Monthly haircuts</li>
                        <li>• Regular maintenance</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Fixed monthly payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Predictable revenue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Balance Builder */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Balance Builder</CardTitle>
                  <CardDescription>
                    Flexible prepaid subscriptions where customers build credit for any future service.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Best For:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Annual memberships</li>
                        <li>• Treatment packages</li>
                        <li>• Flexible services</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Adjustable amounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Use credit anytime</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pay It Off */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Pay It Off Products</CardTitle>
                  <CardDescription>
                    Higher-value packages paid in monthly installments over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Best For:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Annual gym memberships</li>
                        <li>• Training packages</li>
                        <li>• High-value services</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Flexible schedules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Upfront collection</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* One-Time Purchases */}
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">One-Time Purchases</CardTitle>
                  <CardDescription>
                    Individual services and products sold alongside subscriptions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Best For:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Single sessions</li>
                        <li>• Add-on services</li>
                        <li>• Walk-in customers</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Instant payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm">Add-on revenue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Real-World Setup Examples
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how different service professionals have set up their businesses 
                using Monthly Club's simple platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hair Studio */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Mia's Hair Studio</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Beauty Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Setup Process:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Uploaded salon logo<br/>
                        • Added business description<br/>
                        • Created 3 subscription plans<br/>
                        • Completed Stripe setup
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Setup Time:</h4>
                      <p className="text-sm text-muted-foreground">
                        Under 15 minutes total
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 12 regular clients signed up<br/>
                        • Predictable monthly income<br/>
                        • 90% customer retention<br/>
                        • 40% increase in revenue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cleaning Service */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">CleanPro Services</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Cleaning Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Setup Process:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Uploaded company logo<br/>
                        • Used AI to improve description<br/>
                        • Created 4 different plans<br/>
                        • Set up Stripe payments
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Setup Time:</h4>
                      <p className="text-sm text-muted-foreground">
                        12 minutes including Stripe
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 15 recurring customers<br/>
                        • 95% on-time payments<br/>
                        • 10 hours/week saved on admin<br/>
                        • 50% increase in revenue
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Trainer */}
              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">FitLife Training</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Training Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Setup Process:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Uploaded professional headshot<br/>
                        • Added detailed description<br/>
                        • Created all 4 product types<br/>
                        • Completed Stripe onboarding
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Setup Time:</h4>
                      <p className="text-sm text-muted-foreground">
                        18 minutes including testing
                      </p>
                    </div>
                    <div className="bg-green-50/20 border border-green-200/20 rounded-lg p-3">
                      <h4 className="font-semibold text-green-200">Results:</h4>
                      <p className="text-sm text-muted-foreground">
                        • 8 committed clients<br/>
                        • 80% client retention<br/>
                        • 6 hours/week saved<br/>
                        • 60% increase in income
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Best Practices for Success
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these proven strategies to set up your business profile and create 
                subscription plans that attract customers and generate consistent revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Profile Tips */}
              <Card className="border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Business Profile Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Professional Image</h4>
                        <p className="text-sm text-muted-foreground">Use a clear, high-quality logo or professional headshot</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Use AI Enhancement</h4>
                        <p className="text-sm text-muted-foreground">Let our AI help improve your business description</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Be Specific</h4>
                        <p className="text-sm text-muted-foreground">Clearly explain what services you offer and your expertise</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Strategy */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Product Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Start Simple</h4>
                        <p className="text-sm text-muted-foreground">Begin with 1-2 product types, add more as you grow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Clear Pricing</h4>
                        <p className="text-sm text-muted-foreground">Make pricing clear and offer value compared to one-time rates</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Test & Adjust</h4>
                        <p className="text-sm text-muted-foreground">Monitor performance and adjust based on customer feedback</p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-indigo-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Set Up Your Business?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Follow these steps and start earning recurring revenue from your service business 
                  in just 15 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Your Business Setup
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
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="create-subscription-plan-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "How to Set Up Your Business | Step-by-Step Guide | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/create-subscription-plan",
          "description": "Follow this comprehensive step-by-step guide to set up your business profile, add products, and start earning recurring revenue. No tech skills required.",
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
