"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import UserSubscriptionsView from "@/components/dashboard/UserSubscriptionsView";
import { BusinessOwnerView } from "@/components/dashboard/BusinessOwnerView";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import BusinessProductManager from "@/components/dashboard/BusinessProductManager";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndBusiness = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: business } = await supabase
          .from("businesses")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (business) {
          setBusinessId(business.id);
        }
      }

      setLoading(false);
    };

    fetchUserAndBusiness();
  }, []);

  if (loading) {
    return <LoadingOverlay show message="Loading your dashboard..." />;
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold">Please log in to access your dashboard</h1>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-6">

      {businessId && (
        <>
          <h1 className="text-2xl font-semibold text-white">Business Overview</h1>
          <BusinessOwnerView businessId={businessId} />

          <h2 className="text-lg font-semibold text-white">Your Products</h2>
          <BusinessProductManager businessId={businessId} />
        </>
      )}

      <>
        <h2 className="text-2xl font-semibold text-white">Your Subscriptions</h2>
        <UserSubscriptionsView userId={user.id} />
      </>
    </section>
  );
}