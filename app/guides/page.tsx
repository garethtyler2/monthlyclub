"use client";

import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import TopicGrid from "@/components/TopicGrid";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function GuidesHomePage() {
  const features = [
    {
      title: "Real-World Examples",
      description: "See how actual businesses use subscriptions to grow steady income.",
      icon: CheckCircle,
    },
    {
      title: "Step-by-Step Guides",
      description: "From pricing to marketing — learn exactly what to do and when.",
      icon: CheckCircle,
    },
    {
      title: "Built for Service Providers",
      description: "Whether you're mobile or local, the tips are made for you.",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative md:pt-10 pb-16 md:pb-32 overflow-hidden">
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
          <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div
                className="inline-flex items-center mt-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <span className="text-brand-purple">Monthly Club Knowledge Hub</span>
              </div>

              <h1
                className="animate-fade-in text-4xl sm:text-6xl font-bold"
                style={{ animationDelay: "400ms" }}
              >
                Learn How to Launch and Grow Your Service Subscription
              </h1>

              <p
                className="mt-6 text-lg text-muted-foreground max-w-2xl animate-fade-in"
                style={{ animationDelay: "600ms" }}
              >
                A complete resource to help you understand, create, price, market and scale subscription services for your business.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in"
                style={{ animationDelay: "800ms" }}
              >
                <Button className="hero-button-primary" asChild>
                  <Link href="#guides">Browse Guides</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Guide Grid */}
        <section id="guides" className="py-16 container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Explore Our Latest Guides</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
              Whether you're just starting out or refining your offering, these resources cover every step.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <feature.icon className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <TopicGrid />
        </section>
      </main>
    </div>
  );
}