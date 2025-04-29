// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import SearchDashboard from "@/components/SearchDashboard";
import { toTitleCase } from "@/lib/utils";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userComplaints, setUserComplaints] = useState<any[]>([]);
  const [injuriesByComplaint, setInjuriesByComplaint] = useState<Record<string, any[]>>({});
  const router = useRouter();

  useEffect(() => {
    const getUserAndComplaints = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      const { data: complaints, error: complaintsError } = await supabase
        .from("complaints")
        .select("id, location, summary_label, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (complaintsError) {
        console.error("❌ Failed to fetch complaints:", complaintsError);
        return;
      }

      setUserComplaints(complaints);

      const { data: injuries, error: injuriesError } = await supabase
        .from("injury_details")
        .select("id, complaint_id, injury_title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (injuriesError) {
        console.error("❌ Failed to fetch injuries:", injuriesError);
        return;
      }

      const grouped = complaints.reduce((acc: Record<string, any[]>, complaint) => {
        acc[complaint.id] = injuries.filter(i => i.complaint_id === complaint.id);
        return acc;
      }, {});

      setInjuriesByComplaint(grouped);
      setLoading(false);
    };

    getUserAndComplaints();
  }, [router]);

  const handleRemoveComplaint = async (complaintId: string) => {
    setUserComplaints(cs => cs.filter(c => c.id !== complaintId));
    const updatedInjuries = { ...injuriesByComplaint };
    delete updatedInjuries[complaintId];
    setInjuriesByComplaint(updatedInjuries);

    const { error } = await supabase.from("complaints").delete().eq("id", complaintId);
    if (error) console.error("Failed to remove complaint:", error);
  };

  const handleRemoveInjury = async (injuryId: string, parentComplaintId: string) => {
    setInjuriesByComplaint(prev => {
      const copy = { ...prev };
      copy[parentComplaintId] = copy[parentComplaintId].filter(i => i.id !== injuryId);
      return copy;
    });

    const { error } = await supabase.from("injury_details").delete().eq("id", injuryId);
    if (error) console.error("Failed to remove injury:", error);
  };

  if (loading) return <LoadingOverlay show message="Loading your dashboard..." />;
  const transformed = userComplaints.map(complaint => ({
    id: complaint.id,
    title: toTitleCase(complaint.location),
    subtitle: complaint.summary_label ?? "",
    savedItems: injuriesByComplaint[complaint.id]?.map(injury => ({
      id: injury.id,
      title: injury.injury_title,
      description: injury.created_at
        ? `💾 Saved on ${new Date(injury.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`
        : "Saved Injury Detail",
      parentComplaintId: complaint.id,
    })) || [],
  }));
  
  

  return (
    <>
  <div className="w-full px-4 text-center">
    <h1 className="animate-fade-in text-4xl sm:text-5xl font-bold leading-tight">
      <span className="block">Welcome</span>
      <span className="block text-lg sm:text-2xl text-muted-foreground mt-2">
        <span className="gradient-text">{user.email}</span>
      </span>
    </h1>
  </div>

  <SearchDashboard
    searches={transformed}
    onRemoveInjury={handleRemoveInjury}
    onRemoveComplaint={handleRemoveComplaint}
  />
</>

  );
}