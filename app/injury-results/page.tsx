"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Injury = {
  title: string
  description: string
  selfTest: string
}

export default function InjuryResultsPage() {
  const [injuries, setInjuries] = useState<Injury[]>([])
  const handleSelectInjury = (injury: Injury) => {
    localStorage.setItem("selected_injury", JSON.stringify(injury))
    window.location.href = "/injury-detail"
  }
  
  useEffect(() => {
    const stored = localStorage.getItem("injury_results")
    if (stored) {
      try {
        setInjuries(JSON.parse(stored))
      } catch (err) {
        console.error("Failed to parse injuries:", err)
      }
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl pt-10 font-bold">Possible Injuries</h1>

      {injuries.length === 0 && <p className="text-muted-foreground">No injuries found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {injuries.map((injury, i) => (
          <Card key={i} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{injury.title}</h2>
              <Badge variant="outline">#{i + 1}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{injury.description}</p>
            <div>
              <h4 className="text-sm font-large text-white">Self Test</h4>
              <p className="text-sm text-muted-foreground">{injury.selfTest}</p>
            </div>
            <Button
            className="mt-4 hero-button-primary"
            onClick={() => handleSelectInjury(injury)}
            >
            Continue
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
