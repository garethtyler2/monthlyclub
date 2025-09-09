import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star, Users, TrendingUp, CreditCard, Wallet, ShoppingCart, Zap, MessageCircle, BarChart3, DollarSign, Calendar, Target, Shield, Clock, Smartphone, Globe, Settings, Share2, Eye, BookOpen, Lightbulb, Rocket, Award, ArrowUpRight, Calculator, Percent, Clock3, TrendingDown, Award as AwardIcon } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pricing Subscription Plans for Service Businesses | Complete Guide | Monthly Club",
  description: "Master subscription pricing with our complete guide. Learn pricing models, anchoring strategies, payment day optimization, and see real pricing examples for service businesses.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/pricing-subscription-plans-service-business"
  },
  openGraph: {
    title: "Pricing Subscription Plans for Service Businesses | Complete Guide | Monthly Club",
    description: "Master subscription pricing with our complete guide. Learn pricing models, anchoring strategies, and see real pricing examples.",
    url: "https://www.monthlyclubhq.com/guides/pricing-subscription-plans-service-business",
    siteName: "Monthly Club",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Subscription Plans for Service Businesses | Complete Guide | Monthly Club",
    description: "Master subscription pricing with our complete guide. Learn pricing models, anchoring strategies, and see real pricing examples.",
  },
  keywords: [
    "subscription pricing",
    "service business pricing",
    "recurring revenue pricing",
    "subscription pricing models",
    "pricing strategy",
    "subscription pricing guide",
    "service pricing examples",
    "monthly subscription pricing"
  ]
};

export default function PricingSubscriptionPlansPage() {
  const pricingModels = [
    {
      name: "Flat Pricing",
      description: "One monthly price for a defined bundle of services",
      example: "2 cleans per month for £89",
      pros: ["Simple to understand", "Predictable revenue", "Easy to manage"],
      cons: ["Less flexibility", "May not suit all customers"],
      bestFor: "New businesses, simple service offerings"
    },
    {
      name: "Tiered Pricing",
      description: "Good/better/best packages with clear added benefits",
      example: "Basic £49, Standard £89, Premium £129",
      pros: ["Clear value progression", "Higher revenue potential", "Customer choice"],
      cons: ["More complex to manage", "Can confuse customers"],
      bestFor: "Established businesses, varied service levels"
    },
    {
      name: "Usage-Based Pricing",
      description: "Price scales by number of visits or time spent",
      example: "£25 per visit, max 4 visits per month",
      pros: ["Fair for customers", "Scales with demand", "Flexible"],
      cons: ["Unpredictable revenue", "Complex billing", "Hard to budget"],
      bestFor: "Variable service needs, high-value services"
    }
  ];

  const pricingExamples = [
    {
      business: "Home Cleaning",
      basic: { price: "£49/mo", description: "1 clean per month" },
      standard: { price: "£89/mo", description: "2 cleans per month" },
      premium: { price: "£129/mo", description: "3 cleans + deep clean quarterly" }
    },
    {
      business: "Hair & Beauty",
      basic: { price: "£35/mo", description: "1 blow dry per month" },
      standard: { price: "£65/mo", description: "2 blow dries per month" },
      premium: { price: "£99/mo", description: "3 blow dries + treatment" }
    },
    {
      business: "Dog Grooming",
      basic: { price: "£29/mo", description: "Bath only" },
      standard: { price: "£55/mo", description: "Bath + tidy" },
      premium: { price: "£85/mo", description: "Full groom + nail trim" }
    },
    {
      business: "Personal Training",
      basic: { price: "£79/mo", description: "1 session per month" },
      standard: { price: "£149/mo", description: "2 sessions per month" },
      premium: { price: "£219/mo", description: "3 sessions + meal plan" }
    },
    {
      business: "Window Cleaning",
      basic: { price: "£39/mo", description: "Monthly clean" },
      standard: { price: "£69/mo", description: "Bi-weekly clean" },
      premium: { price: "£99/mo", description: "Weekly clean + frames" }
    },
    {
      business: "Garden Maintenance",
      basic: { price: "£59/mo", description: "Monthly maintenance" },
      standard: { price: "£99/mo", description: "Bi-weekly maintenance" },
      premium: { price: "£149/mo", description: "Weekly maintenance + seasonal work" }
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-50/20 via-background to-green-50/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-500/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Pricing Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Pricing Subscription Plans for Service Businesses
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master subscription pricing with our complete guide. Learn pricing models, anchoring strategies, 
              payment day optimization, and see real pricing examples for service businesses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/create-a-business">
                <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                  Create Your Pricing Plan
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
                <div className="text-sm text-muted-foreground">Pricing Models</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Industry Examples</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10-20%</div>
                <div className="text-sm text-muted-foreground">Typical Discount</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Models */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Pricing Model
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Start with the right pricing model for your service business. Each has its own advantages 
                and works best for different types of services and customer needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingModels.map((model, index) => (
                <Card key={index} className={`border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent`}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{model.name}</CardTitle>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Example:</h4>
                        <p className="text-sm text-muted-foreground">{model.example}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-green-600">Pros:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {model.pros.map((pro, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-orange-600">Considerations:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {model.cons.map((con, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <Clock3 className="w-3 h-3 text-orange-500" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Best For:</h4>
                        <p className="text-sm text-muted-foreground">{model.bestFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Anchoring Strategies */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Anchoring & Value Metrics
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Price perception improves when you anchor against retail value, time saved, or outcomes. 
                Use value metrics that match customer goals and present clear comparisons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Value Anchoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Always show customers what they're getting compared to retail prices. 
                      This makes your subscription pricing feel like a great deal.
                    </p>
                    <div className="bg-background/50 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-3">Example Display:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Normal Price:</span>
                          <span className="line-through text-muted-foreground">£120</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold">
                          <span>Member Price:</span>
                          <span className="text-green-600">£89</span>
                        </div>
                        <div className="flex justify-between text-sm text-green-600">
                          <span>You Save:</span>
                          <span>26%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Value Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Choose metrics that match customer goals and make the value clear and tangible.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Time Saved</h4>
                        <p className="text-sm text-muted-foreground">"Save 3 hours per week"</p>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Visits Included</h4>
                        <p className="text-sm text-muted-foreground">"2 professional cleans per month"</p>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3">
                        <h4 className="font-semibold text-sm mb-2">Outcomes</h4>
                        <p className="text-sm text-muted-foreground">"Always-ready home"</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Promotions & Trials */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Promotions & Trials
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose the right promotion strategy to convert customers without devaluing your service 
                or attracting the wrong type of customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border border-brand-orange/20 bg-gradient-to-b from-brand-orange/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Percent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">First-Month Discount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Offer 10-20% off the first month with clear renewal pricing. 
                      This reduces friction while maintaining value perception.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Recommended:</h4>
                      <p className="text-sm text-muted-foreground">10-20% first month discount</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Converts well</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Maintains value</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">Free Trials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      If using free trials, require a card and limit benefits to avoid attracting 
                      tire-kickers who won't convert.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Best Practice:</h4>
                      <p className="text-sm text-muted-foreground">Require card, limit trial benefits</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Can attract tire-kickers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Reduces friction</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4">
                    <AwardIcon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-primary">No Promotions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Sometimes the best strategy is no promotion at all. Focus on value 
                      and quality instead of competing on price.
                    </p>
                    <div className="bg-background/50 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">When to Use:</h4>
                      <p className="text-sm text-muted-foreground">High-demand services, premium positioning</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Maintains premium feel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Higher margins</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Payment Day Strategy */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Payment Day Strategy
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Align your billing day with cash flow needs and customer expectations. 
                Monthly Club supports flexible payment day configuration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Anniversary Billing</CardTitle>
                  <CardDescription>Same day each month based on signup date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Spreads cash flow evenly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Easy to remember</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Consistent revenue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Preferred Payment Day</CardTitle>
                  <CardDescription>All customers billed on the same day (1st, 15th, etc.)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Predictable cash flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Easier accounting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock3 className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">May cause payment collisions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Examples */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Real Pricing Examples by Industry
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Use these pricing tables as starting points and adjust for your local market rates and demand. 
                All prices are in GBP and based on UK market research.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px] bg-background rounded-lg border border-slate-200/20 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Business Type</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Basic</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Standard</th>
                      <th className="px-6 py-4 text-left font-semibold text-foreground">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/20">
                    {pricingExamples.map((example, index) => (
                      <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{example.business}</td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-primary">{example.basic.price}</div>
                          <div className="text-sm text-muted-foreground">{example.basic.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-primary">{example.standard.price}</div>
                          <div className="text-sm text-muted-foreground">{example.standard.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-primary">{example.premium.price}</div>
                          <div className="text-sm text-muted-foreground">{example.premium.description}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-16 px-4 bg-slate-50/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pricing Best Practices
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Follow these proven strategies to create pricing that converts customers 
                and maximizes your recurring revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-brand-green/20 bg-gradient-to-b from-brand-green/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Start Simple</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Begin with Flat Pricing</h4>
                        <p className="text-sm text-muted-foreground">Start with one simple plan, add tiers as you grow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Test and Adjust</h4>
                        <p className="text-sm text-muted-foreground">Monitor conversion rates and adjust pricing based on demand</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Local Market Research</h4>
                        <p className="text-sm text-muted-foreground">Check competitor pricing in your area and adjust accordingly</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary mb-4">Value Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Show Savings</h4>
                        <p className="text-sm text-muted-foreground">Always display retail vs. member pricing with savings percentage</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Clear Benefits</h4>
                        <p className="text-sm text-muted-foreground">List exactly what's included in each plan tier</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Time-Based Value</h4>
                        <p className="text-sm text-muted-foreground">Emphasize time saved, convenience, and peace of mind</p>
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
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-green-500/10"></div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
                  Ready to Set Your Pricing?
                </h2>
                <p className="text-xl mb-8 opacity-90 relative z-10 max-w-2xl mx-auto">
                  Use these strategies to create pricing that converts customers and maximizes 
                  your recurring revenue. Start with simple plans and grow from there.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/create-a-business">
                    <Button className="hero-button-primary text-base sm:text-lg px-6 sm:px-8 py-4 w-full sm:w-auto">
                      Create Your Pricing Plan
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
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            </Card>
          </div>
        </section>
      </div>

      <Script id="pricing-subscription-plans-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "name": "Pricing Subscription Plans for Service Businesses | Complete Guide | Monthly Club",
          "url": "https://www.monthlyclubhq.com/guides/pricing-subscription-plans-service-business",
          "description": "Master subscription pricing with our complete guide. Learn pricing models, anchoring strategies, payment day optimization, and see real pricing examples.",
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
