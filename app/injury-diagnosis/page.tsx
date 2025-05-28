// This page allows users to input pain details, cause of injury, and rate their symptoms.
// The AI then diagnoses likely injuries and creates related database records.
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SearchBarTemplate from "@/components/shared/SearchBarTemplate"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { RadioCard } from "@/components/ui/radio-card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { supabase } from "@/lib/supabase/client"
import SEOContent from "@/components/shared/SEOContent"

export default function InjuryDiagnosisSearchPage() {
  const [pain, setPain] = useState(5)
  const [strength, setStrength] = useState(5)
  const [mobility, setMobility] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [bodyRegion, setBodyRegion] = useState<"upper" | "lower" | "">("");
  const [location, setLocation] = useState("");
  const router = useRouter()

  useEffect(() => {
    const tryResubmit = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const savedData = localStorage.getItem("pendingInjurySubmission");

      if (user && savedData) {
        const parsed = JSON.parse(savedData);
        localStorage.removeItem("pendingInjurySubmission");
        await submitInjuryData(parsed);
      }
    };

    tryResubmit();
  }, []);

  const submitInjuryData = async (payload: any) => {
    setIsLoading(true);

    try {
      const { data: areaInjuries, error: fetchError } = await supabase
        .from("injuries")
        .select("injury_code, title, description")
        .eq("area", payload.location);

      if (fetchError) throw fetchError;

      const aiPayload = { ...payload, injuries: areaInjuries };

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const res = await fetch("/api/ai/injury-diagnosis", {
        method: "POST",
        body: JSON.stringify(aiPayload),
      });

      const ai = await res.json();
      if (!ai?.rankedInjuryCodes?.length) {
        throw new Error("AI did not return any ranked injury codes.");
      }

      const { data: complaint, error } = await supabase
        .from("complaints")
        .insert({
          user_id: user.id,
          location: payload.location,
          onset_type: payload.onsetType,
          cause: payload.cause,
          summary_label: ai.summaryLabel,
        })
        .select()
        .single();

      if (error) throw error;

      await supabase.from("complaint_progress_logs").insert({
        user_id: user.id,
        complaint_id: complaint.id,
        pain_level: payload.painLevel,
        strength_level: payload.strengthLevel,
        mobility_level: payload.mobilityLevel,
      });

      await supabase
        .from("complaints")
        .update({ rankedInjuryCodes: ai.rankedInjuryCodes })
        .eq("id", complaint.id);

      const complaintInjuries = ai.rankedInjuryCodes.map((code: number) => ({
        complaint_id: complaint.id,
        injury_code: code,
      }));

      await supabase.from("complaint_injuries").insert(complaintInjuries);

      router.push(`/injury-results?complaintId=${complaint.id}`);
    } catch (err: any) {
      console.error("Resubmission error:", err?.message || err);
      setIsLoading(false);
    }
  };

  // handleSubmit processes the injury diagnosis form:
  // 1. Calls AI to get injury suggestions
  // 2. Creates a complaint record
  // 3. Logs pain/mobility/strength snapshot
  // 4. Upserts injuries and links them to the complaint
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const form = e.currentTarget;
    const onsetTypeRaw = (form.elements.namedItem("onset_type") as RadioNodeList)?.value;
    const onsetType = onsetTypeRaw || null; // 👈 fallback to null if none selected
  
    const cause = (form.elements.namedItem("injury_cause") as HTMLTextAreaElement)?.value;
  
    const payload = {
      location,
      onsetType,
      cause,
      painLevel: pain,
      strengthLevel: strength,
      mobilityLevel: mobility,
    };

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      localStorage.setItem("pendingInjurySubmission", JSON.stringify(payload));
      window.location.href = "/login?redirect=/injury-diagnosis";
      return;
    }

    await submitInjuryData(payload);
  };
  

  // Render the form for users to input injury-related information
  return (
    <>
      <LoadingOverlay show={isLoading} message="Diagnosing..." />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="mb-4 mt-4 animate-fade-in text-4xl sm:text-5xl font-bold leading-tight">
            <span className="block">AI Injury Diagnosis</span>
            <span className="block text-lg sm:text-2xl text-muted-foreground mt-2">
              <span className="gradient-text">Identify Your Injury with AI Assistance</span>
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl text-center font-semibold text-white">Where is the pain located?</h3>
            
            <div className="flex justify-center">
              <div className="inline-flex items-center justify-center rounded-lg border border-border bg-muted p-1">
                {[
                  { key: "upper", label: "Upper Body" },
                  { key: "lower", label: "Lower Body" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setBodyRegion(key as "upper" | "lower");
                      setLocation("");
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      bodyRegion === key
                        ? "bg-background text-white shadow-sm"
                        : "text-muted-foreground hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {bodyRegion && (
              <div>
                <label className="block mt-4 mb-2 font-medium text-white">Select Area</label>
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    e.target.setCustomValidity("");
                  }}
                  onInvalid={(e) => {
                    (e.target as HTMLSelectElement).setCustomValidity("Please select an area.");
                  }}
                  className="w-full px-4 py-2 border rounded shadow-sm text-white bg-zinc-800"
                  required
                >
                  <option value="" disabled className="text-white bg-zinc-800">Select a location</option>
                  {bodyRegion === "upper" && [
                    "Head & Neck", "Shoulder", "Upper Arm", "Elbow", "Forearm", "Wrist & Hand", "Chest", "Upper Back", "Lower Back", "Core (Abs / Side)",
                    
                  ]
                  .map((area) => (
                    <option key={area} value={area} className="text-white bg-zinc-800">{area}</option>
                  ))}
                  {bodyRegion === "lower" && [
                    "Hip & Groin", "Buttocks (Glutes)", "Front Thigh (Quads)", "Back Thigh (Hamstrings)", "Inner/Outer Thigh (Adductors / IT Band)",
                    "Knee", "Front Lower Leg (Shin)", "Back Lower Leg (Calf)", "Ankle", "Foot",
                  ].map((area) => (
                    <option key={area} value={area} className="text-white bg-zinc-800">{area}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {bodyRegion && (
            <>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">How did the pain start?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-zinc-900">
                  <RadioCard id="onset_sudden" name="onset_type" value="sudden" label="Suddenly" />
                  <RadioCard id="onset_gradual" name="onset_type" value="gradual" label="Gradually" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">What caused it, and anything else you'd like us to know?</h3>
                <Textarea
                  name="injury_cause"
                  placeholder="e.g. I fell down the stairs, I twisted it during football..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Rate the following from 1 to 10</h3>

                <div className="space-y-2">
                  <label className="block font-medium">Pain Level</label>
                  <Slider value={[pain]} onValueChange={(val) => setPain(val[0])} min={1} max={10} step={1} />
                </div>

                <div className="space-y-2">
                  <label className="block font-medium">Strength Level</label>
                  <Slider value={[strength]} onValueChange={(val) => setStrength(val[0])} min={1} max={10} step={1} />
                </div>

                <div className="space-y-2">
                  <label className="block font-medium">Mobility Level</label>
                  <Slider value={[mobility]} onValueChange={(val) => setMobility(val[0])} min={1} max={10} step={1} />
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full mt-4 hero-button-primary"
            disabled={!bodyRegion || !location}
          >
            Submit
          </Button>
        </form>
      </div>

      <SEOContent
        titleStart="AI-Powered Injury"
        titleHighlight="Identification Tool"
        sections={[
          {
            content:
              "Struggling with pain or discomfort? Our AI Injury Identification Tool helps you pinpoint the cause, offering tailored insights into common injuries, treatment options, self-tests, rehab exercises, and prevention tips—all in one place.",
          },
          {
            heading: "How It Works",
            content: (
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Search by Body Part:</strong> Enter the area where you’re experiencing pain—like “lower back,” “shoulder,” or “knee.” Our AI-driven injury database analyzes your input and generates a list of the most common injuries for that body part.
                </li>
                <li>
                  <strong>Explore Injury Insights:</strong> Select an injury from the list to access:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Injury Overview:</strong> Clear, detailed explanations of the injury, its symptoms, and potential causes.</li>
                    <li><strong>Self-Diagnosis Tests:</strong> Simple, actionable tests to help confirm the injury.</li>
                    <li><strong>Nutrition for Recovery:</strong> Tips on foods, supplements, and hydration strategies to support healing.</li>
                    <li><strong>Treatment Advice:</strong> Initial care options, such as rest, ice, compression, or elevation (RICE).</li>
                    <li><strong>Rehabilitation Exercises:</strong> Easy-to-follow stretches and strengthening exercises designed for your specific injury.</li>
                    <li><strong>Injury Prevention Tips:</strong> Strategies to avoid reinjury and build long-term resilience.</li>
                  </ul>
                </li>
                <li>
                  <strong>AI Recommendations Tailored to You:</strong> Our tool uses artificial intelligence to deliver personalized injury suggestions and recovery plans.
                </li>
              </ul>
            ),
          },
          {
            heading: "Why Use the AI Injury Identification Tool?",
            content: (
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Comprehensive Coverage:</strong> From injury diagnosis to treatment, rehab, and prevention, we cover everything you need to get back to feeling your best.</li>
                <li><strong>AI-Powered Accuracy:</strong> Advanced AI technology ensures reliable, up-to-date information specific to your symptoms and needs.</li>
                <li><strong>Save Time and Effort:</strong> Avoid vague internet searches and receive targeted results for your pain and discomfort.</li>
              </ul>
            ),
          },
          {
            heading: "Who Benefits From the Tool?",
            content: (
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Athletes:</strong> Discover common sports injuries and learn how to recover faster.</li>
                <li><strong>Everyday Users:</strong> Find insights into pain caused by daily activities like sitting, lifting, or exercising.</li>
                <li><strong>Rehabilitation Seekers:</strong> Access personalized rehab plans to help recover from injury or surgery.</li>
                <li><strong>Health-Conscious Individuals:</strong> Learn how to prevent injuries and improve mobility for the long term.</li>
              </ul>
            ),
          },
        ]}
      />
    </>
  )
}
