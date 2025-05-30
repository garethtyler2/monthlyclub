"use client";

import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const WhatIsAIPersonalTraining = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-950">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="mb-6">
              <a href="/ai-rehab-insights" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                ← Back to the hub
              </a>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-50">
              What is AI-Powered Personal Training?
            </h1>

            <div className="prose prose-blue max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Discover how AI is revolutionizing personal training by delivering tailored plans and real-time adjustments for your fitness journey.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>Introduction to AI-Powered Training</h2>
              <p>
                AI-powered personal training combines advanced machine learning algorithms with fitness data to create highly personalized workout plans. By analyzing your goals, preferences, and physical abilities, AI can design programs that adapt to your unique needs and progress.
              </p>

              <h2>Why Use AI in Personal Training?</h2>
              <p>
                Traditional training often relies on general advice, which may not work for everyone. With AI, your training plan becomes dynamic and adaptable, ensuring every exercise aligns with your current fitness level and long-term objectives.
              </p>

              <ul>
                <li>Personalized recommendations based on your fitness goals.</li>
                <li>Real-time feedback to adjust your workouts as needed.</li>
                <li>Data-driven insights for better performance and injury prevention.</li>
              </ul>

              <h2>How to Get Started</h2>
              <p>
                Begin your AI-powered personal training journey by using our tool to input your preferences and fitness goals. Let AI design a program tailored just for you.
              </p>

              <Button className="hero-button-primary mt-4">
                <a href="/personal-training">Try the Personal Training Tool</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Explore Related Topics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">How Can AI Optimize Training Results?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Unlock your fitness potential with AI-driven adjustments and performance tracking.
                  </p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-personal-training/how-can-ai-help-optimize-training-results" className="flex items-center">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Examples of AI-Personalized Workouts</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    See how AI adapts training routines based on fitness level, goals, and preferences.
                  </p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-personal-training/examples-of-ai-personalized-workouts" className="flex items-center">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Is AI Effective for Fitness Goals?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Discover how AI aligns your plan to specific goals like weight loss or muscle gain.
                  </p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-personal-training/is-ai-effective-for-specific-fitness-goals" className="flex items-center">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button variant="secondary" className="mx-auto">
                <a href="/ai-rehab-insights">View all rehab topics</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WhatIsAIPersonalTraining;