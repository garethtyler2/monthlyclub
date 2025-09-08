

import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About | The Story Behind Monthly Club",
  description: "Learn about the mission, founder, and thinking behind MonthlyClub. We're building modern tools to help creators and service businesses earn recurring revenue with ease.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/about"
  },
  openGraph: {
    title: "About | The Story Behind Monthly Club",
    description: "We're on a mission to make launching a subscription business dead simple. Built for creators, solo founders, and service providers.",
    url: "https://www.monthlyclubhq.com/about",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png",
        width: 1200,
        height: 630,
        alt: "Monthly Club Logo"
      }
    ],
    type: "website"
  }
};

const AboutPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-subtle py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 text-primary-foreground animate-bounce-in">
            <Zap className="w-4 h-4 mr-2" />
            About
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            The Story Behind MonthlyClub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
            MonthlyClub was built to help anyone turn their skills, creativity, or services into a thriving subscription business.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8 text-lg text-muted-foreground">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Why MonthlyClub?</h2>
              <p>
                I built MonthlyClub because I wanted a faster, simpler way for solo business owners and creators to earn recurring revenue without needing a developer, tech stack, or a dozen integrations.
              </p>
              <p>
                There are plenty of platforms for eCommerce and subscriptions—but most are bloated, expensive, or built for big teams. I wanted something focused, modern, and helpful right out of the box.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Who’s Behind This?</h2>
              <p>I have over 10 years of experience building digital products and startups. For the past 8 years, I’ve worked across fintech and product management — launching tools, scaling platforms, and helping businesses grow.</p>
              <p>
                I'm a solo founder, designer, and developer passionate about building useful products. MonthlyClub is a one-person project, but it's crafted with care, scalability, and your customers in mind.
              </p>
              <p> MonthlyClub brings all that experience together in one simple product. I’ve built it to be fast, practical, and something I’d want to use myself.</p>

            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">What’s the Vision?</h2>
              <p>
                I believe more people should have access to recurring income. Whether you're offering physical goods, content, consulting, or cutting hair—MonthlyClub gives you the tools to do it simply.
              </p>
              <p>
                The vision is to make launching a monthly subscription plan feel as easy and beautiful as using Notion or Stripe. If that excites you, you're in the right place.
              </p>
                <p>
                My goal is to keep it clean, and focused so you can launch your ideas with as little friction as possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Script id="about-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "About Monthly Club",
          "url": "https://www.monthlyclubhq.com/about",
          "description": "Learn about the mission, founder, and thinking behind MonthlyClub. Built to help you launch your subscription business with ease."
        })}
      </Script>
    </>
  );
};

export default AboutPage;