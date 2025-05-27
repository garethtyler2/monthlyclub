"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const PrehabSurgeryPrepPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <main className="container mx-auto px-6 py-16 max-w-5xl text-center">
        {/* Page Header */}
        <section>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Is AI Prehabilitation Effective for Surgery Prep?
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
            Learn how AI-powered prehabilitation can enhance surgical outcomes and speed up recovery.
          </p>
        </section>

        {/* Content Section */}
        <section className="text-left">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            The Importance of Prehabilitation Before Surgery
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Preparing for surgery is just as important as the recovery process. Prehabilitation, or prehab, involves strengthening your body and addressing potential weaknesses before surgery to improve post-operative outcomes. With AI, prehab is more efficient and effective, offering personalized strategies that cater to your unique needs.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            How AI Enhances Surgery Preparation
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>Analyzes your physical condition to identify areas needing improvement.</li>
            <li>Designs customized exercises to target weak points and build strength.</li>
            <li>Provides flexibility and mobility routines to improve surgical readiness.</li>
            <li>Tracks your progress to ensure optimal preparation.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Benefits of AI-Powered Prehabilitation for Surgery
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Engaging in AI-driven prehab before surgery has been shown to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-8">
            <li>Reduce the risk of complications during and after surgery.</li>
            <li>Enhance recovery speed and reduce post-operative pain.</li>
            <li>Improve overall surgical outcomes and long-term health.</li>
          </ul>

          <p className="text-gray-700 dark:text-gray-300">
            By using AI, your prehabilitation plan is tailored to your specific surgery type and physical condition.{" "}
            <a href="/ai-rehab-insights/ai-prehabilitation/prehab-exercises-tailored-by-ai" className="text-blue-600 dark:text-blue-400 underline">
              Explore how AI customizes exercises
            </a>
            .
          </p>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Prepare for Surgery with Confidence</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Start your AI-driven prehab journey today and set yourself up for a smoother recovery.
          </p>
          <Button className="hero-button-primary">
            <a href="/prehab">Try the Prehab Tool</a>
          </Button>
        </section>
      </main>
    </div>
  );
};

export default PrehabSurgeryPrepPage;