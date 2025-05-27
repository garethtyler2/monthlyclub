"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const HomePhysioGuide = () => {
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
              How to Do Physiotherapy at Home Safely: A Step-by-Step Guide
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto mb-6">
              Recover from injuries, improve mobility, and prevent pain <strong>with at-home physiotherapy.</strong> Learn <strong>safe exercises, AI-powered rehab plans, and essential physiotherapy techniques</strong> for home recovery.
            </p>
            <Button className="hero-button-primary">
              <a href="/ai-physical-rehabilitation/personalized-rehab-plans">Get Your Personalized Home Physio Plan</a>
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>What is Home Physiotherapy?</h2>
            <p>
              <strong>Home physiotherapy</strong> is a structured rehabilitation process that allows you to perform <strong>recovery exercises, mobility drills, and strengthening workouts from home.</strong> Using <strong>AI-guided rehab tools</strong>, you can create a personalized recovery plan and track your progress without visiting a clinic.
            </p>

            <h2>How to Do Physiotherapy at Home: A Step-by-Step Guide</h2>
            <ul>
              <li><strong>Step 1:</strong> Use the <a href="/injury-diagnosis">AI Injury Diagnosis Tool</a> to assess your condition.</li>
              <li><strong>Step 2:</strong> Get a <strong>personalized home rehab plan</strong> with exercises tailored to your injury.</li>
              <li><strong>Step 3:</strong> Set up a <strong>safe exercise space</strong> at home with enough room to move comfortably.</li>
              <li><strong>Step 4:</strong> Follow guided <strong>rehab exercises</strong> focusing on mobility, strength, and pain relief.</li>
              <li><strong>Step 5:</strong> Track your progress using <strong>AI rehab tracking tools</strong> to adjust your plan over time.</li>
              <li><strong>Step 6:</strong> Ensure proper <strong>rest and recovery</strong>, avoiding movements that cause excessive pain.</li>
            </ul>

            <h2>Home Physiotherapy Safety Tips</h2>
            <ul>
              <li><strong>Start Slowly:</strong> Avoid overexertion—<strong>begin with light exercises</strong> and increase intensity gradually.</li>
              <li><strong>Use Proper Form:</strong> Maintain <strong>good posture</strong> and follow <strong>guided AI rehab instructions</strong> for safe movement.</li>
              <li><strong>Listen to Your Body:</strong> Stop any exercise that <strong>causes sharp pain</strong> and adjust rehab plans accordingly.</li>
            </ul>

            <h2>Best Physiotherapy Exercises for Home Rehab</h2>
            <ul>
              <li><strong>Mobility Drills:</strong> Joint rotations, dynamic stretches, and range-of-motion exercises.</li>
              <li><strong>Strength Exercises:</strong> Bodyweight squats, resistance band training, and core activation.</li>
              <li><strong>Pain Relief Techniques:</strong> Foam rolling, stretching, and heat/cold therapy.</li>
              <li><strong>Balance & Coordination:</strong> Single-leg exercises and stability drills.</li>
            </ul>
            <p>
              Explore full <strong>AI-recommended rehab routines</strong> in the <a href="/ai-rehab-insights/ai-physical-rehabilitation/personalized-rehab-plans">Personalized Rehab Plans</a>.
            </p>

            <h2>Who Can Benefit from Home Physiotherapy?</h2>
            <ul>
              <li>People recovering from <strong>injuries or post-surgery rehabilitation</strong>.</li>
              <li>Individuals with <strong>chronic pain conditions</strong> needing regular therapy.</li>
              <li>Athletes looking to <strong>improve mobility and prevent injuries</strong>.</li>
              <li>Busy individuals wanting <strong>flexible, at-home rehab options</strong>.</li>
            </ul>

            <h2>Start Your AI-Powered Home Physiotherapy Today</h2>
            <p>
              AI-guided rehab provides <strong>structured home physiotherapy plans</strong> that adapt to your needs. Start your recovery now!
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/ai-rehab-insights/ai-physical-rehabilitation/personalized-rehab-plans">Get Your Personalized Rehab Plan</a>
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

export default HomePhysioGuide;