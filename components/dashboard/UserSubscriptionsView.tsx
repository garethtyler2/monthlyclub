"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  product_type: 'subscription' | 'credit_builder';
  is_credit_builder: boolean;
  business: {
    id: string;
    name: string;
    slug: string;
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
  amount: number;
}

interface UserCredit {
  id: string;
  business_id: string;
  balance: number;
  total_earned: number;
  total_spent: number;
  updated_at: string;
}

interface CreditTransaction {
  id: string;
  business_id: string;
  amount: number;
  type: 'earned' | 'spent' | 'refund';
  description: string;
  created_at: string;
  related_subscription_id?: string;
}

export default function UserSubscriptionsView({ userId }: UserSubscriptionsViewProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [scheduledPayments, setScheduledPayments] = useState<ScheduledPayment[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [userCredits, setUserCredits] = useState<UserCredit[]>([]);
  const [creditTransactions, setCreditTransactions] = useState<CreditTransaction[]>([]);
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
        product_type,
        is_credit_builder,
        business:business_id (
          id, name, slug
        )
      `) as unknown as { data: Product[] };

    const { data: schedules } = await supabase
      .from("scheduled_payments")
      .select("*")
      .eq("user_id", user.id);

    const { data: userPayments } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user.id);

    // Fetch user credits
    const { data: credits } = await supabase
      .from("user_credits")
      .select("*")
      .eq("user_id", user.id);

    // Fetch credit transactions
    const { data: transactions } = await supabase
      .from("credit_transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setSubscriptions(subs || []);
    setProducts(prods || []);
    setScheduledPayments(schedules || []);
    setPayments(userPayments || []);
    setUserCredits(credits || []);
    setCreditTransactions(transactions || []);
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

  const getCreditBalance = (businessId: string) => {
    const credit = userCredits.find(c => c.business_id === businessId);
    return credit ? credit.balance / 100 : 0; // Convert from pence to pounds
  };

  const getCreditTransactions = (businessId: string, subscriptionId: string) => {
    return creditTransactions.filter(t => 
      t.business_id === businessId && 
      t.related_subscription_id === subscriptionId
    );
  };

  if (loading) {
    return <LoadingOverlay show message="Loading your dashboard..." />;
  }

  const cancelledSubs = subscriptions.filter((s) => s.status === "cancelled");

  return (
    <div className="space-y-6">
      {subscriptions.length === 0 ? (
        <p className="text-muted-foreground">You don't have any active subscriptions yet.</p>
      ) : (
        subscriptions.filter(sub => sub.status === "active").map((sub) => {
          const product = products.find((p) => p.id === sub.product_id);
          const schedule = scheduledPayments.find((s) => s.purchase_id === sub.id);
          if (!product) return null;

        //   Debugging: check payments and sub.id
          console.log("payments", payments);
          console.log("sub.id", sub.id);
          const subscriptionPayments = payments.filter(p => p.subscription_id === sub.id);
          const creditBalance = getCreditBalance(product.business?.id || '');
          const businessCreditTransactions = getCreditTransactions(product.business?.id || '', sub.id);

          return (
            <Card
              key={sub.id}
              className={cn(
                "bg-gradient-to-b text-white border-none animate-fade-in",
                gradientStyles[Math.floor(Math.random() * gradientStyles.length)]
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  {product.is_credit_builder && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                      Credit Builder
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  From:{" "}
                  <Link
                    href={`/businesses/${product.business?.slug}`}
                    className="underline hover:text-white transition-colors"
                  >
                    {product.business?.name}
                  </Link>
                </p>
                <p className="text-sm opacity-80 mb-2">{product.description}</p>
                {product.is_credit_builder ? (
                  <div className="mb-4">
                    <p className="text-sm font-medium">£{(schedule?.amount || 0) / 100} / month</p>
                    <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <p className="text-sm font-semibold text-blue-300">Current Credit Balance</p>
                      <p className="text-lg font-bold text-blue-200">£{creditBalance.toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-medium mb-4">£{product.price} / month</p>
                )}
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
                    <AccordionTrigger className="text-white">
                      Transaction History
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {(() => {
                          // Combine and sort all transactions by date
                          const allTransactions: Array<{
                            id: string;
                            date: Date;
                            type: 'payment' | 'credit_earned' | 'credit_spent';
                            amount: number;
                            description: string;
                            status?: string;
                          }> = [];

                          // Add payment transactions for this specific subscription
                          const subscriptionPayments = payments.filter(p => p.subscription_id === sub.id);
                          subscriptionPayments.forEach(payment => {
                            allTransactions.push({
                              id: `payment-${payment.id}`,
                              date: new Date(payment.paid_at || payment.created_at),
                              type: 'payment',
                              amount: payment.amount,
                              description: 'Recurring Payment',
                              status: payment.status
                            });
                          });

                          // Add credit transactions for this business
                          if (product.is_credit_builder) {
                            businessCreditTransactions.forEach(transaction => {
                              allTransactions.push({
                                id: `credit-${transaction.id}`,
                                date: new Date(transaction.created_at),
                                type: transaction.amount > 0 ? 'credit_earned' : 'credit_spent',
                                amount: Math.abs(transaction.amount),
                                description: transaction.description
                              });
                            });
                          }

                          // Sort by date (newest first)
                          allTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());

                          if (allTransactions.length === 0) {
                            return <p className="text-sm text-muted-foreground">No transactions to show yet.</p>;
                          }

                          return allTransactions.slice(0, 10).map((txn) => (
                            <div
                              key={txn.id}
                              className={`flex justify-between items-center p-3 rounded-md border ${
                                txn.type === 'payment' 
                                  ? txn.status === 'failed' 
                                    ? 'bg-red-500/10 border-red-500/20' 
                                    : 'bg-blue-500/10 border-blue-500/20'
                                  : txn.type === 'credit_earned'
                                  ? 'bg-green-500/10 border-green-500/20'
                                  : 'bg-orange-500/10 border-orange-500/20'
                              }`}
                            >
                              <div className="text-sm">
                                <p className="font-medium text-white">
                                  {txn.date.toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {txn.type === 'payment' 
                                    ? txn.status === 'failed' ? 'Payment Failed' : 'Successful'
                                    : txn.type === 'credit_earned' ? 'Credit Added' : txn.description
                                  }
                                </p>
                                {txn.type === 'payment' && (
                                  <p className="text-xs text-muted-foreground">{txn.description}</p>
                                )}
                              </div>
                              <div className={`text-sm font-semibold flex items-center gap-1 ${
                                txn.type === 'payment' 
                                  ? txn.status === 'failed' ? 'text-red-400' : 'text-blue-400'
                                  : txn.type === 'credit_earned' ? 'text-green-400' : 'text-orange-400'
                              }`}>
                                <span className="text-lg">
                                  {txn.type === 'credit_earned' ? '+' : txn.type === 'credit_spent' ? '−' : ''}
                                </span>
                                £{(txn.amount / 100).toFixed(2)}
                              </div>
                            </div>
                          ));
                        })()}
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
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    {product.is_credit_builder && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                        Credit Builder
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    From:{" "}
                    <Link
                      href={`/businesses/${product.business?.slug}`}
                      className="underline hover:text-white transition-colors"
                    >
                      {product.business?.name}
                    </Link>
                  </p>
                  <p className="text-sm opacity-80 mb-2">{product.description}</p>
                  {product.is_credit_builder ? (
                    <p className="text-sm font-medium mb-4">£{(schedule?.amount || 0) / 100} / month</p>
                  ) : (
                    <p className="text-sm font-medium mb-4">£{product.price} / month</p>
                  )}
                  <div className="text-sm mb-4">
                    <span className="block text-muted-foreground">This subscription has been cancelled.</span>
                    <span className="block text-muted-foreground">Reference: {schedule?.customer_reference || "—"}</span>
                  </div>
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="history">
                      <AccordionTrigger className="text-white">Transaction History</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {(() => {
                            // Combine and sort all transactions by date
                            const allTransactions: Array<{
                              id: string;
                              date: Date;
                              type: 'payment' | 'credit_earned' | 'credit_spent';
                              amount: number;
                              description: string;
                              status?: string;
                            }> = [];

                            // Add payment transactions for this specific subscription
                            const subscriptionPayments = payments.filter(p => p.subscription_id === sub.id);
                            subscriptionPayments.forEach(payment => {
                              allTransactions.push({
                                id: `payment-${payment.id}`,
                                date: new Date(payment.paid_at || payment.created_at),
                                type: 'payment',
                                amount: payment.amount,
                                description: 'Recurring Payment',
                                status: payment.status
                              });
                            });

                            // Add credit transactions for this business
                            if (product.is_credit_builder) {
                              const businessCreditTransactions = getCreditTransactions(product.business?.id || '', sub.id);
                              businessCreditTransactions.forEach(transaction => {
                                allTransactions.push({
                                  id: `credit-${transaction.id}`,
                                  date: new Date(transaction.created_at),
                                  type: transaction.amount > 0 ? 'credit_earned' : 'credit_spent',
                                  amount: Math.abs(transaction.amount),
                                  description: transaction.description
                                });
                              });
                            }

                            // Sort by date (newest first)
                            allTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());

                            if (allTransactions.length === 0) {
                              return <p className="text-sm text-muted-foreground">No transactions to show yet.</p>;
                            }

                            return allTransactions.slice(0, 10).map((txn) => (
                              <div
                                key={txn.id}
                                className={`flex justify-between items-center p-3 rounded-md border ${
                                  txn.type === 'payment' 
                                    ? txn.status === 'failed' 
                                      ? 'bg-red-500/10 border-red-500/20' 
                                      : 'bg-blue-500/10 border-blue-500/20'
                                    : txn.type === 'credit_earned'
                                    ? 'bg-green-500/10 border-green-500/20'
                                    : 'bg-orange-500/10 border-orange-500/20'
                                }`}
                              >
                                <div className="text-sm">
                                  <p className="font-medium text-white">
                                    {txn.date.toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {txn.type === 'payment' 
                                      ? txn.status === 'failed' ? 'Payment Failed' : 'Successful'
                                      : txn.type === 'credit_earned' ? 'Credit Added' : 'Credit Charged'
                                    }
                                  </p>
                                  <p className="text-xs text-muted-foreground">{txn.description}</p>
                                </div>
                                <div className={`text-sm font-semibold flex items-center gap-1 ${
                                  txn.type === 'payment' 
                                    ? txn.status === 'failed' ? 'text-red-400' : 'text-blue-400'
                                    : txn.type === 'credit_earned' ? 'text-green-400' : 'text-orange-400'
                                }`}>
                                  <span className="text-lg">
                                    {txn.type === 'credit_earned' ? '+' : txn.type === 'credit_spent' ? '−' : ''}
                                  </span>
                                  £{(txn.amount / 100).toFixed(2)}
                                </div>
                              </div>
                            ));
                          })()}
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