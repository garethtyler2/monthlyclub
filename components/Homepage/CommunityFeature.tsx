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
            <span className="gradient-text">Built for Community, </span>
           Designed for Growth
        </h2>
        <p
          className="text-lg text-muted-foreground mb-6 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          Monthly Club brings small businesses together—sharing tools, knowledge, and real-world tips to grow recurring revenue with ease.
        </p>
        <p
          className="text-md text-muted-foreground mb-6 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          Whether you're a solo cleaner or a growing grooming business, you're part of a bigger movement toward predictable income and digital simplicity.
        </p>
        <div
          className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in"
          style={{ animationDelay: "800ms" }}
        >
        </div>
          <Button asChild className="w-1/2 hero-button-primary">
            <Link href="#">Join the Beta!</Link>
          </Button>
      </div>
    </section>
  );
};

export default CommunityFeature;