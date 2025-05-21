"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

type PersonalTrainingPlan = {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  exercises: {
    day: string;
    name: string;
    exercises: {
      name: string;
      sets: string;
      reps: string;
      instructions: string;
    }[];
  }[];
  created_at: string;
};

export default function PersonalTrainingPlan() {
  const [plan, setPlan] = useState<PersonalTrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");

  useEffect(() => {
    if (!planId) return;

    const fetchPlan = async () => {
      const { data, error } = await supabase
        .from("personal_training_plans")
        .select("*")
        .eq("id", planId)
        .single();

      if (error) {
        toast({
          title: "Failed to load training plan",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setPlan(data);
      }

      setIsLoading(false);
    };

    fetchPlan();
  }, [planId]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-red-500">
        Unable to load the personal training plan.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-3">
      <h1 className="text-3xl text-center font-bold mb-2">
        {plan.title || "Your Personal Training Plan"}
      </h1>

      <p className="text-muted-foreground text-center mb-6">{plan.summary}</p>

      <Card className="mb-4">
        <CardContent>
          <p className="text-muted-foreground mt-4 text-sm text-center">
            This plan is structured for your goals. Adjust intensity as needed and stay consistent. If discomfort arises, adapt or skip exercises as necessary.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {plan.exercises?.map((block, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl font-bold">{block.day}: {block.name}</h2>
            <div className="space-y-2">
              {block.exercises.map((ex, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl overflow-hidden border-brand-indigo/20 bg-gradient-to-b from-brand-indigo/10 to-transparent p-4 flex flex-col min-w-[200px] relative space-y-2"
                >
                  <h3 className="text-lg font-semibold">{ex.name}</h3>
                  <p><strong>Sets:</strong> {ex.sets}</p>
                  <p><strong>Reps:</strong> {ex.reps}</p>
                  <p><strong>Instructions:</strong> {ex.instructions}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-10" />
    </div>
  );
}