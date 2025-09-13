'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Search, 
  Users, 
  CreditCard, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  Eye,
  Clock,
  DollarSign,
  Package,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface Customer {
  id: string;
  email: string;
  display_name?: string;
  created_at: string;
  subscriptions: Array<{
    id: string;
    product_id: string;
    product_name: string;
    product_type: string;
    status: string;
    start_date: string;
    customer_reference?: string;
    total_paid: number;
    remaining_amount?: number;
    payment_count: number;
    total_payments?: number;
  }>;
  user_credits?: {
    balance: number;
    total_earned: number;
    total_spent: number;
  };
  last_visit?: string;
  total_spent: number;
  total_paid: number;
  active_subscriptions: number;
  cancelled_subscriptions: number;
}

interface Product {
  id: string;
  name: string;
  product_type: string;
  price: number;
  currency: string;
}

interface ServiceEvent {
  id: string;
  served_at: string;
  notes: string | null;
  amount_charged: number | null;
  source: string;
  product_name: string;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  paid_at: string;
  created_at: string;
  product_name: string;
}

const getProductIcon = (productType: string) => {
  switch (productType) {
    case 'balance_builder':
      return <TrendingUp className="w-3 h-3" />;
    case 'pay_it_off':
      return <CreditCard className="w-3 h-3" />;
    case 'subscription':
    default:
      return <Package className="w-3 h-3" />;
  }
};

const getProductTypeColor = (productType: string) => {
  switch (productType) {
    case 'balance_builder':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'pay_it_off':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'subscription':
    default:
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  }
};

const getProductShortName = (name: string, productType: string) => {
  if (name.length <= 12) return name;
  
  const shortNames: { [key: string]: string } = {
    'balance_builder': 'BB',
    'pay_it_off': 'PIO',
    'subscription': 'SUB'
  };
  
  const prefix = shortNames[productType] || 'SUB';
  return `${prefix}: ${name.substring(0, 8)}...`;
};

export function CustomerList() {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [customerTransactions, setCustomerTransactions] = useState<{
    payments: Payment[];
    serviceEvents: ServiceEvent[];
  }>({ payments: [], serviceEvents: [] });
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'balance' | 'spent'>('name');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'cancelled' | 'with_balance'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [chargeAmount, setChargeAmount] = useState('');
  const [chargeDescription, setChargeDescription] = useState('');
  const [logNotes, setLogNotes] = useState('');
  const [isCharging, setIsCharging] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  
  const isMobile = useIsMobile();
  const [pageSize, setPageSize] = useState(12);
  
  // Update page size based on screen size
  useEffect(() => {
    setPageSize(isMobile ? 8 : 12);
    setPage(1); // Reset to first page when page size changes
  }, [isMobile]);

  // Get business info
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: businessData } = await supabase
        .from('businesses')
        .select('id, name')
        .eq('user_id', user.id)
        .single();

      if (businessData) {
        setBusinessId(businessData.id);
        setBusinessName(businessData.name);
      }
    };

    fetchBusinessInfo();
  }, []);

  const fetchCustomers = useCallback(async () => {
    if (!businessId) return;
    
    setLoading(true);

    try {
      // First, get all unique customers who have subscriptions with this business
      const { data: subscriptionData, error: subError } = await supabase
        .from('subscriptions')
        .select(`
          user_id,
          id,
          product_id,
          status,
          start_date,
          customer_reference,
          total_paid,
          remaining_amount,
          payment_count,
          total_payments,
          products!inner(
            id,
            name,
            product_type,
            price,
            currency,
            business_id
          ),
          user_profiles!inner(
            id,
            email,
            display_name,
            created_at
          )
        `)
        .eq('products.business_id', businessId);

      if (subError) {
        console.error('Error fetching subscriptions:', subError);
        setLoading(false);
        return;
      }

      // Group by user_id to create customer objects
      const customerMap = new Map<string, Customer>();
      
      for (const sub of subscriptionData || []) {
        const userId = sub.user_id;
        const userProfile = sub.user_profiles;
        const product = sub.products;

        if (!customerMap.has(userId)) {
          customerMap.set(userId, {
            id: userId,
            email: (userProfile as any).email,
            display_name: (userProfile as any).display_name,
            created_at: (userProfile as any).created_at,
            subscriptions: [],
            total_spent: 0,
            total_paid: 0,
            active_subscriptions: 0,
            cancelled_subscriptions: 0
          });
        }

        const customer = customerMap.get(userId)!;
        customer.subscriptions.push({
          id: sub.id,
          product_id: sub.product_id,
          product_name: (product as any).name,
          product_type: (product as any).product_type,
          status: sub.status,
          start_date: sub.start_date,
          customer_reference: sub.customer_reference,
          total_paid: sub.total_paid || 0,
          remaining_amount: sub.remaining_amount,
          payment_count: sub.payment_count || 0,
          total_payments: sub.total_payments
        });

        if (sub.status === 'active') {
          customer.active_subscriptions++;
        } else {
          customer.cancelled_subscriptions++;
        }

        customer.total_paid += sub.total_paid || 0;
      }

      // Fetch user credits for balance builder customers
      const userIds = Array.from(customerMap.keys());
      const { data: creditData } = await supabase
        .from('user_credits')
        .select('user_id, balance, total_earned, total_spent')
        .eq('business_id', businessId)
        .in('user_id', userIds);

      // Add credit data to customers
      if (creditData) {
        for (const credit of creditData) {
          const customer = customerMap.get(credit.user_id);
          if (customer) {
            customer.user_credits = {
              balance: credit.balance,
              total_earned: credit.total_earned,
              total_spent: credit.total_spent
            };
            customer.total_spent = credit.total_spent;
          }
        }
      }

      // Fetch last visit data
      const { data: lastVisitData } = await supabase
        .from('service_events')
        .select('user_id, served_at')
        .eq('business_id', businessId)
        .in('user_id', userIds)
        .order('served_at', { ascending: false });

      if (lastVisitData) {
        const lastVisitMap = new Map<string, string>();
        for (const visit of lastVisitData) {
          if (!lastVisitMap.has(visit.user_id)) {
            lastVisitMap.set(visit.user_id, visit.served_at);
          }
        }

        for (const [userId, lastVisit] of lastVisitMap) {
          const customer = customerMap.get(userId);
          if (customer) {
            customer.last_visit = lastVisit;
          }
        }
      }

      const allCustomersList = Array.from(customerMap.values());
      setAllCustomers(allCustomersList);

    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  const fetchCustomerTransactions = async (customerId: string) => {
    if (!businessId) return;

    try {
      // Fetch payments
      const { data: paymentData } = await supabase
        .from('payments')
        .select(`
          id,
          amount,
          status,
          paid_at,
          created_at,
          products(name)
        `)
        .eq('user_id', customerId)
        .eq('business_id', businessId)
        .order('created_at', { ascending: false })
        .limit(20);

      // Fetch service events
      const { data: serviceData } = await supabase
        .from('service_events')
        .select(`
          id,
          served_at,
          notes,
          amount_charged,
          source,
          products(name)
        `)
        .eq('user_id', customerId)
        .eq('business_id', businessId)
        .order('served_at', { ascending: false })
        .limit(20);

        setCustomerTransactions({
          payments: paymentData?.map(p => ({
            ...p,
            product_name: (p.products as any)?.name || 'Unknown Product'
          })) || [],
          serviceEvents: serviceData?.map(s => ({
            ...s,
            product_name: (s.products as any)?.name || 'Unknown Product'
          })) || []
        });
    } catch (error) {
      console.error('Error fetching customer transactions:', error);
    }
  };

  const handleChargeCredit = async () => {
    if (!selectedCustomer || !chargeAmount || !chargeDescription || !businessId) {
      return;
    }

    const amount = parseFloat(chargeAmount) * 100;
    if (isNaN(amount) || amount <= 0) return;

    setIsCharging(true);

    try {
      const currentCredit = selectedCustomer.user_credits;
      if (!currentCredit || currentCredit.balance < amount) {
        alert('Insufficient credit');
        return;
      }

      // Update user balance
      const { error: creditError } = await supabase
        .from('user_credits')
        .update({
          balance: currentCredit.balance - amount,
          total_spent: currentCredit.total_spent + amount,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', selectedCustomer.id)
        .eq('business_id', businessId);

      if (creditError) {
        console.error('Error updating balance:', creditError);
        return;
      }

      // Create credit transaction
      const { error: transactionError } = await supabase
        .from('credit_transactions')
        .insert({
          user_id: selectedCustomer.id,
          business_id: businessId,
          amount: -amount,
          type: 'spent',
          description: chargeDescription,
        });

      if (transactionError) {
        console.error('Error creating transaction:', transactionError);
        return;
      }

      setShowChargeModal(false);
      setChargeAmount('');
      setChargeDescription('');
      fetchCustomers();
    } catch (error) {
      console.error('Error charging credit:', error);
    } finally {
      setIsCharging(false);
    }
  };

  const handleLogVisit = async () => {
    if (!selectedCustomer || !businessId) return;

    setIsLogging(true);

    try {
      const { data: authData } = await supabase.auth.getUser();
      
      await supabase.from('service_events').insert({
        business_id: businessId,
        user_id: selectedCustomer.id,
        notes: logNotes || null,
        source: 'manual',
        created_by: authData?.user?.id || null,
      });

      setShowLogModal(false);
      setLogNotes('');
      fetchCustomers();
    } catch (error) {
      console.error('Error logging visit:', error);
    } finally {
      setIsLogging(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, filterStatus, sortBy]);

  const filteredAndSortedCustomers = allCustomers
    .filter(customer => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          customer.email.toLowerCase().includes(searchLower) ||
          customer.display_name?.toLowerCase().includes(searchLower) ||
          customer.subscriptions.some(sub => 
            sub.customer_reference?.toLowerCase().includes(searchLower)
          )
        );
      }
      return true;
    })
    .filter(customer => {
      switch (filterStatus) {
        case 'active':
          return customer.active_subscriptions > 0;
        case 'cancelled':
          return customer.cancelled_subscriptions > 0 && customer.active_subscriptions === 0;
        case 'with_balance':
          return (customer.user_credits?.balance || 0) > 0;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.display_name || a.email).localeCompare(b.display_name || b.email);
        case 'balance':
          return (b.user_credits?.balance || 0) - (a.user_credits?.balance || 0);
        case 'spent':
          return b.total_spent - a.total_spent;
        case 'date':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const totalCustomers = allCustomers.length;
  const totalActiveSubscriptions = allCustomers.reduce((sum, c) => sum + c.active_subscriptions, 0);
  const totalBalance = allCustomers.reduce((sum, c) => sum + (c.user_credits?.balance || 0), 0);
  const totalSpent = allCustomers.reduce((sum, c) => sum + c.total_spent, 0);

  if (loading && page === 1) {
    return (
      <div className="min-h-screen overflow-hidden relative">
        <div className="fixed top-1/4 right-0 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
        <div className="fixed -bottom-24 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
        
        <div className="container mx-auto ">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Background Gradients */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
      <div className="fixed -bottom-24 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      
      {/* Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">

            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <h1 className="text-2xl font-semibold text-white">Customer Management</h1>
          </div>
        </div>


      {/* Search and Filters */}
      <div className="container mx-auto">
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers..."
              className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground text-base"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium"
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="balance">Sort by Balance</option>
              <option value="spent">Sort by Spent</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium"
            >
              <option value="all">All Customers</option>
              <option value="active">Active Only</option>
              <option value="cancelled">Cancelled Only</option>
              <option value="with_balance">With Balance</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20 hover:bg-blue-500/15 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-300 uppercase tracking-wide mb-1">Customers</p>
                <p className="text-2xl font-bold text-blue-200">{totalCustomers}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:bg-green-500/15 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-green-300 uppercase tracking-wide mb-1">Active</p>
                <p className="text-2xl font-bold text-green-200">{totalActiveSubscriptions}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/20 hover:bg-purple-500/15 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-purple-300 uppercase tracking-wide mb-1">Balance</p>
                <p className="text-2xl font-bold text-purple-200">
                  £{(totalBalance / 100).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 hover:bg-orange-500/15 transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-orange-300 uppercase tracking-wide mb-1">Spent</p>
                <p className="text-2xl font-bold text-orange-200">
                  £{(totalSpent / 100).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {filteredAndSortedCustomers
                .slice((page - 1) * pageSize, page * pageSize)
                .map((customer) => (
                <Card key={customer.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-200 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Mobile-optimized layout */}
                    <div className="p-4 sm:p-6">
                      {/* Header with basic info */}
                      <div className="mb-4">
                        <h3 className="font-semibold text-white text-lg truncate mb-2">
                          {customer.display_name || customer.email}
                        </h3>
                        {customer.display_name && (
                          <p className="text-sm text-muted-foreground truncate mb-3">
                            {customer.email}
                          </p>
                        )}
                        
                        {/* Active subscriptions pill */}
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`text-xs px-2 py-1 ${customer.active_subscriptions > 0 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                            {customer.active_subscriptions} active
                          </Badge>
                        </div>
                      </div>

                      {/* Subscription products */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Subscriptions</h4>
                        <div className="flex flex-wrap gap-2">
                          {customer.subscriptions.slice(0, 4).map((sub) => (
                            <Badge
                              key={sub.id}
                              className={`text-xs px-3 py-1.5 ${getProductTypeColor(sub.product_type)}`}
                            >
                              <span className="font-medium">
                                {sub.product_name.length > 15 
                                  ? `${sub.product_name.substring(0, 15)}...` 
                                  : sub.product_name
                                }
                              </span>
                            </Badge>
                          ))}
                          {customer.subscriptions.length > 4 && (
                            <Badge className="text-xs px-3 py-1.5 bg-gray-500/20 text-gray-400 border-gray-500/30">
                              +{customer.subscriptions.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Key metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {customer.user_credits && customer.user_credits.balance > 0 && (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <CreditCard className="w-4 h-4 text-green-400" />
                              <span className="text-xs font-medium text-green-400">Balance</span>
                            </div>
                            <p className="text-lg font-bold text-green-300">
                              £{(customer.user_credits.balance / 100).toFixed(2)}
                            </p>
                          </div>
                        )}
                        
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-medium text-blue-400">Total Spent</span>
                          </div>
                          <p className="text-lg font-bold text-blue-300">
                            £{(customer.total_spent / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Last visit info */}
                      {customer.last_visit && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground ">
                          <Clock className="w-4 h-4" />
                          <span>Last visit: {new Date(customer.last_visit).toLocaleDateString()}</span>
                        </div>
                      )}

                      {/* Expand button */}
                      <div className="flex justify-center pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setExpandedCustomer(
                              expandedCustomer === customer.id ? null : customer.id
                            );
                          }}
                          className="text-white hover:bg-white/10"
                        > Manage Customer
                          {expandedCustomer === customer.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Actions */}
                    {expandedCustomer === customer.id && (
                      <div className="border-t border-white/10 bg-white/5">
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-3">
                            {customer.user_credits && customer.user_credits.balance > 0 && (
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setShowChargeModal(true);
                                }}
                                className="h-11"
                              >
                                <CreditCard className="w-4 h-4 mr-2" />
                                Charge
                              </Button>
                            )}
                            
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                window.location.href = `/messages?customer=${customer.id}`;
                              }}
                              className="h-11"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Message
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="tertiary"
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setShowLogModal(true);
                              }}
                              className="h-11"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Log Visit
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setShowCustomerDetail(true);
                                fetchCustomerTransactions(customer.id);
                              }}
                              className="h-11"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                            Details
                            </Button>
                          </div>
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
              <span className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil(filteredAndSortedCustomers.length / pageSize)}
              </span>
              <Button 
                variant="outline" 
                disabled={page * pageSize >= filteredAndSortedCustomers.length} 
                onClick={() => setPage(page + 1)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Customer Detail Modal */}
      <Dialog open={showCustomerDetail} onOpenChange={setShowCustomerDetail}>
        <DialogContent className="bg-slate-800 border-white/10 max-w-md mx-4 max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="text-white text-xl">
              {selectedCustomer?.display_name || selectedCustomer?.email}
            </DialogTitle>
            {selectedCustomer?.display_name && (
              <p className="text-muted-foreground text-sm mt-1">
                {selectedCustomer.email}
              </p>
            )}
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="px-6 pb-6 space-y-6">
              {/* Customer Overview - Mobile Optimized */}
              <div className="space-y-3">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-400">Active Subscriptions</p>
                      <p className="text-2xl font-bold text-green-300">
                        {selectedCustomer.active_subscriptions}
                      </p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-400">Total Spent</p>
                      <p className="text-2xl font-bold text-blue-300">
                        £{(selectedCustomer.total_spent / 100).toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                
                {selectedCustomer.user_credits && (
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-400">Current Balance</p>
                        <p className="text-2xl font-bold text-purple-300">
                          £{(selectedCustomer.user_credits.balance / 100).toFixed(2)}
                        </p>
                      </div>
                      <CreditCard className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Active Subscriptions */}
              {selectedCustomer.subscriptions.filter(sub => sub.status === 'active').length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Active Subscriptions</h3>
                  <div className="space-y-3">
                    {selectedCustomer.subscriptions
                      .filter(sub => sub.status === 'active')
                      .map((sub) => (
                      <div key={sub.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Badge className={`text-sm px-3 py-1 mb-2 ${getProductTypeColor(sub.product_type)}`}>
                              {sub.product_name}
                            </Badge>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                active
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Total Paid</span>
                            <span className="text-sm font-semibold text-white">
                              £{(sub.total_paid / 100).toFixed(2)}
                            </span>
                          </div>
                          {sub.remaining_amount && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Remaining</span>
                              <span className="text-sm font-semibold text-orange-400">
                                £{(sub.remaining_amount / 100).toFixed(2)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Payments</span>
                            <span className="text-sm text-muted-foreground">
                              {sub.payment_count}/{sub.total_payments || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Transaction History - Mobile Optimized */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[...customerTransactions.payments, ...customerTransactions.serviceEvents]
                    .sort((a, b) => {
                      const aDate = 'paid_at' in a ? a.paid_at : a.served_at;
                      const bDate = 'paid_at' in b ? b.paid_at : b.served_at;
                      return new Date(bDate).getTime() - new Date(aDate).getTime();
                    })
                    .slice(0, 8)
                    .map((item, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          'amount' in item
                            ? item.status === 'failed'
                              ? 'bg-red-500/10 border border-red-500/20'
                              : 'bg-blue-500/10 border border-blue-500/20'
                            : 'bg-orange-500/10 border border-orange-500/20'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                              {new Date('paid_at' in item ? item.paid_at : item.served_at).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {'amount' in item
                                ? (item.status === 'failed' ? 'Payment Failed' : 'Payment Received')
                                : (item.notes || 'Service Delivered')
                              }
                            </p>
                          </div>
                          <div className={`text-sm font-semibold ${
                            'amount' in item
                              ? (item.status === 'failed' ? 'text-red-400' : 'text-blue-400')
                              : 'text-orange-400'
                          }`}>
                            {'amount' in item
                              ? (item.status === 'failed' ? 'Failed' : `+£${(item.amount / 100).toFixed(2)}`)
                              : (item.amount_charged ? `-£${(item.amount_charged / 100).toFixed(2)}` : 'Service')
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Cancelled Subscriptions - Collapsible */}
              {selectedCustomer.subscriptions.filter(sub => sub.status === 'cancelled').length > 0 && (
                <div>
                  <button
                    onClick={() => setExpandedCustomer(expandedCustomer === 'cancelled' ? null : 'cancelled')}
                    className="flex items-center justify-between w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      Cancelled Subscriptions
                    </h3>
                    {expandedCustomer === 'cancelled' ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  {expandedCustomer === 'cancelled' && (
                    <div className="mt-3 space-y-3">
                      {selectedCustomer.subscriptions
                        .filter(sub => sub.status === 'cancelled')
                        .map((sub) => (
                        <div key={sub.id} className="bg-white/5 border border-white/10 rounded-lg p-4 opacity-75">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <Badge className={`text-sm px-3 py-1 mb-2 ${getProductTypeColor(sub.product_type)}`}>
                                {sub.product_name}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">
                                  cancelled
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Total Paid</span>
                              <span className="text-sm font-semibold text-white">
                                £{(sub.total_paid / 100).toFixed(2)}
                              </span>
                            </div>
                            {sub.remaining_amount && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Remaining</span>
                                <span className="text-sm font-semibold text-orange-400">
                                  £{(sub.remaining_amount / 100).toFixed(2)}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Payments</span>
                              <span className="text-sm text-muted-foreground">
                                {sub.payment_count}/{sub.total_payments || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Charge Credit Modal */}
      <Dialog open={showChargeModal} onOpenChange={setShowChargeModal}>
        <DialogContent className="bg-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Charge Customer Credit</DialogTitle>
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
              <label className="text-sm font-medium text-white">Description</label>
              <Input
                type="text"
                value={chargeDescription}
                onChange={(e) => setChargeDescription(e.target.value)}
                placeholder="e.g., Haircut service, Consultation fee"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            {selectedCustomer?.user_credits && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="text-sm text-green-400">
                  Current Balance: £{(selectedCustomer.user_credits.balance / 100).toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button className="mt-2" variant="tertiary" onClick={() => setShowChargeModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleChargeCredit} 
              disabled={isCharging || !chargeAmount || !chargeDescription}
              variant="primary"
            >
              {isCharging ? 'Charging...' : 'Charge Balance'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Log Visit Modal */}
      <Dialog open={showLogModal} onOpenChange={setShowLogModal}>
        <DialogContent className="bg-slate-800 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Log Customer Visit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Notes (optional)</label>
              <Input
                type="text"
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                placeholder="e.g., Haircut completed, Botox treatment"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button className="mt-2" variant="tertiary" onClick={() => setShowLogModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleLogVisit} 
              disabled={isLogging || !selectedCustomer}
              variant="primary"
            >
              {isLogging ? 'Logging...' : 'Log Visit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
