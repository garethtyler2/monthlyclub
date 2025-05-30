"use client";

import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const AITrackProgress = () => {
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
              How Does AI Track Progress in Personal Training?
            </h1>

            <div className="prose prose-blue max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Learn how AI monitors and analyzes your fitness journey to keep you on track toward achieving your goals.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>AI in Progress Tracking</h2>
              <p>
                AI transforms the way progress is tracked in personal training by using advanced analytics to provide real-time feedback, highlight improvements, and identify areas that need attention. 
              </p>

              <h2>How AI Tracks Progress</h2>
              <ul>
                <li><strong>Workout Performance</strong>: Tracks metrics like completed sets, reps, and weights lifted.</li>
                <li><strong>Fitness Metrics</strong>: Monitors cardio improvements such as heart rate, VO2 max, and running speed.</li>
                <li><strong>Goal Achievement</strong>: Compares current progress against initial goals and milestones.</li>
              </ul>

              <h2>Personalized Insights</h2>
              <p>
                AI doesn’t just track numbers—it provides actionable insights, helping you adjust your workouts, focus on weaker areas, and prevent overtraining.
              </p>

              <h2>Stay Motivated</h2>
              <p>
                Progress tracking keeps you motivated by showing how far you’ve come and highlighting the positive changes in your fitness journey.
              </p>

              <h2>Start Tracking Your Progress</h2>
              <p>
                Use our AI-powered personal training tool to create your plan and start monitoring your progress today.
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

export default AITrackProgress;