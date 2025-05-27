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
              Take the guesswork out of injury identification. Our AI-powered tool analyzes your symptoms and helps you determine potential injuries, offering self-tests and tailored recommendations to start your recovery journey.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>How Does AI Identify Injuries?</h2>
            <p>
              Injury identification can often be time-consuming and stressful. Our AI tool simplifies this process with a few easy steps:
            </p>
            <ol>
              <li><strong>Select the Affected Body Part:</strong> Choose the area where you’re experiencing discomfort or pain.</li>
              <li><strong>Describe Your Symptoms:</strong> Enter details about your pain, such as its type (e.g., sharp or dull) and triggers (e.g., bending or lifting).</li>
              <li><strong>AI-Powered Analysis:</strong> The tool processes your input and compares it against a comprehensive database of common injuries.</li>
              <li><strong>Get a List of Potential Injuries:</strong> Receive a personalized list of possible conditions, each with detailed descriptions, common symptoms, and self-tests to help you identify the issue more confidently.</li>
            </ol>

            <h2>Why Choose AI for Injury Identification?</h2>
            <p>
              Our AI tool empowers you to take the first step toward recovery by providing accurate, data-driven insights. Here’s why it’s a game-changer:
            </p>
            <ul>
              <li><strong>Quick and Convenient:</strong> Get instant results from anywhere, without waiting for appointments.</li>
              <li><strong>Personalized Recommendations:</strong> The tool adapts to your unique symptoms and needs.</li>
              <li><strong>Evidence-Based Results:</strong> Backed by a vast database of injury information, our tool ensures accuracy and reliability.</li>
            </ul>

            <h2>Start Your Recovery Journey</h2>
            <p>
              Once your injury is identified, you’ll gain access to:
            </p>
            <ul>
              <li>Tailored rehab exercises based on your condition and recovery stage.</li>
              <li>Tools to track your pain, strength, and mobility over time.</li>
              <li>Personalized adjustments as your progress evolves.</li>
            </ul>

            <h2>Try Our Injury Identification Tool Today</h2>
            <p>
              Ready to take control of your recovery? Start by identifying your injury with our AI-powered tool and gain actionable insights to guide your journey.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/injury-diagnosis">Start Now</a>
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