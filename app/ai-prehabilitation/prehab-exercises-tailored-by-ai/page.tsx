"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const TailoredPrehabExercisesPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-6 py-16 max-w-5xl text-center">
        {/* Page Header */}
        <section>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Prehab Exercises Tailored by AI
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Discover how AI customizes prehabilitation exercises to meet your specific needs and help you stay injury-free.
          </p>
        </section>

        {/* Content Section */}
        <section className="text-left">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            How AI Customizes Your Prehab Plan
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            AI technology assesses your physical profile, including strengths, weaknesses, and goals, to create a personalized prehab plan.
            By analyzing data such as movement patterns, flexibility, and muscle imbalances, AI delivers exercises that are specifically
            designed for your needs.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Examples of Tailored Exercises
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Here are some types of exercises AI might recommend based on your profile:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>
              <strong>Strengthening Exercises:</strong> Target weak muscle groups to improve stability and reduce injury risk.
            </li>
            <li>
              <strong>Mobility Drills:</strong> Enhance joint flexibility and range of motion to optimize performance.
            </li>
            <li>
              <strong>Balance Training:</strong> Improve proprioception and reduce the risk of falls or missteps.
            </li>
            <li>
              <strong>Core Stabilization:</strong> Build a strong core to support overall movement and posture.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Why Tailored Exercises Matter
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Generic exercise plans can be helpful, but tailored exercises ensure you address the specific areas that need attention. Whether
            you're recovering from an injury, preparing for surgery, or simply aiming to prevent potential issues, a customized approach is the
            most effective way to achieve your goals.{" "}
            <a href="/ai-prehabilitation/how-can-ai-help-prevent-injuries" className="text-blue-600 dark:text-blue-400 underline">
              Learn more about AI's role in preventing injuries
            </a>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Get Your Personalized Prehab Plan</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Start today with our AI-powered tool and receive exercises tailored specifically for you.
          </p>
          <Button className="hero-button-primary">
            <a href="/prehab">Try the Prehab Tool</a>
          </Button>
        </section>
      </main>
    </div>
  );
};

export default TailoredPrehabExercisesPage;