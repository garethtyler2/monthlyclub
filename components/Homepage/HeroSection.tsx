
"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, CreditCard, TrendingUp, Users, Zap, ArrowRight, Building2, DollarSign, MessageSquareText, MessageCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

// List of target audiences to scroll through
const audiences = [
  'Sports Clubs',
  'Content Creators',
  'Hairdressers',
  'Physiotherapists',
  'Web Professionals',
  'Personal Trainers',
  'SEO Experts',
  'Beauticians',
  'Gyms',
  'Barbers',
  'Cleaners',
  'Dog Walkers',
  'Electricians',
  'Gardeners',
  'Handypeople',
  'Home Organizers',
  'Laundry/Ironing Services',
  'Lawn Care Professionals',
  'Massage Therapists',
  'Mobile Car Washers',
  'Mechanics',
  'Mobile Nail Technicians',
  'Pet Sitters',
  'Plumbers',
  'Pool Cleaners',
  'Tutors',
  'Window Cleaners',
  'Consulting Firms',
  'Web Services'
];

const Hero = () => {
  const [ctaHref, setCtaHref] = useState("/login");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setCtaHref("/create-a-business");
      }
    };

    checkUser();
  }, []);

  return (
    <section className="relative md:pt-20 pb-16 md:pb-32 overflow-hidden">
      {/* Enhanced gradient background effects */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10 animate-pulse" />
      <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[96px] -z-10 animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <div
            className="flex flex-col items-center justify-center text-center text-sm font-medium rounded-full border border-white/10 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 px-6 py-3 mb-8 animate-fade-in space-y-1 w-full max-w-sm mx-auto backdrop-blur-sm"
            style={{ animationDelay: "200ms" }}
          >
            <span className="text-brand-purple text-center w-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Monthly Club
            </span>
            <span className="text-center w-full">The Future of Service Subscriptions</span>
          </div>

          {/* Main Headline */}
          <h1 className="animate-fade-in text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-center leading-tight" style={{ animationDelay: "400ms" }}>
            <span className="block text-white mb-2">Transform Your Business</span>
            <span className="block text-gray-400 mb-4">With Smart Subscriptions</span>
            
            {/* Enhanced animated audience text */}
            <div className="h-[1.2em] overflow-hidden block min-w-[300px] align-middle mx-auto">
              <div className="animate-[scrollY_25s_linear_infinite]">
                {audiences.concat(audiences).map((audience, index) => (
                  <div
                    key={index}
                    className="h-[1.2em] bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent font-bold whitespace-nowrap text-2xl sm:text-4xl lg:text-5xl text-center"
                  >
                    {audience}
                  </div>
                ))}
              </div>
            </div>
          </h1>

          {/* Enhanced Subtitle */}
          <p
            className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-3xl animate-fade-in leading-relaxed"
            style={{ animationDelay: "600ms" }}
          >
            Turn your services into subscription businesses. Whether you offer <span className="text-white font-medium">cleaning, training, beauty, or consulting</span>—create recurring revenue streams with automated payments, builder funds, and beautiful customer experiences.
            <span className="text-white font-medium"> No coding required.</span>
          </p>

          {/* Feature Highlights */}
          <div
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-5xl animate-fade-in"
            style={{ animationDelay: "800ms" }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <Building2 className="w-8 h-8 text-brand-purple mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">For Everyone</h3>
                <p className="text-xs text-muted-foreground">Any service business can use subscriptions</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <CreditCard className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Balance Builder</h3>
                <p className="text-xs text-muted-foreground">Let customers build up money for future services</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Recurring Revenue</h3>
                <p className="text-xs text-muted-foreground">Predictable monthly income streams</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Auto Payments</h3>
                <p className="text-xs text-muted-foreground">Seamless Stripe integration</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <MessageSquareText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Subscriber Feed</h3>
                <p className="text-xs text-muted-foreground">Post updates, images and links</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">Direct Messaging</h3>
                <p className="text-xs text-muted-foreground">Chat with customers & collaborators</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced CTA Section */}
          <div
            className="flex flex-col sm:flex-row gap-4 mt-12 animate-fade-in w-full max-w-2xl mx-auto"
            style={{ animationDelay: "1000ms" }}
          >
            <Link
              href={ctaHref}
              className="px-6 sm:px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">Start Your Subscription Business</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            
            <Link
              href="/how-it-works"
              className="px-6 sm:px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          {/* Enhanced Features List */}
          <div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl animate-fade-in"
            style={{ animationDelay: "1200ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-sm font-medium text-white">{feature}</span>
              </div>
            ))}
          </div>

          {/* Enhanced Links Section */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: "1400ms" }}>
            <Link
              href="/pricing"
              className="group px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 flex items-center space-x-2 text-sm font-medium text-brand-purple hover:text-white"
            >
              <DollarSign className="w-4 h-4" />
              <span>See Pricing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/guides/service-subscription-examples"
              className="group px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 flex items-center space-x-2 text-sm font-medium text-brand-purple hover:text-white"
            >
              <span>Real Examples</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/features"
              className="group px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 flex items-center space-x-2 text-sm font-medium text-brand-purple hover:text-white"
            >
              <span>All Features</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Enhanced Bottom Description */}
          <p
            className="mt-12 text-base text-muted-foreground max-w-3xl animate-fade-in leading-relaxed"
            style={{ animationDelay: "1600ms" }}
          >
            Whether you're a <span className="text-white font-medium">gardener</span>, <span className="text-white font-medium">content creator</span>, or <span className="text-white font-medium">mobile beauty professional</span>—Monthly Club gives you everything you need to build a subscription business. 
            <span className="text-brand-purple font-medium"> Builder funds, automated payments, and beautiful customer experiences.</span>
          </p>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "1800ms" }}>
            <span>✓ No monthly fees</span>
            <span>✓ Stripe powered</span>
            <span>✓ 5-minute setup</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scrollY {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </section>
  );
};

const features = [
  "Stable Predictable Income",
  "Builder Funds for Customers", 
  "Automated Recurring Payments",
  "Beautiful Branded Storefront",
  "No Tech Skills Required",
  "Pay As You Go - No Surprises"
];

export default Hero;
