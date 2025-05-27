"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const AIInjuryIdentification = () => {
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
              AI in Injury Identification
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto">
              Explore how artificial intelligence can analyze symptoms, pinpoint potential injuries, and guide you toward effective recovery. AI makes injury identification more accurate, efficient, and accessible.
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>How AI Identifies Injuries</h2>
            <p>
              With the power of data and advanced algorithms, AI can analyze your symptoms, movement patterns, and medical history to accurately identify injuries. This allows for quicker diagnosis and better recovery planning, all from the comfort of your home.
            </p>
            <ul>
              <li><strong>Symptom Analysis:</strong> Enter your symptoms into our <a href="/injury-diagnosis">Injury Diagnosis Tool</a>, and AI will assess potential causes.</li>
              <li><strong>Data-Driven Accuracy:</strong> AI uses vast datasets from physiotherapy cases to deliver evidence-based injury identification.</li>
              <li><strong>Time-Saving:</strong> Skip long clinic visits and get actionable insights instantly.</li>
            </ul>

            <h2>Benefits of Using AI for Injury Diagnosis</h2>
            <ul>
              <li><strong>Quick and Accurate Results:</strong> AI identifies potential injuries in seconds, ensuring faster action and recovery.</li>
              <li><strong>Accessibility:</strong> AI tools are available anytime, anywhere, making injury diagnosis accessible to everyone.</li>
              <li><strong>Personalized Insights:</strong> The AI provides insights specific to your symptoms, helping you take the next steps with confidence.</li>
            </ul>

            <h2>What to Do After Identifying Your Injury</h2>
            <p>
              Once you’ve identified your injury, our platform offers tools to support your recovery:
            </p>
            <ul>
              <li><strong>Rehabilitation:</strong> Use our <a href="/ai-physiotherapy/home-physio-guide">Rehab Tool</a> to access personalized exercise plans.</li>
              <li><strong>Prehab:</strong> Strengthen your body to prevent future injuries with our <a href="/prehab">Prehab Exercises</a>.</li>
              <li><strong>Personal Training:</strong> Combine recovery with fitness by exploring our <a href="/personal-training">AI Personal Training Plans</a>.</li>
            </ul>

            <h2>Take Control of Your Recovery</h2>
            <p>
              Start identifying injuries and planning your recovery today. Let AI guide you to better physical health.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/injury-diagnosis">Try the Injury Diagnosis Tool</a>
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

export default AIInjuryIdentification;