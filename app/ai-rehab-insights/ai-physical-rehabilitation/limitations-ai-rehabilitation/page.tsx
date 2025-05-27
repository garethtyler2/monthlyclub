"use client";

import React from 'react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

const LimitationsAIRehabilitation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-950">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <div className="mb-6">
              <a href="/ai-rehab-insights" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                ← Back to the hub
              </a>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-50">
              Limitations of AI in Rehabilitation
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-prose mx-auto">
              While AI offers transformative potential in rehabilitation, it’s important to recognize its limitations. However, tools like our AI-powered injury diagnosis system demonstrate how technology can complement human expertise. Learn about the challenges and areas where human involvement remains essential.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl prose prose-lg dark:prose-invert space-y-8">
            <h2>Challenges in Implementing AI in Rehabilitation</h2>
            <p>
              AI-powered rehabilitation systems face several challenges that can impact their effectiveness. However, targeted tools like our injury diagnosis system address some of these concerns by combining advanced data analysis with user-friendly accessibility. Here are some of the key issues:
            </p>
            <ul>
              <li><strong>Data Quality:</strong> AI relies on accurate, high-quality data to generate insights. Errors or gaps in data can lead to incorrect recommendations.</li>
              <li><strong>Lack of Personal Interaction:</strong> While AI offers convenience, it cannot replace the empathetic and nuanced care provided by a human therapist.</li>
              <li><strong>Cost of Technology:</strong> Advanced AI tools and wearables can be expensive, limiting accessibility for some users.</li>
              <li><strong>Complexity of Cases:</strong> Some rehabilitation scenarios require human judgment and creativity that AI cannot yet replicate.</li>
            </ul>

            <h2>Where Human Expertise Is Still Essential</h2>
            <p>
              Despite its advancements, AI works best when complemented by human expertise. Here are some areas where human involvement is critical:
            </p>
            <ol>
              <li><strong>Emotional Support:</strong> A therapist’s empathy and encouragement can play a crucial role in a patient’s recovery.</li>
              <li><strong>Complex Diagnoses:</strong> For multifaceted conditions, human expertise is necessary to make nuanced decisions.</li>
              <li><strong>Creative Problem-Solving:</strong> Therapists can adapt to unexpected challenges in ways AI currently cannot.</li>
            </ol>

            <h2>Ethical and Privacy Concerns</h2>
            <p>
              As AI becomes more integrated into rehabilitation, ethical and privacy concerns have come to the forefront:
            </p>
            <ul>
              <li><strong>Data Privacy:</strong> AI systems collect and store sensitive health data, raising concerns about security and compliance with regulations like GDPR.</li>
              <li><strong>Bias in Algorithms:</strong> AI models can unintentionally perpetuate biases if trained on unrepresentative datasets.</li>
              <li><strong>Lack of Transparency:</strong> Many AI tools operate as “black boxes,” making it difficult to understand how they make decisions.</li>
            </ul>

            <h2>Learn More About AI in Physical Rehabilitation</h2>
            <p>
              Want to explore more about how AI is shaping rehabilitation? Check out these related topics:
            </p>
            <ul>
              <li><a href="/ai-rehab-insights/ai-physical-rehabilitation/what-is-ai-physical-rehabilitation">AI in Physical Rehabilitation (Hub Page)</a></li>
              <li><a href="/ai-rehab-insights/ai-physical-rehabilitation/personalized-rehab-plans">How Does AI Create Personalized Rehab Plans?</a></li>
              <li><a href="/ai-rehab-insights/ai-physical-rehabilitation/benefits-ai-physical-therapy">Benefits of AI in Physical Therapy</a></li>
              <li><a href="/ai-rehab-insights/ai-physical-rehabilitation/success-stories-ai-rehabilitation">Success Stories of AI in Rehabilitation</a></li>
            </ul>

            <h2>Discover How AI Can Enhance Your Recovery</h2>
            <p>
              While AI has its limitations, tools like our injury diagnosis system demonstrate its immense potential in rehabilitation. Start your journey by identifying your condition and exploring tailored solutions powered by AI.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/injury-diagnosis">Start with the Injury Diagnosis Tool</a>
            </Button>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 text-center">
          <div className="container mx-auto px-6 max-w-5xl">
            <Button variant="secondary" className="mx-auto">
              <a href="/ai-rehab-insights">View all rehab topics</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LimitationsAIRehabilitation;