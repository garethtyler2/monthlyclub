"use client";

import React from "react";
import SearchBar from "./SearchBar";

interface SearchBarTemplateProps {
  titleStart: string;
  titleHighlight: string;
  description?: string;
  placeholder?: string;
  placeholderList?: string[];
  onSearch: (query: string) => void;
  className?: string;
}


const SearchBarTemplate = ({
  titleStart,
  titleHighlight,
  description,
  placeholder = "Search...",
  placeholderList,
  onSearch,
  className = "",
}: SearchBarTemplateProps) => {
  return (
    <section className={`pt-40 py-12 relative ${className}`}>
      {/* Gradient background effect */}
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="mb-4 animate-fade-in text-4xl sm:text-5xl font-bold leading-tight">
            <span className="block">{titleStart}</span>
            <span className="block text-lg sm:text-2xl text-muted-foreground mt-2">
              <span className="gradient-text">{titleHighlight}</span>
            </span>
          </h1>
        </div>

        <div
          className="flex flex-col items-center animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <SearchBar
            placeholder={placeholder}
            placeholderList={placeholderList}
            onSearch={onSearch}
            className="w-full max-w-xl"
          />

          {description && (
            <p className="text-muted-foreground text-sm text-center mt-4 max-w-md">
              {description}
            </p>
          )}
        </div>
      </div>

    </section>
  );
};

export default SearchBarTemplate;
