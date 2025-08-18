"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { AlertTriangle, ArrowLeft, RefreshCw, TrendingUp, TrendingDown, Users, CreditCard, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BusinessOwnerView } from "@/components/dashboard/BusinessOwnerView";
import BusinessProductManager from "@/components/dashboard/BusinessProductManager";
import { ShareButton } from "@/components/shared/ShareButton";

export default function BusinessDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [showStripeReminder, setShowStripeReminder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [businessSlug, setBusinessSlug] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
        const { data: business } = await supabase
          .from("businesses")
          .select("id, name, slug")
          .eq("user_id", user.id)
          .single();

        if (business) {
          setBusinessId(business.id);
          setBusinessName(business.name);
          setBusinessSlug(business.slug);

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
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              
              <div className="hidden sm:block w-px h-6 bg-white/20" />
              <div>
                <h1 className="text-xl font-semibold text-white">Business Dashboard</h1>
                {businessName && (
                  <p className="text-sm text-muted-foreground">{businessName}</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 w-full sm:w-auto">
              {businessSlug && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/businesses/${businessSlug}`, '_blank')}
                    className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    View Business Page
                  </Button>
                  <ShareButton
                    url={`${window.location.origin}/businesses/${businessSlug}`}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stripe Verification Alert */}
        {showStripeReminder && (
          <Card className="mb-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-yellow-400 mt-1 w-5 h-5" />
                  <div>
                    <h2 className="text-yellow-200 font-semibold">Action Needed: Verify your ID</h2>
                    <p className="text-yellow-300/80 text-sm">
                      Stripe requires ID verification to continue receiving payouts.
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <Button
                    onClick={handleVerifyClick}
                    className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    Verify Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Business Overview</h2>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Active
            </Badge>
          </div>
          <BusinessOwnerView businessId={businessId!} />
        </div>

        {/* Products Section */}
        <div className="mb-8">
          
          <BusinessProductManager businessId={businessId!} />
        </div>

      </div>
    </div>
  );
}