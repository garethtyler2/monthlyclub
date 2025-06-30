

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  paid_at: string;
  status: string;
  product_name: string;
  user_email: string;
}

const BusinessPaymentsView = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase.rpc("get_business_payments", {
        business_user_id: user.id,
      });

      if (error) {
        console.error("Error fetching payments:", error);
      } else {
        setPayments(data);
      }

      setLoading(false);
    };

    fetchPayments();
  }, []);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-white">Payment History</h2>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-md bg-white/10" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {payments.length === 0 ? (
            <p className="text-muted-foreground">No payments received yet.</p>
          ) : (
            payments.map((payment) => (
              <Card key={payment.id} className="bg-white/5 border border-white/10">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center text-sm text-white mb-2">
                    <span className="font-medium">{payment.product_name}</span>
                    <span className="text-right text-white/70">
                      {format(new Date(payment.paid_at), "dd MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{payment.user_email}</span>
                    <span className="font-semibold text-white">
                      £{(payment.amount / 100).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Status: {payment.status}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default BusinessPaymentsView;