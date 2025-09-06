"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import PurchaseHistoryView from "@/components/dashboard/PurchaseHistoryView";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Button } from "@/components/ui/button";

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">Please log in to access your dashboard</h1>
          <Button onClick={() => window.location.href = "/login"}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Background Gradients */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
      <div className="fixed -bottom-24 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      


      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Purchase History */}
        <div className="mb-8">
          <PurchaseHistoryView userId={user.id} />
        </div>
      </div>
    </div>
  );
}