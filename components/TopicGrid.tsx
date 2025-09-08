"use client";

import React from "react";
import TopicCard from "@/components/TopicCard";
import { Briefcase, Globe } from "lucide-react";

const TopicGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <TopicCard
        id="getting-started"
        title="Getting Started"
        description="Understand how service subscriptions work, tools available, and how to launch your plan."
        icon={<Briefcase className="h-6 w-6 text-brand-purple" />}
        subtopics={[
          { id: "what-is-a-service-subscription", title: "What is a Service Subscription?", description: "Understand the core concept and why it works." },
          { id: "pricing-subscription-plans-service-business", title: "Pricing Your Subscription Plans", description: "Models, anchors, payment days, and example pricing tables." },
          { id: "subscription-launch-checklist", title: "Subscription Launch Checklist", description: "From idea to your first 10 subscribers." },
          { id: "balance-builder-subscriptions-guide", title: "Balance Builder (Prepaid Credit)", description: "When to use it, how to price it, and how to message it." },
          { id: "create-subscription-plan", title: "Create a Subscription Plan", description: "Step-by-step guide to setting up your first plan." },
          { id: "recurring-revenue-benefits", title: "Benefits of Recurring Revenue", description: "Discover the business value of predictable income." },
          { id: "how-monthly-club-helps", title: "How Monthly Club Helps", description: "See how we remove the admin and tech headaches." },
          { id: "subscription-billing-tools", title: "Subscription Billing Tools", description: "Overview of popular billing platforms." },
          { id: "automate-payments-stripe", title: "Automating Payments with Stripe", description: "How Monthly Club uses Stripe behind the scenes." },
        ]}
        color="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900"
      />

      <TopicCard
        id="use-cases"
        title="Use Cases & Inspiration"
        description="Explore examples, industries, and strategies to inspire your own setup."
        icon={<Globe className="h-6 w-6 text-blue-600" />}
        subtopics={[
          { id: "service-subscription-examples", title: "Service Subscription Examples", description: "Real examples of Monthly Club users." },
          { id: "subscription-ideas-for-service-businesses", title: "Subscription Ideas for Service Businesses", description: "Inspiration from five unique industries." },
          { id: "marketing-subscription-services", title: "Marketing Subscription Services", description: "Promote your plans to local customers." },
        ]}
        color="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900"
      />
    </div>
  );
};

export default TopicGrid;