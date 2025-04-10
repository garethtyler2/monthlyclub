"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTypingPlaceholder } from "@/hooks/useTypingPlaceholder";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
  placeholderList?: string[];
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  placeholderList,
  className,
  onSearch,
}: SearchBarProps) => {
  const dynamicPlaceholder = useTypingPlaceholder(placeholderList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  const clearSearch = () => {
    onChange("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex flex-col sm:flex-row items-center w-full max-w-md",
        className
      )}
    >
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search size={18} />
        </div>

        <Input
          type="text"
          name="query" // ✅ so it can be picked up in forms if needed
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            placeholderList?.length ? dynamicPlaceholder : placeholder
          }
          className="pl-10 pr-10 bg-accent/50 border-white/10 focus-visible:ring-brand-purple/50 rounded-xl h-12"
        />

        {value && (
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
