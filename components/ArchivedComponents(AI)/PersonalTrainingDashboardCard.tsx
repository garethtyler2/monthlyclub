"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PersonalTrainingPlanCard {
  id: string;
  title: string;
  subtitle: string;
  url: string;
}

interface PersonalTrainingDashboardProps {
  plans: PersonalTrainingPlanCard[];
}

export default function PersonalTrainingDashboard({ plans }: PersonalTrainingDashboardProps) {
  const router = useRouter();

  if (plans.length === 0) {
    return (
      <div className="text-center mb-10 animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4">No personal training plans yet</h2>
        <p className="text-muted-foreground mb-6">
          Ready to build your personalised workout program?
        </p>
        <Button onClick={() => router.push("/personal-training")}>
          Start a Training Plan
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-6 max-w-2xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="border rounded-xl overflow-hidden animate-fade-in border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent p-4 flex flex-col min-w-[200px] relative"
        >
          <div className="flex justify-between items-start gap-2 mb-1">
            <div className="font-semibold text-md text-white">{plan.title}</div>
          </div>

          {plan.subtitle && (
            <div className="text-gray-500 text-sm mb-3">{plan.subtitle}</div>
          )}

          <div className="flex gap-2 mt-auto self-start">
            <Button
              className="hero-button-primary"
              size="sm"
              onClick={() => router.push(plan.url)}
            >
              View Training Plan
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}