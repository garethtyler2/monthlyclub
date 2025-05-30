"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const AiInjuryPreventionPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-6 py-16 max-w-5xl text-center">
        {/* Page Header */}
        <section>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How Can AI Help Prevent Injuries?
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
            Learn how AI technology identifies risks, analyzes movement patterns, and provides targeted strategies to help prevent injuries before they occur.
          </p>
        </section>

        {/* Content Section */}
        <section className="text-left">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">AI's Role in Injury Prevention</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Artificial intelligence leverages advanced algorithms and data analysis to assess potential risks and recommend preventative strategies. By analyzing factors such as biomechanics, movement patterns, and lifestyle, AI provides a deeper understanding of your injury risks and offers tailored solutions to address them.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Key Features of AI in Injury Prevention</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-700 dark:text-gray-300 mb-8">
            <li>
              Identifies muscular imbalances and weak points in your body.{" "}
              <a href="/ai-prehabilitation/prehab-exercises-tailored-by-ai" className="text-blue-600 dark:text-blue-400 underline">
                Discover exercises tailored by AI
              </a>
              .
            </li>
            <li>Analyzes movement patterns to detect improper form or stress points.</li>
            <li>
              Provides recommendations for preventative exercises to reduce injury risks.{" "}
              <a href="/ai-prehabilitation/what-is-ai-powered-prehabilitation" className="text-blue-600 dark:text-blue-400 underline">
                Learn how AI enhances prehabilitation
              </a>
              .
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Why Prevention is Better Than Cure</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Preventing injuries not only saves time and effort but also enhances your overall performance and well-being. AI-driven prevention plans are designed to ensure you stay active and injury-free, whether you're preparing for surgery or aiming to improve physical fitness.{" "}
            <a href="/ai-prehabilitation/is-ai-effective-for-surgery-prep" className="text-blue-600 dark:text-blue-400 underline">
              See how AI helps with surgery prep
            </a>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Take Control of Your Injury Prevention</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Start using our AI-powered tools to identify risks and receive a personalized prevention plan today.
          </p>
          <Button className="hero-button-primary">
            <a href="/prehab">Try the Prehab Tool</a>
          </Button>
        </section>
      </main>
    </div>
  );
};

export default AiInjuryPreventionPage;