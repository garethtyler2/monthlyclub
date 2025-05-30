"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const AIPhysiotherapistPage = () => {
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
              Meet Your AI Physiotherapist: Personalized Online Rehab
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto mb-6">
              Experience the future of physiotherapy with <strong>AI-powered rehab.</strong> Identify injuries, receive personalized recovery plans, and track progress—all from the comfort of home.
            </p>
            <Button className="hero-button-primary">
              <a href="/injury-diagnosis">Start AI-Powered Physiotherapy</a>
            </Button>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>What is an AI Physiotherapist?</h2>
            <p>
              An <strong>AI physiotherapist</strong> is an advanced digital system that <strong>analyzes your symptoms, diagnoses injuries, and creates a personalized rehab plan.</strong> Instead of waiting for an in-person consultation, AI-driven rehab technology helps you start your recovery immediately.
            </p>

            <h2>How Does AI-Powered Physiotherapy Work?</h2>
            <p>
              AI physiotherapy leverages <strong>machine learning, movement analysis, and rehabilitation science</strong> to create <strong>customized treatment plans</strong> for each user.
            </p>
            <ul>
              <li><strong>Step 1:</strong> Use the <a href="/injury-diagnosis">AI Injury Diagnosis Tool</a> to input your symptoms.</li>
              <li><strong>Step 2:</strong> AI analyzes your condition and provides a <strong>custom rehab plan</strong>.</li>
              <li><strong>Step 3:</strong> Follow guided <strong>rehab exercises and progress tracking tools</strong>.</li>
              <li><strong>Step 4:</strong> AI adapts your plan based on <strong>mobility, pain levels, and progress</strong>.</li>
            </ul>

            <h2>Why Choose an AI Physiotherapist?</h2>
            <ul>
              <li><strong>Instant Diagnosis:</strong> No waiting lists or appointment delays—<strong>get instant injury analysis</strong> and treatment recommendations.</li>
              <li><strong>Personalized Rehab Plans:</strong> AI tailors recovery programs <strong>to your pain level, mobility, and fitness goals</strong>.</li>
              <li><strong>Progress Tracking:</strong> AI tracks your <strong>strength, flexibility, and pain levels</strong> over time, adjusting your program as needed.</li>
            </ul>

            <h2>Who Should Use an AI Physiotherapist?</h2>
            <ul>
              <li>People with <strong>injuries or chronic pain</strong> who want immediate rehab guidance.</li>
              <li>Those looking for <strong>affordable and accessible physiotherapy.</strong></li>
              <li>Athletes needing <strong>prehab or recovery strategies.</strong></li>
              <li>Anyone wanting <strong>a data-driven, adaptive approach to rehab.</strong></li>
            </ul>

            <h2>AI vs. Human Physiotherapist: What’s the Difference?</h2>
            <table className="table-auto w-full text-left border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-2 border">Feature</th>
                  <th className="p-2 border">AI Physiotherapist</th>
                  <th className="p-2 border">Traditional Physiotherapist</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">Diagnosis Speed</td>
                  <td className="p-2 border">Instant, AI-powered injury detection</td>
                  <td className="p-2 border">Requires appointment scheduling</td>
                </tr>
                <tr>
                  <td className="p-2 border">Cost</td>
                  <td className="p-2 border">More affordable, no clinic fees</td>
                  <td className="p-2 border">Higher cost per session</td>
                </tr>
                <tr>
                  <td className="p-2 border">Customization</td>
                  <td className="p-2 border">AI adapts rehab plans dynamically</td>
                  <td className="p-2 border">Manual adjustments by therapist</td>
                </tr>
                <tr>
                  <td className="p-2 border">Availability</td>
                  <td className="p-2 border">24/7 access to virtual rehab</td>
                  <td className="p-2 border">Limited clinic hours</td>
                </tr>
              </tbody>
            </table>

            <h2>Start AI-Powered Physiotherapy Today</h2>
            <p>
              AI-driven rehab offers <strong>fast, affordable, and adaptive physiotherapy</strong>—on your schedule.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/injury-diagnosis">Start AI Physiotherapy Now</a>
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

export default AIPhysiotherapistPage;