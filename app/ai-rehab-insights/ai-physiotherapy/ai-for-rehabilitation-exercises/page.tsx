"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const AIRehabilitationExercises = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-950">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <div className="mb-6">
              <a href="/ai-rehab-insights" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                ← Back to the hub
              </a>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-50">
              AI for Rehabilitation Exercises
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto">
              Discover how artificial intelligence delivers personalized rehabilitation exercises to accelerate recovery, improve mobility, and build strength. AI-driven rehab plans adapt to your progress and specific needs.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>How AI Powers Rehabilitation</h2>
            <p>
              AI in rehabilitation tailors exercise plans to suit your specific injury, pain level, and recovery goals. By analyzing your progress and symptoms, it ensures every exercise is both effective and safe.
            </p>
            <ul>
              <li><strong>Custom Rehabilitation Plans:</strong> AI creates personalized exercise routines based on your input and progress. <a href="/ai-physiotherapy/home-physio-guide">Start your Rehab Plan</a>.</li>
              <li><strong>Progress Tracking:</strong> Monitor your mobility, strength, and pain levels with interactive tracking tools.</li>
              <li><strong>Adaptability:</strong> Plans evolve as your recovery progresses, keeping exercises relevant and challenging.</li>
            </ul>

            <h2>Benefits of AI-Powered Rehab</h2>
            <p>Why choose AI for your rehabilitation exercises? Here are the key advantages:</p>
            <ul>
              <li><strong>Tailored to Your Needs:</strong> AI ensures your exercises are specifically designed for your injury type and recovery stage.</li>
              <li><strong>Continuous Adaptation:</strong> Plans update based on your progress, ensuring they stay effective and aligned with your recovery.</li>
              <li><strong>Convenient and Affordable:</strong> Access AI-driven rehab plans anytime, making recovery more affordable and accessible than traditional methods.</li>
            </ul>

            <h2>Who Can Benefit from AI Rehab?</h2>
            <p>AI-powered rehabilitation is suitable for a wide range of conditions and goals:</p>
            <ul>
              <li>Recovering from sports injuries or surgeries.</li>
              <li>Managing chronic conditions like arthritis or back pain.</li>
              <li>Strengthening weak areas to prevent reinjury. <a href="/prehab">Explore Prehab Tools</a>.</li>
              <li>Combining recovery with fitness through tailored personal training. <a href="/personal-training">Learn about AI Personal Training</a>.</li>
            </ul>

            <h2>Start Your Personalized Rehab Plan Today</h2>
            <p>
              Get started with AI-powered rehabilitation exercises and take the first step toward recovery and better physical health.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/ai-rehab-insights/ai-physiotherapy/home-physio-guide">Try the Rehab Tool</a>
            </Button>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 text-center">
          <div className="container mx-auto px-6 max-w-5xl">
            <Button variant="secondary" className="mx-auto">
              <a href="/ai-rehab-insights">View all rehab topics</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AIRehabilitationExercises;