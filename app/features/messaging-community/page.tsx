import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageCircle, CheckCircle, Star, Users, TrendingUp, Bell, Heart, Share2, Zap } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Messaging & Community | Customer Engagement Tools | MonthlyClub",
  description: "Built-in messaging and community features to keep customers engaged. Send updates, build community, and increase customer retention with MonthlyClub.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/features/messaging-community"
  },
  openGraph: {
    title: "Messaging & Community | Customer Engagement Tools | MonthlyClub",
    description: "Built-in messaging and community features to keep customers engaged and increase retention.",
    url: "https://www.monthlyclubhq.com/features/messaging-community",
    siteName: "Monthly Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Messaging & Community | Customer Engagement Tools | MonthlyClub",
    description: "Built-in messaging and community features to keep customers engaged and increase retention.",
  },
  keywords: [
    "customer messaging",
    "community features",
    "customer engagement",
    "retention tools",
    "communication platform",
    "customer portal",
    "business messaging",
    "community building"
  ]
};

export default function MessagingCommunityPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-orange-50/20 via-background to-pink-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              Messaging & Community Feature
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Messaging & Community
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Keep customers engaged with built-in messaging and community features. 
              Build stronger relationships and increase retention with direct communication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Start Building Community
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  View All Features
                </Button>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Communication</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Messages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Engagement</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How Messaging & Community Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Built-in communication tools that help you stay connected with customers, 
                share updates, and build a loyal community around your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="text-center border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">1. Direct Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Send personalized messages to individual customers or broadcast 
                    updates to your entire subscriber base.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="text-center border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">2. Community Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Create a space where customers can interact, share experiences, 
                    and feel part of your business community.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="text-center border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">3. Automated Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Set up automated messages for welcome sequences, appointment reminders, 
                    and special offers to keep customers engaged.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Powerful Communication Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to build strong customer relationships and keep your community engaged.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Direct Messaging */}
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Direct Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Send personalized messages to individual customers or groups.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">One-on-one conversations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Group announcements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Rich media support</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Features */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Community Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a space for customers to connect and engage.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Customer forums</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Success stories</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Feedback collection</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Automated Engagement */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Automated Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-4">
                      Set up automated messages to keep customers engaged.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Welcome sequences</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Appointment reminders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Special offers</span>
                      </div>
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
                Real-World Examples
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                See how different businesses use messaging and community features to boost engagement and retention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hair Salon Example */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Beauty Salon</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Beauty Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Community Features:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Before/after photo sharing<br/>
                        • Hair care tips and tutorials<br/>
                        • Customer testimonials<br/>
                        • Special event announcements
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Messaging:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Appointment confirmations<br/>
                        • Product recommendations<br/>
                        • Birthday offers<br/>
                        • Seasonal promotions
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 45% increase in customer retention
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Trainer Example */}
              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Personal Trainer</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Training Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Community Features:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Progress photo sharing<br/>
                        • Workout challenges<br/>
                        • Nutrition tips and recipes<br/>
                        • Success story celebrations
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Messaging:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Workout reminders<br/>
                        • Form check-ins<br/>
                        • Motivation messages<br/>
                        • Goal setting support
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 60% increase in session attendance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cleaning Service Example */}
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Cleaning Service</CardTitle>
                  <p className="text-sm text-muted-foreground">Example Cleaning Business A</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Community Features:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Cleaning tips and hacks<br/>
                        • Before/after photos<br/>
                        • Customer reviews<br/>
                        • Seasonal cleaning guides
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Messaging:</h4>
                      <p className="text-sm text-muted-foreground">
                        • Service confirmations<br/>
                        • Cleaning reminders<br/>
                        • Special offers<br/>
                        • Feedback requests
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">
                        Result: 35% increase in customer satisfaction
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Messaging & Community Matter
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Strong communication and community building are essential for customer retention and business growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* For Customers */}
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Direct Communication</h4>
                        <p className="text-sm text-muted-foreground">Easy access to you and your team</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Community Support</h4>
                        <p className="text-sm text-muted-foreground">Connect with other customers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Regular Updates</h4>
                        <p className="text-sm text-muted-foreground">Stay informed about services and offers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Personalized Experience</h4>
                        <p className="text-sm text-muted-foreground">Tailored communication and offers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* For Business */}
              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">For Your Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Higher Retention</h4>
                        <p className="text-sm text-muted-foreground">Engaged customers stay longer</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Word-of-Mouth Marketing</h4>
                        <p className="text-sm text-muted-foreground">Happy customers refer others</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Feedback Collection</h4>
                        <p className="text-sm text-muted-foreground">Easy way to gather customer insights</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Upselling Opportunities</h4>
                        <p className="text-sm text-muted-foreground">Promote additional services directly</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Built-in Features
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Everything you need to manage customer communication and community engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Real-time Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Instant messaging with customers and community members.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Community Forums</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create discussion spaces for your customers to connect.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Automated Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Set up automated messages and reminders.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 bg-background/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Engagement Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track message open rates and community engagement.
                  </p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Start Building Your Community
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Connect with your customers and build a loyal community that drives growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Start Building Community
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Explore All Features
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="messaging-community-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Messaging & Community Feature",
          "url": "https://www.monthlyclubhq.com/features/messaging-community",
          "description": "Built-in messaging and community features to keep customers engaged and increase retention.",
          "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "Messaging & Community",
            "description": "Customer engagement and community building tools",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web"
          }
        })}
      </Script>
    </>
  );
}
