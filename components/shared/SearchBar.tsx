"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  placeholderList?: string[];
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({
  placeholder = "Search...",
  placeholderList,
  className,
  onSearch,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState("");

  const placeholderIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  // Typing animation logic
  useEffect(() => {
    if (!placeholderList || placeholderList.length === 0) return;
  
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 1500;
  
    let timeout: NodeJS.Timeout;
  
    const handleTyping = () => {
      const currentPhrase = placeholderList[placeholderIndex.current];
  
      if (!isDeleting.current) {
        const nextText = currentPhrase.substring(0, charIndex.current + 1);
        setDynamicPlaceholder(nextText);
        charIndex.current++;
  
        if (nextText === currentPhrase) {
          isDeleting.current = true;
          timeout = setTimeout(handleTyping, pauseTime); // wait before deleting
          return;
        }
  
        timeout = setTimeout(handleTyping, typeSpeed);
      } else {
        const nextText = currentPhrase.substring(0, charIndex.current - 1);
        setDynamicPlaceholder(nextText);
        charIndex.current--;
  
        if (nextText === "") {
          isDeleting.current = false;
          placeholderIndex.current =
            (placeholderIndex.current + 1) % placeholderList.length;
        }
  
        timeout = setTimeout(handleTyping, deleteSpeed);
      }
    };
  
    timeout = setTimeout(handleTyping, typeSpeed);
  
    return () => clearTimeout(timeout);
  }, [placeholderList]);
  

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex flex-col sm:flex-row items-center w-full max-w-md", // ✅ fixed typo here
        className
      )}
    >
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </div>

        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            placeholderList?.length ? dynamicPlaceholder : placeholder
          }
          className="pl-10 pr-10 bg-accent/50 border-white/10 focus-visible:ring-brand-purple/50 rounded-xl h-12"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
