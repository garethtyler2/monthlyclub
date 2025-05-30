"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const OnlinePhysiotherapy = () => {
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
              Online Physiotherapy: Virtual Physio at Your Fingertips
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto mb-6">
              Get expert physiotherapy care from home with AI-powered virtual rehab. Identify injuries, receive a personalized recovery plan, and track progress—all online, without the need for in-person visits.
            </p>
            <Button className="hero-button-primary">
              <a href="/injury-diagnosis">Start Your Virtual Physio Session</a>
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>What is Online Physiotherapy?</h2>
            <p>
              Online physiotherapy (also known as <strong>virtual physio</strong>) is a remote alternative to traditional physiotherapy that allows patients to access expert guidance from anywhere. With AI-driven tools, you can assess injuries, receive a personalized rehab plan, and track your recovery—all without leaving home.
            </p>

            <h2>Why Choose Virtual Physiotherapy?</h2>
            <ul>
              <li><strong>Convenient & Accessible:</strong> Get rehab support anywhere, anytime—no clinic appointments required.</li>
              <li><strong>AI-Powered Diagnosis:</strong> Identify your injury with AI and receive a personalized rehab plan instantly.</li>
              <li><strong>Cost-Effective:</strong> Save money by avoiding expensive clinic visits while still receiving expert care.</li>
            </ul>

            <h2>How AI-Powered Online Physiotherapy Works</h2>
            <ul>
              <li><strong>Step 1:</strong> Describe your injury or symptoms in our <a href="/injury-diagnosis">AI Diagnosis Tool</a>.</li>
              <li><strong>Step 2:</strong> Receive a customized rehabilitation plan based on your condition.</li>
              <li><strong>Step 3:</strong> Follow interactive exercises and track progress over time.</li>
              <li><strong>Step 4:</strong> Adjust treatment plans as needed with AI-driven updates.</li>
            </ul>

            <h2>Who Can Benefit from Online Physiotherapy?</h2>
            <ul>
              <li>People recovering from injuries who need structured, guided rehabilitation.</li>
              <li>Individuals with chronic pain conditions who require ongoing physiotherapy.</li>
              <li>Athletes and fitness enthusiasts looking to prevent injuries with prehab.</li>
              <li>Busy professionals and remote workers who need flexible rehab options.</li>
            </ul>

            <h2>Start Your Virtual Physiotherapy Journey Today</h2>
            <p>
              AI-powered online physiotherapy gives you the tools to recover, strengthen, and prevent injuries—all from home.
            </p>
            <Button className="hero-button-primary">
              <a href="/injury-diagnosis">Start Your Virtual Physio Session</a>
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

export default OnlinePhysiotherapy;