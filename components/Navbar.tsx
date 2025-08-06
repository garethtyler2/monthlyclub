"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Settings, LogOut, Plus, Home, BookOpen, Zap, DollarSign, Building2, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [hasSubscriptions, setHasSubscriptions] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [businessSlug, setBusinessSlug] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string | null>(null);
  const [businessImageUrl, setBusinessImageUrl] = useState<string | null>(null);
  const [businessStatus, setBusinessStatus] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
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
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/how-it-works" className="text-sm font-medium hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/guides" className="text-sm font-medium hover:text-white transition-colors">
              Guides
            </Link>
            {(!hasBusiness && (
              <button onClick={onCreateBusinessClick} className="hero-button-primary text-sm font-medium hover:underline underline-offset-4 transition-colors">
                Create Business
              </button>
            )) ||
              ((businessStatus === 'draft' || businessStatus === 'pre-stripe') && (
                <button onClick={onCreateBusinessClick} className="hero-button-primary text-sm font-medium hover:underline underline-offset-4 transition-colors">
                  Finish Business Setup
                </button>
              ))}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                  <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue">
                    {businessImageUrl ? (
                      <img src={businessImageUrl} alt={businessName ?? "Business"} className="rounded-full object-cover w-full h-full" />
                    ) : (
                      <AvatarFallback title={user?.email ?? "Logged in"}>👤</AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2">
                  <div className="px-3 py-2 border-b border-muted capitalize text-sm text-muted-foreground">
                    {businessName ?? user?.email?.replace(/@.*/, '@...')}
                  </div>

                  {businessStatus === null && (
                    <DropdownMenuItem asChild>
                      <button onClick={() => handleRedirect("/create-a-business/step-one")}>
                        Create Business
                      </button>
                    </DropdownMenuItem>
                  )}
                  {(businessStatus === "draft" || businessStatus === "pre-stripe") && (
                    <DropdownMenuItem asChild>
                      <button onClick={() => handleRedirect("/create-a-business/step-one")}>
                        Finish Business Setup
                      </button>
                    </DropdownMenuItem>
                  )}

                  {hasBusiness && (
                    <>
                      <div className="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground">My Business</div>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/business">Business Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          onClick={() => handleRedirect(`/businesses/${businessSlug}`)}
                          className="w-full text-left"
                        >
                          My Business Page
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button onClick={() => handleRedirect("/api/stripe/update-business-details")}>
                          Stripe - Business Details
                        </button>
                      </DropdownMenuItem>
                    </>
                  )}

                  {hasSubscriptions && (
                    <>
                      <div className="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground">My Subscriptions</div>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/subscriptions">My Subscriptions</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button onClick={() => handleRedirect("/api/stripe/update-payment-details")}>
                          Stripe - Payment Details
                        </button>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {!loading && !user && (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Logo */}
            <Link href="/" className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
              Monthly Club
            </Link>

            {/* Mobile Avatar/Login Button */}
            {user ? (
              <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue w-8 h-8">
                {businessImageUrl ? (
                  <img src={businessImageUrl} alt={businessName ?? "Business"} className="rounded-full object-cover w-full h-full" />
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
                              <img src={businessImageUrl} alt={businessName ?? "Business"} className="rounded-full object-cover w-full h-full" />
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
                              <img src={businessImageUrl} alt={businessName ?? "Business"} className="rounded-full object-cover w-full h-full" />
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

                {/* Main Navigation */}
                <div className="space-y-0.5 mb-4">
                  <Link
                    href="/"
                    className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={closeMenu}
                  >
                    <Home size={18} className="text-muted-foreground" />
                    <span className="font-medium text-sm">Home</span>
                  </Link>
                  
                  <Link
                    href="/how-it-works"
                    className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={closeMenu}
                  >
                    <Zap size={18} className="text-muted-foreground" />
                    <span className="font-medium text-sm">How It Works</span>
                  </Link>
                  
                  <Link
                    href="/pricing"
                    className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={closeMenu}
                  >
                    <DollarSign size={18} className="text-muted-foreground" />
                    <span className="font-medium text-sm">Pricing</span>
                  </Link>
                  
                  <Link
                    href="/features"
                    className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={closeMenu}
                  >
                    <Zap size={18} className="text-muted-foreground" />
                    <span className="font-medium text-sm">Features</span>
                  </Link>
                  
                  <Link
                    href="/guides"
                    className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    onClick={closeMenu}
                  >
                    <BookOpen size={18} className="text-muted-foreground" />
                    <span className="font-medium text-sm">Guides</span>
                  </Link>
                </div>

                {/* Create Business Section - Show for logged out users or users without business */}
                {(!user || (!hasBusiness && businessStatus === null)) && (
                  <div className="mb-4">
                    <div className="p-2.5 rounded-lg bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border border-white/10">
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
                        <span className="font-medium text-sm">Business Details</span>
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
                        <span className="font-medium text-sm">Payment Details</span>
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
    </>
  );
};

export default Navbar;
