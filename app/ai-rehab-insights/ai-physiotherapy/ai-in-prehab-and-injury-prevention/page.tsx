"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const AIPrehabInjuryPrevention = () => {
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
              AI in Prehab and Injury Prevention
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto">
              Learn how artificial intelligence supports prehabilitation by designing exercises that strengthen your body, reduce injury risks, and optimize your physical readiness for surgery or intense activity.
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>What is AI-Powered Prehabilitation?</h2>
            <p>
              Prehabilitation, or prehab, focuses on preparing your body to prevent injuries and recover faster after surgery. AI takes prehab to the next level by tailoring exercises to your unique needs and risk factors.
            </p>
            <ul>
              <li><strong>Customized Prehab Plans:</strong> AI designs exercises to strengthen weak areas and improve overall mobility. <a href="/prehab">Try the Prehab Tool</a>.</li>
              <li><strong>Injury Risk Analysis:</strong> AI analyzes your physical condition and identifies potential risk areas.</li>
              <li><strong>Surgical Preparation:</strong> Prehab plans reduce recovery time and improve surgical outcomes.</li>
            </ul>

            <h2>Benefits of AI in Injury Prevention</h2>
            <ul>
              <li><strong>Injury Risk Reduction:</strong> Strengthen weak spots and address muscle imbalances to prevent injuries before they happen.</li>
              <li><strong>Smoother Surgical Recovery:</strong> Prepare your body for surgery with exercises that improve strength, mobility, and overall readiness.</li>
              <li><strong>Personalized Plans:</strong> Receive prehab routines customized to your goals, activity level, and upcoming challenges.</li>
            </ul>

            <h2>Who Can Benefit from AI Prehab?</h2>
            <p>AI-powered prehabilitation is ideal for anyone looking to:</p>
            <ul>
              <li>Prevent injuries during sports, work, or daily life.</li>
              <li>Prepare for surgery with improved strength and mobility.</li>
              <li>Boost recovery and reduce downtime post-surgery.</li>
              <li>Combine injury prevention with fitness goals. <a href="/personal-training">Explore AI Personal Training</a>.</li>
            </ul>

            <h2>Take Control of Your Injury Prevention</h2>
            <p>
              Start building a stronger, more resilient body with our AI-powered prehab tools. Take the first step toward a healthier future today.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/prehab">Try the Prehab Tool</a>
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

export default AIPrehabInjuryPrevention;