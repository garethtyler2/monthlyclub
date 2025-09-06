"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase/client";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { 
  CreditCard, 
  ShoppingCart, 
  Calendar, 
  Building2, 
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Download,
  RefreshCw,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import UserSubscriptionsView from "./UserSubscriptionsView";

interface PurchaseHistoryViewProps {
  userId: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paid_at: string;
  created_at: string;
  stripe_payment_intent_id: string;
  product: {
    id: string;
    name: string;
    product_type: string;
    business: {
      id: string;
      name: string;
      slug: string;
    };
  };
}

export default function PurchaseHistoryView({ userId }: PurchaseHistoryViewProps) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          id,
          amount,
          currency,
          status,
          paid_at,
          created_at,
          stripe_payment_intent_id,
          product:products!inner(
            id,
            name,
            product_type,
            business:businesses!inner(
              id,
              name,
              slug
            )
          )
        `)
        .eq("user_id", userId)
        .eq("status", "succeeded")
        .order("paid_at", { ascending: false });

      if (error) {
        console.error("Error fetching payments:", error);
        return;
      }

      setPayments((data as unknown as Payment[]) || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [userId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPayments();
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProductIcon = (productType: string) => {
    switch (productType) {
      case 'one_time':
        return <ShoppingCart className="w-5 h-5" />;
      case 'balance_builder':
        return <TrendingUp className="w-5 h-5" />;
      case 'pay_it_off':
        return <Calendar className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getProductTypeLabel = (productType: string) => {
    switch (productType) {
      case 'one_time':
        return 'One-time purchase';
      case 'balance_builder':
        return 'Balance Builder';
      case 'pay_it_off':
        return 'Pay it off';
      default:
        return 'Subscription';
    }
  };

  const getProductTypeColor = (productType: string) => {
    switch (productType) {
      case 'one_time':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'balance_builder':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pay_it_off':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  if (loading) {
    return <LoadingOverlay show message="Loading purchase history..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Purchase History</h2>
          <p className="text-gray-400">View all your transactions and subscriptions</p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <RefreshCw className={cn("w-4 h-4 mr-2", refreshing && "animate-spin")} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
          <TabsTrigger value="all" className="text-white data-[state=active]:bg-white/10">
            All Transactions
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="text-white data-[state=active]:bg-white/10">
            Active Subscriptions
          </TabsTrigger>
          <TabsTrigger value="one-time" className="text-white data-[state=active]:bg-white/10">
            One-time Purchases
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {payments.length === 0 ? (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8 text-center">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Transactions Yet</h3>
                <p className="text-muted-foreground">
                  You haven't made any purchases yet. Start exploring products!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <Card key={payment.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-2 rounded-lg",
                          getProductTypeColor(payment.product.product_type)
                        )}>
                          {getProductIcon(payment.product.product_type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{payment.product.name}</h3>
                          <p className="text-sm text-gray-400">{payment.product.business.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className={getProductTypeColor(payment.product.product_type)}>
                              {getProductTypeLabel(payment.product.product_type)}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {formatDate(payment.paid_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">
                          {formatAmount(payment.amount, payment.currency)}
                        </div>
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Completed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="subscriptions">
          <UserSubscriptionsView userId={userId} />
        </TabsContent>

        <TabsContent value="one-time" className="space-y-4">
          {payments.filter(p => p.product.product_type === 'one_time').length === 0 ? (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No One-time Purchases</h3>
                <p className="text-muted-foreground">
                  You haven't made any one-time purchases yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {payments
                .filter(p => p.product.product_type === 'one_time')
                .map((payment) => (
                  <Card key={payment.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                            <ShoppingCart className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{payment.product.name}</h3>
                            <p className="text-sm text-gray-400">{payment.product.business.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                                One-time purchase
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {formatDate(payment.paid_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">
                            {formatAmount(payment.amount, payment.currency)}
                          </div>
                          <div className="flex items-center gap-1 text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Completed</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
