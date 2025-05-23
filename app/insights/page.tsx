"use client"
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopicGrid from '@/components/TopicGrid';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Search, Code, BarChart3, ArrowDown, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
  {
    title: 'AI-Powered Insights',
    description:
      'Leverage advanced AI algorithms to get personalized recovery plans and progress tracking.',
    icon: CheckCircle,
  },
  {
    title: 'Expert Guidance',
    description:
      'AI-curated insights synthesized from reputable online sources to guide your rehab journey.',
    icon: CheckCircle,
  },
  {
    title: 'Community Support',
    description:
      'Join a vibrant community of peers and professionals to share recommendations.',
    icon: CheckCircle,
  },
];

const Index = () => {
  // Handle keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        document.getElementById('searchButton')?.click();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
    <section className="relative md:pt-20 pb-16 md:pb-32 overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
      <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <div
            className="inline-flex items-center mt-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <span className="text-brand-purple"> Smarter Recovery, Training & Prehab</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in text-4xl sm:text-6xl font-bold" style={{ animationDelay: "400ms" }}>
            Personalised Recovery, Prehab & Training
          </h1>

          {/* Subheadline */}
          <p
            className="mt-6 text-lg text-muted-foreground max-w-2xl animate-fade-in"
            style={{ animationDelay: "600ms" }}
          >
            Your expert resource for AI-powered recovery, prehabilitation, personal training, and physiotherapy. Get smarter programs and track your rehab with ease.
          </p>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in"
            style={{ animationDelay: "800ms" }}
          >
            <Button className="hero-button-primary" asChild>
              <Link href="#topic-grid">
                Explore Topics <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
              <ul role="list" className="mt-16 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
                {features.map((feature) => (
                  <li key={feature.title} className="flex items-start">
                    <feature.icon className="h-6 w-6 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    <div className="ml-4">
                      <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Topic Grid Section */}
        <section id="topic-grid" className="py-16 container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Explore the Rehab Hub</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dive into AI-enhanced recovery strategies, injury prevention techniques, and fitness optimization guidance tailored to your journey.
            </p>
          </div>
          <TopicGrid />
        </section>

        {/* Featured Content Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Start strong with our most visited, AI-curated guides to recovery, prevention, and training.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                  <Search className="h-16 w-16 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">What is AI Physical Rehabilitation?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Discover how AI can personalize your rehabilitation journey from the very start.</p>
                  <a href="/insights/ai-physical-rehabilitation/what-is-ai-physical-rehabilitation" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Read Guide →</a>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                  <Code className="h-16 w-16 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">How Can AI Help Prevent Injuries?</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Explore AI-driven strategies to stay injury-free before they even happen.</p>
                  <a href="/insights/ai-prehabilitation/how-can-ai-help-prevent-injuries" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Read Guide →</a>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Track Your Recovery Progress</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Learn how AI tools help you monitor improvements and adjust plans dynamically.</p>
                  <a href="/insights/ai-personal-training/how-does-ai-track-progress-in-training" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">Read Guide →</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Index;