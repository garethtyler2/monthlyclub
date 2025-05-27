"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/Header";

const AiPoweredPrehabPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-6 py-16 max-w-5xl text-center">
        {/* Page Header */}
        <section>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What is AI-Powered Prehabilitation?
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
            Discover how AI is enhancing prehabilitation by tailoring injury prevention strategies, exercises, and recovery plans to individual needs.
          </p>
        </section>

        {/* Content Section */}
        <section className="text-left">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Introduction to AI in Prehabilitation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Prehabilitation, or prehab, focuses on strengthening your body and addressing potential weaknesses before an injury occurs or a planned surgery takes place.
            By utilizing AI technology, prehab is taken to a whole new level with personalized insights, data-driven strategies, and recommendations tailored to your unique physical profile.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Key Benefits of AI in Prehab
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>
              Analyzes your physical condition to identify areas of risk.{" "}
              <Link href="/ai-rehab-insights/ai-prehabilitation/how-does-ai-analyze-your-prehab-needs" className="text-blue-600 dark:text-blue-400 underline">
                Learn more about AI analysis
              </Link>
              .
            </li>
            <li>
              Customizes exercise plans to prepare your body effectively.{" "}
              <Link href="/ai-rehab-insights/ai-prehabilitation/prehab-exercises-tailored-by-ai" className="text-blue-600 dark:text-blue-400 underline">
                Explore tailored exercises
              </Link>
              .
            </li>
            <li>Tracks progress to ensure optimal results over time.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Why Prehab Matters
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Engaging in prehab reduces the likelihood of injuries, enhances performance, and speeds up recovery after surgeries or intense physical activity.
            With AI, you can maximize the benefits by targeting specific areas that need attention based on comprehensive analysis and recommendations.{" "}
            <Link href="/ai-rehab-insights/ai-prehabilitation/how-can-ai-help-prevent-injuries" className="text-blue-600 dark:text-blue-400 underline">
              Find out how AI prevents injuries
            </Link>{" "}
            or{" "}
            <Link href="/ai-rehab-insights/ai-prehabilitation/is-ai-prehabilitation-effective-for-surgery-prep" className="text-blue-600 dark:text-blue-400 underline">
              how it supports surgery prep
            </Link>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Start Your AI-Powered Prehab Journey
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Take the first step toward a stronger, injury-free you with our AI-driven prehabilitation tool.
          </p>
          <Button>
            <Link href="/prehab">Try the Prehab Tool</Link>
          </Button>
        </section>
      </main>
    </div>
  );
};

export default AiPoweredPrehabPage;