"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import UserSubscriptionsView from "@/components/dashboard/UserSubscriptionsView";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

export default function SubscriptionDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <LoadingOverlay show message="Loading your dashboard..." />;

  if (!user) {
    return <div className="text-center py-20"><h1>Please log in to access your dashboard</h1></div>;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-2xl font-semibold text-white">Your Subscriptions</h2>
      <UserSubscriptionsView userId={user.id} />
    </section>
  );
}