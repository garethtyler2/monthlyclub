

"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const CommunityDrivenRehab = () => {
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
              How the AI-Rehab Community Ranks Exercises
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto">
              Learn how AI-Rehab combines real-world insights and user recommendations to create a smarter, more effective rehabilitation experience. Our community-driven platform turns every recommendation into valuable data for recovery.
            </p>
          </div>
        </section>
        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>Community Voting for Rehab Effectiveness</h2>
            <p>
              AI-Rehab allows users to vote on which exercises were most effective for their specific injury. This system of community recommendations helps surface the most useful and impactful movements, grounded in real recovery stories.
            </p>
            <ul>
              <li><strong>Per-Injury Rankings:</strong> Votes are counted and displayed for each injury separately, ensuring relevant results for every condition.</li>
              <li><strong>Trusted by the Community:</strong> Exercises that work rise to the top, informed by the experience of other users with the same challenges.</li>
              <li><strong>Live Rehab Research:</strong> This ongoing voting process is like a massive research study powered by our users — and you're a part of it.</li>
            </ul>

            <h2>Why Community-Driven Rehab Is So Powerful</h2>
            <p>
              The combination of AI and crowdsourced insight allows AI-Rehab to evolve continuously:
            </p>
            <ol>
              <li><strong>Smarter Suggestions:</strong> Your recommendations help guide others toward proven recovery options.</li>
              <li><strong>Transparency:</strong> See which exercises have been recommended and how many votes they’ve earned.</li>
              <li><strong>Speed & Trust:</strong> Users trust real-world results — and those results are visible right on each exercise card.</li>
            </ol>

            <h2>How to Participate</h2>
            <p>
              You can make a difference by simply recommending exercises that helped you. Whether you’re just starting or already progressing, your vote helps someone else heal smarter.
            </p>

            <Button className="hero-button-primary mt-4">
              <a href="/ai-rehab-insights#injury-library">Browse Injuries & Recommend Exercises</a>
            </Button>

            <h2>Related Resources</h2>
            <ul>
              <li><a href="/ai-rehab-insights/ai-physical-rehabilitation/what-is-ai-physical-rehabilitation">What is AI in Physical Rehabilitation?</a></li>
              <li><a href="/ai-rehab-insights/ai-physical-rehabilitation/personalized-rehab-plans">How AI Personalizes Rehab Plans</a></li>
              <li><a href="/injury-diagnosis">Start with AI-Powered Injury Diagnosis</a></li>
            </ul>

            <h2>Help Us Build the Future of Rehab</h2>
            <p>
              This is more than recovery — it’s collaborative progress. With every recommendation, AI-Rehab becomes more intelligent, more accurate, and more helpful for the next person. Join the movement.
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 text-center">
          <div className="container mx-auto px-6 max-w-5xl">
            <Button variant="secondary" className="mx-auto">
              <a href="/ai-rehab-insights">Back to Rehab Insights</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CommunityDrivenRehab;