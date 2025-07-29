"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusinessOwnerView } from "@/components/dashboard/BusinessOwnerView";
import BusinessProductManager from "@/components/dashboard/BusinessProductManager";

export default function BusinessDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [showStripeReminder, setShowStripeReminder] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

          const { data: scheduledPayments } = await supabase
            .from("scheduled_payments")
            .select("id, business_id")
            .eq("status", "active");

          const hasActive = scheduledPayments?.some(
            (p) => p.business_id === business.id
          );

          if (hasActive) {
            try {
              const res = await fetch("/api/stripe/check-requirements");
              const result = await res.json();
              if (result.needsID) {
                setShowStripeReminder(true);
              }
            } catch (err) {
              console.error("Error checking Stripe requirements:", err);
            }
          }
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleVerifyClick = async () => {
    if (!user || !businessId) return;

    await supabase
      .from("businesses")
      .update({ stripe_verification_prompt_dismissed: true })
      .eq("id", businessId);

    window.location.href = "/api/stripe/update-business-details";
  };

  if (loading) return <LoadingOverlay show message="Loading your dashboard..." />;

  if (!user) {
    return <div className="text-center py-20"><h1>Please log in to access your dashboard</h1></div>;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      {showStripeReminder && (
        <Card className="p-4 bg-yellow-50 border-l-4 border-yellow-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-600 mt-1" />
              <div>
                <h2 className="text-yellow-800 font-semibold">Action Needed: Verify your ID</h2>
                <p className="text-yellow-700 text-sm">
                  Stripe requires ID verification to continue receiving payouts.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <Button
                onClick={handleVerifyClick}
                className="w-full sm:w-auto bg-yellow-600 text-white hover:bg-yellow-700 hover:text-white"
              >
                Verify Now
              </Button>
            </div>
          </div>
        </Card>
      )}

      <h1 className="text-2xl font-semibold text-white">Business Overview</h1>
      <BusinessOwnerView businessId={businessId!} />

      <h2 className="text-lg font-semibold text-white">Your Products</h2>
      <BusinessProductManager businessId={businessId!} />
    </section>
  );
}