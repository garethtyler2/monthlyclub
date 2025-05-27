"use client";

import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Flame, Sparkles } from 'lucide-react';

const AIPersonalizedWorkouts = () => {
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
              Examples of AI-Personalized Workouts
            </h1>

            <div className="prose prose-blue max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Discover how AI tailors workout routines to suit your fitness level, goals, and preferences.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>AI-Driven Workout Customization</h2>
              <p>
                AI uses your inputs—such as fitness level, available equipment, and workout goals—to create highly specific and effective routines. Below are some examples of how workouts can be personalized.
              </p>

              <h2>Example 1: Beginner Home Workout</h2>
              <p>For a beginner looking to work out at home with no equipment, AI might suggest:</p>
              <ul>
                <li>Warm-up: 5 minutes of dynamic stretching</li>
                <li>Workout: Bodyweight squats, wall push-ups, and glute bridges (3 sets of 10 reps each)</li>
                <li>Cool-down: 5 minutes of static stretching</li>
              </ul>

              <h2>Example 2: Advanced Gym Session</h2>
              <p>For an experienced gym-goer focusing on strength training, AI might suggest:</p>
              <ul>
                <li>Warm-up: 10 minutes of light cardio and mobility exercises</li>
                <li>Workout: Deadlifts, bench press, and barbell rows (4 sets of 8 reps at 75% max weight)</li>
                <li>Cool-down: Foam rolling and static stretches</li>
              </ul>

              <h2>Example 3: Cardio and Weight Loss Plan</h2>
              <p>For someone aiming to lose weight with cardio at the gym:</p>
              <ul>
                <li>Warm-up: 5 minutes of light jogging</li>
                <li>Workout: 20 minutes of HIIT (1 minute sprint, 2 minutes walk, repeat)</li>
                <li>Cool-down: 10 minutes of stretching and breathing exercises</li>
              </ul>

              <h2>Ready to Build Your Personalized Plan?</h2>
              <p>
                Use our AI-powered tool to create a workout tailored to your unique goals and preferences.
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
                  <h3 className="text-lg font-semibold mb-2">Is AI Effective for Fitness Goals?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Learn how AI can help tailor your routine to specific results like muscle gain or fat loss.
                  </p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-rehab-insights/ai-personal-training/is-ai-effective-for-specific-fitness-goals" className="flex items-center">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">How Does AI Track Progress?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Understand how AI monitors progress and adapts your plan based on real-time performance.
                  </p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-rehab-insights/ai-personal-training/how-does-ai-track-progress-in-training" className="flex items-center">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Optimizing Results with AI</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    See how smart algorithms can maximize workout efficiency and recovery.
                  </p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-rehab-insights/ai-personal-training/how-can-ai-help-optimize-training-results" className="flex items-center">
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="mx-auto">
                View all health topics
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AIPersonalizedWorkouts;