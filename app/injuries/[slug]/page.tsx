"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { AlertTriangle, Lightbulb, TestTube2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LoadingOverlay } from "@/components/ui/loading-overlay"

export default function InjuryPage() {
  const [detail, setDetail] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { slug } = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchInjury = async () => {
      if (!slug || typeof slug !== 'string') return

      const { data, error } = await supabase
        .from("injuries")
        .select("id, title, details")
        .eq("slug", slug)
        .single()

      if (error || !data?.details) {
        router.replace("/not-found")
        return
      }

      try {
        setDetail({
          id: data.id,
          ...JSON.parse(data.details),
        })
      } catch (err) {
        router.replace("/not-found")
      }

      setIsLoading(false)
    }

    fetchInjury()
  }, [slug, router])

  const handleClick = useCallback(async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
      return
    }

    if (!detail?.title) return

    // Create complaint with injury title as location
    const { data: newComplaint, error: insertError } = await supabase
      .from("complaints")
      .insert({
        user_id: user.id,
        location: detail.title,
      })
      .select()
      .single()

    if (insertError || !newComplaint) {
      console.error("❌ Failed to create complaint:", insertError)
      return
    }

    const complaintId = newComplaint.id

    const { error: linkError } = await supabase
      .from("complaint_injuries")
      .insert({
        complaint_id: complaintId,
        injury_id: detail.id,
      })

    if (!linkError) {
      await supabase
        .from("complaint_injuries")
        .update({
          viewed_by_user: true,
          viewed_at: new Date().toISOString(),
        })
        .eq("complaint_id", complaintId)
        .eq("injury_id", detail.id)
    }

    router.push(`/exercise-list?injury=${encodeURIComponent(detail.title)}&complaintId=${complaintId}`)
  }, [detail, router])

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
            {detail.symptoms.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <TestTube2 size={20} /> Self Tests
          </div>
          <div className="space-y-4">
            {detail.selfTests.map((test: any, i: number) => (
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
            {detail.commonMistakes.map((mistake: string, i: number) => (
              <li key={i}>{mistake}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Lightbulb size={20} /> Tips
          </div>
          <ul className="list-disc list-inside space-y-1">
            {detail.tips.map((tip: string, i: number) => <li key={i}>{tip}</li>)}
          </ul>
        </Card>

        <div className="pt-4">
          <Button className="w-full hero-button-primary" onClick={handleClick}>
            Exercises
          </Button>
        </div>
      </div>
    </div>
  )
}