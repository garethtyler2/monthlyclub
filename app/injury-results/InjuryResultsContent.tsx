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
  injury_code: number;
  title: string;
  description: string;
}

export default function InjuryResultsPage() {
  const [injuries, setInjuries] = useState<Injury[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const complaintId = searchParams.get("complaintId")

// useEffect fetches rankedInjuryCodes from complaints table and then fetches full injury details for those codes.
// It sorts injuries according to the ranking and sets them to local injuries state.
useEffect(() => {
  const fetchInjuries = async () => {
    if (!complaintId) return

    console.log("Fetching complaint for ID:", complaintId);

    const { data: complaint, error } = await supabase
      .from("complaints")
      .select("rankedInjuryCodes")
      .eq("id", complaintId)
      .single();

    if (!complaint) {
      console.error("No complaint found for ID:", complaintId);
      setLoading(false);
      return;
    }

    if (error) {
      console.error("Failed to load complaint", error)
      setLoading(false)
      return
    }

    if (!complaint?.rankedInjuryCodes || complaint.rankedInjuryCodes.length === 0) {
      setInjuries([])
      setLoading(false)
      return
    }

    const { data: injuriesData, error: injuriesError } = await supabase
      .from("injuries")
      .select("injury_code, title, description")
      .in("injury_code", complaint.rankedInjuryCodes);

    if (injuriesError) {
      console.error("Failed to load injuries", injuriesError)
      setLoading(false)
      return
    }

    const sortedInjuries = complaint.rankedInjuryCodes.map((code: number) =>
      injuriesData.find((inj: any) => inj.injury_code === code)
    ).filter(Boolean);

    setInjuries(sortedInjuries as Injury[])
    setLoading(false)
  }

  fetchInjuries()
}, [complaintId])

const handleSelectInjury = (injury: string) => {
  router.push(
    `/injury-detail?complaintId=${complaintId}&injury=${encodeURIComponent(injury)}&loading=true`
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
