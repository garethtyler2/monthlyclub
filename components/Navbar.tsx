"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
  
  useEffect(() => {
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

  return (
    <>
      <LoadingOverlay show={loadingUpdate} />
      <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
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

          {/* Mobile Navigation Toggle & Avatar */}
          <div className="md:hidden flex items-center w-full px-4">
            <button
              className=""
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" className="flex-1 text-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
              Monthly Club
            </Link>
       
            {/* Mobile Avatar Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none cursor-pointer ml-1">
                  <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue w-8 h-8">
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
                        Start A Business
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
            ) : (
              <div className="w-8" />
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="relative">
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="md:hidden border-t border-white/10 animate-fade-in relative z-50">
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
                <Link
                  href="/how-it-works"
                  className="text-sm font-medium hover:text-white transition-colors p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium hover:text-white transition-colors p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/features"
                  className="text-sm font-medium hover:text-white transition-colors p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/guides"
                  className="text-sm font-medium hover:text-white transition-colors p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guides
                </Link>
                {(!hasBusiness && (
                  <button
                    onClick={() => {
                      onCreateBusinessClick();
                      setIsMenuOpen(false);
                    }}
                    className="hero-button-primary text-sm font-medium hover:underline underline-offset-4 transition-colors p-2"
                  >
                    Create Business
                  </button>
                )) ||
                  ((businessStatus === 'draft' || businessStatus === 'pre-stripe') && (
                    <button
                      onClick={() => {
                        onCreateBusinessClick();
                        setIsMenuOpen(false);
                      }}
                      className="hero-button-primary text-sm font-medium hover:underline underline-offset-4 transition-colors p-2"
                    >
                      Finish Business Setup
                    </button>
                  ))}
              </div>
              {!loading && !user && (
                <div className="flex flex-col p-4 border-t border-white/10 space-y-2">
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:text-white transition-colors p-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login / Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
