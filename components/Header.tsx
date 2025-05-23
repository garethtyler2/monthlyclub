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
  { id: "rehab-1", title: "What is AI Physical Rehabilitation", category: "AI Physical Rehabilitation", url: "/insights/ai-physical-rehabilitation/what-is-ai-physical-rehabilitation" },
  { id: "rehab-2", title: "AI Injury Identification", category: "AI Physical Rehabilitation", url: "/insights/ai-physical-rehabilitation/ai-injury-identification" },
  { id: "rehab-3", title: "Personalized Rehab Plans", category: "AI Physical Rehabilitation", url: "/insights/ai-physical-rehabilitation/personalized-rehab-plans" },
  { id: "rehab-4", title: "Benefits of AI Physical Therapy", category: "AI Physical Rehabilitation", url: "/insights/ai-physical-rehabilitation/benefits-ai-physical-therapy" },
  { id: "rehab-5", title: "Limitations of AI Rehabilitation", category: "AI Physical Rehabilitation", url: "/insights/ai-physical-rehabilitation/limitations-ai-rehabilitation" },
  { id: "rehab-6", title: "Success Stories from AI Rehabilitation", category: "AI Physical Rehabilitation", url: "/insights/ai-physical-rehabilitation/success-stories-ai-rehabilitation" },
  { id: "prehab-1", title: "What is AI Powered Prehabilitation", category: "AI Prehabilitation", url: "/insights/ai-prehabilitation/what-is-ai-powered-prehabilitation" },
  { id: "prehab-2", title: "How Can AI Help Prevent Injuries", category: "AI Prehabilitation", url: "/insights/ai-prehabilitation/how-can-ai-help-prevent-injuries" },
  { id: "prehab-3", title: "Prehab Exercises Tailored by AI", category: "AI Prehabilitation", url: "/insights/ai-prehabilitation/prehab-exercises-tailored-by-ai" },
  { id: "prehab-4", title: "Is AI Prehabilitation Effective for Surgery Prep", category: "AI Prehabilitation", url: "/insights/ai-prehabilitation/is-ai-prehabilitation-effective-for-surgery-prep" },
  { id: "prehab-5", title: "How Does AI Analyze Your Prehab Needs", category: "AI Prehabilitation", url: "/insights/ai-prehabilitation/how-does-ai-analyze-your-prehab-needs" },
  { id: "train-1", title: "What is AI Powered Personal Training", category: "AI Personal Training", url: "/insights/ai-personal-training/what-is-ai-powered-personal-training" },
  { id: "train-2", title: "How Can AI Help Optimize Training Results", category: "AI Personal Training", url: "/insights/ai-personal-training/how-can-ai-help-optimize-training-results" },
  { id: "train-3", title: "Examples of AI Personalized Workouts", category: "AI Personal Training", url: "/insights/ai-personal-training/examples-of-ai-personalized-workouts" },
  { id: "train-4", title: "Is AI Effective for Specific Fitness Goals", category: "AI Personal Training", url: "/insights/ai-personal-training/is-ai-effective-for-specific-fitness-goals" },
  { id: "train-5", title: "How Does AI Track Progress in Training", category: "AI Personal Training", url: "/insights/ai-personal-training/how-does-ai-track-progress-in-training" },
  { id: "physio-1", title: "How AI Transforms Physiotherapy", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/how-ai-transforms-physiotherapy" },
  { id: "physio-2", title: "AI in Injury Identification", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/ai-in-injury-identification" },
  { id: "physio-3", title: "AI for Rehabilitation Exercises", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/ai-for-rehabilitation-exercises" },
  { id: "physio-4", title: "AI in Prehab and Injury Prevention", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/ai-in-prehab-and-injury-prevention" },
  { id: "physio-5", title: "Personalized AI Training for Recovery and Fitness", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/personalized-ai-training-for-recovery-and-fitness" },
  { id: "physio-6", title: "Online Physiotherapy", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/online-physiotherapy" },
  { id: "physio-7", title: "Virtual vs Traditional Physio", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/virtual-vs-traditional-physio" },
  { id: "physio-8", title: "AI Physiotherapist", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/ai-physiotherapist" },
  { id: "physio-9", title: "Home Physio Guide", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/home-physio-guide" },
  { id: "physio-10", title: "The Future of AI in Physiotherapy and Fitness", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/the-future-of-ai-in-physiotherapy-and-fitness" },
  { id: "physio-11", title: "Virtual Physio FAQ", category: "AI Physiotherapy", url: "/insights/ai-physiotherapy/virtual-physio-faq" }
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
              <span className="hidden lg:inline-flex">Search The Rehab Hub...</span>
              <span className="inline-flex lg:hidden">Search The Rehab Hub...</span>
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
          <CommandGroup heading="AI Physical Rehabilitation">
            {searchItems
              .filter(item => item.category === "AI Physical Rehabilitation")
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
          <CommandGroup heading="AI Prehabilitation">
            {searchItems
              .filter(item => item.category === "AI Prehabilitation")
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
          <CommandGroup heading="AI Personal Training">
            {searchItems
              .filter(item => item.category === "AI Personal Training")
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
          <CommandGroup heading="AI Physiotherapy">
            {searchItems
              .filter(item => item.category === "AI Physiotherapy")
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