'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  MessageCircle, 
  Building2, 
  CreditCard,
  Calendar,
  Search,
  Eye,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import Image from 'next/image';

interface AdminStats {
  totalRevenue: number;
  platformFees: number;
  totalUsers: number;
  newUsersThisMonth: number;
  totalBusinesses: number;
  activeSubscriptions: number;
  totalConversations: number;
  recentMessages: number;
}

interface Conversation {
  id: string;
  participant1_id: string;
  participant2_id: string;
  created_at: string;
  last_message_at: string;
  last_message?: {
    content: string;
    sender_id: string;
    created_at: string;
  };
  participant1?: {
    id: string;
    email: string;
    display_name: string;
    handle: string;
  };
  participant2?: {
    id: string;
    email: string;
    display_name: string;
    handle: string;
  };
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
  message_type: string;
  image_url?: string;
  sender?: {
    id: string;
    email: string;
    display_name: string;
    handle: string;
  };
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const fetchAdminData = useCallback(async () => {
    setRefreshing(true);
    
    try {
      // Fetch financial stats
      const { data: payments } = await supabase
        .from('payments')
        .select('amount, status, created_at')
        .eq('status', 'succeeded');

      const totalRevenue = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
      const platformFees = Math.round(totalRevenue * 0.015); // 1.5% platform fee

      // Fetch user stats
      const { count: totalUsers } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: newUsersThisMonth } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Fetch business stats
      const { count: totalBusinesses } = await supabase
        .from('businesses')
        .select('*', { count: 'exact', head: true });

      const { count: activeBusinesses } = await supabase
        .from('businesses')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Fetch subscription stats
      const { count: totalSubscriptions } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true });

      const { count: activeSubscriptions } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Fetch conversation stats
      const { count: totalConversations } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true });

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { count: recentMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      setStats({
        totalRevenue,
        platformFees,
        totalUsers: totalUsers || 0,
        newUsersThisMonth: newUsersThisMonth || 0,
        totalBusinesses: totalBusinesses || 0,
        activeSubscriptions: activeSubscriptions || 0,
        totalConversations: totalConversations || 0,
        recentMessages: recentMessages || 0,
      });

      // Fetch conversations with participant details
      await fetchConversations();
      
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Check if user has admin privileges
        // For now, we'll check if the user has a specific email or handle
        // You can modify this logic based on your admin identification method
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // For now, let's check if the user has a specific email or handle
        // You can replace this with your actual admin check logic
        const adminEmails = ['gareth@monthlyclubhq.com']; // Add your admin emails
        const adminHandles = ['admin', 'gareth']; // Add your admin handles
        
        const isAdminUser = adminEmails.includes(user.email || '') || 
                           adminHandles.includes(profile?.handle || '');
        
        setIsAdmin(isAdminUser);
        
        if (isAdminUser) {
          await fetchAdminData();
        }
      }
      
      setLoading(false);
    };

    checkAdminAccess();
  }, [fetchAdminData]);

  const fetchConversations = async () => {
    try {
      const res = await fetch('/api/overwatch/conversations')
      if (!res.ok) {
        throw new Error('Failed to load conversations')
      }
      const data = await res.json()
      setConversations(data.conversations || [])
    } catch (error) {
      console.error('Error fetching conversations:', error)
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const res = await fetch(`/api/overwatch/messages?conversation_id=${conversationId}`)
      if (!res.ok) {
        throw new Error('Failed to load messages')
      }
      const data = await res.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount / 100);
  };

  const filteredConversations = conversations.filter(conv => {
    const query = searchQuery.toLowerCase();
    const participant1 = conv.participant1;
    const participant2 = conv.participant2;
    const lastMessage = conv.last_message?.content || '';
    
    return (
      participant1?.email?.toLowerCase().includes(query) ||
      participant1?.display_name?.toLowerCase().includes(query) ||
      participant1?.handle?.toLowerCase().includes(query) ||
      participant2?.email?.toLowerCase().includes(query) ||
      participant2?.display_name?.toLowerCase().includes(query) ||
      participant2?.handle?.toLowerCase().includes(query) ||
      lastMessage.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <LoadingOverlay show message="Loading admin dashboard..." />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white mb-4">Please log in to access admin dashboard</h1>
          <Button onClick={() => window.location.href = '/login'}>
            Login
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You don't have permission to access the admin dashboard.</p>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Platform overview and monitoring</p>
          </div>
          <Button 
            onClick={fetchAdminData}
            disabled={refreshing}
            className="hero-button-primary"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Business Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</div>
                <p className="text-xs text-gray-400">All time</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Platform Fees</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(stats.platformFees)}</div>
                <p className="text-xs text-gray-400">1.5% of business revenue</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-gray-400">+{stats.newUsersThisMonth} this month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.activeSubscriptions.toLocaleString()}</div>
                <p className="text-xs text-gray-400">{stats.totalBusinesses} businesses</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Conversation Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Conversations ({filteredConversations.length})
                </CardTitle>
                <div className="flex space-x-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        fetchMessages(conversation.id);
                      }}
                      className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-gray-700' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-medium text-white truncate">
                              {conversation.participant1?.display_name || conversation.participant1?.email}
                            </p>
                            <span className="text-gray-400">↔</span>
                            <p className="text-sm font-medium text-white truncate">
                              {conversation.participant2?.display_name || conversation.participant2?.email}
                            </p>
                          </div>
                          {conversation.last_message && (
                            <p className="text-xs text-gray-400 truncate mb-1">
                              {conversation.last_message.content}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                          </p>
                        </div>
                        <Eye className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages View */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {selectedConversation ? 'Conversation Details' : 'Select a conversation to view messages'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedConversation ? (
                  <div className="space-y-4">
                    {/* Conversation Info */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Participants</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-300">Participant 1</p>
                          <p className="text-white font-medium">
                            {selectedConversation.participant1?.display_name || selectedConversation.participant1?.email}
                          </p>
                          <p className="text-xs text-gray-400">
                            @{selectedConversation.participant1?.handle}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">Participant 2</p>
                          <p className="text-white font-medium">
                            {selectedConversation.participant2?.display_name || selectedConversation.participant2?.email}
                          </p>
                          <p className="text-xs text-gray-400">
                            @{selectedConversation.participant2?.handle}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <p className="text-sm text-gray-300">
                          Started: {formatDistanceToNow(new Date(selectedConversation.created_at), { addSuffix: true })}
                        </p>
                        <p className="text-sm text-gray-300">
                          Last activity: {formatDistanceToNow(new Date(selectedConversation.last_message_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="bg-gray-700 p-4 rounded-lg max-h-96 overflow-y-auto">
                      <h3 className="text-white font-medium mb-4">Messages ({messages.length})</h3>
                      {messages.length > 0 ? (
                        <div className="space-y-3">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`p-3 rounded-lg ${
                                message.sender_id === selectedConversation.participant1_id
                                  ? 'bg-blue-600 text-white ml-8'
                                  : 'bg-gray-600 text-white mr-8'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-medium">
                                  {message.sender?.display_name || message.sender?.email}
                                </p>
                                <p className="text-xs opacity-75">
                                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                                </p>
                              </div>
                              {message.image_url ? (
                                <div className="space-y-2">
                                  <Image 
                                    src={message.image_url} 
                                    alt="Message image" 
                                    width={300}
                                    height={200}
                                    className="max-w-full h-auto rounded-lg"
                                  />
                                  {message.content && (
                                    <p className="text-sm">{message.content}</p>
                                  )}
                                  <p className="text-sm opacity-90">📷 Image</p>
                                </div>
                              ) : (
                                <p className="text-sm">{message.content}</p>
                              )}
                              {message.read_at && (
                                <div className="mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    ✓ Read
                                  </Badge>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-center py-8">No messages in this conversation</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Select a conversation from the list to view messages</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
