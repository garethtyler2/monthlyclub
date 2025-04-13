"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { Dumbbell, TestTube2, AlertTriangle, Lightbulb } from "lucide-react"

type SelfTest = {
  name: string
  instructions: string
  interpretation: string
}

type EarlyExercise = {
  name: string
  instructions: string
  reps: string
  tip: string
}

type InjuryDetail = {
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

  const complaintId = searchParams.get("complaintId")
  const injuryName = searchParams.get("injury")

  useEffect(() => {
    const fetchInjuryDetail = async () => {
      if (!complaintId || !injuryName) return

      setIsLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      // Get summary label from complaint
      const { data: complaint, error: complaintError } = await supabase
        .from("primary_complaints")
        .select("summary_label")
        .eq("id", complaintId)
        .single()

      if (complaintError || !complaint?.summary_label) {
        console.error("Error fetching summary label:", complaintError)
        setIsLoading(false)
        return
      }

      const summary = complaint.summary_label

      // Check if injury detail already exists
      const { data: existingDetail } = await supabase
        .from("injury_details")
        .select("*")
        .eq("injury_name", injuryName)
        .eq("context_summary", summary)
        .single()

      if (existingDetail) {
        setDetail({
          title: existingDetail.injury_name,
          detailedDescription: existingDetail.description,
          symptoms: [], // optional: parse from DB if needed
          selfTests: JSON.parse(existingDetail.diagnostic_tests || "[]"),
          earlyExercises: [], // optional: preload if needed
          tips: JSON.parse(existingDetail.red_flags || "[]"),
        })

        await supabase.from("selected_injuries").insert({
          user_id: user.id,
          primary_complaint_id: complaintId,
          injury_name: injuryName,
          injury_detail_id: existingDetail.id,
        })

        setIsLoading(false)
        return
      }

      // Otherwise, call AI
      try {
        const { data: metrics } = await supabase
          .from("user_metrics")
          .select("pain_level, strength_level, mobility_level")
          .eq("primary_complaint_id", complaintId)
          .order("recorded_at", { ascending: true })
          .limit(1)
          .single()

        const res = await fetch("/api/ai/injury-detail", {
          method: "POST",
          body: JSON.stringify({
            injury: { title: injuryName, context: summary },
            levels: metrics,
          }),
        })

        const data = await res.json()

        setDetail(data)

        // Save to injury_details
        const { data: savedDetail } = await supabase
          .from("injury_details")
          .insert({
            injury_name: data.title,
            context_summary: summary,
            description: data.detailedDescription,
            causes: "", // optional
            diagnostic_tests: JSON.stringify(data.selfTests),
            red_flags: JSON.stringify(data.tips),
          })
          .select()
          .single()

        // Save to selected_injuries
        await supabase.from("selected_injuries").insert({
          user_id: user.id,
          primary_complaint_id: complaintId,
          injury_name: data.title,
          injury_detail_id: savedDetail.id,
        })

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching or saving AI data:", err)
        setIsLoading(false)
      }
    }

    fetchInjuryDetail()
  }, [injuryName, complaintId, router, searchParams])

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
          <div className="">
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
