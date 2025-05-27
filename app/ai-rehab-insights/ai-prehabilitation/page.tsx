"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/Header";

const PrehabHub = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />

      <main className="container max-w-6xl mx-auto px-6 py-16 text-center">
        {/* Page Header */}
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI in Prehabilitation (Injury Prevention)
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Discover how AI is revolutionizing injury prevention through tailored exercises, risk analysis, and surgical preparation support.
            Start exploring the ways AI can help you stay injury-free and optimize your physical readiness.
          </p>
        </section>

        {/* Subtopic Cards */}
        <section className="text-left">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900 dark:text-white">
            Explore Topics in AI Prehabilitation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "What is AI-powered prehabilitation?",
                description: "Learn the basics of prehab and how AI enhances its effectiveness in injury prevention.",
                href: "/ai-prehabilitation/what-is-ai-powered-prehabilitation",
              },
              {
                title: "How can AI help prevent injuries?",
                description: "Discover how AI identifies risks and provides targeted preventative strategies.",
                href: "/ai-prehabilitation/how-can-ai-help-prevent-injuries",
              },
              {
                title: "Prehab exercises tailored by AI",
                description: "Explore how AI customizes exercises to suit your specific needs and goals.",
                href: "/ai-prehabilitation/prehab-exercises-tailored-by-ai",
              },
              {
                title: "Is AI prehabilitation effective for surgery prep?",
                description: "Learn how prehab, powered by AI, enhances surgical outcomes and recovery times.",
                href: "/ai-prehabilitation/is-ai-prehabilitation-effective-for-surgery-prep",
              },
              {
                title: "How does AI analyze your prehab needs?",
                description: "Understand the process AI uses to design personalized prehabilitation plans.",
                href: "/ai-prehabilitation/how-does-ai-analyze-your-prehab-needs",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
                </div>
                <Button asChild className="w-full">
                  <Link href={item.href}>Learn More</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Ready to Prevent Injuries?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Use our AI-powered tools to create a customized prehabilitation plan and reduce your risk of injuries.
          </p>
          <Button asChild>
            <Link href="/prehab">Try the Prehab Tool</Link>
          </Button>
        </section>
      </main>
    </div>
  );
};

export default PrehabHub;