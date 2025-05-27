"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const VirtualPhysioFAQ = () => {
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
              Virtual Physiotherapy FAQ: Everything You Need to Know
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Have questions about <strong>virtual physiotherapy</strong>? Find answers to the most <strong>common concerns</strong> about online physiotherapy, AI-powered rehab, and its effectiveness.
            </p>

            <Button className="hero-button-primary">
              <a href="/injury-diagnosis">Start Your Virtual Physio Session</a>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="faq1">
                <AccordionTrigger>Is online physiotherapy as effective as in-person treatment?</AccordionTrigger>
                <AccordionContent>
                  Yes! <strong>Research shows that virtual physiotherapy</strong> can be just as effective as in-person treatment for many conditions. AI-powered rehab provides <strong>personalized recovery plans, guided exercises, and progress tracking</strong> to ensure optimal results.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq2">
                <AccordionTrigger>What conditions can be treated with virtual physiotherapy?</AccordionTrigger>
                <AccordionContent>
                  Virtual physiotherapy can treat <strong>muscle strains, joint pain, back pain, post-surgery rehab, and sports injuries</strong>. AI-powered platforms analyze symptoms and tailor exercises to match your recovery needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq3">
                <AccordionTrigger>How does AI-powered physiotherapy work?</AccordionTrigger>
                <AccordionContent>
                  AI physiotherapy works by <strong>analyzing your symptoms, recommending a tailored rehab plan, and tracking your progress</strong>. The system adapts your exercises over time, ensuring a <strong>personalized and effective recovery process</strong>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq4">
                <AccordionTrigger>Do I need special equipment for virtual physiotherapy?</AccordionTrigger>
                <AccordionContent>
                  Most virtual physiotherapy programs require <strong>minimal equipment</strong>—such as a yoga mat, resistance bands, or foam rollers. AI Rehab <strong>customizes your rehab plan</strong> based on the equipment you have available.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq5">
                <AccordionTrigger>Is virtual physiotherapy covered by insurance?</AccordionTrigger>
                <AccordionContent>
                  Coverage for virtual physiotherapy <strong>varies by provider and country</strong>. Some insurance plans <strong>recognize AI-powered rehab programs</strong>, so it's best to check with your provider.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900 text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="mb-6">
              Try AI-powered virtual physiotherapy today and experience <strong>personalized rehab from anywhere</strong>.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/injury-diagnosis">Start Your Virtual Physio Session</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VirtualPhysioFAQ;