"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";
import { Clipboard } from "lucide-react";

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
  if (loading) return null;

  // ✅ Only redirect after we *know* there's no user
  if (!user) {
    console.log("🚨 No user found, redirecting to login");
    router.push("/login");
    return null;
  }

  // ✅ Fake saved items array for testing
  const userSavedItems: any[] = []; // TEMP - will replace with real DB data


  return (
    <div >
      <h1 className="p-6 text-3xl font-bold text-blue-500">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome, {user.email}</p>

      <section className="py-10 px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-6">Your Saved Programs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
