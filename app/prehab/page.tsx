"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBarTemplate from "@/components/shared/SearchBarTemplate";
import SEOContent from "@/components/shared/SEOContent";
import { toast } from "@/hooks/use-toast";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { supabase } from "@/lib/supabase/client";

export default function PrehabSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (query: string) => {
    toast({
      title: "Generating prehab plan…",
      description: `Working on: "${query}"`,
    });
    setIsLoading(true);
  
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = `/login?redirect=/prehab`;
      return;
    }
  
    try {
      const res = await fetch("/api/ai/prehab-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: query }),
      });
  
      if (!res.ok) {
        const errorText = await res.text(); // Try to read the raw response body
        console.error("❌ Server returned non-OK status:", res.status);
        console.error("❌ Response body:", errorText);
        throw new Error(`Server error: ${res.status}`);
      }
  
      let ai;
      try {
        ai = await res.json();
      } catch (jsonError) {
        const text = await res.text();
        console.error("❌ Could not parse JSON response. Raw body:", text);
        throw new Error("Response was not valid JSON.");
      }
  
      const { summary, exercises } = ai.data || {};
      if (!summary || !exercises) {
        console.error("❌ AI response is missing summary or exercises:", ai);
        throw new Error("AI returned incomplete data.");
      }
  
      const { data: plan, error: insertError } = await supabase
        .from("prehab_plans")
        .insert({
          user_id: user.id,
          search_term: query,
          summary,
          exercises,
        })
        .select()
        .single();
  
      if (insertError) throw insertError;
  
      router.push(`/prehab-plan?planId=${plan.id}`);
    } catch (err: any) {
      console.error("Prehab search error:", err);
      toast({
        title: "Something went wrong",
        description: err?.message || "Unable to generate prehab plan.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  

  return (
    <>
      <LoadingOverlay show={isLoading} message="Building your plan…" />
      <SearchBarTemplate
        titleStart="Prehab"
        titleHighlight="Build Resilience, Prevent Injuries, and Optimize Recovery"
        placeholderList={[
          "Knee Replacement",
          "ACL Reconstruction",
          "Rotator Cuff Surgery",
          "Hip Replacement",
          "Spinal Fusion",
          "Achilles Tendon Repair",
        ]}
        description="Tip: Search for specific conditions, surgeries, or goals."
        onSearch={handleSearch}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <SEOContent
        titleStart="What Is Prehab?"
        titleHighlight="A Complete Guide to Prehabilitation"
        sections={[
          {
            content:
              "Prehab (short for 'prehabilitation') is a proactive approach in physical therapy and fitness designed to prevent injuries, optimize recovery, and enhance performance. Whether you're preparing for surgery, managing a chronic condition, or improving athletic performance, prehab helps build resilience and strengthens your body before injuries happen.",
          },
          {
            heading: "Key Goals of Prehab",
            content: (
              <>
                <p>
                  The primary objectives of prehab focus on creating a stronger, more resilient body while improving movement and reducing risks of injury. Here are the main goals:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Injury Prevention:</strong> Strengthen muscles, joints, and ligaments to avoid strains, sprains, and overuse conditions.
                  </li>
                  <li>
                    <strong>Surgical Preparation:</strong> Build strength and mobility before surgery to speed up post-op recovery.
                  </li>
                  <li>
                    <strong>Performance Enhancement:</strong> Improve flexibility and coordination to push performance safely.
                  </li>
                  <li>
                    <strong>Chronic Condition Management:</strong> Help conditions like arthritis or back pain by maintaining mobility and quality of life.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: "Who Can Benefit from Prehab?",
            content: (
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Athletes:</strong> Reduce injury risk and recover safely.
                </li>
                <li>
                  <strong>Surgical Patients:</strong> Prepare better for surgery and recover faster.
                </li>
                <li>
                  <strong>Everyday Individuals:</strong> Avoid posture/work-related injuries and stay active.
                </li>
              </ul>
            ),
          },
          {
            heading: "Why Start Prehab Today?",
            content:
              "Prehab isn’t just about preventing injuries—it's about building a stronger, healthier body. Whether you're managing pain, preparing for surgery, or optimizing performance, prehab provides customized support. Start exploring now and take control of your recovery journey.",
          },
        ]}
      />
    </>
  );
}
