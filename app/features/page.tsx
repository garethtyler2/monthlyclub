import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Zap, ArrowRight, MessageCircle, Star, TrendingUp, CreditCard, Users, FileText, Wallet, ShoppingCart, Palette, Brain, BarChart3 } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import HomepageFeatures from "@/components/Homepage/Features";

export const metadata: Metadata = {
  title: "Features | Tools Built to Power Your Subscription Club",
  description: "Everything you need to run and grow a modern subscription business. AI tools, payments, storefronts, analytics, and more — built for service businesses and creators.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/features"
  },
  openGraph: {
    title: "Features | Tools Built to Power Your Subscription Club",
    description: "Discover the powerful tools included with MonthlyClub: AI, Stripe integration, custom storefronts, analytics, and more.",
    url: "https://www.monthlyclubhq.com/features",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png",
        width: 1200,
        height: 630,
        alt: "MonthlyClub Features"
      }
    ],
    type: "website"
  },
};

const FeaturesPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-subtle">
        {/* Hero */}
        <section className="py-10 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 text-primary-foreground animate-bounce-in">
              <Zap className="w-4 h-4 mr-2" />
              Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              How We Stack Up Against the Competition
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              See why Monthly Club is the perfect choice for service businesses, creators, and entrepreneurs across all industries.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 px-4 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Platform Comparison
              </h2>
              <p className="text-lg text-muted-foreground">
                See how Monthly Club compares to the biggest names in subscriptions, payments, and e-commerce
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-background rounded-lg overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-slate-50/5 border-b border-slate-200/10">
                    <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center p-4 font-semibold text-primary">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        Monthly Club
                      </div>
                    </th>
                    <th className="text-center p-4 font-semibold text-foreground">Patreon</th>
                    <th className="text-center p-4 font-semibold text-foreground">OnlyFans</th>
                    <th className="text-center p-4 font-semibold text-foreground">Klarna</th>
                    <th className="text-center p-4 font-semibold text-foreground">Shopify</th>
                    <th className="text-center p-4 font-semibold text-foreground">Direct Debit</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Pricing */}
                  <tr className="border-b border-slate-200/10">
                    <td className="p-4 font-medium text-foreground">Transaction Fees</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        2.9% + 20p
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">8-12%</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">20%</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">Up to 5.99% + $0.30</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">2.9% + 30p</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">~10–50p per transaction</span>
                    </td>
                  </tr>

                  {/* Subscription Types */}
                  <tr className="border-b border-slate-200/10 bg-slate-50/5">
                    <td className="p-4 font-medium text-foreground">Subscription Types</td>
                    <td className="p-4 text-center">
                      <div className="flex flex-col gap-1">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Standard</Badge>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Balance Builder</Badge>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Buy Now Pay Later</Badge>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Buy Now Pay Later</Badge>
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>

                  {/* One-Time Purchases */}
                  <tr className="border-b border-slate-200/10">
                    <td className="p-4 font-medium text-foreground">One-Time Purchases</td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                  </tr>

                  {/* Private Messaging */}
                  <tr className="border-b border-slate-200/10 bg-slate-50/5">
                    <td className="p-4 font-medium text-foreground">Private Messaging</td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                  </tr>

                  {/* Content Posts */}
                  <tr className="border-b border-slate-200/10">
                    <td className="p-4 font-medium text-foreground">Content Posts for Subscribers</td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                  </tr>

                  {/* Business Branding */}
                  <tr className="border-b border-slate-200/10 bg-slate-50/5">
                    <td className="p-4 font-medium text-foreground">Business Branding</td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                  </tr>


                  {/* Tax Reports */}
                  <tr className="border-b border-slate-200/10 bg-slate-50/5">
                    <td className="p-4 font-medium text-foreground">Tax Reports & Analytics</td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                  </tr>

                  {/* Setup Time */}
                  <tr className="border-b border-slate-200/10">
                    <td className="p-4 font-medium text-foreground">Setup Time</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        10 minutes
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">1-2 hours</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">30 minutes</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">1-3 days</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">1-2 weeks</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">2-4 weeks</span>
                    </td>
                  </tr>

                  {/* Monthly Cost */}
                  <tr className="bg-slate-50/5">
                    <td className="p-4 font-medium text-foreground">Monthly Cost</td>
                    <td className="p-4 text-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Free
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">Free</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">Free</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">Free</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">$29-299</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">$50-200</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                * All platforms have different fee structures and features. This comparison is based on standard pricing as of August 2025.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/create-a-business">
                  <Button className="hero-button-primary">
                    Start Your Free Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    See How It Works
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Tiles: same feature items as homepage */}
        <HomepageFeatures />
        

        {/* Why It Works */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Designed for Service Businesses & Creators
            </h2>
            <p className="text-lg text-muted-foreground">
              You shouldn't need a dev team or expensive tools to sell recurring services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
              {[
                {
                  title: "Fast setup",
                  desc: "Start selling in under 10 minutes. No code, no bloat."
                },
                {
                  title: "Custom & Simple",
                  desc: "Everything works out of the box — and looks like your brand."
                },
                {
                  title: "Built-in Growth",
                  desc: "SEO-ready, mobile-friendly, and easy to share anywhere."
                }
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-0 shadow-glow overflow-hidden relative">
              <CardContent className="p-6 relative z-10">
                <div className="absolute inset-0 bg-black/10"></div>
                <h2 className="text-4xl md:text-5xl gradient-text font-bold mb-6 relative z-10">
                  Start Exploring the Platform
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10">
                  See how easy it is to launch your first subscription plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/how-it-works">
                    <Button className="bg-background text-primary border border-primary hover:bg-background/80">
                      See How It Works
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary">
                      Start Your Club
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="features-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Features",
          "url": "https://www.monthlyclubhq.com/features",
          "description": "Everything you need to run and grow a modern subscription business. AI tools, payments, storefronts, analytics, and more — built for service businesses and creators."
        })}
      </Script>
    </>
  );
};

export default FeaturesPage;
