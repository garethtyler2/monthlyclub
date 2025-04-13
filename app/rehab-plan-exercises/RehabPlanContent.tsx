"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Dumbbell, CalendarDays } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export default function RehabPlanExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [weekPlan, setWeekPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useSearchParams(); // ✅ Grab search params
  const injury = params.get("injury"); // ✅ Available in JSX and fetch logic

  useEffect(() => {
    async function fetchData() {
      if (!injury) return;

      try {
        const [exercisesRes, weekPlanRes] = await Promise.all([
          fetch("/api/ai/exercise-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ injury }),
          }),
          fetch("/api/ai/rehab-week-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ injury }),
          }),
        ]);

        const exercisesData = await exercisesRes.json();
        const weekPlanData = await weekPlanRes.json();

        setExercises(exercisesData.data?.exercises || []);
        setWeekPlan(weekPlanData.data?.weekPlan || []);
      } catch (err) {
        console.error("Failed to fetch AI data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    
  }, [injury]);

  if (loading) return <LoadingOverlay show message="Generating full rehab plan..." />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Rehab Plan for {injury}</h1>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Here's a list of recommended exercises and a full week rehab program to help recover from {injury?.toLowerCase()}.
        </p>
      </div>

      {/* Top 6 Exercises */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Dumbbell size={20} /> Top Rehab Exercises
        </div>
        <div className="space-y-4">
          {exercises.map((ex: any, i: number) => (
            <div key={i} className="border rounded-xl p-4 bg-muted">
              <h4 className="text-lg font-semibold">{ex.name}</h4>
              <p className="text-sm mt-1">💪 {ex.description}</p>
              <p className="text-sm mt-1">Reps: {ex.reps}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 7-Day Weekly Plan */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <CalendarDays size={20} /> 7-Day Rehab Plan
        </div>
        <div className="space-y-6">
          {weekPlan.map((day: any, i: number) => (
            <div key={i} className="border rounded-xl p-4 bg-muted">
              <h3 className="text-lg font-semibold mb-2">{day.day}</h3>

              {/* Warmup */}
              {day.warmup && day.warmup.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold">🔄 Warmup</h4>
                  <div className="space-y-2 mt-1">
                    {day.warmup.map((item: any, idx: number) => (
                      <div key={idx} className="text-sm border rounded p-3 bg-background">
                        <p><strong>{item.name}</strong></p>
                        <p>📋 {item.instructions}</p>
                        <p>⏱️ Duration: {item.duration}</p>
                        {item.notes && <p>🧠 {item.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exercises */}
              {day.exercises && day.exercises.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold">💪 Main Exercises</h4>
                  <div className="space-y-2 mt-1">
                    {day.exercises.map((ex: any, idx: number) => (
                      <div key={idx} className="text-sm border rounded p-3 bg-background">
                        <p><strong>{ex.name}</strong></p>
                        <p>📋 {ex.instructions}</p>
                        <p>🔁 {ex.reps} reps x {ex.sets} sets</p>
                        {ex.notes && <p>🧠 {ex.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cooldown */}
              {day.cooldown && day.cooldown.length > 0 && (
                <div className="mb-2">
                  <h4 className="font-semibold">🧘 Cooldown</h4>
                  <div className="space-y-2 mt-1">
                    {day.cooldown.map((item: any, idx: number) => (
                      <div key={idx} className="text-sm border rounded p-3 bg-background">
                        <p><strong>{item.name}</strong></p>
                        <p>📋 {item.instructions}</p>
                        <p>⏱️ Duration: {item.duration}</p>
                        {item.notes && <p>🧠 {item.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
