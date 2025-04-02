"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-500">Dashboard</h1>
      <p className="text-muted-foreground">Welcome, {user.email}</p>
    </div>
  );
}
