"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const HowAITransformsPhysio = () => {
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
              How AI Transforms Physiotherapy
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto mb-6">
              Discover how artificial intelligence is redefining physiotherapy by providing innovative solutions for injury diagnosis, rehabilitation, prehab, and personalized fitness. AI empowers users to take control of their physical health like never before.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>Redefining Physiotherapy with AI</h2>
            <p>Artificial intelligence is changing the way physiotherapy is practiced. By leveraging AI, you can:</p>
            <ul>
              <li><strong>Identify Injuries:</strong> AI-powered tools analyze your symptoms to provide accurate injury identification. <a href="/injury-diagnosis">Try our Injury Diagnosis Tool</a>.</li>
              <li><strong>Create Personalized Rehab Plans:</strong> Receive tailored rehabilitation exercises to recover faster and with greater precision. <a href="/ai-physical-rehabilitation/personalized-rehab-plans">Start your Rehab Journey</a>.</li>
              <li><strong>Prevent Injuries:</strong> Proactively strengthen your body with prehab exercises customized to your needs. <a href="/prehab">Learn about Prehabilitation</a>.</li>
              <li><strong>Track Your Progress:</strong> Monitor pain, mobility, and strength improvements over time with interactive AI tools.</li>
            </ul>

            <h2>Benefits of AI in Physiotherapy</h2>
            <ul>
              <li><strong>Accurate Injury Identification:</strong> AI uses data-driven algorithms to analyze your symptoms and pinpoint potential injuries with precision.</li>
              <li><strong>Tailored Rehabilitation Plans:</strong> AI creates exercise routines specific to your injury, pain level, and recovery goals.</li>
              <li><strong>Accessibility and Affordability:</strong> With AI, physiotherapy is more affordable and available anytime, anywhere, empowering users who cannot visit a clinic.</li>
            </ul>

            <h2>Real-World Use Cases</h2>
            <ul>
              <li>Preparing for surgery with customized prehab routines.</li>
              <li>Recovering from sports injuries with tailored rehab plans.</li>
              <li>Managing chronic conditions with AI-guided exercises.</li>
              <li>Optimizing fitness training to prevent future injuries. <a href="/ai-personal-training/what-is-ai-powered-personal-training">Learn more about AI Personal Training</a>.</li>
            </ul>

            <h2>Experience the AI Advantage</h2>
            <p>
              Start your journey with AI-powered physiotherapy today. From injury diagnosis to personalized recovery plans, our platform is here to support you every step of the way.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/injury-diagnosis">Start AI Physiotherapy</a>
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

export default HowAITransformsPhysio;