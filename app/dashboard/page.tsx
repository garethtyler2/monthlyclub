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
      // Step 1: Authenticate and get the logged-in user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      // Step 2: Fetch all complaints tied to the user
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

      // Step 3: Fetch all injuries tied to those complaints by joining complaint_injuries and injuries tables
      // First, get all complaint IDs
      const complaintIds = complaints.map(c => c.id);

      if (complaintIds.length === 0) {
        // No complaints, so no injuries
        setInjuriesByComplaint({});
        setLoading(false);
        return;
      }

      // Fetch injuries linked to complaints
      // Assuming a join between complaint_injuries and injuries tables
      const { data: complaintInjuries, error: complaintInjuriesError } = await supabase
      .from("complaint_injuries")
      .select(`
        id,
        complaint_id,
        created_at,
        injuries (
          id,
          title,
          description,
          self_test,
          created_at
        )
      `)
      .in("complaint_id", complaintIds)
      .eq("viewed_by_user", true)
      .order("created_at", { foreignTable: "injuries", ascending: false });

      if (complaintInjuriesError) {
        console.error("❌ Failed to fetch complaint injuries:", complaintInjuriesError);
        return;
      }

      // Step 4: Group injuries by complaint for dashboard display
      const grouped: Record<string, any[]> = {};

      complaintInjuries.forEach(ci => {
        const complaintId = ci.complaint_id;
        const injury = ci.injuries;
        if (!grouped[complaintId]) {
          grouped[complaintId] = [];
        }
        if (injury) {
          grouped[complaintId].push(injury);
        }
      });

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

    // Delete from complaint_injuries join table using both injury_id and complaint_id
    // to ensure the correct association is removed.
    const { error } = await supabase.from("complaint_injuries").delete()
      .eq("injury_id", injuryId)
      .eq("complaint_id", parentComplaintId);
    if (error) console.error("Failed to remove injury:", error);
  };

  if (loading) return <LoadingOverlay show message="Loading your dashboard..." />;
  const transformed = userComplaints.map(complaint => ({
    id: complaint.id,
    title: toTitleCase(complaint.location),
    subtitle: complaint.summary_label ?? "",
    savedItems: injuriesByComplaint[complaint.id]?.map(injury => ({
      id: injury.id,
      title: toTitleCase(injury.title),
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