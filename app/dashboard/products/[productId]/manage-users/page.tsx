'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Users, 
  CreditCard, 
  Calendar, 
  Mail, 
  Hash, 
  PoundSterling,
  TrendingUp,
  TrendingDown,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  ArrowLeft,
  Filter,
  MoreVertical,
  Download,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface Subscription {
  id: string;
  user_id: string;
  status: string;
  start_date: string;
  customer_reference?: string | null;
  user_profiles?: {
    email?: string | null;
  } | null;
}

interface Product {
  id: string;
  name: string;
  is_credit_builder: boolean;
  business_id: string;
}

interface UserCredit {
  user_id: string;
  business_id: string;
  balance: number;
  total_earned: number;
  total_spent: number;
}

interface CreditTransaction {
  id: string;
  user_id: string;
  business_id: string;
  amount: number;
  type: 'earned' | 'spent' | 'refund';
  description: string;
  created_at: string;
  related_subscription_id?: string;
}

export default function ManageUsersPage() {
  const { productId } = useParams();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [productName, setProductName] = useState('');
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [transactions, setTransactions] = useState<{ [key: string]: any[] }>({});
  const [expandedUserTransactions, setExpandedUserTransactions] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [userCredits, setUserCredits] = useState<{ [key: string]: UserCredit }>({});
  const [creditTransactions, setCreditTransactions] = useState<{ [key: string]: CreditTransaction[] }>({});
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [selectedUserForCharge, setSelectedUserForCharge] = useState<string | null>(null);
  const [chargeAmount, setChargeAmount] = useState('');
  const [chargeDescription, setChargeDescription] = useState('');
  const [isCharging, setIsCharging] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'balance'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'cancelled'>('all');
  const isMobile = useIsMobile();
  const pageSize = isMobile ? 6 : 12;

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('subscriptions')
      .select('id, user_id, start_date, status, product_id, customer_reference, user_profiles(email)')
      .eq('product_id', productId)
      .eq('status', 'active')
      .range(from, to);

    if (searchTerm) {
      query = query.or(`email.ilike.%${searchTerm}%,customer_reference.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;

    const subs = data as Subscription[];

    if (error) {
      console.error('Error fetching subscriptions:', error);
      setLoading(false);
      return;
    }

    const uniqueSubs = Array.from(
      new Map(subs.map(sub => [sub.user_id, sub])).values()
    );
    setSubscriptions(uniqueSubs);
    setHasMore(uniqueSubs.length === pageSize);

    if (subs.length > 0) {
      const userIds = subs.map((sub) => sub.user_id);
      const subscriptionIds = subs.map((sub) => sub.id);
      
      // Fetch payments for these specific subscriptions only
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('*')
        .in('subscription_id', subscriptionIds);

      if (paymentError) {
        console.error('Error fetching payments:', paymentError);
      } else {
        const groupedPayments = userIds.reduce((acc: { [key: string]: any[] }, userId) => {
          acc[userId] = paymentData?.filter((p) => p.user_id === userId) || [];
          return acc;
        }, {});
        setTransactions(groupedPayments);
      }

      // Fetch credit data if this is a balance builder product
      if (product?.is_credit_builder) {
        const { data: creditData, error: creditError } = await supabase
          .from('user_credits')
          .select('*')
          .eq('business_id', product.business_id)
          .in('user_id', userIds);

        if (creditError) {
          console.error('Error fetching user credits:', creditError);
        } else {
          const groupedCredits = userIds.reduce((acc: { [key: string]: UserCredit }, userId) => {
            const userCredit = creditData?.find((c) => c.user_id === userId);
            acc[userId] = userCredit || { user_id: userId, business_id: product.business_id, balance: 0, total_earned: 0, total_spent: 0 };
            return acc;
          }, {});
          setUserCredits(groupedCredits);

          // Fetch credit transactions
          const { data: transactionData, error: transactionError } = await supabase
            .from('credit_transactions')
            .select('*')
            .eq('business_id', product.business_id)
            .in('user_id', userIds)
            .order('created_at', { ascending: false });

          if (transactionError) {
            console.error('Error fetching credit transactions:', transactionError);
          } else {
            const groupedTransactions = userIds.reduce((acc: { [key: string]: CreditTransaction[] }, userId) => {
              acc[userId] = transactionData?.filter((t) => t.user_id === userId) || [];
              return acc;
            }, {});
            setCreditTransactions(groupedTransactions);
          }
        }
      }
    }

    setLoading(false);
  }, [productId, searchTerm, page, product, pageSize]);

  const handleCancelSubscription = async () => {
    if (!selectedSubId) return;

    setIsCancelling(true);
    const cancelledAt = new Date().toISOString();

    const { data: subData, error: subError } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled', cancel_at: cancelledAt })
      .eq('id', selectedSubId);

    const { data: schedData, error: schedError } = await supabase
      .from('scheduled_payments')
      .update({ status: 'cancelled', cancel_at: cancelledAt })
      .eq('purchase_id', selectedSubId);

    setIsCancelling(false);
    setSelectedSubId(null);

    if (subError || schedError) {
      console.error('Error cancelling subscription:', subError, schedError);
      return;
    }

    fetchSubscribers();
  };

  const handleChargeCredit = async () => {
    if (!selectedUserForCharge || !chargeAmount || !chargeDescription || !product) {
      const { toast } = await import('sonner');
      toast.error("Missing Information", {
        description: "Please fill in both the amount and description fields.",
      });
      return;
    }

    const amount = parseFloat(chargeAmount) * 100;
    if (isNaN(amount) || amount <= 0) {
      const { toast } = await import('sonner');
      toast.error("Invalid Amount", {
        description: "Please enter a valid amount greater than zero.",
      });
      return;
    }

    setIsCharging(true);

    try {
      const currentCredit = userCredits[selectedUserForCharge];
      if (!currentCredit || currentCredit.balance < amount) {
        const { toast } = await import('sonner');
        toast.error("Insufficient Credit", {
          description: `Customer only has £${(currentCredit?.balance || 0) / 100} available credit.`,
        });
        setIsCharging(false);
        return;
      }

              // Update user balance builder fund
      const { error: creditError } = await supabase
        .from('user_credits')
        .update({
          balance: currentCredit.balance - amount,
          total_spent: currentCredit.total_spent + amount,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', selectedUserForCharge)
        .eq('business_id', product.business_id);

      if (creditError) {
                  console.error('Error updating balance builder fund:', creditError);
        const { toast } = await import('sonner');
        toast.error("Error", {
                      description: "Failed to update customer's balance builder fund. Please try again.",
        });
        setIsCharging(false);
        return;
      }

      // Get the user's subscription for this product
      const { data: userSubscription, error: subError } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', selectedUserForCharge)
        .eq('product_id', productId)
        .eq('status', 'active')
        .single();

      if (subError) {
        console.error('Error fetching user subscription:', subError);
        const { toast } = await import('sonner');
        toast.error("Error", {
          description: "Failed to find customer's subscription. Please try again.",
        });
        setIsCharging(false);
        return;
      }

      // Create credit transaction record
      const { error: transactionError } = await supabase
        .from('credit_transactions')
        .insert({
          user_id: selectedUserForCharge,
          business_id: product.business_id,
          amount: -amount,
          type: 'spent',
          description: chargeDescription,
          related_subscription_id: userSubscription.id,
        });

      if (transactionError) {
        console.error('Error creating credit transaction:', transactionError);
        const { toast } = await import('sonner');
        toast.error("Error", {
          description: "Failed to record the transaction. Please try again.",
        });
        setIsCharging(false);
        return;
      }

      setShowSuccessAnimation(true);
      setChargeAmount('');
      setChargeDescription('');
      setSelectedUserForCharge(null);
      setShowChargeModal(false);
      fetchSubscribers();

      const { toast } = await import('sonner');
      toast.success("Credit Charged", {
                  description: `Successfully charged £${chargeAmount} from customer's balance builder fund.`,
      });

      setTimeout(() => {
        setShowSuccessAnimation(false);
      }, 2000);
    } catch (error) {
      console.error('Error charging credit:', error);
      const { toast } = await import('sonner');
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsCharging(false);
    }
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('name, is_credit_builder, business_id')
        .eq('id', productId)
        .single();

      if (data) {
        setProductName(data.name);
        setProduct(data as Product);
      }
    };

    fetchProductInfo();
  }, [productId]);

  useEffect(() => {
    fetchSubscribers();
  }, [productId, searchTerm, page, product, fetchSubscribers]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'failed':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredAndSortedSubscriptions = [...subscriptions]
    .filter((sub) => {
      if (filterStatus === 'all') return true;
      return sub.status === filterStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.user_profiles?.email || '').localeCompare(b.user_profiles?.email || '');
        case 'balance':
          const aBalance = userCredits[a.user_id]?.balance || 0;
          const bBalance = userCredits[b.user_id]?.balance || 0;
          return bBalance - aBalance;
        case 'date':
        default:
          return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      }
    });

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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = "/dashboard/business"}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                
              </Button>
              <div className="hidden sm:block w-px h-6 bg-white/20" />
              <div>
                <h1 className="text-lg font-semibold text-white">Manage Users</h1>
                {productName && (
                  <p className="text-sm text-muted-foreground">{productName}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="text-white hover:bg-white/10"
              >
                {viewMode === 'grid' ? 'List' : 'Grid'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email or reference..."
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white/5 border border-white/10 text-white rounded-md text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="balance">Sort by Balance</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 bg-white/5 border border-white/10 text-white rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-white">{subscriptions.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          {product?.is_credit_builder && (
            <>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Balance</p>
                      <p className="text-2xl font-bold text-green-400">
                        £{(Object.values(userCredits).reduce((sum, credit) => sum + credit.balance, 0) / 100).toFixed(2)}
                      </p>
                    </div>
                    <CreditCard className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Paid In</p>
                      <p className="text-2xl font-bold text-blue-400">
                        £{(Object.values(userCredits).reduce((sum, credit) => sum + credit.total_earned, 0) / 100).toFixed(2)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Charged</p>
                      <p className="text-2xl font-bold text-orange-400">
                        £{(Object.values(userCredits).reduce((sum, credit) => sum + credit.total_spent, 0) / 100).toFixed(2)}
                      </p>
                    </div>
                    <TrendingDown className="w-8 h-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Users Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedSubscriptions.map((sub) => (
                <Card key={sub.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 group">
                  <CardContent className="p-4">
                    {/* User Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">
                            {sub.user_profiles?.email ?? 'Unknown'}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusIcon(sub.status)}
                            <Badge className={`text-xs ${getStatusColor(sub.status)}`}>
                              {sub.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* User Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Started</span>
                        </div>
                        <span className="text-white">
                          {new Date(sub.start_date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {sub.customer_reference && (
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <Hash className="w-3 h-3" />
                            <span>Reference</span>
                          </div>
                          <span className="text-white font-mono text-xs">
                            {sub.customer_reference}
                          </span>
                        </div>
                      )}

                      {/* Credit Balance */}
                      {product?.is_credit_builder && userCredits[sub.user_id] && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-green-300 uppercase tracking-wide">
                              Balance Builder Fund
                            </span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                          <div className="text-lg font-bold text-green-200">
                            £{(userCredits[sub.user_id].balance / 100).toFixed(2)}
                          </div>
                          <div className="text-xs text-green-400/70 mt-1 space-y-0.5">
                            <div className="flex justify-between">
                              <span>Paid In:</span>
                              <span>£{(userCredits[sub.user_id].total_earned / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Spent:</span>
                              <span>£{(userCredits[sub.user_id].total_spent / 100).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 mt-4">
                      {product?.is_credit_builder && userCredits[sub.user_id] && userCredits[sub.user_id].balance > 0 && (
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          onClick={() => {
                            setSelectedUserForCharge(sub.user_id);
                            setShowChargeModal(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Charge Balance
                        </Button>
                      )}
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-white/20 text-white hover:bg-white/10"
                          onClick={() =>
                            setExpandedUserTransactions(
                              expandedUserTransactions === sub.user_id ? null : sub.user_id
                            )
                          }
                        >
                          {expandedUserTransactions === sub.user_id ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Hide
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              Transactions
                            </>
                          )}
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex-1"
                              onClick={() => setSelectedSubId(sub.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-slate-800 border-white/10">
                            <DialogHeader>
                              <DialogTitle className="text-white">Confirm Cancellation</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-muted-foreground">
                              Are you sure you want to cancel this subscription? This action cannot be undone.
                            </p>
                            <DialogFooter className="mt-4">
                              <Button variant="destructive" onClick={handleCancelSubscription} disabled={isCancelling}>
                                {isCancelling ? 'Cancelling...' : 'Confirm Cancel'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {/* Expanded Transactions */}
                    {expandedUserTransactions === sub.user_id && (
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

                            if (transactions[sub.user_id]) {
                              transactions[sub.user_id].forEach(txn => {
                                allTransactions.push({
                                  id: `payment-${txn.id}`,
                                  date: new Date(txn.paid_at || txn.created_at),
                                  type: 'payment',
                                  amount: txn.amount,
                                  description: 'Recurring Payment',
                                  status: txn.status
                                });
                              });
                            }

                            if (product?.is_credit_builder && creditTransactions[sub.user_id]) {
                              const subscriptionCreditTransactions = creditTransactions[sub.user_id].filter(
                                txn => txn.related_subscription_id === sub.id
                              );
                              subscriptionCreditTransactions.forEach(txn => {
                                allTransactions.push({
                                  id: `credit-${txn.id}`,
                                  date: new Date(txn.created_at),
                                  type: txn.type === 'earned' ? 'credit_earned' : 'credit_spent',
                                  amount: Math.abs(txn.amount),
                                  description: txn.description
                                });
                              });
                            }

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
                                      : txn.type === 'credit_earned' ? 'Balance Added' : txn.description
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
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center pt-6">
              <Button 
                variant="outline" 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">Page {page}</span>
              <Button 
                variant="outline" 
                disabled={!hasMore} 
                onClick={() => setPage(page + 1)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Charge Credit Modal */}
      <Dialog open={showChargeModal} onOpenChange={setShowChargeModal}>
        <DialogContent className="bg-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Charge User Balance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Amount (£)</label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                value={chargeAmount}
                onChange={(e) => setChargeAmount(e.target.value)}
                placeholder="0.00"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">Description/Reference</label>
              <Input
                type="text"
                value={chargeDescription}
                onChange={(e) => setChargeDescription(e.target.value)}
                placeholder="e.g., Haircut service, Consultation fee"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            {selectedUserForCharge && userCredits[selectedUserForCharge] && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="text-sm text-green-400">
                  Current Balance: £{(userCredits[selectedUserForCharge].balance / 100).toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowChargeModal(false)} className="border-white/20 text-white">
              Cancel
            </Button>
            <Button 
              onClick={handleChargeCredit} 
              disabled={isCharging || !chargeAmount || !chargeDescription}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              {isCharging ? 'Charging...' : 'Charge Credit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-8 flex flex-col items-center space-y-4 animate-in zoom-in-95 duration-300 border border-white/10">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Credit Charged Successfully!</h3>
              <p className="text-sm text-muted-foreground mt-1">The customer's credit has been updated.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}