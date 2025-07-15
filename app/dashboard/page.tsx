"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import UserSubscriptionsView from "@/components/dashboard/UserSubscriptionsView";
import { BusinessOwnerView } from "@/components/dashboard/BusinessOwnerView";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import BusinessProductManager from "@/components/dashboard/BusinessProductManager";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStripeReminder, setShowStripeReminder] = useState(false);

  useEffect(() => {
    const fetchUserAndBusiness = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: business } = await supabase
          .from("businesses")
          .select("id, stripe_verification_prompt_dismissed")
          .eq("user_id", user.id)
          .single();

        if (business) {
          setBusinessId(business.id);

          const { data: scheduledPayments } = await supabase
            .from("scheduled_payments")
            .select("id, business_id")
            .eq("status", "active")
            .limit(10);

          const hasActivePaymentsForBusiness = scheduledPayments?.some(
            (payment) => payment.business_id === business.id
          );

          if (hasActivePaymentsForBusiness && !business.stripe_verification_prompt_dismissed) {
            setShowStripeReminder(true);
          }
        }
      }

      setLoading(false);
    };

    fetchUserAndBusiness();
  }, []);

  const handleVerifyClick = async () => {
    if (!user || !businessId) return;

    const { error } = await supabase
      .from("businesses")
      .update({ stripe_verification_prompt_dismissed: true })
      .eq("id", businessId);

    if (error) {
      console.error("Failed to update verification prompt status:", error);
      return;
    }

    window.location.href = "/api/stripe/update-business-details";
  };

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
          {showStripeReminder && (
            <Card className="p-3 md:p-4 bg-yellow-50 border-l-4 border-yellow-500 shadow-md mb-6 animate-fade-in">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start md:items-center gap-3">
                  <AlertTriangle className="text-yellow-600" />
                  <div>
                    <h2 className="text-yellow-800 font-semibold text-sm md:text-base">Action Needed: Verify your ID with Stripe</h2>
                    <p className="text-yellow-700 text-xs md:text-sm">
                      To keep receiving payouts from customers, Stripe requires you to upload a valid identity document.
                      Please complete this step to avoid payout delays.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-auto flex justify-center md:justify-start">
                  <Button
                    onClick={handleVerifyClick}
                    className="bg-yellow-600 text-white hover:bg-yellow-700 mt-3 md:mt-0"
                  >
                    Verify Now
                  </Button>
                </div>
              </div>
            </Card>
          )}
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