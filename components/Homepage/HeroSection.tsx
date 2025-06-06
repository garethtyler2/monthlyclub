"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import BetaSignupForm from "@/components/Homepage/BetaSignupForm";

const Hero = () => {
  return (
    <section className="relative md:pt-20 pb-16 md:pb-32 overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
      <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
<div
  className="flex flex-col sm:flex-row items-center justify-center text-center text-sm font-medium rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6 animate-fade-in space-y-1 sm:space-y-0 sm:space-x-2 w-full max-w-xs mx-auto"
  style={{ animationDelay: "200ms" }}
>
  <span className="text-brand-purple text-center w-full sm:w-auto">✨ Monthly Club</span>
  <span className="hidden sm:inline">—</span>
  <span className="text-center w-full sm:w-auto">Subscriptions made simple</span>
</div>

          <h1 className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <span className="block">Simple Subscriptions</span>
            <span className="gradient-text">
              for Local Service Businesses
            </span>
          </h1>

          <p
            className="mt-6 text-lg text-muted-foreground max-w-2xl animate-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            Monthly Club helps local service providers—from cleaners to hairdressers—offer subscription-based services online. Create your plans, share your link, and start earning recurring revenue.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in"
            style={{ animationDelay: "800ms" }}
          >
          <BetaSignupForm />

          </div>

          <div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl animate-fade-in"
            style={{ animationDelay: "1000ms" }}
          >
            {features.map((feature, index) => {
              const isLast = index === features.length - 1;
              const shouldCenter = features.length % 3 !== 0 && isLast;

              return (
                <div
                  key={index}
                  className={`flex items-center ${shouldCenter ? "sm:col-span-3 sm:justify-center" : ""}`}
                >
                  <CheckCircle className="h-5 w-5 text-brand-purple mr-2" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              );
            })}
          </div>

          <p
            className="mt-10 text-sm text-muted-foreground max-w-2xl animate-fade-in"
            style={{ animationDelay: "1200ms" }}
          >
            Whether you're a gardener, a cleaner, or a mobile beauty pro—Monthly Club gives you the tools to grow with subscriptions. Easy setup, automated payments, and a storefront you can share anywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

const features = ["No Tech Skills Needed", "Recurring Payments", "Branded Service Page", "Easy Customer Management"];

export default Hero;
