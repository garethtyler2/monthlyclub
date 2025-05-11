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
  const [userRecommended, setUserRecommended] = useState<number[]>([]);
  const [recommendingId, setRecommendingId] = useState<number | null>(null);
  const [injury, setInjury] = useState<string | null>(null);

  const params = useSearchParams();
  const injuryName = params.get("injury");
  const complaintId = params.get("complaintId");
  console.log("🧪 injury param:", injuryName)
  console.log("🧪 complaintId param:", complaintId)

  const dummyWarmupAdvice = "Start with 5-10 minutes of light cardio and dynamic stretches to prepare your body.";
  const dummyCooldownAdvice = "Finish with gentle stretching and deep breathing to aid recovery.";

  useEffect(() => {
    async function fetchData() {
      if (!complaintId) return;

      setLoading(true);

      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError) {
        console.error("❌ Failed to fetch user from Supabase:", authError)
      }

      if (!user) {
        console.warn("⚠️ No user found — not logged in?")
        setLoading(false);
        return
      }

      console.log("✅ Logged in user:", user.id)

      // Check if user already has a rehab instance for this complaint
      const { data: existingInstance } = await supabase
        .from("user_rehab_instances")
        .select("rehab_plan_id")
        .eq("user_id", user.id)
        .eq("complaint_id", complaintId)
        .single();

      if (existingInstance?.rehab_plan_id) {
        const { data: savedPlan } = await supabase
          .from("rehab_plans")
          .select("week_plan, injury_name")
          .eq("id", existingInstance.rehab_plan_id)
          .single();

        if (savedPlan?.injury_name) {
          setInjury(savedPlan.injury_name);
        }

        if (savedPlan?.week_plan) {
          setWeekPlan(savedPlan.week_plan);
          setLoading(false);
          return;
        }
      }

      // Get context (summary_label)
      const { data: complaint } = await supabase
        .from("primary_complaints")
        .select("summary_label")
        .eq("id", complaintId)
        .single();

      const summary = complaint?.summary_label;
      console.log("🛑 Skipping cache check — always calling AI");

      try {
        console.log("🟡 Calling AI for exercises and week plan...")
        const [exercisesRes, weekPlanRes] = await Promise.all([
          fetch("/api/ai/exercise-list", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ injury: injuryName, context: summary }),
          }),
          fetch("/api/ai/rehab-week-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ injury: injuryName, context: summary }),
          }),
        ]);

        const exercisesData = await exercisesRes.json();
        const weekPlanData = await weekPlanRes.json();

        const newExercises = exercisesData.data?.exercises || [];
        const newWeekPlan = weekPlanData.data?.weekPlan || [];

        // Save each exercise from exercisesData (if not already)
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

        // Extract and flatten all exercises from the week plan
        const weekPlanExercisesRaw = newWeekPlan.flatMap((day: any) => day.exercises || []);

        // For each exercise in the week plan, ensure it exists in exercises table
        const weekPlanSavedExercises = [];
        for (const ex of weekPlanExercisesRaw) {
          const { data: existing } = await supabase
            .from("exercises")
            .select("*")
            .eq("name", ex.name)
            .single();

          if (existing) {
            weekPlanSavedExercises.push(existing);
            continue;
          }

          const { data: inserted } = await supabase
            .from("exercises")
            .insert({
              name: ex.name,
              description: ex.instructions || "", // use instructions as description if description missing
            })
            .select()
            .single();

          weekPlanSavedExercises.push(inserted);
        }

        // Combine all saved exercises (from AI exercises and week plan)
        // Use a map keyed by id to avoid duplicates
        const allSavedExercisesMap = new Map<number, any>();
        for (const ex of savedExercises) {
          if (ex && ex.id) allSavedExercisesMap.set(ex.id, ex);
        }
        for (const ex of weekPlanSavedExercises) {
          if (ex && ex.id) allSavedExercisesMap.set(ex.id, ex);
        }
        const allSavedExercises = Array.from(allSavedExercisesMap.values());

        // Fetch user's previous recommendations
        const { data: recommendations } = await supabase
          .from("exercise_recommendations")
          .select("exercise_id")
          .eq("user_id", user.id)
          .eq("injury_name", injuryName);

        if (recommendations) {
          const recommendedIds = recommendations.map((r) => r.exercise_id);
          setUserRecommended(recommendedIds);
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

        // Link all exercises to this injury context if not already linked
        for (const ex of allSavedExercises) {
          const { data: existingLink } = await supabase
            .from("exercise_injury_links")
            .select("*")
            .eq("injury_name", injuryName)
            .eq("context_summary", summary)
            .eq("exercise_id", ex.id)
            .single();

          if (!existingLink) {
            await supabase.from("exercise_injury_links").insert({
              injury_name: injuryName,
              context_summary: summary,
              exercise_id: ex.id,
              rank: 1, // placeholder rank
            });
          }
        }

        // Save structured sessions (optional breakdown)
        await supabase.from("structured_sessions").insert([
          {
            rehab_plan_id: savedPlan.id,
            day_number: 1,
            exercise_ids: allSavedExercises.map((ex) => ex.id),
          },
        ]);

        // Link to user with error logging
        console.log("🧾 Inserting user_rehab_instance with:", {
          user_id: user.id,
          complaint_id: complaintId,
          rehab_plan_id: savedPlan.id,
          context_summary: summary,
        });
        const { error: instanceInsertError } = await supabase
          .from("user_rehab_instances")
          .insert({
            user_id: user.id,
            complaint_id: complaintId,
            rehab_plan_id: savedPlan.id,
            context_summary: summary,
          });

        if (instanceInsertError) {
          console.error("❌ Failed to insert user_rehab_instance:", instanceInsertError);
        }

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

  async function handleRecommend(exerciseId: number) {
    if (!injuryName) return;
    setRecommendingId(exerciseId);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.warn("User not logged in");
      setRecommendingId(null);
      return;
    }

    try {
      // Insert recommendation linking this exercise and injury for this user
      await supabase.from("exercise_recommendations").insert({
        user_id: user.id,
        exercise_id: exerciseId,
        injury_name: injuryName,
      });

      setUserRecommended((prev) => [...prev, exerciseId]);
    } catch (error) {
      console.error("Failed to recommend exercise", error);
    } finally {
      setRecommendingId(null);
    }
  }

  if (loading) return <LoadingOverlay show message="Generating full rehab plan..." />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Rehab Plan for {injury}</h1>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Here's a list of recommended exercises and a full week rehab program to help recover from{" "}
          {injury?.toLowerCase()}.
        </p>
      </div>

      <Tabs defaultValue="week" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="week">7-Day Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="week">
          <Card className="p-5 space-y-4 mt-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <CalendarDays size={20} /> 7-Day Rehab Plan
            </div>

            {/* Global warmup/cooldown cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="p-5 bg-muted/80">
                <h3 className="text-xl font-semibold mb-2">🔄 Before You Start</h3>
                <p className="text-muted-foreground text-sm">{dummyWarmupAdvice}</p>
              </Card>
              <Card className="p-5 bg-muted/80">
                <h3 className="text-xl font-semibold mb-2">🧘 After You Finish</h3>
                <p className="text-muted-foreground text-sm">{dummyCooldownAdvice}</p>
              </Card>
            </div>

            <div className="space-y-6">
              {weekPlan.map((day: any, i: number) => (
                <div key={i} className="border rounded-xl p-4 bg-muted">
                  <h3 className="text-lg font-semibold mb-4">{day.day}</h3>

                  {/* Exercises */}
                  <div className="space-y-4">
                    {day.exercises.map((ex: any, idx: number) => (
                      <div key={idx} className="border rounded p-4 bg-background flex flex-col gap-2">
                        <p className="font-semibold text-base">{ex.name}</p>
                        <p className="text-sm">📋 {ex.instructions}</p>
                        <p className="text-sm">🔁 {ex.reps} reps x {ex.sets} sets</p>
                        {ex.notes && <p className="text-sm">🧠 {ex.notes}</p>}
                        <button
                          disabled={userRecommended.includes(ex.id) || recommendingId === ex.id}
                          onClick={() => handleRecommend(ex.id)}
                          className={`mt-2 w-max px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
                        >
                          {userRecommended.includes(ex.id)
                            ? "Recommended"
                            : recommendingId === ex.id
                              ? "Recommending..."
                              : "Recommend"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
