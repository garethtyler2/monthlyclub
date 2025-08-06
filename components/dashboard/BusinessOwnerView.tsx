"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, Users } from "lucide-react";

interface BusinessOwnerViewProps {
  businessId: string;
}

export function BusinessOwnerView({ businessId }: BusinessOwnerViewProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [futurePayouts, setFuturePayouts] = useState<number | null>(null);
  const [totalEarnedToDate, setTotalEarnedToDate] = useState<number | null>(null);
  const [totalSubscribers, setTotalSubscribers] = useState<number>(0);

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

      // Calculate total subscribers
      const totalSubs = enrichedProducts.reduce((sum, p) => sum + p.subscriberCount, 0);
      setTotalSubscribers(totalSubs);

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white/5 border-white/10">
            <CardContent className="p-5">
              <div className="animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-white/10 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Earned to Date */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:bg-green-500/15 transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-xs font-medium text-green-300 uppercase tracking-wide">
              Total Earned
            </div>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-green-200">
              {totalEarnedToDate !== null ? `£${(totalEarnedToDate / 100).toFixed(2)}` : "—"}
            </p>
            <p className="text-xs text-green-300/70 mt-1">
              All successful customer payments received
            </p>
          </div>
          <div className="text-[10px] text-green-300/50 italic">
            * Before fees
          </div>
        </CardContent>
      </Card>

      {/* Future Payouts */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20 hover:bg-blue-500/15 transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-xs font-medium text-blue-300 uppercase tracking-wide">
              Future Payouts
            </div>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-blue-200">
              {futurePayouts !== null ? `£${(futurePayouts / 100).toFixed(2)}` : "—"}
            </p>
            <p className="text-xs text-blue-300/70 mt-1">
              Payments can take up to 7 days to reach your bank
            </p>
          </div>
        </CardContent>
      </Card>

      {/* This Month's Scheduled Income */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/20 hover:bg-purple-500/15 transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-xs font-medium text-purple-300 uppercase tracking-wide">
              This Month
            </div>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-purple-200">
              £{(expectedThisMonth / 100).toFixed(2)}
            </p>
            <p className="text-xs text-purple-300/70 mt-1">
              Based on all scheduled payments this month
            </p>
          </div>
          <div className="text-[10px] text-purple-300/50 italic">
            * Before fees
          </div>
        </CardContent>
      </Card>

      {/* Total Subscribers */}
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 hover:bg-orange-500/15 transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-xs font-medium text-orange-300 uppercase tracking-wide">
              Active Subscribers
            </div>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-orange-200">
              {totalSubscribers}
            </p>
            <p className="text-xs text-orange-300/70 mt-1">
              Across all your products
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Average Revenue Per User */}
      <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20 hover:bg-teal-500/15 transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-xs font-medium text-teal-300 uppercase tracking-wide">
              Avg Revenue
            </div>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-teal-200">
              £{totalSubscribers > 0 ? (expectedThisMonth / totalSubscribers / 100).toFixed(2) : "0.00"}
            </p>
            <p className="text-xs text-teal-300/70 mt-1">
              Per subscriber this month
            </p>
          </div>
        </CardContent>
      </Card>

      
    </div>
  );
}