"use client";

import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const AIFitnessGoalEffectiveness = () => {
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
              Is AI Personal Training Effective for Specific Fitness Goals?
            </h1>

            <div className="prose prose-blue max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Explore how AI personal training can help you achieve your unique fitness goals, from weight loss to muscle gain and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>Tailored Solutions for Every Goal</h2>
              <p>
                AI-powered personal training is designed to adapt to your specific goals, offering plans that align with what you want to achieve. Whether you're aiming for weight loss, building muscle, improving endurance, or enhancing flexibility, AI can guide you every step of the way.
              </p>

              <h2>Weight Loss</h2>
              <p>
                AI can create a combination of calorie-burning workouts, HIIT routines, and steady-state cardio sessions based on your current fitness level and target weight.
              </p>

              <h2>Muscle Gain</h2>
              <p>
                For those focusing on muscle gain, AI personal training designs strength training programs that balance volume, intensity, and recovery to maximize growth.
              </p>

              <h2>Endurance and Stamina</h2>
              <p>
                If your goal is to improve endurance, AI can craft plans that gradually increase intensity, including running programs, cycling sessions, or swimming routines.
              </p>

              <h2>Flexibility and Mobility</h2>
              <p>
                Enhance your flexibility and mobility with AI-driven yoga and stretching routines tailored to your abilities and problem areas.
              </p>

              <h2>Personalized for You</h2>
              <p>
                AI ensures your plan evolves as you progress, providing recommendations and adjustments to keep you on track toward achieving your goals.
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
                  <h3 className="text-lg font-semibold mb-2">How Does AI Track Progress?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Learn how real-time data helps AI fine-tune your plan for maximum results.
                  </p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-personal-training/how-does-ai-track-progress-in-training" className="flex items-center">
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

export default AIFitnessGoalEffectiveness;