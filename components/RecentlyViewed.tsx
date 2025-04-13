"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import DashboardCard from "@/components/DashboardCard"
import { History } from "lucide-react"

type RecentlyViewed = {
  id: string
  injury_title: string
  body_part: string
  raw_injury_data: any
}

export default function RecentlyViewedSection({ userId }: { userId: string }) {
  const [recent, setRecent] = useState<RecentlyViewed[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      const { data, error } = await supabase
        .from("recently_viewed_injuries")
        .select("*")
        .eq("user_id", userId)
        .order("viewed_on", { ascending: false })
        .limit(5)

      if (error) {
        console.error("Error loading recently viewed:", error.message)
      } else {
        setRecent(data || [])
      }

      setLoading(false)
    }

    fetchRecentlyViewed()
  }, [userId])

  if (loading) return <p className="text-center text-sm text-muted-foreground">Loading...</p>

  if (recent.length === 0) {
    return (
      <DashboardCard
        title="No recent injuries"
        description="Once you view injury details, they’ll appear here!"
        icon={History}
        fallback={true}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {recent.map((item) => (
        <DashboardCard
          key={item.id}
          title={item.injury_title}
          description={`Body Part: ${item.body_part}`}
          icon={History}
          link={`/injury-detail?id=${item.id}`} 
        />
      ))}
    </div>
  )
}
