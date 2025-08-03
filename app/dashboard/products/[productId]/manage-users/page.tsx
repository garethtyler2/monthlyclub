'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const pageSize = 10;


  const fetchSubscribers = async () => {
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

    console.log('SUBS:', data);
    console.log('ERROR:', error);

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

      // Fetch credit data if this is a credit builder product
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
  };
    const handleCancelSubscription = async () => {
    if (!selectedSubId) {
      console.warn('No subscription ID selected for cancellation');
      return;
    }

    console.log(`Attempting to cancel subscription with ID: ${selectedSubId}`);
    setIsCancelling(true);

    const cancelledAt = new Date().toISOString();

    const { data: subData, error: subError, status: subStatus, statusText: subStatusText } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled', cancel_at: cancelledAt })
      .eq('id', selectedSubId);

    console.log('Supabase subscription update response:', { subData, subError, subStatus, subStatusText });

    const { data: schedData, error: schedError, status: schedStatus, statusText: schedStatusText } = await supabase
      .from('scheduled_payments')
      .update({ status: 'cancelled', cancel_at: cancelledAt })
      .eq('purchase_id', selectedSubId);

    console.log('Supabase scheduled_payments update response:', { schedData, schedError, schedStatus, schedStatusText });

    setIsCancelling(false);
    setSelectedSubId(null);

    if (subError || schedError) {
      console.error('Error cancelling subscription or scheduled payment:', subError, schedError);
      alert(`Failed to cancel subscription or scheduled payment.`);
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

    const amount = parseFloat(chargeAmount) * 100; // Convert to pence
    if (isNaN(amount) || amount <= 0) {
      const { toast } = await import('sonner');
      toast.error("Invalid Amount", {
        description: "Please enter a valid amount greater than zero.",
      });
      return;
    }

    setIsCharging(true);

    try {
      // Get current credit balance
      const currentCredit = userCredits[selectedUserForCharge];
      if (!currentCredit || currentCredit.balance < amount) {
        const { toast } = await import('sonner');
        toast.error("Insufficient Credit", {
          description: `Customer only has £${(currentCredit?.balance || 0) / 100} available credit.`,
        });
        setIsCharging(false);
        return;
      }

      // Update user credit balance
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
        console.error('Error updating credit balance:', creditError);
        const { toast } = await import('sonner');
        toast.error("Error", {
          description: "Failed to update customer's credit balance. Please try again.",
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
          amount: -amount, // Negative for spent
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

      // Show success animation
      setShowSuccessAnimation(true);
      
      // Reset form and close modal
      setChargeAmount('');
      setChargeDescription('');
      setSelectedUserForCharge(null);
      setShowChargeModal(false);

      // Refresh data
      fetchSubscribers();

      // Show success toast
      const { toast } = await import('sonner');
      toast.success("Credit Charged", {
        description: `Successfully charged £${chargeAmount} from customer's credit balance.`,
      });

      // Hide animation after 2 seconds
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
  }, [productId, searchTerm, page, product]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="secondary"
          onClick={() => {
            // Use router if available, otherwise fallback to window.location
            if (typeof window !== "undefined") {
              window.location.href = "/dashboard/business";
            }
          }}
        >
          &larr; Back to Dashboard
        </Button>
        <div />
      </div>
      <h1 className="text-2xl font-semibold text-white">Manage Subscribers</h1>
      {productName && (
        <h2 className="text-3xl font-bold text-white">{productName}</h2>
      )}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by email or reference"
          className="px-3 py-2 rounded bg-white/10 text-white w-full max-w-sm"
        />
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <Card key={sub.id} className="bg-white/5 border border-white/10">
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-white font-medium">{sub.user_profiles?.email ?? 'Unknown'}</p>
                      <p className="text-xs text-muted-foreground">Started: {new Date(sub.start_date).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">
                        Ref: {sub.customer_reference ?? 'None'}
                      </p>
                      {product?.is_credit_builder && userCredits[sub.user_id] && (
                        <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded">
                          <p className="text-xs mb-1 text-green-400 font-medium">
                            Credit Balance: £{(userCredits[sub.user_id].balance / 100).toFixed(2)}
                          </p>
                          <div className="text-xs text-green-400/70 space-y-1">
                            <p>Total Paid In: £{(userCredits[sub.user_id].total_earned / 100).toFixed(2)}</p>
                            <p>Total Spent: £{(userCredits[sub.user_id].total_spent / 100).toFixed(2)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end w-full sm:w-auto">
                      {product?.is_credit_builder && userCredits[sub.user_id] && userCredits[sub.user_id].balance > 0 && (
                        <Button
                          size="sm"
                          
                          className="hero-button-primary w-full sm:w-auto hover:bg-green-700"
                          onClick={() => {
                            setSelectedUserForCharge(sub.user_id);
                            setShowChargeModal(true);
                          }}
                        >
                          Charge User
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full sm:w-auto"
                            onClick={() => setSelectedSubId(sub.id)}
                          >
                            Cancel
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Cancellation</DialogTitle>
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
                      <Button
                        size="sm"
                        variant="secondary"
                        className="w-full sm:w-auto"
                        onClick={() =>
                          setExpandedUserTransactions(
                            expandedUserTransactions === sub.user_id ? null : sub.user_id
                          )
                        }
                      >
                        {expandedUserTransactions === sub.user_id ? (
                          <>
                            Hide Transactions <ChevronUp className="ml-1 w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Show Transactions <ChevronDown className="ml-1 w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  {expandedUserTransactions === sub.user_id && (
                    <div className="space-y-3 w-full mt-3">
                      <h4 className="text-sm font-medium text-white mb-2">All Transactions</h4>
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

                        // Add payment transactions
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

                        // Add credit transactions
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
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4">
            <Button variant="secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
            <Button variant="secondary" disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </>
      )}

      {/* Charge Credit Modal */}
      <Dialog open={showChargeModal} onOpenChange={setShowChargeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Charge User Credit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Amount (£)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={chargeAmount}
                onChange={(e) => setChargeAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">Description/Reference</label>
              <input
                type="text"
                value={chargeDescription}
                onChange={(e) => setChargeDescription(e.target.value)}
                placeholder="e.g., Haircut service, Consultation fee"
                className="w-full px-3 py-2 rounded bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
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
            <Button variant="secondary" onClick={() => setShowChargeModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleChargeCredit} 
              disabled={isCharging || !chargeAmount || !chargeDescription}
              className="hero-button-primary mb-2 hover:bg-green-700"
            >
              {isCharging ? 'Charging...' : 'Charge Credit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Animation Overlay */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4 animate-in zoom-in-95 duration-300">
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
              <h3 className="text-lg font-semibold text-gray-900">Credit Charged Successfully!</h3>
              <p className="text-sm text-gray-600 mt-1">The customer's credit has been updated.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}