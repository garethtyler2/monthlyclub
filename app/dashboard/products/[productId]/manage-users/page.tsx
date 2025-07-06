'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

    setSubscriptions(subs);
    setHasMore(subs.length === pageSize);
    setLoading(false);
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
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{sub.user_profiles?.email ?? 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground">Started: {new Date(sub.start_date).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">
                      Ref: {sub.customer_reference ?? 'None'}
                    </p>
                  </div>
                  <Button size="sm" variant="destructive">
                    Cancel
                  </Button>
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