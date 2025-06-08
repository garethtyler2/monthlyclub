"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface SearchItem {
  id: string;
  title: string;
  category: string;
  url: string;
}

const searchItems: SearchItem[] = [
  { id: "seo-1", title: "What is a Service Subscription?", category: "Subscriptions", url: "/guides/what-is-a-service-subscription" },
  { id: "seo-2", title: "Benefits of Recurring Revenue for Local Businesses", category: "Subscriptions", url: "/guides/recurring-revenue-benefits" },
  { id: "seo-3", title: "How to Sell Subscriptions as a Hairdresser", category: "Use Cases", url: "/guides/hairdresser-subscriptions" },
  { id: "seo-4", title: "Cleaning Business Subscription Models", category: "Use Cases", url: "/guides/cleaning-subscription-model" },
  { id: "seo-5", title: "Subscription Billing Tools for Small Businesses", category: "Tools", url: "/guides/subscription-billing-tools" },
  { id: "seo-6", title: "Marketing Your Subscription Services Online", category: "Marketing", url: "/guides/marketing-subscription-services" },
  { id: "seo-7", title: "How to Create a Subscription Plan with Monthly Club", category: "Product Help", url: "/guides/create-subscription-plan" },
  { id: "seo-8", title: "Examples of Service-Based Subscription Pages", category: "Examples", url: "/guides/service-subscription-examples" },
  { id: "seo-9", title: "Automating Customer Payments with Stripe", category: "Tools", url: "/guides/automate-payments-stripe" },
  { id: "seo-10", title: "How Monthly Club Helps Service Providers Grow", category: "Platform", url: "/guides/how-monthly-club-helps" }
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container flex px-4 mb-4 items-center">

        <div className="flex flex-1 items-center justify-end space-x-4">

            <button
              onClick={() => setOpen(true)}
              className={cn(
                "inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative justify-start text-sm text-muted-foreground w-full sm:w-auto sm:ml-auto sm:pr-12 md:w-40 lg:w-64"
              )}
            >
              <span className="hidden lg:inline-flex">Search Our Guides...</span>
              <span className="inline-flex lg:hidden">Search Our Guides...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for topics..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Subscriptions">
            {searchItems
              .filter(item => item.category === "Subscriptions")
              .map(item => (
                <CommandItem key={item.id} onSelect={() => {
                  setOpen(false);
                  router.push(item.url);
                }}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Use Cases">
            {searchItems
              .filter(item => item.category === "Use Cases")
              .map(item => (
                <CommandItem key={item.id} onSelect={() => {
                  setOpen(false);
                  router.push(item.url);
                }}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Marketing">
            {searchItems
              .filter(item => item.category === "Marketing")
              .map(item => (
                <CommandItem key={item.id} onSelect={() => {
                  setOpen(false);
                  router.push(item.url);
                }}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Tools">
            {searchItems
              .filter(item => item.category === "Tools")
              .map(item => (
                <CommandItem key={item.id} onSelect={() => {
                  setOpen(false);
                  router.push(item.url);
                }}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Product Help">
            {searchItems
              .filter(item => item.category === "Product Help")
              .map(item => (
                <CommandItem key={item.id} onSelect={() => {
                  setOpen(false);
                  router.push(item.url);
                }}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Platform">
            {searchItems
              .filter(item => item.category === "Platform")
              .map(item => (
                <CommandItem key={item.id} onSelect={() => {
                  setOpen(false);
                  router.push(item.url);
                }}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Examples">
            {searchItems
              .filter(item => item.category === "Examples")
              .map(item => (
                <CommandItem key={item.id} onSelect={() => {
                  setOpen(false);
                  router.push(item.url);
                }}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;