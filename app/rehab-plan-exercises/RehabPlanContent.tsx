"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Dumbbell, CalendarDays } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function RehabPlanExercisesPage() {
  const [exercises, setExercises] = useState<any[]>([])
  const [weekPlan, setWeekPlan] = useState<any[]>([])
  const [loading, setLoading] = useState(true);

  const params = useSearchParams();
  const injuryName = params.get("injury");
  const complaintId = params.get("complaintId");
  console.log("🧪 injury param:", injuryName)
  console.log("🧪 complaintId param:", complaintId)
  useEffect(() => {
    async function fetchData() {
      if (!injuryName || !complaintId) return;

      setLoading(true);

      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError) {
      console.error("❌ Failed to fetch user from Supabase:", authError)
      }

      if (!user) {
      console.warn("⚠️ No user found — not logged in?")
      return
      }

      console.log("✅ Logged in user:", user.id)

      // Get context (summary_label)
      const { data: complaint } = await supabase
        .from("primary_complaints")
        .select("summary_label")
        .eq("id", complaintId)
        .single();

      const summary = complaint?.summary_label;

      // 1. Check if rehab plan already exists
      const { data: plan } = await supabase
        .from("rehab_plans")
        .select("*")
        .eq("injury_name", injuryName)
        .eq("context_summary", summary)
        .single();

      if (plan) {
        // Fetch structured_sessions & exercises
        const { data: sessions } = await supabase
          .from("structured_sessions")
          .select("*")
          .eq("rehab_plan_id", plan.id);

        const sessionIds = sessions?.map((s) => s.exercise_ids).flat() || [];

        const { data: exerciseData } = await supabase
          .from("exercises")
          .select("*")
          .in("id", sessionIds);

        // Save link to user_rehab_instances
        await supabase.from("user_rehab_instances").insert({
          user_id: user.id,
          primary_complaint_id: complaintId,
          rehab_plan_id: plan.id,
          context_summary: summary,
        });

        setExercises(exerciseData || []);
        setWeekPlan(plan.week_plan ? JSON.parse(plan.week_plan) : []);
        setLoading(false);
        return;
      }

      // 2. If not cached, call OpenAI
      try {
        console.log("🟡 Calling AI for exercises and week plan...")
        const [exercisesRes, weekPlanRes] = await Promise.all([
          fetch("/api/ai/exercise-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ injury: injuryName }),
          }),
          fetch("/api/ai/rehab-week-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ injury: injuryName }),
          }),
        ]);

        const exercisesData = await exercisesRes.json();
        const weekPlanData = await weekPlanRes.json();

        const newExercises = exercisesData.data?.exercises || [];
        const newWeekPlan = weekPlanData.data?.weekPlan || [];

        // Save each exercise (if not already)
        const savedExercises = [];
        for (const ex of newExercises) {
          const { data: existing } = await supabase
            .from("exercises")
            .select("*")
            .eq("name", ex.name)
            .single();

          if (existing) {
            savedExercises.push(existing);
            continue;
          }

          const { data: inserted } = await supabase
            .from("exercises")
            .insert({
              name: ex.name,
              description: ex.description,
            })
            .select()
            .single();

          savedExercises.push(inserted);
        }

        // Save to rehab_plans
        const { data: savedPlan } = await supabase
          .from("rehab_plans")
          .insert({
            injury_name: injuryName,
            context_summary: summary,
            type: "ai",
            duration: 7,
            notes: "",
            week_plan: newWeekPlan,
          })
          .select()
          .single();

        // Link exercises to this injury context
        for (const ex of savedExercises) {
          await supabase.from("exercise_injury_links").insert({
            injury_name: injuryName,
            context_summary: summary,
            exercise_id: ex.id,
            rank: 1, // placeholder rank
          });
        }

        // Save structured sessions (optional breakdown)
        await supabase.from("structured_sessions").insert([
          {
            rehab_plan_id: savedPlan.id,
            day_number: 1,
            exercise_ids: savedExercises.map((ex) => ex.id),
          },
        ]);

        // Link to user
        await supabase.from("user_rehab_instances").insert({
          user_id: user.id,
          primary_complaint_id: complaintId,
          rehab_plan_id: savedPlan.id,
          context_summary: summary,
        });

        setExercises(newExercises);
        setWeekPlan(newWeekPlan);
      } catch (err) {
        console.error("Failed to fetch AI data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [injuryName, complaintId]);

  if (loading) return <LoadingOverlay show message="Generating full rehab plan..." />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Rehab Plan for {injuryName}</h1>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Here's a list of recommended exercises and a full week rehab program to help recover from{" "}
          {injuryName?.toLowerCase()}.
        </p>
      </div>

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exercises">Top Exercises</TabsTrigger>
          <TabsTrigger value="week">7-Day Plan</TabsTrigger>
        </TabsList>

        {/* Tab 1: Top Exercises */}
        <TabsContent value="exercises">
          <Card className="p-5 space-y-4 mt-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Dumbbell size={20} /> Rehab Exercises
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
        </TabsContent>

        {/* Tab 2: Week Plan */}
        <TabsContent value="week">
          <Card className="p-5 space-y-4 mt-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
