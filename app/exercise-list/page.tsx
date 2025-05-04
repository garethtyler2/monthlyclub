'use client';
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

function ExerciseContent() {
  // State to hold the list of exercises and loading status
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Extract query parameters from the URL: injury name and complaint ID
  const params = useSearchParams();
  const injuryName = params.get("injury");
  const complaintId = params.get("complaintId");

  // useEffect to fetch exercises whenever injuryName or complaintId changes
  useEffect(() => {
    const fetchExercises = async () => {
      // If required parameters are missing, do not proceed
      if (!injuryName || !complaintId) return;

      // --- Check if exercises already exist in the database for this injury ---
      const { data: existingLinks, error: existingError } = await supabase
        .from("exercise_injury_links")
        .select(`
          rank,
          exercises (
            id,
            name,
            instructions,
            sets,
            reps,
            notes
          )
        `)
        .eq("injury_name", injuryName)
        .order("rank", { ascending: true });

      // If existing exercises are found, use them and skip AI call
      if (existingLinks && existingLinks.length > 0) {
        const exercisesOnly = existingLinks.map((link: any) => link.exercises);
        setExercises(exercisesOnly);
        setLoading(false);
        return;
      }

      // --- No existing exercises found, so fetch user info ---
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return;

      // Fetch the complaint summary to provide context for AI generation
      const { data: complaint } = await supabase
        .from("complaints")
        .select("summary_label")
        .eq("id", complaintId)
        .single();

      const summary = complaint?.summary_label || "";

      try {
        // --- Call AI API to generate a list of top exercises ---
        const aiRes = await fetch("/api/ai/exercise-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ injury: injuryName, context: summary }),
        });

        const aiData = await aiRes.json();
        const topExercises = aiData.data?.topExercises || [];

        const savedExercises = [];

        // --- Save each AI-generated exercise to the database ---
        for (const ex of topExercises) {
          const { data: inserted, error } = await supabase
            .from("exercises")
            .insert({
              name: ex.name,
              instructions: ex.instructions,
              sets: ex.sets,
              reps: ex.reps,
              notes: ex.note,
            })
            .select()
            .single();

          // If insert successful, link exercise to injury with rank order
          if (!error && inserted) {
            savedExercises.push(inserted);

            await supabase.from("exercise_injury_links").insert({
              exercise_id: inserted.id,
              injury_name: injuryName,
              rank: savedExercises.length,
            });
          }
        }

        // Update state with the newly saved exercises
        setExercises(savedExercises);
      } catch (err) {
        // Log any errors that occur during fetch or save
        console.error("❌ Failed to fetch or save exercises:", err);
      } finally {
        // Turn off loading indicator once processing is complete
        setLoading(false);
      }
    };

    fetchExercises();
  }, [injuryName, complaintId]);

  // Show loading overlay while exercises are being fetched/generated
  if (loading) return <LoadingOverlay show message="Generating exercises..." />;

  // Render the list of exercises along with page header and instructions
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Top Exercises for {injuryName}</h1>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Here are the most effective rehab exercises to support your recovery.
        </p>
      </div>

      <Card className="p-5 space-y-4 mt-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Dumbbell size={20} /> Exercises
        </div>
        <div className="space-y-4 mt-4">
          {exercises.map((ex: any, i: number) => (
            <div key={i} className="border rounded-xl p-4 bg-muted">
              <h4 className="text-lg font-semibold">{ex.name}</h4>
              <p className="text-sm mt-1">📋 {ex.instructions}</p>
              <p className="text-sm mt-1">🔁 {ex.reps} reps x {ex.sets} sets</p>
              {ex.notes && <p className="text-sm mt-1">🧠 {ex.notes}</p>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function ExerciseListPage() {
  return (
    <Suspense fallback={<LoadingOverlay show message="Loading exercises..." />}>
      <ExerciseContent />
    </Suspense>
  );
}