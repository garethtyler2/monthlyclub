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
  // State to track which exercises the current user has recommended
  const [userRecommended, setUserRecommended] = useState<number[]>([]);

  // Extract query parameters from the URL: injury name and complaint ID
  const params = useSearchParams();
  const injuryName = params.get("injury");
  const complaintId = params.get("complaintId");

  // useEffect to fetch exercises and user's recommendations whenever injuryName or complaintId changes
  useEffect(() => {
    const fetchExercisesAndRecommendations = async () => {
      if (!injuryName || !complaintId) return;

      // --- Get user info ---
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      // We'll need user for recommendations below

      // --- Check if exercises already exist in the database for this injury ---
      const { data: existingLinks, error: existingError } = await supabase
        .from("exercise_injury_links")
        .select(`
          id,
          rank,
          recommendations,
          exercise_id,
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
        .order("recommendations", { ascending: false })
        .order("rank", { ascending: true });

      let exercisesOnly = [];
      if (existingLinks && existingLinks.length > 0) {
        exercisesOnly = existingLinks.map((link: any) => ({
          ...link.exercises,
          recommendations: link.recommendations || 0,
          linkId: link.id,
          rank: link.rank
        }));
        setExercises(exercisesOnly);
      } else {
        // --- No existing exercises found, so fetch user info (already done above) ---
        if (!user) {
          setLoading(false);
          return;
        }
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
              savedExercises.push({
                ...inserted,
                recommendations: 0,
                rank: savedExercises.length + 1,
              });

              await supabase.from("exercise_injury_links").insert({
                exercise_id: inserted.id,
                injury_name: injuryName,
                rank: savedExercises.length,
                recommendations: 0,
              });
            }
          }

          // Update state with the newly saved exercises
          exercisesOnly = savedExercises;
          setExercises(savedExercises);
        } catch (err) {
          // Log any errors that occur during fetch or save
          console.error("❌ Failed to fetch or save exercises:", err);
        }
      }

      // --- Fetch user recommendations for these exercises ---
      if (user && exercisesOnly.length > 0) {
        const exerciseIds = exercisesOnly.map((ex: any) => ex.id);
        // Get all recommendations for this user, injury, and exercise IDs
        const { data: recs, error: recsError } = await supabase
          .from("exercise_recommendations")
          .select("exercise_id")
          .eq("user_id", user.id)
          .eq("injury_name", injuryName)
          .in("exercise_id", exerciseIds);
        if (!recsError && Array.isArray(recs)) {
          setUserRecommended(recs.map((r) => r.exercise_id));
        } else {
          setUserRecommended([]);
        }
      } else {
        setUserRecommended([]);
      }

      setLoading(false);
    };

    fetchExercisesAndRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [injuryName, complaintId]);

  // Handler to recommend or remove recommend for an exercise
  const handleRecommend = async (exerciseId: number) => {
    if (!injuryName) return;
    setLoading(true);
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        setLoading(false);
        return;
      }

      // Find the link row for this exercise and injury
      const { data: linkData, error: linkError } = await supabase
        .from("exercise_injury_links")
        .select("id, recommendations")
        .eq("injury_name", injuryName)
        .eq("exercise_id", exerciseId)
        .single();

      if (linkError || !linkData) {
        console.error("❌ Could not find exercise injury link to update recommendations.");
        setLoading(false);
        return;
      }

      const alreadyRecommended = userRecommended.includes(exerciseId);
      let newCount = linkData.recommendations || 0;

      if (!alreadyRecommended) {
        // Add recommendation
        newCount = newCount + 1;
        // Insert into exercise_recommendations
        await supabase.from("exercise_recommendations").insert({
          user_id: user.id,
          exercise_id: exerciseId,
          injury_name: injuryName,
        });
        // Update recommendations count
        await supabase
          .from("exercise_injury_links")
          .update({ recommendations: newCount })
          .eq("id", linkData.id);
        // Update local state
        setUserRecommended((prev) => [...prev, exerciseId]);
      } else {
        // Remove recommendation
        newCount = Math.max(newCount - 1, 0);
        // Remove from exercise_recommendations
        await supabase
          .from("exercise_recommendations")
          .delete()
          .eq("user_id", user.id)
          .eq("exercise_id", exerciseId)
          .eq("injury_name", injuryName);
        // Update recommendations count
        await supabase
          .from("exercise_injury_links")
          .update({ recommendations: newCount })
          .eq("id", linkData.id);
        // Update local state
        setUserRecommended((prev) => prev.filter((id) => id !== exerciseId));
      }

      // Update local recommendations count for this exercise
      setExercises((prev) => {
        const updated = prev.map((ex) =>
          ex.id === exerciseId ? { ...ex, recommendations: newCount } : ex
        );

        return [...updated].sort((a, b) => {
          if (b.recommendations !== a.recommendations) {
            return b.recommendations - a.recommendations;
          }
          return a.rank - b.rank;
        });
      });
    } catch (err) {
      console.error("❌ Error recommending exercise:", err);
    } finally {
      setLoading(false);
    }
  };

  // Show loading overlay while exercises are being fetched/generated
  if (loading) return <LoadingOverlay show message="Generating exercises..." />;

  // Render the list of exercises along with page header and instructions
  return (
    <div className="max-w-4xl mx-auto px-2 py-10 space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Top Exercises for {injuryName}</h1>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Here are the most effective rehab exercises to support your recovery.
        </p>
      </div>

      <Card className="p-2 space-y-4 mt-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Dumbbell size={20} /> Exercises
        </div>
        <div className="space-y-4 mt-4">
          {exercises.map((ex: any, i: number) => {
            const isRecommended = userRecommended.includes(ex.id);
            return (
              <div key={i} className="border rounded-xl p-2 bg-muted text-sm space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold">{ex.name}</h4>
                  <span className="text-xs text-muted-foreground">🏅 {ex.recommendations || 0} votes</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 mb-0">📋 {ex.instructions}</p>
                <p className="text-xs mt-1 mb-0">🔁 {ex.reps} reps x {ex.sets} sets</p>
                {ex.notes && <p className="text-xs mt-1 mb-0">🧠 {ex.notes}</p>}
                <div className="flex justify-end mt-2">
                  <button
                    className={
                      isRecommended
                        ? "text-xs text-white px-3 py-1 rounded transition bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                        : "text-xs text-white px-3 py-1 rounded transition bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    }
                    onClick={() => handleRecommend(ex.id)}
                  >
                    {isRecommended ? "Recommended" : "Recommend"}
                  </button>
                </div>
              </div>
            );
          })}
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