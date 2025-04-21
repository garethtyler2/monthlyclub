"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";
import { Clipboard } from "lucide-react";
import RecentlyViewed from "@/components/RecentlyViewed"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { Button } from "@/components/ui/button"
import { toTitleCase } from "@/lib/utils"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userComplaints, setUserComplaints] = useState<any[]>([])
  const [injuriesByComplaint, setInjuriesByComplaint] = useState<Record<string, any[]>>({})
  const router = useRouter()

  useEffect(() => {
    const getUserAndComplaints = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
        return
      }

      setUser(user)

      const { data: complaints, error: complaintsError } = await supabase
        .from("complaints")
        .select("id, location, summary_label, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (complaintsError) {
        console.error("❌ Failed to fetch complaints:", complaintsError)
        return
      }

      setUserComplaints(complaints)

      // Now fetch all injuries linked to each complaint
      const { data: injuries, error: injuriesError } = await supabase
        .from("injury_details")
        .select("id, complaint_id, injury_title")
        .eq("user_id", user.id)

      if (injuriesError) {
        console.error("❌ Failed to fetch injuries:", injuriesError)
        return
      }

      const grouped = complaints.reduce((acc: Record<string, any[]>, complaint) => {
        acc[complaint.id] = injuries.filter(i => i.complaint_id === complaint.id)
        return acc
      }, {})

      setInjuriesByComplaint(grouped)
      setLoading(false)
    }

    getUserAndComplaints()
  }, [router])

  if (loading) return <LoadingOverlay show message="Loading your dashboard..." />

  return (
    <div className="flex flex-col items-center px-4 py-10 w-full max-w-4xl mx-auto">
      <h1 className="mb-4 animate-fade-in text-4xl sm:text-5xl font-bold leading-tight py-6 text-center">
        <span className="block">Welcome</span>
        <span className="block text-lg sm:text-2xl text-muted-foreground mt-2">
          <span className="gradient-text">{user.email}</span>
        </span>
      </h1>

      <section className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Rehab Cases</h2>

        <div className="grid grid-cols-1 gap-6">
          {userComplaints.length > 0 ? (
            userComplaints.map((complaint, i) => (
              <DashboardCard
                key={i}
                title={toTitleCase(complaint.location)}
                description={complaint.summary_label ?? "No summary yet"}
                icon={Clipboard}
                footer={
                  <div className="space-y-2">
                    <Button
                      className="w-full hero-button-primary"
                      onClick={() => router.push(`/injury-results?complaintId=${complaint.id}`)}
                    >
                      View Injury Suggestions
                    </Button>
                    {injuriesByComplaint[complaint.id]?.map((injury) => (
                      <DashboardCard
                        key={injury.id}
                        title={injury.injury_title}
                        description="Saved Injury Detail"
                        icon={Clipboard}
                        footer={
                          <Button
                            className="w-full hero-button-primary"
                            onClick={() =>
                              router.push(`/injury-detail?id=${injury.id}`)
                            }
                          >
                            View Details
                          </Button>
                        }
                      />
                    ))}
                  </div>
                }
              />
            ))
          ) : (
            <DashboardCard
              title="No saved programs"
              description="Once you start saving rehab or training plans, they'll show up here!"
              icon={Clipboard}
              fallback={true}
            />
          )}
        </div>
      </section>

      <section className="w-full max-w-6xl mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Recently Viewed Injuries</h2>
        <RecentlyViewed userId={user.id} />
      </section>
    </div>
  );
} 