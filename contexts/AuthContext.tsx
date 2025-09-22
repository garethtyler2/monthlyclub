"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

interface User {
  id: string;
  email?: string;
  [key: string]: any;
}

interface Business {
  id: string;
  slug: string;
  name: string;
  image_url?: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  business: Business | null;
  subscriptions: any[];
  isAdmin: boolean;
  unreadMessageCount: number;
  loading: boolean;
  hasBusiness: boolean;
  hasSubscriptions: boolean;
  businessId: string | null;
  businessSlug: string | null;
  businessName: string | null;
  businessImageUrl: string | null;
  businessStatus: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface ServerAuth {
  user: User | null;
  business: Business | null;
  subscriptions: any[];
  isAdmin: boolean;
  unreadMessageCount: number;
  hasBusiness: boolean;
  hasSubscriptions: boolean;
}

export function AuthProvider({ children, serverAuth }: { children: React.ReactNode; serverAuth: ServerAuth }) {
  const [user, setUser] = useState<User | null>(serverAuth.user);
  const [business, setBusiness] = useState<Business | null>(serverAuth.business);
  const [subscriptions, setSubscriptions] = useState<any[]>(serverAuth.subscriptions);
  const [isAdmin, setIsAdmin] = useState(serverAuth.isAdmin);
  const [unreadMessageCount, setUnreadMessageCount] = useState(serverAuth.unreadMessageCount);
  const [loading, setLoading] = useState(false); // Server auth is already loaded
  const [hasBusiness, setHasBusiness] = useState(serverAuth.hasBusiness);
  const [hasSubscriptions, setHasSubscriptions] = useState(serverAuth.hasSubscriptions);
  const [businessId, setBusinessId] = useState<string | null>(serverAuth.business?.id || null);
  const [businessSlug, setBusinessSlug] = useState<string | null>(serverAuth.business?.slug || null);
  const [businessName, setBusinessName] = useState<string | null>(serverAuth.business?.name || null);
  const [businessImageUrl, setBusinessImageUrl] = useState<string | null>(serverAuth.business?.image_url || null);
  const [businessStatus, setBusinessStatus] = useState<string | null>(serverAuth.business?.status || null);

  // Function to load user data
  const loadUserData = async (user: User) => {
    try {
      console.log('🔍 AuthContext: Loading user data for:', user.email);
      
      // Ensure user profile exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (!existingProfile) {
        console.log('AuthContext: Creating missing user profile for:', user.email);
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: user.id,
            email: user.email,
            created_at: user.created_at
          });
        
        if (profileError) {
          console.error('AuthContext: Failed to create user profile:', profileError);
        } else {
          console.log('AuthContext: Successfully created user profile for:', user.email);
        }
      }

      // Load business data
      console.log('🔍 AuthContext: Loading business data for user:', user.id);
      const { data: businessData, error } = await supabase
        .from("businesses")
        .select("id, slug, name, image_url, status")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error('🔍 AuthContext: Business data error:', error);
      } else if (businessData) {
        console.log('🔍 AuthContext: Found business data:', businessData);
        setBusiness(businessData);
        setHasBusiness(true);
        setBusinessId(businessData.id);
        setBusinessSlug(businessData.slug);
        setBusinessName(businessData.name);
        setBusinessImageUrl(businessData.image_url);
        setBusinessStatus(businessData.status);
      } else {
        console.log('🔍 AuthContext: No business data found for user');
        setBusiness(null);
        setHasBusiness(false);
        setBusinessId(null);
        setBusinessSlug(null);
        setBusinessName(null);
        setBusinessImageUrl(null);
        setBusinessStatus(null);
      }

      // Check for subscriptions
      const { data: subData } = await supabase
        .from("subscriptions")
        .select("id, product_id")
        .eq("user_id", user.id);
      
      if (subData && subData.length > 0) {
        console.log('🔍 AuthContext: Found subscriptions:', subData.length);
        setSubscriptions(subData);
        setHasSubscriptions(true);
      } else {
        setSubscriptions([]);
        setHasSubscriptions(false);
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const adminEmails = ['gareth@monthlyclubhq.com'];
      const adminHandles = ['admin', 'gareth'];
      
      const isAdminUser = adminEmails.includes(user.email || '') || 
                         adminHandles.includes(profile?.handle || '');
      
      setIsAdmin(isAdminUser);
      console.log('🔍 AuthContext: Admin status:', isAdminUser);

      // Load unread message count
      const { count: unreadCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('recipient_id', user.id)
        .eq('is_read', false);
      
      setUnreadMessageCount(unreadCount || 0);
      console.log('🔍 AuthContext: Unread messages:', unreadCount || 0);
      
    } catch (error) {
      console.error('🔍 AuthContext: Error in loadUserData:', error);
    }
  };

  useEffect(() => {
    // Initial auth check
    const getUser = async () => {
      console.log('🔍 AuthContext: Initial getUser called');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('🔍 AuthContext: Initial getUser result:', user?.email || 'No user');
      
      if (user) {
        setUser(user);
        await loadUserData(user);
      }
      setLoading(false);
    };

    getUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔍 AuthContext: Auth State Change:', event, session?.user?.email || 'No user');
      
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user) {
        console.log('🔍 AuthContext: Processing auth event for:', event, session.user.email);
        
        // Update user state immediately
        setUser(session.user);
        setLoading(false);
        
        // Load additional data asynchronously
        loadUserData(session.user);
      } else if (event === 'SIGNED_OUT') {
        console.log('🔍 AuthContext: User signed out');
        setUser(null);
        setBusiness(null);
        setSubscriptions([]);
        setIsAdmin(false);
        setUnreadMessageCount(0);
        setHasBusiness(false);
        setHasSubscriptions(false);
        setBusinessId(null);
        setBusinessSlug(null);
        setBusinessName(null);
        setBusinessImageUrl(null);
        setBusinessStatus(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    business,
    subscriptions,
    isAdmin,
    unreadMessageCount,
    loading,
    hasBusiness,
    hasSubscriptions,
    businessId,
    businessSlug,
    businessName,
    businessImageUrl,
    businessStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
