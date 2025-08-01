"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface BusinessOwnerViewProps {
  businessId: string;
}

export function BusinessOwnerView({ businessId }: BusinessOwnerViewProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [futurePayouts, setFuturePayouts] = useState<number | null>(null);
  const [totalEarnedToDate, setTotalEarnedToDate] = useState<number | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const { data: productData } = await supabase
        .from("products")
        .select("price, id")
        .eq("business_id", businessId);

      const enrichedProducts = await Promise.all(
        (productData || []).map(async (product) => {
          const { count } = await supabase
            .from("subscriptions")
            .select("id", { count: "exact" })
            .eq("product_id", product.id)
            .eq("status", "active");

          return {
            ...product,
            subscriberCount: count || 0,
          };
        })
      );
      setProducts(enrichedProducts);

      const { data: payments } = await supabase
        .from("payments")
        .select("amount")
        .eq("business_id", businessId)
        .eq("status", "succeeded");

      const total = payments?.reduce((sum, p) => sum + (typeof p.amount === "number" ? p.amount : 0), 0) || 0;
      setTotalEarnedToDate(total);

      try {
        const res = await fetch("/api/stripe/business-overview");
        const stripeData = await res.json();
        const payoutAmount = typeof stripeData.futurePayouts === "number" && !isNaN(stripeData.futurePayouts)
          ? stripeData.futurePayouts
          : 0;
        setFuturePayouts(payoutAmount);
      } catch (error) {
        console.error("Failed to fetch Stripe overview", error);
      }

      setLoading(false);
    };

    fetchStats();
  }, [businessId]);

  const expectedThisMonth = products.reduce(
    (sum, p) => sum + (typeof p.price === "number" ? p.price * p.subscriberCount : 0),
    0
  ) * 100;

  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-muted-foreground">Loading business stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
          <div className="rounded-xl border border-green-400/20 bg-green-500/10 p-5">
            <p className="text-sm font-medium text-muted-foreground">Total Earned to Date</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-green-300">
              {totalEarnedToDate !== null ? `£${(totalEarnedToDate / 100).toFixed(2)}` : "—"}*
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Total value of all successful customer payments received.
            </p>
            <p className="text-[10px] text-muted-foreground italic">
              * Before fees.
            </p>
          </div>

          <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-5">
            <p className="text-sm font-medium text-muted-foreground">Future Payouts</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-blue-300">
              {futurePayouts !== null ? `£${(futurePayouts / 100).toFixed(2)}` : "—"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Payments from customers can take up to 7 days to reach your bank account.
            </p>
          </div>

          <div className="rounded-xl border border-purple-400/20 bg-purple-500/10 p-5">
            <p className="text-sm font-medium text-muted-foreground">This Month’s Scheduled Income</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-purple-300">
              £{(expectedThisMonth / 100).toFixed(2)}*
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Based on all scheduled payments for this calendar month.
            </p>
            <p className="text-[10px] text-muted-foreground italic">
              * Before fees.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}