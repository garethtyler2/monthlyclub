"use client";

import React from "react";
import SearchBar from "./SearchBar";
import { toast } from "@/hooks/use-toast";

const SearchDemo = () => {
  const handleSearch = (query: string) => {
    toast({
      title: "Search initiated",
      description: `Searching for: "${query}"`,
    });
    console.log("Searching for:", query);
  };

  return (
    <section className="pt-40 py-12 relative">
      {/* Gradient background effect */}
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="mb-4 animate-fade-in">
            Find <span className="gradient-text">What You Need</span>
          </h2>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            Powerful search functionality at your fingertips. Try it now!
          </p>
        </div>
        
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
          <SearchBar 
            placeholder="Search for anything..." 
            onSearch={handleSearch} 
            className="w-full max-w-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default SearchDemo;
