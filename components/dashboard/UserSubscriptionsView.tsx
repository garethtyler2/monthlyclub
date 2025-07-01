"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ManagePaymentDayModal from "@/components/dashboard/ManagePaymentDayModal";
import CancelSubscriptionModal from "@/components/dashboard/CancelSubscriptionModal";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { supabase } from "@/lib/supabase/client";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { cn } from "@/lib/utils";

const gradientStyles = [
  "from-brand-blue/10 to-transparent border-brand-blue/20",
  "from-brand-purple/10 to-transparent border-brand-purple/20",
  "from-brand-indigo/10 to-transparent border-brand-indigo/20",

];
interface UserSubscriptionsViewProps {
  userId: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  business: {
    name: string;
  };
}

interface Subscription {
  id: string;
  product_id: string;
  status: string;
  start_date: string;
  cancel_at: string | null;
}

interface ScheduledPayment {
  purchase_id: string;
  scheduled_for: number;
  customer_reference: string;
}

export default function UserSubscriptionsView({ userId }: UserSubscriptionsViewProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [scheduledPayments, setScheduledPayments] = useState<ScheduledPayment[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSubId, setOpenSubId] = useState<string | null>(null);
  const [cancelSubId, setCancelSubId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const { data: subs } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id);

    const { data: prods } = await supabase
      .from("products")
      .select(`
        id,
        name,
        description,
        price,
        business:business_id (
          name
        )
      `)as unknown as { data: Product[] };

    const { data: schedules } = await supabase
      .from("scheduled_payments")
      .select("*")
      .eq("user_id", user.id);

    const { data: userPayments } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user.id);

    setSubscriptions(subs || []);
    setProducts(prods || []);
    setScheduledPayments(schedules || []);
    setPayments(userPayments || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getNextPaymentDate(day: number): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getDate() <= day ? today.getMonth() : today.getMonth() + 1;
    const nextDate = new Date(year, month, day);

    const dayNum = nextDate.getDate();
    const monthName = nextDate.toLocaleString('default', { month: 'long' });

    const ordinal =
      dayNum === 1 || dayNum === 21 || dayNum === 31 ? 'st' :
      dayNum === 2 || dayNum === 22 ? 'nd' :
      dayNum === 3 || dayNum === 23 ? 'rd' : 'th';

    return `${dayNum}${ordinal} ${monthName}`;
  }

  if (loading) {
    return <LoadingOverlay show message="Loading your subscriptions..." />;
  }

  const cancelledSubs = subscriptions.filter((s) => s.status === "cancelled");

  return (
    <div className="space-y-6">
      {subscriptions.length === 0 ? (
        <p className="text-muted-foreground">You don’t have any active subscriptions yet.</p>
      ) : (
        subscriptions.filter(sub => sub.status === "active").map((sub) => {
          const product = products.find((p) => p.id === sub.product_id);
          const schedule = scheduledPayments.find((s) => s.purchase_id === sub.id);
          if (!product) return null;

        //   Debugging: check payments and sub.id
          console.log("payments", payments);
          console.log("sub.id", sub.id);
          const subscriptionPayments = payments.filter(p => p.subscription_id === sub.id);

          return (
            <Card
              key={sub.id}
              className={cn(
                "bg-gradient-to-b text-white border-none animate-fade-in",
                gradientStyles[Math.floor(Math.random() * gradientStyles.length)]
              )}
            >
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">From: {product.business?.name}</p>
                <p className="text-sm opacity-80 mb-2">{product.description}</p>
                <p className="text-sm font-medium mb-4">£{product.price} / month</p>
                <div className="text-sm mb-4">
                  <span className="block">
                    Next Payment Date: {schedule?.scheduled_for ? getNextPaymentDate(schedule.scheduled_for) : "Not set"}
                  </span>
                  <span className="block text-muted-foreground">Reference: {schedule?.customer_reference || "—"}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <ManagePaymentDayModal
                    isOpen={openSubId === sub.id}
                    onClose={() => setOpenSubId(null)}
                    subscriptionId={sub.id}
                    onSuccess={() => {
                      fetchData();
                    }}
                  />
                  <CancelSubscriptionModal
                    isOpen={cancelSubId === sub.id}
                    onClose={() => setCancelSubId(null)}
                    subscriptionId={sub.id}
                    onSuccess={() => {
                      fetchData();
                    }}
                  />
                  <Button variant="outline" onClick={() => setOpenSubId(sub.id)}>
                    Change Payment Day
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setCancelSubId(sub.id)}
                  >
                    Cancel Subscription
                  </Button>
                </div>
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="history">
                    <AccordionTrigger className="text-white">Payment History</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {subscriptionPayments.length > 0 ? (
                          subscriptionPayments.map((payment) => (
                            <div
                              key={payment.id}
                              className="flex justify-between items-center p-3 rounded-md bg-white/5 border border-white/10"
                            >
                              <div className="text-sm">
                                <p className="font-medium text-white">{new Date(payment.paid_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                                <p className="text-xs text-muted-foreground capitalize">{payment.status}</p>
                              </div>
                              <div className="text-sm font-semibold text-white">
                                £{(payment.amount / 100).toFixed(2)}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No payments to show yet.</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          );
        })
      )}
      {cancelledSubs.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-white mt-8">Cancelled Subscriptions</h2>
          {cancelledSubs.map((sub) => {
            const product = products.find((p) => p.id === sub.product_id);
            const schedule = scheduledPayments.find((s) => s.purchase_id === sub.id);
            const subscriptionPayments = payments.filter(p => p.subscription_id === sub.id);
            if (!product) return null;

            return (
              <Card
                key={sub.id}
                className={cn(
                  "bg-gradient-to-b text-white border-none animate-fade-in opacity-60",
                  gradientStyles[Math.floor(Math.random() * gradientStyles.length)]
                )}
              >
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">From: {product.business?.name}</p>
                  <p className="text-sm opacity-80 mb-2">{product.description}</p>
                  <p className="text-sm font-medium mb-4">£{product.price} / month</p>
                  <div className="text-sm mb-4">
                    <span className="block text-muted-foreground">This subscription has been cancelled.</span>
                    <span className="block text-muted-foreground">Reference: {schedule?.customer_reference || "—"}</span>
                  </div>
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="history">
                      <AccordionTrigger className="text-white">Payment History</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {subscriptionPayments.length > 0 ? (
                            subscriptionPayments.map((payment) => (
                              <div
                                key={payment.id}
                                className="flex justify-between items-center p-3 rounded-md bg-white/5 border border-white/10"
                              >
                                <div className="text-sm">
                                  <p className="font-medium text-white">{new Date(payment.paid_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                                  <p className="text-xs text-muted-foreground capitalize">{payment.status}</p>
                                </div>
                                <div className="text-sm font-semibold text-white">
                                  £{(payment.amount / 100).toFixed(2)}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">No payments to show yet.</p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
}