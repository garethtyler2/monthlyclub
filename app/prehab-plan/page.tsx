"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Define the type for a rehab plan
type RehabPlan = {
  id: number;
  user_id: string;
  search_term: string;
  summary: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    instructions: string;
    note: string;
  }[];
  created_at: string;
};

export default function PrehabResultsPage() {
  const [plan, setPlan] = useState<RehabPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");


  useEffect(() => {
    if (!planId) return;

    // Fetch the plan data using the ID from the URL
    const fetchPlan = async () => {
      const { data, error } = await supabase
        .from("prehab_plans")
        .select("*")
        .eq("id", planId)
        .single();

      if (error) {
        toast({
          title: "Failed to load plan",
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
        Unable to load the prehab plan.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-4">Your Prehab Plan</h1>
      <p className="text-muted-foreground text-center mb-6">{plan.summary}</p>

      <div className="space-y-6">
        {Array.isArray(plan.exercises) ? plan.exercises.map((exercise, index) => (
          <Card key={index}>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{exercise.name}</h3>
              <p><strong>Sets:</strong> {exercise.sets}</p>
              <p><strong>Reps:</strong> {exercise.reps}</p>
              <p><strong>Instructions:</strong> {exercise.instructions}</p>
              <p className="text-sm text-muted-foreground italic">
                {exercise.note}
              </p>
            </CardContent>
          </Card>
        )) : (
          <p className="text-sm text-destructive">No exercises found for this plan.</p>
        )}
      </div>

      <Separator className="my-10" />
    </div>
  );
}