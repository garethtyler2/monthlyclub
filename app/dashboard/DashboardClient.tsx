// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import SearchDashboard from "@/components/dashboard/SearchDashboard";
import PrehabDashboard from "@/components/dashboard/PrehabDashboardCard";
import PersonalTrainingDashboardCard from "@/components/dashboard/PersonalTrainingDashboardCard";
import { useRehabParams } from '@/hooks/useRehabParams';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userComplaints, setUserComplaints] = useState<any[]>([]);
  const [injuriesByComplaint, setInjuriesByComplaint] = useState<Record<string, any[]>>({});
  const [showChartMap, setShowChartMap] = useState<Record<string, boolean>>({});
  const [selectedTab, setSelectedTab] = useState("Rehab");
  const [prehabPlans, setPrehabPlans] = useState<any[]>([]);
  const [personalPlans, setPersonalPlans] = useState<any[]>([]);
  const router = useRouter();
  const { injury, complaintId, isValid } = useRehabParams();
  const toggleChart = (complaintId: string) => {
    setShowChartMap(prev => ({
      ...prev,
      [complaintId]: !prev[complaintId],
    }));
  };

  useEffect(() => {
    const getUserAndComplaints = async () => {
      // Step 1: Authenticate and get the logged-in user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      // Step 2: Fetch all complaints tied to the user, including rankedInjuryCodes
      const { data: complaints, error: complaintsError } = await supabase
        .from("complaints")
        .select("id, location, summary_label, created_at, rankedInjuryCodes")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (complaintsError) {
        console.error("❌ Failed to fetch complaints:", complaintsError);
        return;
      }

      setUserComplaints(complaints);

      const { data: prehabData, error: prehabError } = await supabase
        .from("prehab_plans")
        .select("id, search_term, summary, title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (prehabError) {
        console.error("❌ Failed to fetch prehab plans:", prehabError);
      }
      setPrehabPlans(prehabData || []);

      const { data: personalData, error: personalError } = await supabase
        .from("personal_training_plans")
        .select("id, title, summary, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (personalError) {
        console.error("❌ Failed to fetch personal training plans:", personalError);
      }
      setPersonalPlans(personalData || []);

      // Step 3: Fetch viewed injuries via complaint_injuries join
      const complaintIds = complaints.map(c => c.id);
      const { data: complaintInjuries, error: complaintInjuriesError } = await supabase
        .from("complaint_injuries")
        .select(`
          id,
          complaint_id,
          viewed_at,
          injuries (
            id,
            title,
            description,
            created_at
          )
        `)
        .in("complaint_id", complaintIds)
        .eq("viewed_by_user", true);


      if (complaintInjuriesError) {
        console.error("❌ Failed to fetch viewed injuries:", complaintInjuriesError);
      }
      
      const grouped: Record<string, any[]> = {};
      (complaintInjuries || []).forEach(ci => {
        const complaintId = ci.complaint_id;
        const injury = ci.injuries;
        if (!grouped[complaintId]) grouped[complaintId] = [];
        if (injury) {
          grouped[complaintId].push({
            ...injury,
            viewed_at: ci.viewed_at,
          });
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

  if (loading || !user) {
    return <LoadingOverlay show message="Loading your dashboard..." />;
  }
  const transformed = userComplaints.map(complaint => {
    const savedInjuries = injuriesByComplaint[complaint.id] || [];
    const topInjuryTitle = savedInjuries.length > 0 ? savedInjuries[0].title : undefined;

    return {
      id: complaint.id,
      title: (complaint.location),
      subtitle: complaint.summary_label ?? "",
      savedItems: savedInjuries.map(injury => ({
        id: injury.id,
        title: (injury.title),
        description: injury.viewed_at
          ? `💾 Saved on ${new Date(injury.viewed_at).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`
          : "Saved Injury Detail",
        parentComplaintId: complaint.id,
      })),
      rankedInjuryCodes: complaint.rankedInjuryCodes ?? [],
      injuryName: complaint.id === complaintId ? injury : topInjuryTitle,
    };
  });

  const transformedPrehab = prehabPlans.map(plan => ({
    id: plan.id,
    title: plan.title,
    subtitle: plan.summary,
    url: `/prehab-plan?planId=${plan.id}`,
  }));

  const transformedPersonal = personalPlans.map(plan => ({
    id: plan.id,
    title: plan.title,
    subtitle: plan.summary,
    url: `/personal-training-plan?planId=${plan.id}`,
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

  <div className="flex justify-center mt-6 mb-4">
    <div className="inline-flex items-center justify-center rounded-lg border border-border bg-muted p-1">
      {["Rehab", "Prehab", "Personal Training"].map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            tab === selectedTab
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>

  {selectedTab === "Rehab" && (
    <SearchDashboard
      searches={transformed.map(search => ({
        ...search,
        urlComplaintId: complaintId,
      }))}
      onRemoveInjury={handleRemoveInjury}
      onRemoveComplaint={handleRemoveComplaint}
      showChartMap={showChartMap}
      onToggleChart={toggleChart}
    />
  )}

  {selectedTab === "Prehab" && (
    <PrehabDashboard plans={transformedPrehab} />
  )}

  {selectedTab === "Personal Training" && (
    <PersonalTrainingDashboardCard plans={transformedPersonal} />
  )}

  {userComplaints.length === 0 && (
    <div className="text-center mb-10 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4">No activity yet</h2>
      <p className="text-muted-foreground mb-6">
        Ready to start your recovery journey?
      </p>
      <button
        onClick={() => router.push("/injury-diagnosis")}
        className="hero-button-primary"
      >
        Get Started with Injury Diagnosis
      </button>
    </div>
  )}
</>

  );
}