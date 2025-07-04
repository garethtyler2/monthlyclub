"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface BusinessOwnerViewProps {
  businessId: string;
}

export function BusinessOwnerView({ businessId }: BusinessOwnerViewProps) {
  const [scheduledPayments, setScheduledPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentlyPaidButPending, setRecentlyPaidButPending] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const { data: upcoming } = await supabase
        .from("scheduled_payments")
        .select("*")
        .eq("business_id", businessId);

      setScheduledPayments(upcoming || []);

      try {
        const res = await fetch("/api/stripe/business-overview");
        const stripeData = await res.json();
        setRecentlyPaidButPending(stripeData.recentlyPaidButPending);
      } catch (error) {
        console.error("Failed to fetch Stripe overview", error);
      }

      setLoading(false);
    };

    fetchStats();
  }, [businessId]);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const expectedThisMonth = scheduledPayments
    .filter(p => p.status === "active")
    .reduce((sum, p) => sum + (typeof p.amount === "number" ? p.amount : 0), 0);

  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-muted-foreground">Loading business stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Waiting to be Paid Out</p>
            <p className="text-2xl font-semibold">
                {recentlyPaidButPending !== null ? `£${(recentlyPaidButPending / 100).toFixed(2)}` : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
                Payments from customers can take up to 7 days to reach your bank account.
            </p>
            </div>
          {/* <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Next Payout</p>
            <p className="text-2xl font-semibold">
              {nextPayout !== null ? `£${(nextPayout / 100).toFixed(2)}` : "—"}
            </p>
          </div> */}
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-muted-foreground">This Month’s Scheduled Income</p>
            <p className="text-2xl font-semibold">£{(expectedThisMonth / 100).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on all scheduled payments for this calendar month.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}