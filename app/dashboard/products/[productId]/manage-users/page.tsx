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
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('*')
        .in('user_id', userIds);

      if (paymentError) {
        console.error('Error fetching payments:', paymentError);
      } else {
        const groupedPayments = userIds.reduce((acc: { [key: string]: any[] }, userId) => {
          acc[userId] = paymentData?.filter((p) => p.user_id === userId) || [];
          return acc;
        }, {});
        setTransactions(groupedPayments);
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
  useEffect(() => {
    fetchSubscribers();

    const fetchProductName = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('name')
        .eq('id', productId)
        .single();

      if (data?.name) {
        setProductName(data.name);
      }
    };

    fetchProductName();
  }, [productId, searchTerm, page]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
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
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end w-full sm:w-auto">
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
                      {transactions[sub.user_id]?.length ? (
                        [...transactions[sub.user_id]]
                          .sort((a, b) => new Date(b.paid_at || b.created_at).getTime() - new Date(a.paid_at || a.created_at).getTime())
                          .map((txn) => (
                            <div
                              key={txn.id}
                              className={`flex justify-between items-center p-3 rounded-md border border-white/10 ${
                                txn.status === 'failed' ? 'bg-red-500/10' : 'bg-white/5'
                              }`}
                            >
                              <div className="text-sm">
                                <p className="font-medium text-white">
                                  {new Date(txn.paid_at || txn.created_at).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </p>
                                <p className="text-xs text-muted-foreground capitalize">{txn.status}</p>
                              </div>
                              <div className="text-sm font-semibold text-white">
                                £{(txn.amount / 100).toFixed(2)}
                              </div>
                            </div>
                          ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No payments to show yet.</p>
                      )}
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
    </div>
  );
}