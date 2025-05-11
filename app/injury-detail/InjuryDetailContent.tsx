"// This component handles the detailed view of an injury, including data fetching from Supabase or OpenAI if needed,"
"// and displays symptoms, self-tests, early exercises, and rehab tips."
"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { TestTube2, AlertTriangle, Lightbulb } from "lucide-react"

export type InjuryDetail = {
  title: string
  detailedDescription: string
  symptoms: string[]
  selfTests: { name: string; instructions: string; interpretation: string }[]
  commonMistakes: string[]
  tips: string[]
}

export default function InjuryDetailPage() {
  const [detail, setDetail] = useState<InjuryDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get("id")
  const complaintId = searchParams.get("complaintId")
  const injuryName = searchParams.get("injury")

  // useEffect runs once the component mounts and handles fetching the injury detail.
  // It first tries to get the injury from Supabase using the `id` from the URL.
  // If no data exists, it falls back to fetching it from the OpenAI API.
  useEffect(() => {
    const fetchDetail = async () => {
      let globalInjury = null

      // If an injury ID is present in the query, attempt to fetch injury details by ID from Supabase.
      if (id && id !== "undefined") {
        console.log("🔎 Fetching injury detail by ID:", id)
        const { data, error } = await supabase
          .from("injuries")
          .select("id, title, details")
          .eq("id", id)
          .single()

        if (error) {
          console.error("❌ Supabase error while fetching by ID:", error)
          return
        }

        if (!data) {
          console.error("❌ No injury found for ID:", id)
          return
        }

        globalInjury = data

        if (data.details) {
          try {
            setDetail(JSON.parse(data.details))
          } catch (err) {
            console.error("❌ Failed to parse injury details JSON:", err)
          }
          setIsLoading(false)
          return
        }

        console.log("📭 Injury has no details — going to fetch from AI...")
      }

      // If we don't have enough info to fetch by name and complaintId, warn and exit.
      // Fallback to injuryName + complaintId if no details found via ID
      if (!injuryName || !complaintId) {
        console.warn("⚠️ Missing injuryName or complaintId in URL")
        return
      }

      if (!globalInjury) {
        // Lookup by injury title
        const { data, error } = await supabase
          .from("injuries")
          .select("id, title, details")
          .eq("title", injuryName)
          .single()

        if (error && error.code !== "PGRST116") {
          console.error("❌ Supabase error while looking up injury:", error)
          return
        }

        globalInjury = data || null
      }

      // If no details exist, generate injury detail using OpenAI and either update or insert in Supabase.
      if (!globalInjury?.details) {
        // Need to fetch full data from OpenAI
        const res = await fetch("/api/ai/injury-detail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ injury: { title: injuryName } }),
        })

        const aiData = await res.json()

        if (!aiData?.title) {
          console.error("❌ AI did not return valid injury data:", aiData)
          return
        }

        setDetail(aiData)

        if (globalInjury?.id) {
          // Update existing injury with details
          const { error } = await supabase
            .from("injuries")
            .update({ details: JSON.stringify(aiData) })
            .eq("id", globalInjury.id)

          if (error) {
            console.error("❌ Failed to update existing injury record:", error)
          } else {
            console.log("✅ Updated existing injury with AI details")
          }
        } else {
          // Create new injury in DB
          const { data: newInjury, error: insertError } = await supabase
            .from("injuries")
            .insert({
              title: aiData.title,
              details: JSON.stringify(aiData),
            })
            .select()
            .single()

          if (insertError) {
            console.error("❌ Failed to insert new injury record:", insertError)
            return
          }

          globalInjury = newInjury
          console.log("✅ Created new global injury:", newInjury.id)
        }
      } else {
        // Load existing injury details
        setDetail(JSON.parse(globalInjury.details))
      }

      // Ensure that the injury is linked to the complaint in the complaint_injuries table.
      // Step: Link to complaint if not already linked
      const { data: existingLink, error: linkError } = await supabase
        .from("complaint_injuries")
        .select("id")
        .eq("complaint_id", complaintId)
        .eq("injury_id", globalInjury.id)
        .maybeSingle()

      if (linkError) {
        console.error("❌ Failed to check for existing complaint link:", linkError)
        return
      }

      if (!existingLink) {
        const { error: insertLinkError } = await supabase
          .from("complaint_injuries")
          .insert({
            complaint_id: complaintId,
            injury_id: globalInjury.id,
          })

        if (insertLinkError) {
          console.error("❌ Failed to link injury to complaint:", insertLinkError)
        } else {
          console.log("✅ Linked injury to complaint")
        }
      }

      // Step: Mark as viewed by the user
      const { error: viewUpdateError } = await supabase
        .from("complaint_injuries")
        .update({ 
          viewed_by_user: true,
          viewed_at: new Date().toISOString(),
         })
        .eq("complaint_id", complaintId)
        .eq("injury_id", globalInjury.id);

      if (viewUpdateError) {
        console.error("❌ Failed to update viewed_by_user:", viewUpdateError);
      } else {
        console.log("✅ Marked injury as viewed by user");
      }

      // Optional redirect to simplify future reloads
      if (!id) {
        router.replace(`/injury-detail?id=${globalInjury.id}&complaintId=${complaintId}`)
      }

      setIsLoading(false)
    }

    fetchDetail()
  }, [id, complaintId, injuryName, router])

// Navigate to the top exercises page when the user clicks the button.
const handleClick = () => {
  if (detail?.title) {
    router.push(
      `/exercise-list?injury=${encodeURIComponent(detail.title)}&complaintId=${complaintId}`
    )
    }
  }

  // Show a loading screen while data is being fetched.
  if (isLoading) return <LoadingOverlay show message="Loading injury details..." />
  if (!detail) return <p className="text-center mt-10 text-muted-foreground">No data available.</p>

  // Render the detailed injury content including symptoms, tests, exercises, and tips.
  return (


    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">{detail.title}</h1>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            {detail.detailedDescription}
          </p>
        </div>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <AlertTriangle size={20} /> Symptoms
          </div>
          <ul className="list-disc list-inside space-y-1">
            {detail.symptoms.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <TestTube2 size={20} /> Self Tests
          </div>
          <div className="space-y-4">
            {detail.selfTests.map((test, i) => (
              <div key={i} className="border rounded-lg p-4 bg-muted">
                <h3 className="font-medium text-lg">{test.name}</h3>
                <p className="text-sm mt-1">🧪 {test.instructions}</p>
                <p className="text-sm text-muted-foreground mt-1">👉 {test.interpretation}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <AlertTriangle size={20} /> Common Mistakes
          </div>
          <ul className="list-disc list-inside space-y-1">
            {detail.commonMistakes.map((mistake, i) => (
              <li key={i}>{mistake}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Lightbulb size={20} /> Tips
          </div>
          <ul className="list-disc list-inside space-y-1">
            {detail.tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </Card>

        <div className="pt-4">
          <Button onClick={handleClick} className="w-full hero-button-primary">
          Exercises
          </Button>
        </div>
      </div>
    </div>
  )
}
