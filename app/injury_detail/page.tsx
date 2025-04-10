"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { Dumbbell, TestTube2, AlertTriangle, Lightbulb } from "lucide-react"

type InjuryDetail = {
  title: string
  detailedDescription: string
  symptoms: string[]
  selfTests: { name: string; instructions: string; interpretation: string }[]
  earlyExercises: { name: string; instructions: string; reps: string; tip: string }[]
  tips: string[]
  summary: string
}

export default function InjuryDetailPage() {
  const [injury, setInjury] = useState<any>(null)
  const [levels, setLevels] = useState<any>(null)
  const [detail, setDetail] = useState<InjuryDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedInjury = localStorage.getItem("selected_injury")
    const storedLevels = localStorage.getItem("injury_levels")

    if (!storedInjury || !storedLevels) {
      console.error("Missing injury or levels")
      return
    }

    const parsedInjury = JSON.parse(storedInjury)
    const parsedLevels = JSON.parse(storedLevels)

    setInjury(parsedInjury)
    setLevels(parsedLevels)

    fetch("/api/ai/injury-detail", {
      method: "POST",
      body: JSON.stringify({
        injury: parsedInjury,
        levels: parsedLevels,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setDetail(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error("Failed to load AI detail:", err)
        setIsLoading(false)
      })
  }, [])

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
          <Button className="w-full hero-button-primary">
            Generate A Rehab Plan
          </Button>
        </div>
      </div>
    </div>
  )
}