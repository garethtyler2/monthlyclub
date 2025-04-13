"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Injury = {
  injury_name: string
  description: string
  self_test: string
}

export default function InjuryResultsPage() {
  const [injuries, setInjuries] = useState<Injury[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()

  const complaintId = searchParams.get("complaintId")

  useEffect(() => {
    const fetchInjuries = async () => {
      if (!complaintId) return

      const { data, error } = await supabase
        .from("injury_options")
        .select("injury_name, description, self_test")
        .eq("primary_complaint_id", complaintId)

      if (error) {
        console.error("Failed to load injuries", error)
        return
      }

      setInjuries(data)
    }

    fetchInjuries()
  }, [complaintId])

  const handleSelectInjury = (injury: string) => {
    router.push(`/injury-detail?complaintId=${complaintId}&injury=${encodeURIComponent(injury)}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl pt-10 font-bold">Possible Injuries</h1>

      {injuries.length === 0 && <p className="text-muted-foreground">No injuries found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {injuries.map((injury, i) => (
          <Card key={i} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{injury.injury_name}</h2>
              <Badge variant="outline">#{i + 1}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{injury.description}</p>
            <div>
              <h4 className="text-sm font-large text-white">Self Test</h4>
              <p className="text-sm text-muted-foreground">{injury.self_test}</p>
            </div>
            <Button
              className="mt-4 hero-button-primary"
              onClick={() => handleSelectInjury(injury.injury_name)}
            >
              Continue
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
