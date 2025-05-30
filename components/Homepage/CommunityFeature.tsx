// components/Homepage/CommunityFeature.tsx

import React from "react";
import { Button } from "@/components/ui/button";

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
            <span className="gradient-text">Community-Powered, </span>
           Evidence-Based Rehab
        </h2>
        <p
          className="text-lg text-muted-foreground mb-6 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          Discover the most effective injury recovery exercises, ranked by
          people just like you. Every recommendation helps us build the world’s
          largest community-driven rehab knowledge base.
        </p>
        <p
          className="text-md text-muted-foreground mb-6 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          With AI-Rehab, you’re not just recovering—you’re contributing to
          crowdsourced, real-world research on injury rehabilitation. Your
          recommendations help others heal smarter and faster.
        </p>
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "800ms" }}
        >
          <Button asChild className="hero-button-primary">
            <a href="/ai-rehab-insights#injury-library">Explore Top-Rated Exercises</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/ai-physical-rehabilitation/community-driven-rehab">Find Out More</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityFeature;