"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import UserSubscriptionsView from "@/components/dashboard/UserSubscriptionsView";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { ArrowLeft, RefreshCw, CreditCard, Calendar, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionStats, setSubscriptionStats] = useState({
    totalActive: 0,
    totalSpent: 0,
    monthlySpend: 0,
    creditBalance: 0
  });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Fetch subscription stats
        const { data: subscriptions } = await supabase
          .from("subscriptions")
          .select("id, status")
          .eq("user_id", user.id);

        const { data: payments } = await supabase
          .from("payments")
          .select("amount, status")
          .eq("user_id", user.id)
          .eq("status", "succeeded");

        const { data: credits } = await supabase
          .from("user_credits")
          .select("balance")
          .eq("user_id", user.id);

        const activeSubs = subscriptions?.filter(s => s.status === "active").length || 0;
        const totalSpent = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
        const creditBalance = credits?.reduce((sum, c) => sum + (c.balance || 0), 0) || 0;

        setSubscriptionStats({
          totalActive: activeSubs,
          totalSpent: totalSpent / 100, // Convert from pence
          monthlySpend: (totalSpent / 100) / Math.max(1, activeSubs), // Average per subscription
          creditBalance: creditBalance / 100
        });
      }
      
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
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block w-px h-6 bg-white/20" />
              <div>
                <h1 className="text-lg font-semibold text-white">My Subscriptions</h1>
                <p className="text-sm text-muted-foreground">Manage your active subscriptions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-white">{subscriptionStats.totalActive}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-green-400">
                    £{subscriptionStats.totalSpent.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Spend</p>
                  <p className="text-2xl font-bold text-purple-400">
                    £{subscriptionStats.monthlySpend.toFixed(2)}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Credit Balance</p>
                  <p className="text-2xl font-bold text-orange-400">
                    £{subscriptionStats.creditBalance.toFixed(2)}
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscriptions List */}
        <div className="mb-8">

          <UserSubscriptionsView userId={user.id} />
        </div>
      </div>
    </div>
  );
}