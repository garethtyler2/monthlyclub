"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface BusinessOwnerViewProps {
  businessId: string;
}

export function BusinessOwnerView({ businessId }: BusinessOwnerViewProps) {
  const [payments, setPayments] = useState<any[]>([]);
  const [scheduledPayments, setScheduledPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const { data: paymentData } = await supabase
        .from("payments")
        .select("*")
        .eq("business_id", businessId)
        .eq("status", "paid");

      const { data: upcoming } = await supabase
        .from("scheduled_payments")
        .select("*")
        .eq("business_id", businessId);

      setPayments(paymentData || []);
      setScheduledPayments(upcoming || []);
      setLoading(false);
    };

    fetchStats();
  }, [businessId]);

  const totalEarned = payments.reduce((sum, p) => sum + p.amount, 0);
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const paymentsThisMonth = payments.filter((p) => {
    const paidDate = new Date(p.paid_at);
    return paidDate.getMonth() === currentMonth && paidDate.getFullYear() === currentYear;
  });
  const totalThisMonth = paymentsThisMonth.reduce((sum, p) => sum + p.amount, 0);
  const expectedThisMonth = scheduledPayments.filter(p => {
    const scheduledDate = new Date(p.scheduled_for);
    return (
      scheduledDate.getMonth() === currentMonth &&
      scheduledDate.getFullYear() === currentYear &&
      p.status === "scheduled"
    );
  }).reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-muted-foreground">Loading business stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-semibold">£{(totalEarned / 100).toFixed(2)}</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Revenue This Month</p>
            <p className="text-2xl font-semibold">£{(totalThisMonth / 100).toFixed(2)}</p>
          </div>
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