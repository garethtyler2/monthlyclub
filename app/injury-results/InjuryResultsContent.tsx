"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { toTitleCase } from "@/lib/utils";


type Injury = {
  title: string
  description: string
  self_test: string
}

export default function InjuryResultsPage() {
  const [injuries, setInjuries] = useState<Injury[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const complaintId = searchParams.get("complaintId")

// useEffect fetches all injuries linked to a specific complaint via the complaint_injuries join table.
// It sets the result to the local injuries state after extracting nested injury records.
useEffect(() => {
  const fetchInjuries = async () => {
    // Exit early if no complaintId is available in the URL.
    if (!complaintId) return

    // ✅ Fetch linked injuries via join table
    const { data, error } = await supabase
      .from("complaint_injuries")
      .select("injuries(title, description, self_test)")
      .eq("complaint_id", complaintId)

    if (error) {
      console.error("Failed to load injuries", error)
    } else {
      // Each entry contains a nested 'injuries' object due to the join query — we extract and flatten these.
      setInjuries(data.map((entry: any) => entry.injuries))
    }

    setLoading(false)
  }

  fetchInjuries()
}, [complaintId])

// Navigate to the injury detail page for the selected injury, keeping track of complaintId in the URL.
const handleSelectInjury = (injury: string) => {
  router.push(
    `/injury-detail?complaintId=${complaintId}&injury=${encodeURIComponent(injury)}&loading=true`
    // Note: `loading=true` likely triggers a loading state in the next page.
  );
}

  if (loading) return <LoadingOverlay show message="Loading injury results..." />

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-center font-bold">Possible Injuries</h1>

      {injuries.length === 0 && <p className="text-muted-foreground">No injuries found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {injuries.map((injury, i) => (
          <Card key={i} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{toTitleCase(injury.title)}</h2>
              <Badge variant="outline">#{i + 1}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{injury.description}</p>
            <div>
              <h4 className="text-sm font-large text-white">Self Test</h4>
              <p className="text-sm text-muted-foreground">{injury.self_test}</p>
            </div>
            <Button
              className="mt-4 hero-button-primary"
              onClick={() => handleSelectInjury(injury.title)}
            >
              Continue
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
