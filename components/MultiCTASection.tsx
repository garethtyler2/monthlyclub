"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Activity, TrendingUp } from "lucide-react";
import Link from "next/link";

const CTAFeatures = [
  {
    icon: ShieldCheck,
    title: "Prevent Injuries",
    description: "Strengthen weak areas proactively"
  },
  {
    icon: Activity,
    title: "Recover Faster",
    description: "Prepare for surgery or recover faster"
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Monitor improvements in real-time"
  }
];

const CTAButtons = [
  {
    text: "Identify Your Injury",
    link: "/injury-diagnosis"
  },
  {
    text: "Explore Prehab",
    link: "/prehab_search"
  },
  {
    text: "Get Rehab Information",
    link: "/direct_rehab"
  },
  {
    text: "Start Personal Training",
    link: "/personal_training"
  }
];

const CTA = () => {
  return (
    <section className="py-16 md:py-24 relative">
      {/* Gradient background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto animate-fade-in">
          <h2 className="mb-4">
            Why Choose <span className="gradient-text">AI-Rehab</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            AI-Rehab is your go-to platform for injury recovery, fitness training, and optimization.
            It's AI-powered, delivering tools for injury assessment, rehab, prehab, and training plans.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {CTAFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <feature.icon className="h-10 w-10 mb-4 text-brand-purple" />
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {CTAButtons.map((button, index) => (
              <Button key={index} variant={index % 2 === 0 ? "default" : "outline"} className={index % 2 === 0 ? "hero-button-primary" : "hero-button-secondary"} asChild>
                <Link href={button.link}>
                  {button.text} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
          
          <div className="mt-10">
            <h3 className="text-xl font-medium mb-4">The Power of Prehab</h3>
            <p className="text-muted-foreground mb-6">
              Prehab is about strengthening and conditioning before injuries or surgeries. With AI, you can improve recovery times, prevent injuries, and perform better.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-white/10 bg-white/5 rounded-xl p-6">
                <h4 className="font-medium mb-2">Before Surgery</h4>
                <p className="text-sm text-muted-foreground">Prepare with targeted exercises for smoother recovery.</p>
              </div>
              <div className="border border-white/10 bg-white/5 rounded-xl p-6">
                <h4 className="font-medium mb-2">Preventative Strength</h4>
                <p className="text-sm text-muted-foreground">Find and address weak spots early.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;