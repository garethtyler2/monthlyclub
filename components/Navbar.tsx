"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Settings, LogOut, Plus, Home, BookOpen, Zap, DollarSign, Building2, CreditCard, Newspaper, ImagePlus, MessageCircle, Shield } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useIsMobile } from "@/hooks/use-mobile";
import CreatePostModal from "@/components/business/CreatePostModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [hasSubscriptions, setHasSubscriptions] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [businessSlug, setBusinessSlug] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [businessImageUrl, setBusinessImageUrl] = useState<string | null>(null);
  const [businessStatus, setBusinessStatus] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Create Post Modal
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (user) {
        const { data: businessData, error } = await supabase
          .from("businesses")
          .select("id, slug, name, image_url, status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (businessData) {
          setHasBusiness(true);
        }
        setBusinessId(businessData?.id ?? null);
        setBusinessSlug(businessData?.slug ?? null);
        setBusinessName(businessData?.name ?? null);
        setBusinessImageUrl(businessData?.image_url ?? null);
        setBusinessStatus(businessData?.status ?? null);

        // Check for subscriptions
        const { data: subData } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("user_id", user.id);
        if (subData && subData.length > 0) {
          setHasSubscriptions(true);
        }

        // Check if user is admin
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Check if user has admin privileges
        const adminEmails = ['gareth@monthlyclubhq.com']; // Add your admin emails
        const adminHandles = ['admin', 'gareth']; // Add your admin handles
        
        const isAdminUser = adminEmails.includes(user.email || '') || 
                           adminHandles.includes(profile?.handle || '');
        
        setIsAdmin(isAdminUser);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const handleRedirect = (path: string) => {
    setLoadingUpdate(true);
    window.location.href = path;
  };

  const onCreateBusinessClick = () => {
    if (!user) {
      window.location.href = "/login?redirect=/create-a-business/step-one";
    } else {
      window.location.href = "/create-a-business/step-one";
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Fetch unread message count
  const fetchUnreadMessageCount = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/messaging/conversations');
      if (response.ok) {
        const data = await response.json();
        const totalUnread = data.conversations.reduce((sum: number, conv: any) => sum + (conv.unread_count || 0), 0);
        setUnreadMessageCount(totalUnread);
      }
    } catch (error) {
      console.error('Error fetching unread message count:', error);
    }
  }, [user]);

  // Fetch unread message count when user changes
  useEffect(() => {
    if (user) {
      fetchUnreadMessageCount();
      // Set up interval to refresh unread count every 30 seconds
      const interval = setInterval(fetchUnreadMessageCount, 30000);
      
      // Listen for messages being read
      const handleMessagesRead = () => {
        fetchUnreadMessageCount();
      };
      window.addEventListener('messagesRead', handleMessagesRead);
      
      return () => {
        clearInterval(interval);
        window.removeEventListener('messagesRead', handleMessagesRead);
      };
    } else {
      setUnreadMessageCount(0);
    }
  }, [user, fetchUnreadMessageCount]);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <LoadingOverlay show={loadingUpdate} />
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          {/* Desktop Logo */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
                Monthly Club
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <Link 
                href="/how-it-works" 
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200 relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/pricing" 
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200 relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/features" 
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200 relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/guides" 
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200 relative group"
              >
                Guides
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue transition-all duration-200 group-hover:w-full"></span>
              </Link>
              {hasSubscriptions && (
                <Link 
                  href="/feed" 
                  className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200 relative group"
                >
                  Feed
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue transition-all duration-200 group-hover:w-full"></span>
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {((businessStatus === 'draft' || businessStatus === 'pre-stripe') && (
                <button 
                  onClick={onCreateBusinessClick} 
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Finish Setup
                </button>
              ))}

              {/* Desktop Create Post as its own nav item */}
              {user && businessId && (
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-blue text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Post
                </button>
              )}

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none cursor-pointer group">
                    <div className="relative">
                      <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue ring-2 ring-white/20 group-hover:ring-brand-purple/50 transition-all duration-200">
                        {businessImageUrl ? (
                          <Image src={businessImageUrl} alt={businessName ?? "Business"} width={40} height={40} className="rounded-full object-cover w-full h-full" />
                        ) : (
                          <AvatarFallback className="text-white font-semibold">
                            {businessName ? businessName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-3 w-64 bg-slate-800 border-white/10 backdrop-blur-md">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue w-10 h-10">
                          {businessImageUrl ? (
                            <Image src={businessImageUrl} alt={businessName ?? "Business"} width={40} height={40} className="rounded-full object-cover w-full h-full" />
                          ) : (
                            <AvatarFallback className="text-white font-semibold">
                              {businessName ? businessName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm truncate">
                            {businessName ?? user?.email?.replace(/@.*/, '@...')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {businessName ? 'Business Owner' : 'Account'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Business Setup Section */}
                    {businessStatus === null && (
                      <div className="px-3 py-2">
                        <button 
                          onClick={() => handleRedirect("/create-a-business/step-one")}
                          className="w-full flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-brand-purple to-brand-blue text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Plus size={16} />
                          <span>Create Business</span>
                        </button>
                      </div>
                    )}
                    {(businessStatus === "draft" || businessStatus === "pre-stripe") && (
                      <div className="px-3 py-2">
                        <button 
                          onClick={() => handleRedirect("/create-a-business/step-one")}
                          className="w-full flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Settings size={16} />
                          <span>Finish Business Setup</span>
                        </button>
                      </div>
                    )}

                    {/* Top-level My Posts (desktop dropdown) */}
                    {hasBusiness && (
                      <DropdownMenuItem asChild className="px-3 py-2 hover:bg-white/5">
                        <Link href="/dashboard/business/posts" className="flex items-center space-x-2 text-sm">
                          <Newspaper size={16} className="text-muted-foreground" />
                          <span>My Posts</span>
                        </Link>
                      </DropdownMenuItem>
                    )}

                    {/* Messages */}
                    <DropdownMenuItem asChild className="px-3 py-2 hover:bg-white/5">
                      <Link href="/messages" className="flex items-center space-x-2 text-sm">
                        <div className="relative">
                          <MessageCircle size={16} className="text-muted-foreground" />
                          {unreadMessageCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <span>Messages</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Business Management Section */}
                    {hasBusiness && (
                      <>
                        <div className="px-3 pt-3 pb-1">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">My Business</div>
                        </div>
                        <DropdownMenuItem asChild className="px-3 py-2 hover:bg-white/5">
                          <Link href="/dashboard/business" className="flex items-center space-x-2 text-sm">
                            <Building2 size={16} className="text-muted-foreground" />
                            <span>Business Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="px-3 py-2 hover:bg-white/5">
                          <button
                            onClick={() => handleRedirect(`/businesses/${businessSlug}`)}
                            className="w-full flex items-center space-x-2 text-sm text-left"
                          >
                            <User size={16} className="text-muted-foreground" />
                            <span>My Business Page</span>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="px-3 py-2 hover:bg-white/5">
                          <button 
                            onClick={() => handleRedirect("/api/stripe/update-business-details")}
                            className="w-full flex items-center space-x-2 text-sm text-left"
                          >
                            <Settings size={16} className="text-muted-foreground" />
                            <span>Business Details - Stripe</span>
                          </button>
                        </DropdownMenuItem>
                      </>
                    )}

                    {/* Subscriptions Section */}
                    {hasSubscriptions && (
                      <>
                        <div className="px-3 pt-3 pb-1">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">My Subscriptions</div>
                        </div>
                        <DropdownMenuItem asChild className="px-3 py-2 hover:bg-white/5">
                          <Link href="/dashboard/subscriptions" className="flex items-center space-x-2 text-sm">
                            <CreditCard size={16} className="text-muted-foreground" />
                            <span>My Subscriptions</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="px-3 py-2 hover:bg-white/5">
                          <button 
                            onClick={() => handleRedirect("/api/stripe/update-payment-details")}
                            className="w-full flex items-center space-x-2 text-sm text-left"
                          >
                            <Settings size={16} className="text-muted-foreground" />
                            <span>Payment Details - Stripe</span>
                          </button>
                        </DropdownMenuItem>
                      </>
                    )}

                    {/* Admin Section */}
                    {isAdmin && (
                      <>
                        <div className="border-t border-white/10 mt-2 pt-2">
                          <div className="px-3 pb-1">
                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admin</div>
                          </div>
                          <DropdownMenuItem asChild className="px-3 py-2 hover:bg-white/5">
                            <Link href="/overwatch" className="flex items-center space-x-2 text-sm">
                              <Shield size={16} className="text-muted-foreground" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                        </div>
                      </>
                    )}

                    {/* Logout Section */}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="px-3 py-2 hover:bg-red-500/10 text-red-400 hover:text-red-300"
                      >
                        <div className="flex items-center space-x-2 text-sm">
                          <LogOut size={16} />
                          <span>Logout</span>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              {!loading && !user && (
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                  >
                    Login / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="relative">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                {unreadMessageCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </div>
            </button>

            {/* Mobile Logo */}
            <Link href="/" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
              Monthly Club
            </Link>

            {/* Mobile Avatar/Login Button */}
            {user ? (
              <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue w-8 h-8">
                {businessImageUrl ? (
                  <Image src={businessImageUrl} alt={businessName ?? "Business"} width={32} height={32} className="rounded-full object-cover w-full h-full" />
                ) : (
                  <AvatarFallback title={user?.email ?? "Logged in"}>👤</AvatarFallback>
                )}
              </Avatar>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu - Complete Overhaul */}
        {isMenuOpen && (
          <div className="relative">
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={closeMenu}
            />
            <div className="md:hidden border-t border-white/10 animate-fade-in relative z-50 bg-background/95 backdrop-blur-md max-h-[calc(100vh-4rem)]">
              <div 
                className="container mx-auto px-4 py-4 overflow-y-auto"
                style={{ 
                  maxHeight: 'calc(100vh - 4rem)',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  minHeight: '200px' // Ensure there's always some height to scroll
                }}
              >
                
                {/* User Profile Section */}
                {user && (
                  <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border border-white/10">
                    <div className="flex items-center space-x-3 mb-2">
                      {businessName ? (
                        <Link
                          href="/dashboard/business"
                          onClick={closeMenu}
                          className="flex items-center space-x-3 flex-1 min-w-0 group"
                          tabIndex={0}
                        >
                          <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue w-10 h-10">
                            {businessImageUrl ? (
                              <Image src={businessImageUrl} alt={businessName ?? "Business"} width={32} height={32} className="rounded-full object-cover w-full h-full" />
                            ) : (
                              <AvatarFallback title={user?.email ?? "Logged in"}>👤</AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate text-sm group-hover:underline">
                              {businessName ?? user?.email?.replace(/@.*/, '@...')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Business Owner
                            </p>
                          </div>
                        </Link>
                      ) : (
                        <>
                          <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue w-10 h-10">
                            {businessImageUrl ? (
                              <Image src={businessImageUrl} alt={businessName ?? "Business"} width={32} height={32} className="rounded-full object-cover w-full h-full" />
                            ) : (
                              <AvatarFallback title={user?.email ?? "Logged in"}>👤</AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate text-sm">
                              {user?.email?.replace(/@.*/, '@...')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Account
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex space-x-2">
                      {businessStatus === null && (
                        <button
                          onClick={() => {
                            onCreateBusinessClick();
                            closeMenu();
                          }}
                          className="flex-1 flex items-center justify-center space-x-2 px-2 py-1.5 bg-gradient-to-r from-brand-purple to-brand-blue text-white text-xs font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Plus size={14} />
                          <span>Start Business</span>
                        </button>
                      )}
                      {(businessStatus === "draft" || businessStatus === "pre-stripe") && (
                        <button
                          onClick={() => {
                            onCreateBusinessClick();
                            closeMenu();
                          }}
                          className="flex-1 flex items-center justify-center space-x-2 px-2 py-1.5 bg-gradient-to-r from-brand-purple to-brand-blue text-white text-xs font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <Settings size={14} />
                          <span>Finish Setup</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}


                {/* Primary links for logged-out users */}
                {!user && (
                  <div className="mb-4">
                    <div className="space-y-0.5">
                      <Link
                        href="/how-it-works"
                        className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <span className="font-medium text-sm">How It Works</span>
                      </Link>
                      <Link
                        href="/pricing"
                        className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <span className="font-medium text-sm">Pricing</span>
                      </Link>
                      <Link
                        href="/features"
                        className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <span className="font-medium text-sm">Features</span>
                      </Link>
                      <Link
                        href="/guides"
                        className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <span className="font-medium text-sm">Guides</span>
                      </Link>
                    </div>
                    
                    {/* Create Business button for logged-out users */}
                    <div className="mt-3 p-2.5 rounded-lg bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border border-white/10">
                      <button
                        onClick={() => {
                          onCreateBusinessClick();
                          closeMenu();
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-2.5 py-2 bg-gradient-to-r from-brand-purple to-brand-blue text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <Plus size={16} />
                        <span>Create Business</span>
                      </button>
                    </div>
                  </div>
                )}



                {/* My Posts + Create Post + Feed (above Business section) */}
                {user && (
                  <div className="mb-4">
                    <div className="space-y-0.5">
                      {hasBusiness && (
                        <Link
                          href="/dashboard/business/posts"
                          className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                          onClick={closeMenu}
                        >
                          <Newspaper size={18} className="text-muted-foreground" />
                          <span className="font-medium text-sm">My Posts</span>
                        </Link>
                      )}
                      {businessId && (
                        <button
                          onClick={() => {
                            setShowCreatePost(true);
                            closeMenu();
                          }}
                          className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <ImagePlus size={18} className="text-muted-foreground" />
                          <span className="font-medium text-sm">Create Post</span>
                        </button>
                      )}
                      <Link
                        href="/feed"
                        className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <Newspaper size={18} className="text-muted-foreground" />
                        <span className="font-medium text-sm">Feed</span>
                      </Link>
                      <Link
                        href="/messages"
                        className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <div className="relative">
                          <MessageCircle size={18} className="text-muted-foreground" />
                          {unreadMessageCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <span className="font-medium text-sm">Messages</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Business Management Section */}
                {user && hasBusiness && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2.5">
                      Business Management
                    </h3>
                    <div className="space-y-0.5">
                      <Link
                        href="/dashboard/business"
                        className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <Building2 size={18} className="text-muted-foreground" />
                        <span className="font-medium text-sm">Business Dashboard</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          handleRedirect(`/businesses/${businessSlug}`);
                          closeMenu();
                        }}
                        className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <User size={18} className="text-muted-foreground" />
                        <span className="font-medium text-sm">My Business Page</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          handleRedirect("/api/stripe/update-business-details");
                          closeMenu();
                        }}
                        className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <Settings size={18} className="text-muted-foreground" />
                        <span className="font-medium text-sm">Business Details - Stripe</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Subscriptions Section */}
                {user && hasSubscriptions && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2.5">
                      My Subscriptions
                    </h3>
                    <div className="space-y-0.5">
                      <Link
                        href="/dashboard/subscriptions"
                        className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={closeMenu}
                      >
                        <CreditCard size={18} className="text-muted-foreground" />
                        <span className="font-medium text-sm">My Subscriptions</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          handleRedirect("/api/stripe/update-payment-details");
                          closeMenu();
                        }}
                        className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <Settings size={18} className="text-muted-foreground" />
                        <span className="font-medium text-sm">Payment Details - Stripe</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Account Actions */}
                <div className="border-t border-white/10 pt-3">
                  {user ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={18} />
                      <span className="font-medium text-sm">Logout</span>
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center justify-center space-x-2 w-full px-3 py-2.5  text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                      onClick={closeMenu}
                    >
                      <User size={18} />
                      <span className="text-sm">Login / Sign Up</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      {businessId && (
        <CreatePostModal
          businessId={businessId}
          open={showCreatePost}
          onOpenChange={setShowCreatePost}
        />
      )}
    </>
  );
};

export default Navbar;

