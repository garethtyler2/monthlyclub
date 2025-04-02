"use client";

import { Activity, Shield, Clipboard, Brain, Target, BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const featureItems = [
  {
    icon: Activity,
    title: "Accurate Identification",
    description: "Accurately identify your injury or issue using our advanced AI diagnosis system.",
    className: "border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent",
    delay: 0,
    link: "/injury-diagnosis"
  },
  {
    icon: Clipboard,
    title: "Personalized Rehab",
    description: "Receive personalized rehab exercises based on your level and symptoms.",
    className: "border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent",
    delay: 100,
    link: "/direct_rehab"
  },
  {
    icon: BarChart,
    title: "Progress Tracking",
    description: "Interactive tools to track progress in pain, mobility, and strength.",
    className: "border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent",
    delay: 200,
    link: "/dashboard"
  },
  {
    icon: Shield,
    title: "Comprehensive Prehab",
    description: "Strengthen your body with exercises designed to prevent injuries before they happen.",
    className: "border-brand-pink/20 bg-gradient-to-b from-brand-pink/10 to-transparent",
    delay: 300,
    link: "/prehab_search"
  },
  {
    icon: Target,
    title: "Tailored Training",
    description: "Personalized training plans for weight loss, muscle gain, and more.",
    className: "border-brand-purple/20 bg-gradient-to-b from-brand-purple/10 to-transparent",
    delay: 400,
    link: "/personal_training"
  },
  {
    icon: Brain,
    title: "AI-Rehab Insights",
    description: "Stay informed with curated content on physiotherapy, injury science, and how AI is reshaping recovery.",    
    className: "border-brand-blue/20 bg-gradient-to-b from-brand-blue/10 to-transparent",
    delay: 500,
    link: "/insights"
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4 animate-fade-in">
            The AI <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            AI-Rehab combines the expertise of physiotherapy with cutting-edge AI, empowering you to recover faster and optimize your physical performance—all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureItems.map((feature, index) => (
            <Card 
              key={index} 
              className={cn(
                "border rounded-xl overflow-hidden animate-fade-in", 
                feature.className
              )} 
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
                {feature.link !== "/" && (
                  <Link href={feature.link} className="text-brand-purple hover:underline text-sm mt-4 inline-block">
                    Learn more →
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;