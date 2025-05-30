"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const AiPrehabAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-6 py-16 max-w-5xl text-center">
        {/* Page Header */}
        <section>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            How Does AI Analyze Your Prehab Needs?
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
            Discover the cutting-edge technology behind AI's ability to assess your prehabilitation needs and design personalized plans.
          </p>
        </section>

        {/* Content Section */}
        <section className="text-left">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">The Process of AI Analysis</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            AI analyzes a variety of data points to provide a comprehensive understanding of your physical condition. This includes factors such as your medical history, activity levels, and specific goals. By processing this information, AI identifies areas that need improvement and designs a tailored prehab plan.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Key Data Points AI Considers</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>Medical history and existing conditions.</li>
            <li>Muscle imbalances and physical weaknesses.</li>
            <li>Mobility and flexibility levels.</li>
            <li>Goals such as injury prevention, surgical preparation, or performance improvement.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">How AI Designs a Tailored Plan</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Once the data is analyzed, AI uses advanced algorithms to recommend specific exercises and routines. For example:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>Strength-building exercises to address weak muscle groups.</li>
            <li>Flexibility drills to improve range of motion.</li>
            <li>Balance training to enhance stability and prevent falls.</li>
            <li>Progress tracking to ensure your goals are being met over time.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            AI ensures that your prehab plan evolves based on your progress and feedback, making it a dynamic and responsive tool.{" "}
            <a href="/ai-prehabilitation/prehab-exercises-tailored-by-ai" className="text-blue-600 dark:text-blue-400 underline">
              Learn more about tailored exercises
            </a>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Start Your AI-Driven Prehab Journey</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Experience the benefits of personalized prehabilitation by letting AI analyze your unique needs.
          </p>
          <Button className="hero-button-primary">
            <a href="/prehab">Try the Prehab Tool</a>
          </Button>
        </section>
      </main>
    </div>
  );
};

export default AiPrehabAnalysisPage;