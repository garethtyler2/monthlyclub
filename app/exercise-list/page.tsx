'use client';
export const dynamic = "force-dynamic";

import { toast } from "sonner";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Toaster } from "@/components/ui/sonner";

function ExerciseContent() {
  // State to hold the list of exercises and loading status
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // State to track which exercises the current user has recommended
  const [userRecommended, setUserRecommended] = useState<string[]>([]);
  const [recommendingId, setRecommendingId] = useState<string | null>(null);

useEffect(() => {
  const hasDismissed = localStorage.getItem("dismissRecommendPopup") === "true";
  if (!hasDismissed) {
    toast.custom((t) => (
      <div className="max-w-md w-full bg-gradient-to-r from-brand-purple to-brand-blue border border-white/10 text-white shadow-lg rounded-lg p-4 flex flex-col space-y-4">
        <div className="font-semibold">👍 Recommend!</div>
        <div className="text-sm">
          Don't forget to recommend an exercise if it helped you — your feedback supports the whole community.
        </div>
        <button
          onClick={() => {
            localStorage.setItem("dismissRecommendPopup", "true");
            toast.dismiss((t as any).id);
          }}
          className="self-center px-4 py-1 bg-white text-sm text-black font-semibold rounded hover:bg-gray-200 transition"
        >
          Don’t show again
        </button>
      </div>
    ));
  }
}, []);
  // Extract query parameters from the URL: injury name and complaint ID
  const params = useSearchParams();
  const injuryName = params.get("injury");
  const complaintId = params.get("complaintId");


  const fetchUserRecommendations = async (injuryName: string, exerciseIdsFromLinks: number[]) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;
    if (!user) return;

    const { data: recommendations, error } = await supabase
      .from("exercise_recommendations")
      .select("exercise_id")
      .eq("user_id", user.id)
      .eq("injury_name", injuryName);

    if (!error && recommendations) {
      const recommendedIds = recommendations.map((r) => r.exercise_id);
      setUserRecommended(recommendedIds);
    }
  };

  // useEffect to fetch exercises and user's recommendations whenever injuryName or complaintId changes
  useEffect(() => {
    const fetchExercisesAndLinks = async () => {
      if (!injuryName || !complaintId) return;

      setLoading(true);

      // Check if any exercises are already linked to this injury
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

      if (existingError) {
        setLoading(false);
        return;
      }

      if (!existingLinks || existingLinks.length === 0) {

        const { data: complaint } = await supabase
          .from("complaints")
          .select("summary_label")
          .eq("id", complaintId)
          .single();

        const summary = complaint?.summary_label || "";
        const aiRes = await fetch("/api/ai/exercise-list", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ injury: injuryName, context: summary }),
        });

        const aiData = await aiRes.json();

        const topExercises = aiData?.data?.topExercises || [];

        for (let i = 0; i < topExercises.length; i++) {
          const ex = topExercises[i];

          // Step 1: Check if the exercise already exists by name
          const { data: existingExercise, error: findError } = await supabase
            .from("exercises")
            .select("id")
            .eq("name", ex.name)
            .maybeSingle();

          let exerciseId = null;

          if (existingExercise) {
            exerciseId = existingExercise.id;
          } else {
            // Step 2: Insert new exercise
            const { data: insertedExercise, error: insertError } = await supabase
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

            if (insertError || !insertedExercise) {
              continue;
            }

            exerciseId = insertedExercise.id;
          }

          // Step 3: Check if the link exists
          const { data: linkExists, error: linkError } = await supabase
            .from("exercise_injury_links")
            .select("id")
            .eq("injury_name", injuryName)
            .eq("exercise_id", exerciseId)
            .maybeSingle();

          if (!linkExists) {
            await supabase.from("exercise_injury_links").upsert({
              injury_name: injuryName,
              exercise_id: exerciseId,
              rank: i + 1,
              recommendations: 0,
            }, {
              onConflict: 'injury_name,exercise_id'
            });
          }
        }

        // Fetch updated links after linking all 10
        const { data: newLinks, error: newLinksError } = await supabase
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

        if (newLinksError) {
          setLoading(false);
          return;
        }

        setExercises(newLinks.map((link: any) => ({
          ...link.exercises,
          recommendations: link.recommendations,
          rank: link.rank
        })));

        await fetchUserRecommendations(injuryName, newLinks.map((link: any) => link.exercise_id));
      } else {
        setExercises(existingLinks.map((link: any) => ({
          ...link.exercises,
          recommendations: link.recommendations,
          rank: link.rank
        })));

        await fetchUserRecommendations(injuryName, existingLinks.map((link: any) => link.exercise_id));
      }

      setLoading(false);
    };

    fetchExercisesAndLinks();
  }, [injuryName, complaintId]);

  // Handler to recommend or remove recommend for an exercise
  const handleRecommend = async (exerciseId: string) => {
    if (!injuryName) return;
    setRecommendingId(exerciseId);
    try {
      // Get current user
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
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
    } finally {
      setRecommendingId(null);
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

      <details className="text-sm text-end text-muted-foreground mb-4">
        <summary className="cursor-pointer font-medium">🤝 Why recommend exercises?</summary>
        <p className="mt-2">
          Exercises are ordered based on community experience. When you recommend one that helped you, it helps others recover more effectively.
        </p>
      </details>

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
                    disabled={recommendingId === ex.id}
                    className={`text-xs text-white px-3 py-1 rounded transition ${
                      isRecommended
                        ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    } ${recommendingId === ex.id ? "opacity-50 cursor-wait" : ""}`}
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
      {/* <div className="text-center mt-8">
        {injuryName && complaintId && complaintId.length === 36 && (
          <a
            href={`/rehab-plan?injury=${injuryName}&complaintId=${complaintId}`}
            className="hero-button-primary"
          >
            Generate Rehab Plan
          </a>
        )}
      </div> */}
      <Toaster />
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