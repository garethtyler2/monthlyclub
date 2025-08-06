"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import ManagePaymentDayModal from "@/components/dashboard/ManagePaymentDayModal";
import CancelSubscriptionModal from "@/components/dashboard/CancelSubscriptionModal";
import { supabase } from "@/lib/supabase/client";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { 
  CreditCard, 
  Calendar, 
  PoundSterling, 
  TrendingUp, 
  Building2, 
  Users, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Settings,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [expandedTransactions, setExpandedTransactions] = useState<string | null>(null);
  const [changeAmountSubId, setChangeAmountSubId] = useState<string | null>(null);

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

  const getProductGradient = (index: number) => {
    const gradients = [
      "from-blue-500/10 to-indigo-500/10 border-blue-500/20",
      "from-purple-500/10 to-violet-500/10 border-purple-500/20",
      "from-green-500/10 to-emerald-500/10 border-green-500/20",
      "from-orange-500/10 to-red-500/10 border-orange-500/20",
      "from-pink-500/10 to-rose-500/10 border-pink-500/20",
      "from-teal-500/10 to-cyan-500/10 border-teal-500/20",
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return <LoadingOverlay show message="Loading your subscriptions..." />;
  }

  const activeSubs = subscriptions.filter((s) => s.status === "active");
  const cancelledSubs = subscriptions.filter((s) => s.status === "cancelled");

  return (
    <div className="space-y-6">
      {/* Active Subscriptions */}
      {activeSubs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Active Subscriptions</h3>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {activeSubs.length} Active
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeSubs.map((sub, index) => {
              const product = products.find((p) => p.id === sub.product_id);
              const schedule = scheduledPayments.find((s) => s.purchase_id === sub.id);
              if (!product) return null;

              const subscriptionPayments = payments.filter(p => p.subscription_id === sub.id);
              const creditBalance = getCreditBalance(product.business?.id || '');
              const businessCreditTransactions = getCreditTransactions(product.business?.id || '', sub.id);

              return (
                <Card
                  key={sub.id}
                  className={cn(
                    "bg-gradient-to-br border-none transition-all duration-300 hover:scale-[1.02] group",
                    getProductGradient(index)
                  )}
                >
                  <CardContent className="p-6">
                    {/* Product Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          {product.is_credit_builder ? (
                            <CreditCard className="w-5 h-5 text-blue-400" />
                          ) : (
                            <Building2 className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white capitalize">{product.name}</h3>
                          <Link
                            href={`/businesses/${product.business?.slug}`}
                            className="text-sm text-muted-foreground hover:text-white transition-colors"
                          >
                            {product.business?.name}
                          </Link>
                        </div>
                      </div>
                      
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>

                    {/* Product Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-4">
                      {product.is_credit_builder ? (
                        <div className="flex items-center space-x-2">
                          <PoundSterling className="w-4 h-4 text-blue-400" />
                          <span className="text-lg font-bold text-blue-300">£{(schedule?.amount || 0) / 100}/month</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <PoundSterling className="w-4 h-4 text-green-400" />
                          <span className="text-lg font-bold text-green-300">£{product.price}/month</span>
                        </div>
                      )}
                    </div>

                    {/* Credit Balance for Credit Builders */}
                    {product.is_credit_builder && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-blue-300 uppercase tracking-wide">
                            Available Credit
                          </span>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-lg font-bold text-blue-200">
                          £{creditBalance.toFixed(2)}
                        </div>
                        <div className="text-xs text-blue-400/70 mt-1 space-y-0.5">
                          <div className="flex justify-between">
                            <span>Paid In:</span>
                            <span>£{(userCredits.find(c => c.business_id === product.business?.id)?.total_earned || 0) / 100}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Spent:</span>
                            <span>£{(userCredits.find(c => c.business_id === product.business?.id)?.total_spent || 0) / 100}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Info */}
                    <div className="mb-4 p-3 bg-white/5 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-muted-foreground">Next Payment</span>
                            <div className="text-sm font-medium text-white break-words">
                              {schedule?.scheduled_for ? getNextPaymentDate(schedule.scheduled_for) : "Not set"}
                            </div>
                          </div>
                        </div>
                        {schedule?.customer_reference && (
                          <div className="flex items-start space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm text-muted-foreground">Reference</span>
                              <div className="text-sm font-mono text-white break-all">
                                {schedule.customer_reference}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
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
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => setOpenSubId(sub.id)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Change Payment Day
                      </Button>
                      
                      {product.is_credit_builder && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                          onClick={() => setChangeAmountSubId(sub.id)}
                        >
                          <PoundSterling className="w-4 h-4" />
                          Change Amount
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        onClick={() => setCancelSubId(sub.id)}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Transaction History Toggle */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full text-muted-foreground hover:text-white"
                      onClick={() => setExpandedTransactions(
                        expandedTransactions === sub.id ? null : sub.id
                      )}
                    >
                      {expandedTransactions === sub.id ? (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2 rotate-90" />
                          Hide Transactions
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          View Transactions
                        </>
                      )}
                    </Button>

                    {/* Expanded Transactions */}
                    {expandedTransactions === sub.id && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-medium text-white mb-3">Recent Transactions</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {(() => {
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
                              return (
                                <div className="text-center py-4">
                                  <p className="text-sm text-muted-foreground">No transactions yet</p>
                                </div>
                              );
                            }

                            return allTransactions.slice(0, 5).map((txn) => (
                              <div
                                key={txn.id}
                                className={`flex justify-between items-center p-2 rounded-md text-xs ${
                                  txn.type === 'payment' 
                                    ? txn.status === 'failed' 
                                      ? 'bg-red-500/10 border border-red-500/20' 
                                      : 'bg-blue-500/10 border border-blue-500/20'
                                    : txn.type === 'credit_earned'
                                    ? 'bg-green-500/10 border border-green-500/20'
                                    : 'bg-orange-500/10 border border-orange-500/20'
                                }`}
                              >
                                <div>
                                  <p className="font-medium text-white">
                                    {txn.date.toLocaleDateString()}
                                  </p>
                                  <p className="text-muted-foreground">
                                    {txn.type === 'payment' 
                                      ? txn.status === 'failed' ? 'Payment Failed' : 'Payment'
                                      : txn.type === 'credit_earned' ? 'Credit Added' : txn.description
                                    }
                                  </p>
                                </div>
                                <div className={`font-semibold ${
                                  txn.type === 'payment' 
                                    ? txn.status === 'failed' ? 'text-red-400' : 'text-blue-400'
                                    : txn.type === 'credit_earned' ? 'text-green-400' : 'text-orange-400'
                                }`}>
                                  {txn.type === 'credit_earned' ? '+' : txn.type === 'credit_spent' ? '−' : ''}
                                  £{(txn.amount / 100).toFixed(2)}
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled Subscriptions */}
      {cancelledSubs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Cancelled Subscriptions</h3>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              {cancelledSubs.length} Cancelled
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cancelledSubs.map((sub, index) => {
              const product = products.find((p) => p.id === sub.product_id);
              const schedule = scheduledPayments.find((s) => s.purchase_id === sub.id);
              const subscriptionPayments = payments.filter(p => p.subscription_id === sub.id);
              if (!product) return null;

              return (
                <Card
                  key={sub.id}
                  className={cn(
                    "bg-gradient-to-br border-none transition-all duration-300 opacity-60",
                    getProductGradient(index)
                  )}
                >
                  <CardContent className="p-6">
                    {/* Product Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          {product.is_credit_builder ? (
                            <CreditCard className="w-5 h-5 text-blue-400" />
                          ) : (
                            <Building2 className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white capitalize">{product.name}</h3>
                          <Link
                            href={`/businesses/${product.business?.slug}`}
                            className="text-sm text-muted-foreground hover:text-white transition-colors"
                          >
                            {product.business?.name}
                          </Link>

                        </div>
                      </div>
                      
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        <XCircle className="w-3 h-3 mr-1" />
                        Cancelled
                      </Badge>
                    </div>

                    {/* Product Description */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-4">
                      {product.is_credit_builder ? (
                        <div className="flex items-center space-x-2">
                          <PoundSterling className="w-4 h-4 text-blue-400" />
                          <span className="text-lg font-bold text-blue-300">£{(schedule?.amount || 0) / 100}/month</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <PoundSterling className="w-4 h-4 text-green-400" />
                          <span className="text-lg font-bold text-green-300">£{product.price}/month</span>
                        </div>
                      )}
                    </div>

                    {/* Cancelled Message */}
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-300">This subscription has been cancelled</span>
                      </div>
                    </div>

                    {/* Transaction History Toggle */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full text-muted-foreground hover:text-white"
                      onClick={() => setExpandedTransactions(
                        expandedTransactions === sub.id ? null : sub.id
                      )}
                    >
                      {expandedTransactions === sub.id ? (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2 rotate-90" />
                          Hide Transactions
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          View Transactions
                        </>
                      )}
                    </Button>

                    {/* Expanded Transactions */}
                    {expandedTransactions === sub.id && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-medium text-white mb-3">Transaction History</h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {(() => {
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
                              return (
                                <div className="text-center py-4">
                                  <p className="text-sm text-muted-foreground">No transactions yet</p>
                                </div>
                              );
                            }

                            return allTransactions.slice(0, 5).map((txn) => (
                              <div
                                key={txn.id}
                                className={`flex justify-between items-center p-2 rounded-md text-xs ${
                                  txn.type === 'payment' 
                                    ? txn.status === 'failed' 
                                      ? 'bg-red-500/10 border border-red-500/20' 
                                      : 'bg-blue-500/10 border border-blue-500/20'
                                    : txn.type === 'credit_earned'
                                    ? 'bg-green-500/10 border border-green-500/20'
                                    : 'bg-orange-500/10 border border-orange-500/20'
                                }`}
                              >
                                <div>
                                  <p className="font-medium text-white">
                                    {txn.date.toLocaleDateString()}
                                  </p>
                                  <p className="text-muted-foreground">
                                    {txn.type === 'payment' 
                                      ? txn.status === 'failed' ? 'Payment Failed' : 'Payment'
                                      : txn.type === 'credit_earned' ? 'Credit Added' : 'Credit Charged'
                                    }
                                  </p>
                                  <p className="text-muted-foreground">{txn.description}</p>
                                </div>
                                <div className={`font-semibold ${
                                  txn.type === 'payment' 
                                    ? txn.status === 'failed' ? 'text-red-400' : 'text-blue-400'
                                    : txn.type === 'credit_earned' ? 'text-green-400' : 'text-orange-400'
                                }`}>
                                  {txn.type === 'credit_earned' ? '+' : txn.type === 'credit_spent' ? '−' : ''}
                                  £{(txn.amount / 100).toFixed(2)}
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {subscriptions.length === 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-8 text-center">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Subscriptions Yet</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any active subscriptions. Browse businesses to find great subscription services!
            </p>
            <Button 
              onClick={() => window.location.href = "/"}
              className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Browse Businesses
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Change Amount Modal */}
      <ChangeAmountModal
        isOpen={changeAmountSubId !== null}
        onClose={() => setChangeAmountSubId(null)}
        subscriptionId={changeAmountSubId}
        onSuccess={() => {
          fetchData();
          setChangeAmountSubId(null);
        }}
      />
    </div>
  );
}

// Change Amount Modal Component
function ChangeAmountModal({ 
  isOpen, 
  onClose, 
  subscriptionId, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  subscriptionId: string | null; 
  onSuccess: () => void; 
}) {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentAmount, setCurrentAmount] = useState<string>("");

  const handleSubmit = async () => {
    if (!subscriptionId || !amount || parseFloat(amount) <= 0) return;

    setLoading(true);
    
    try {
      // Convert to pence (multiply by 100)
      const amountInPence = Math.round(parseFloat(amount) * 100);
      
      const { error } = await supabase
        .from("scheduled_payments")
        .update({ amount: amountInPence })
        .eq("purchase_id", subscriptionId);

      if (error) {
        console.error("Failed to update amount:", error);
        return;
      }

      onSuccess();
    } catch (error) {
      console.error("Error updating amount:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setCurrentAmount(amount);
    setShowConfirmation(true);
  };

  const handleBack = () => {
    setShowConfirmation(false);
    setCurrentAmount("");
  };

  const handleClose = () => {
    setAmount("");
    setShowConfirmation(false);
    setCurrentAmount("");
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-white/10 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {showConfirmation ? "Confirm Amount Change" : "Change Monthly Amount"}
          </DialogTitle>
        </DialogHeader>
        
        {!showConfirmation ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-white">
                  New Monthly Amount (£)
                </Label>
                <div className="relative">
                  <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="pl-10 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the new amount you'd like to contribute each month to your credit builder.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose} className="border-white/20 text-white">
                Cancel
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!amount || parseFloat(amount) <= 0}
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Confirm Amount Change</span>
                </div>
                <p className="text-sm text-blue-200 mb-3">
                  You're about to change your monthly contribution amount to:
                </p>
                <div className="text-2xl font-bold text-blue-100 text-center">
                  £{parseFloat(currentAmount).toFixed(2)}/month
                </div>
                <p className="text-xs text-blue-300 mt-2 text-center">
                  This change will take effect from your next scheduled payment.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleBack} className="border-white/20 text-white">
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Change
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}