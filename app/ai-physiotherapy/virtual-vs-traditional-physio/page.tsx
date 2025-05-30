"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const VirtualVsTraditionalPhysio = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-950">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <a
              href="/ai-rehab-insights"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mb-4 inline-block"
            >
              ← Back to the hub
            </a>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Virtual Physiotherapy vs. Traditional Physio: Which One is Right for You?
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              Is <strong>online physiotherapy</strong> as effective as in-person treatment? Learn the <strong>key differences, benefits, and limitations</strong> of <strong>virtual physio</strong> vs. <strong>traditional physiotherapy</strong> so you can make an informed decision.
            </p>
            <Button className="hero-button-primary">
              <a href="/injury-diagnosis">Try AI-Powered Virtual Physiotherapy</a>
            </Button>
          </div>
        </section>

        {/* What is Virtual Physiotherapy */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">What is Virtual Physiotherapy?</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Virtual physiotherapy</strong> (also known as <strong>online physio or telehealth physiotherapy</strong>) allows patients to receive <strong>physiotherapy assessments, treatment plans, and exercises remotely</strong> via AI-powered tools. Instead of in-person visits, patients <strong>use digital platforms</strong> to diagnose injuries, follow personalized rehab exercises, and track recovery progress.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Virtual vs. Traditional Physiotherapy: Key Differences</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-200 dark:border-gray-700 text-left">
                <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white">
                  <tr>
                    <th className="p-4 font-semibold">Feature</th>
                    <th className="p-4 font-semibold">Virtual Physiotherapy</th>
                    <th className="p-4 font-semibold">Traditional Physiotherapy</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium">Accessibility</td>
                    <td className="p-4">Available from anywhere, anytime</td>
                    <td className="p-4">Requires in-person appointments</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium">Diagnosis & Treatment</td>
                    <td className="p-4">AI-powered injury detection & personalized rehab plans</td>
                    <td className="p-4">Physiotherapist manually assesses & prescribes treatment</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium">Cost</td>
                    <td className="p-4">More affordable, no travel expenses</td>
                    <td className="p-4">Higher cost per session, potential insurance fees</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium">Personalization</td>
                    <td className="p-4">Adaptive AI modifies treatment based on progress</td>
                    <td className="p-4">Physiotherapist adjusts treatment during visits</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium">Best For</td>
                    <td className="p-4">People seeking affordable, accessible, structured rehab</td>
                    <td className="p-4">People with complex injuries requiring hands-on therapy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Why Choose Virtual Physiotherapy?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">100% Remote Access</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Get rehab exercises, recovery tracking, and AI-powered assessments <strong>without clinic visits</strong>.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">More Affordable</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Save money by avoiding expensive <strong>one-on-one physiotherapy</strong> sessions.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">AI-Powered Personalization</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  AI adapts your exercises <strong>as you progress</strong>, ensuring an optimized rehab plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Is Virtual Physiotherapy Right for You?</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Virtual physio is <strong>ideal for people who:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Have minor to moderate injuries that <strong>don’t require hands-on treatment</strong>.</li>
              <li>Want <strong>affordable rehab</strong> without expensive clinic visits.</li>
              <li>Prefer <strong>on-demand physiotherapy</strong> instead of fixed appointment times.</li>
              <li>Need <strong>injury prevention or prehab programs</strong> for sports or fitness.</li>
            </ul>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              However, <strong>traditional physiotherapy</strong> is recommended for individuals with <strong>severe injuries, post-surgical rehab, or conditions requiring hands-on manipulation</strong>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Start Virtual Physiotherapy Today</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              AI-powered online physiotherapy gives you <strong>instant access</strong> to injury diagnosis and guided rehab.
            </p>
            <Button className="hero-button-primary mt-4">
              <a href="/injury-diagnosis">Try Virtual Physiotherapy Now</a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VirtualVsTraditionalPhysio;