import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Sparkles, 
  CreditCard, 
  Share2,
  ArrowRight,
  CheckCircle,
  Zap
} from "lucide-react";
import Link from "next/link";

import Script from "next/script";

export const metadata: Metadata = {
  title: "How It Works | Launch Your Subscription Club in 4 Steps",
  description: "See how easy it is to turn your ideas into income. Learn how to create, customize, and launch your own monthly subscription club in just four steps.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/how-it-works"
  },
  openGraph: {
    title: "How It Works | Launch Your Subscription Club in 4 Steps",
    description: "Transform your creativity into recurring revenue. Follow four simple steps to build and grow your subscription business.",
    url: "https://www.monthlyclubhq.com/how-it-works",
    siteName: "MonthlyClubHQ",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png",
        width: 1200,
        height: 630,
        alt: "How MonthlyClub Works"
      }
    ],
    type: "website"
  },
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create",
      subtitle: "Add your information and product details",
      description: "Tell us about yourself and what you're selling. Upload an image, write your description including your products and pricing. Our intuitive interface makes it easy to showcase your products in the best light.",
      icon: Lightbulb,
      color: "from-purple-primary to-blue-secondary",
      features: ["Business Profile Image", "Rich descriptions", "Custom pricing", "Brand showcase"]
    },
    {
      number: "02", 
      title: "Generate",
      subtitle: "AI turns your info into wonderful descriptions",
      description: "Watch the magic happen! Our AI analyzes your input and creates compelling product descriptions, optimizes your listings, and suggests improvements to maximize your sales potential.",
      icon: Sparkles,
      color: "from-pink-accent to-orange-accent",
      features: ["AI Optimisation", "Smart suggestions", "Auto-formatting"]
    },
    {
      number: "03",
      title: "Sign up to Stripe", 
      subtitle: "Add your payment details so you can get paid",
      description: "Connect your Stripe account in seconds. We handle all the payment processing, security, and compliance so you can focus on what you do best - creating amazing products.",
      icon: CreditCard,
      color: "from-blue-secondary to-purple-light",
      features: ["Secure payments", "Regular Payouts", "Fraud protection"]
    },
    {
      number: "04",
      title: "Share your link!",
      subtitle: "Start selling and earning money",
      description: "Your beautiful storefront is ready! Share your custom link across social media, embed it in your bio, or send it directly to customers. Start earning money immediately.",
      icon: Share2,
      color: "from-orange-accent to-pink-accent", 
      features: ["Custom storefront", "Social sharing", "Analytics dashboard", "Mobile optimized"]
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gradient-subtle">


      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-6  text-primary-foreground animate-bounce-in">
            <Zap className="w-4 h-4 mr-2" />
            How It Works
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text gradient-text mb-6 animate-scale-in leading-tight">
            Launch Your Subscription Business <br className="md:hidden" /> in 4 Easy Steps
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-in-up">
            Transform your creativity into recurring revenue. Follow four simple steps to build and grow your subscription business.          </p>
          <Link href="/create-a-business/step-one">
            <Button className="hero-button-primary animate-pulse-glow">
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:gap-20">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-full w-px h-20 bg-gradient-primary opacity-30 transform -translate-x-1/2"></div>
                )}
                
                <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''} animate-slide-in-up`} style={{animationDelay: `${index * 0.2}s`}}>
                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-bold bg-gradient-primary bg-clip-text gradient-text">
                        {step.number}
                      </span>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                          {step.title}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                  </div>
                  
                  {/* Visual Card */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} animate-scale-in`} style={{animationDelay: `${index * 0.2 + 0.1}s`}}>
                    <Card className="relative overflow-hidden border-0 shadow-primary group-hover:shadow-glow transition-all duration-500 transform group-hover:scale-105">
                      <CardContent className="p-0">
                        <div className={`h-80 bg-gradient-to-br ${step.color} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse-glow"></div>
                              <step.icon className="w-24 h-24 text-white relative z-10 animate-float" />
                            </div>
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                          <div className="absolute bottom-8 left-8 w-4 h-4 bg-white/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                          <div className="absolute top-1/3 left-6 w-6 h-6 bg-white/15 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-glow overflow-hidden relative">
            <CardContent className="p-6 relative z-10">
              <div className="absolute inset-0 bg-black/10"></div>
              <h2 className="text-4xl md:text-5xl gradient-text font-bold mb-6 relative z-10">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90 relative z-10">
                Join thousands of creators who are already earning money with our platform.
                Your success story starts today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
               <Link href="/create-a-business/step-one">
                <Button className="hero-button-primary bg-white text-primary hover:bg-white/90">
                  Start Creating Now
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
             </Link>

          
              </div>
            </CardContent>
            
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          </Card>
        </div>
      </section>
    </div>
    <Script id="how-it-works-schema" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "How It Works",
        "url": "https://www.monthlyclubhq.com/how-it-works",
        "description": "Learn how to create and launch your own subscription club in four simple steps. Start earning recurring revenue from your products today."
      })}
    </Script>
    </>
  );
};

export default HowItWorks;