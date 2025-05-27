"use client";

import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FutureOfAIPhysiotherapy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-950">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="mb-6">
              <a
                href="/ai-rehab-insights"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                ← Back to the hub
              </a>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-50">
              The Future of AI in Physiotherapy and Fitness
            </h1>

            <div className="prose prose-blue max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Explore how emerging AI technologies will revolutionize physiotherapy and fitness,
                making injury prevention, rehabilitation, and personal training more effective and accessible than ever before.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl space-y-10 prose prose-lg dark:prose-invert">
            <h2>AI Innovations Driving Change</h2>
            <ul>
              <li><strong>Real-Time Motion Tracking:</strong> Advanced AI algorithms analyze your movements to ensure proper form and prevent injuries.</li>
              <li><strong>Wearable Integration:</strong> AI-powered wearables monitor vital signs, mobility, and performance to enhance rehab and training plans.</li>
              <li><strong>Predictive Injury Models:</strong> Machine learning predicts potential injuries based on your activity patterns, helping you take proactive measures. <a href="/prehab">Explore Prehab Tools</a>.</li>
              <li><strong>Telehealth Integration:</strong> Seamless connections between AI tools and healthcare providers for remote physiotherapy guidance.</li>
            </ul>

            <h2>How Emerging AI Benefits Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Enhanced Accuracy</h3>
                  <p>
                    AI-powered diagnostics and tracking tools improve precision, delivering more effective recovery and training results.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Proactive Care</h3>
                  <p>
                    Predictive analytics help you prevent injuries before they occur, reducing downtime and healthcare costs.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Seamless Connectivity</h3>
                  <p>
                    Integration with wearable devices and healthcare providers ensures a holistic approach to recovery and fitness.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2>Preparing for the AI-Driven Future</h2>
            <ul>
              <li>Incorporate AI tools into your daily fitness and recovery routines. <a href="/dashboard">Go to Your Dashboard</a>.</li>
              <li>Leverage wearables to track progress and monitor recovery.</li>
              <li>Stay informed about new features and advancements in AI technology.</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Start Virtual Physiotherapy Today</h2>
            <p className="mb-6">
              AI-powered online physiotherapy gives you <strong>instant access</strong> to injury diagnosis and guided rehab.
              Get started today!
            </p>
            <Button className="hero-button-primary mt-4" asChild>
              <a href="/injury-diagnosis">Try Virtual Physiotherapy Now</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FutureOfAIPhysiotherapy;