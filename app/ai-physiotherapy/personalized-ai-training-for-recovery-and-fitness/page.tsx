"use client";

import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PersonalizedAITraining = () => {
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
              Personalized AI Training for Recovery and Fitness
            </h1>

            <div className="prose prose-blue max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                Discover how AI can guide you through personalized training plans that enhance recovery, prevent injuries, and help you achieve your fitness goals—whether it's weight loss, muscle gain, or improved endurance.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
              <h2>How AI Personalizes Your Training</h2>
              <p>
                AI takes the guesswork out of fitness and recovery by analyzing your goals, physical condition, and recovery progress to create a plan that’s uniquely yours. Whether you’re recovering from an injury or striving for peak fitness, AI adapts to your journey.
              </p>
              <ul>
                <li><strong>Tailored Fitness Plans:</strong> Get workouts customized to your recovery needs and fitness goals. <a href="/ai-personal-training">Try Personalized Training</a>.</li>
                <li><strong>Integrated Recovery:</strong> Combine fitness with rehab exercises to strengthen injury-prone areas. <a href="/ai-physical-rehabilitation/personalized-rehab-plans">Explore Rehab Plans</a>.</li>
                <li><strong>Dynamic Adjustments:</strong> AI evolves your plan as you progress, ensuring continual improvement.</li>
              </ul>

              <h2>Why Choose AI for Training and Recovery?</h2>
              <p>AI-powered training offers unique advantages over traditional methods:</p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Goal-Specific Plans</h3>
                    <p>Whether it’s recovery, weight loss, muscle gain, or endurance, AI creates workouts tailored to your goals.</p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Rehab-Focused Training</h3>
                    <p>Combine recovery exercises with fitness to safely rebuild strength and prevent reinjury.</p>
                  </CardContent>
                </Card>
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Ongoing Support</h3>
                    <p>AI monitors your progress and adjusts your plan to keep you on track and motivated.</p>
                  </CardContent>
                </Card>
              </div>

              <h2>Who Can Benefit from AI Training?</h2>
              <p>Personalized AI training plans are perfect for:</p>
              <ul>
                <li>Individuals recovering from injuries who want to safely rebuild strength. <a href="/ai-physical-rehabilitation/personalized-rehab-plans">Explore Rehab Plans</a>.</li>
                <li>Fitness enthusiasts looking to optimize performance and prevent injuries. <a href="/ai-prehabilitation/how-can-ai-help-prevent-injuries">Learn about Injury Prevention</a>.</li>
                <li>Anyone with specific fitness goals like weight loss or muscle gain.</li>
              </ul>

              <h2>Achieve Your Goals with AI Training</h2>
              <p>
                Start your personalized training plan today and combine recovery with fitness for lasting results. Let AI guide you to success.
              </p>
              <Button className="hero-button-primary mt-4">
                <a href="/ai-personal-training">Start Your Training Plan</a>
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
                  <h3 className="text-lg font-semibold mb-2">What is AI-Powered Personal Training?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Learn how AI creates tailored workouts and real-time fitness adjustments.</p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-personal-training/what-is-ai-powered-personal-training" className="flex items-center">Read more <ArrowRight className="ml-1 h-4 w-4" /></a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">How Can AI Optimize Training Results?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Explore how AI helps you train smarter, not harder, with live feedback.</p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-personal-training/how-can-ai-help-optimize-training-results" className="flex items-center">Read more <ArrowRight className="ml-1 h-4 w-4" /></a>
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Is AI Effective for Specific Fitness Goals?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">See how AI adapts to your fitness targets like fat loss or muscle building.</p>
                  <Button variant="secondary" className="p-0 h-auto">
                    <a href="/ai-personal-training/is-ai-effective-for-specific-fitness-goals" className="flex items-center">Read more <ArrowRight className="ml-1 h-4 w-4" /></a>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Button variant="secondary">
                <a href="/ai-rehab-insights">View all rehab topics</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PersonalizedAITraining;