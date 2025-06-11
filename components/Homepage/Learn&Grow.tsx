import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CommunityFeature = () => {
  return (
    <section className="relative py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute -top-16 -left-64 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl font-bold text-gray-500 mb-4 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <span className="gradient-text">Learn & Grow</span> with Monthly Club
        </h2>
        <p
          className="text-lg text-muted-foreground mb-6 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          From barbers to cleaners, see how real businesses are building recurring income with subscriptions. Learn from our guides, get inspired, and grow faster.
        </p>
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "800ms" }}
        >
        </div>
          <Button asChild className="w-1/2 hero-button-primary">
            <Link href="/guides">Explore Guides</Link>
          </Button>
      </div>
    </section>
  );
};

export default CommunityFeature;