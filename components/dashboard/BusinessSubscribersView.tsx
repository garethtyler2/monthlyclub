

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SubscriptionEntry {
  id: string;
  user_id: string;
  product_id: string;
  status: string;
  start_date: string;
  cancel_at: string | null;
  product: {
    name: string;
  };
  user: {
    email: string;
  };
}

export default function BusinessSubscribersView() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Get the business owned by the logged-in user
      const { data: businessData, error: businessError } = await supabase
        .from("businesses")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (businessError || !businessData) {
        console.error("No business found for this user.");
        setLoading(false);
        return;
      }

      // Get product IDs for this business
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("id")
        .eq("business_id", businessData.id);

      if (productsError || !productsData || productsData.length === 0) {
        setSubscriptions([]);
        setLoading(false);
        return;
      }

      const productIds = productsData.map((p: any) => p.id);

      const { data, error } = await supabase
        .from("subscriptions")
        .select("id, user_id, product_id, status, start_date, cancel_at, product(name), user(email)")
        .in("product_id", productIds)
        .order("start_date", { ascending: false });

      if (error) {
        console.error("Error fetching subscriptions:", error);
      } else {
        setSubscriptions(data as SubscriptionEntry[]);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading subscriber data...</p>;

  if (!subscriptions.length)
    return <p className="text-muted-foreground">No subscribers yet.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Subscribers</h2>
      {subscriptions.map((sub) => (
        <Card key={sub.id} className="bg-white/5 border border-white/10">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-white font-medium">
                  {sub.user?.email || "Unknown user"}
                </p>
                <p className="text-muted-foreground text-sm">
                  Subscribed to: <strong>{sub.product?.name}</strong>
                </p>
                <p className="text-muted-foreground text-sm">
                  Started: {new Date(sub.start_date).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <Badge variant={sub.status === "active" ? "default" : "destructive"}>
                  {sub.status === "active" ? "Active" : "Cancelled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}