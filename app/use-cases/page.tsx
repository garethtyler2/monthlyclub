import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Scissors, Home, Car, PawPrint, Dumbbell, Wrench, Sparkles, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Subscription Software by Industry | Monthly Club",
  description: "Discover how Monthly Club helps different service businesses build recurring revenue. From sports clubs to beauty salons, see industry-specific solutions for subscription management.",
  keywords: "subscription software by industry, service business subscriptions, industry-specific subscription management, recurring revenue by sector",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/use-cases",
  },
  openGraph: {
    title: "Subscription Software by Industry | Monthly Club",
    description: "Discover how Monthly Club helps different service businesses build recurring revenue. From sports clubs to beauty salons, see industry-specific solutions for subscription management.",
    url: "https://www.monthlyclubhq.com/use-cases",
    type: "website",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png",
        width: 1200,
        height: 630,
        alt: "Subscription Software by Industry",
      },
    ],
  },
};

const industryCategories = [
  {
    icon: Users,
    title: "Sports & Recreation",
    description: "Membership management for amateur sports clubs, gyms, and recreational facilities",
    industries: [
      { name: "Sports Clubs", link: "/use-cases/sports-club-membership-software", description: "Rugby, cricket, football clubs" },
      { name: "Personal Training", link: "/use-cases/personal-trainers-gym-memberships", description: "Individual training sessions" },
      { name: "Gym Memberships", link: "/use-cases/gym-membership-software", description: "Local gyms and fitness centers" }
    ],
    className: "border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-transparent"
  },
  {
    icon: Scissors,
    title: "Beauty & Personal Care",
    description: "Subscription plans for beauty professionals, hairdressers, and personal care services",
    industries: [
      { name: "Hairdressers", link: "/use-cases/hairdressers-subscription-software", description: "Haircuts, styling, treatments" },
      { name: "Beauty Salons", link: "/use-cases/beauty-salon-subscription-software", description: "Aestheticians, beauty therapists, treatments" }
    ],
    className: "border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-transparent"
  },
  {
    icon: Home,
    title: "Home & Property Services",
    description: "Recurring services for home maintenance, cleaning, and property care",
    industries: [
      { name: "Cleaning Services", link: "/use-cases/cleaning-subscription-software", description: "Weekly, fortnightly cleaning" },
      { name: "Window Cleaning", link: "/use-cases/window-cleaning-subscription-software", description: "Regular window maintenance" },
      { name: "Gardening", link: "/use-cases/gardener-subscription-service", description: "Lawn care and garden maintenance" }
    ],
    className: "border-green-500/20 bg-gradient-to-b from-green-500/10 to-transparent"
  },
  {
    icon: Car,
    title: "Automotive Services",
    description: "Vehicle maintenance and care subscription services",
    industries: [
      { name: "Car Valeting", link: "/use-cases/car-valeting-subscription-software", description: "Mobile car washing and detailing" }
    ],
    className: "border-orange-500/20 bg-gradient-to-b from-orange-500/10 to-transparent"
  },
  {
    icon: PawPrint,
    title: "Pet Services",
    description: "Pet care and grooming subscription services",
    industries: [
      { name: "Pet Services", link: "/use-cases/pet-sitter-subscription-software", description: "Dog walking, pet sitting, grooming" }
    ],
    className: "border-pink-500/20 bg-gradient-to-b from-pink-500/10 to-transparent"
  },
  {
    icon: Wrench,
    title: "Professional Services",
    description: "Business and professional service subscriptions",
    industries: [
      { name: "Tattoo Artists", link: "/use-cases/tattoo-artist-buy-now-pay-later", description: "Tattoo sessions and aftercare" }
    ],
    className: "border-indigo-500/20 bg-gradient-to-b from-indigo-500/10 to-transparent"
  }
];

const benefits = [
  {
    icon: CheckCircle,
    title: "Industry-Specific Solutions",
    description: "Each industry has unique needs. Our platform adapts to your specific business model and customer expectations."
  },
  {
    icon: Sparkles,
    title: "Proven Templates",
    description: "Start with pre-built subscription plans designed for your industry, then customize to match your business."
  },
  {
    icon: ArrowRight,
    title: "Easy Migration",
    description: "Import existing customers and transition from one-off bookings to recurring subscriptions seamlessly."
  }
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Subscription Software by Industry | Monthly Club</title>
        <meta name="description" content="Discover how Monthly Club helps different service businesses build recurring revenue. From sports clubs to beauty salons, see industry-specific solutions for subscription management." />
        <meta name="robots" content="index,follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/use-cases",
              },
              name: "Subscription Software by Industry",
              description: "Discover how Monthly Club helps different service businesses build recurring revenue. From sports clubs to beauty salons, see industry-specific solutions for subscription management.",
              author: { "@type": "Organization", name: "Monthly Club", url: "https://www.monthlyclubhq.com" },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: { "@type": "ImageObject", url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png" },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.monthlyclubhq.com/" },
                { "@type": "ListItem", position: 2, name: "Use Cases" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-indigo/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Subscription Software by Industry
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Discover how Monthly Club helps different service businesses build recurring revenue. 
              From sports clubs to beauty salons, see industry-specific solutions for subscription management.
            </p>
          </div>
        </section>

        {/* Industry Categories */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {industryCategories.map((category, index) => (
                <Card key={index} className={`hover:shadow-lg transition-shadow ${category.className}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.industries.map((industry, idx) => (
                        <Link
                          key={idx}
                          href={industry.link}
                          className="block p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium group-hover:text-brand-purple transition-colors">
                                {industry.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">{industry.description}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-purple group-hover:translate-x-1 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Industry-Specific Solutions Matter</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every industry has unique challenges, customer expectations, and business models. 
                Monthly Club adapts to your specific needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-brand-purple" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-brand-green to-brand-blue">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Subscription Business?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of service businesses already using Monthly Club to build predictable, recurring revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-button-primary">
                <Link href="/create-a-business">
                  Start Your Business Now!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
