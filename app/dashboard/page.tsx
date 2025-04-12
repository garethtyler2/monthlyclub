"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";
import { Clipboard } from "lucide-react";
import RecentlyViewed from "@/components/RecentlyViewed"
import { LoadingOverlay } from "@/components/ui/loading-overlay"

export default function DashboardPage() {
  console.log("🚀 Dashboard page loaded");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      

      if (data?.user) {
        setUser(data.user);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  // ✅ Wait for Supabase to finish
  if (loading) return <LoadingOverlay show message="Loading your dashboard..." />

  // ✅ Only redirect after we *know* there's no user
  if (!user) {
    console.log("🚨 No user found, redirecting to login");
    router.push("/login");
    return null;
  }

  // ✅ Fake saved items array for testing
  const userSavedItems: any[] = []; // TEMP - will replace with real DB data


  return (
<div className="flex flex-col items-center px-4 py-10 w-full max-w-4xl mx-auto">
  <h1 className="mb-4 animate-fade-in text-4xl sm:text-5xl font-bold leading-tight py-6 text-center">
    <span className="block">Welcome</span>
            <span className="block text-lg sm:text-2xl text-muted-foreground mt-2">
              <span className="gradient-text">{user.email}</span>
            </span>
            </h1>
      <section className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Saved Programs</h2>
  
        <div className="grid grid-cols-1 gap-6">
          {userSavedItems.length > 0 ? (
            userSavedItems.map((item, i) => (
              <DashboardCard
                key={i}
                title={item.title}
                description={item.description}
                icon={Clipboard}
                link={`/dashboard/item/${item.id}`}
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
