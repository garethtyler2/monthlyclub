"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { Dumbbell, TestTube2, AlertTriangle, Lightbulb } from "lucide-react"

export type InjuryDetail = {
  title: string
  detailedDescription: string
  symptoms: string[]
  selfTests: { name: string; instructions: string; interpretation: string }[]
  earlyExercises: { name: string; instructions: string; reps: string; tip: string }[]
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

  useEffect(() => {
    const fetchDetail = async () => {
      if (id && id !== "undefined") {
        // ✅ LOAD BY ID
        console.log("🔎 Fetching injury detail by ID:", id)
        const { data, error } = await supabase
          .from("injury_details")
          .select("full_json")
          .eq("id", id)
          .single()

        if (error || !data?.full_json) {
          console.error("❌ Failed to fetch injury detail by ID:", error)
          return
        }

        setDetail(JSON.parse(data.full_json))
        setIsLoading(false)
        return
      }

      // 🚨 No ID? Try to fetch via complaintId + injuryName
      if (!complaintId || !injuryName) {
        console.warn("⚠️ Missing complaintId or injuryName in URL")
        return
      }

      console.log("🧾 Loading detail via AI for:", complaintId, injuryName)

      const { data: complaint, error } = await supabase
        .from("complaints")
        .select("summary_label")
        .eq("id", complaintId)
        .single()

      if (error || !complaint?.summary_label) {
        console.error("❌ Error fetching complaint summary:", error)
        return
      }

      const summary = complaint.summary_label
      const res = await fetch("/api/ai/injury-detail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          injury: {
            title: injuryName,
            context: summary,
          },
        }),
      })

      const aiData = await res.json()
      if (!aiData?.title) {
        console.error("❌ AI response missing title:", aiData)
        return
      }

      setDetail(aiData)

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (!user || userError) {
        console.error("❌ User not authenticated when trying to save:", userError)
        return
      }

      // 🧠 Check if this injury already exists to avoid duplicates
      const { data: existing, error: lookupError } = await supabase
        .from("injury_details")
        .select("id")
        .eq("user_id", user.id)
        .eq("complaint_id", complaintId)
        .eq("injury_title", aiData.title)
        .limit(1)

      if (lookupError) {
        console.error("❌ Error checking for existing injury detail:", lookupError)
      }

      if (existing && existing.length > 0 && existing[0].id) {
        console.log("⚠️ Injury already exists. Redirecting to existing record:", existing[0].id)
        router.replace(`/injury-detail?id=${existing[0].id}`)
        return
      }

      const insertPayload = {
        user_id: user.id,
        complaint_id: complaintId,
        injury_title: aiData.title,
        full_json: JSON.stringify(aiData),
      }

      const { data: saved, error: saveError } = await supabase
        .from("injury_details")
        .insert(insertPayload)
        .select()
        .single()

      if (saveError) {
        console.error("❌ Failed to save new injury detail to Supabase:", saveError)
      } else {
        console.log("✅ Saved new injury detail to Supabase")
        router.replace(`/injury-detail?id=${saved.id}`)
      }

      setIsLoading(false)
    }

    fetchDetail()
  }, [id, complaintId, injuryName])

  const handleClick = () => {
    if (detail?.title) {
      router.push(
        `/rehab-plan-exercises?injury=${encodeURIComponent(detail.title)}&complaintId=${complaintId}`
      )
    }
  }

  if (isLoading) return <LoadingOverlay show message="Loading injury details..." />
  if (!detail) return <p className="text-center mt-10 text-muted-foreground">No data available.</p>

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
            <Dumbbell size={20} /> Starter Exercises
          </div>
          <div className="space-y-4">
            {detail.earlyExercises.map((ex, i) => (
              <div key={i} className="border rounded-xl p-4 bg-muted">
                <h4 className="text-lg font-semibold">{ex.name}</h4>
                <p className="text-sm mt-1">💪 {ex.instructions}</p>
                <p className="text-sm mt-1">Reps: {ex.reps}</p>
                <p className="text-sm text-muted-foreground mt-1">{ex.tip}</p>
              </div>
            ))}
          </div>
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
          Rehab Exercises & Weekly Plan
          </Button>
        </div>
      </div>
    </div>
  )
}
