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
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [businessSlug, setBusinessSlug] = useState<string | null>(null);
  
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
          .select("id, slug")
          .eq("user_id", user.id)
          .maybeSingle();

        if (businessData) {
          setHasBusiness(true);
        }
        setBusinessSlug(businessData?.slug ?? null);
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
          <div className="flex items-center">
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
            {!hasBusiness && (
              <button onClick={onCreateBusinessClick} className="hero-button-primary text-sm font-medium hover:underline underline-offset-4 transition-colors">
                Create Business
              </button>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none cursor-pointer">
                  <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue">
                    <AvatarFallback title={user?.email ?? "Logged in"}>👤</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground max-w-[140px] truncate" title={user?.email}>
                    {user?.email?.replace(/@.*/, '@...')}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2">
                  {businessSlug && (
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleRedirect(`/businesses/${businessSlug}`)}
                        className="w-full text-left"
                      >
                        My Business Page
                      </button>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button onClick={() => handleRedirect("/api/stripe/update-payment-details")}>Stripe - Payment Details</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <button onClick={() => handleRedirect("/api/stripe/update-business-details")}>Stripe - Business Details</button>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
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

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
                {!hasBusiness && (
                  <button
                    onClick={() => {
                      onCreateBusinessClick();
                      setIsMenuOpen(false);
                    }}
                    className="hero-button-primary text-sm font-medium hover:underline underline-offset-4 transition-colors p-2"
                  >
                    Create Business
                  </button>
                )}
              </div>
              {user ? (
                <div className="flex flex-col pt-4 border-t border-white/10 space-y-2 px-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue">
                      <AvatarFallback title={user?.email ?? "Logged in"}>👤</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground max-w-[140px] truncate" title={user?.email}>
                      {user?.email?.replace(/@.*/, '@...')}
                    </span>
                  </div>
                  {businessSlug && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleRedirect(`/businesses/${businessSlug}`);
                      }}
                      className="text-sm pt-2 font-medium text-white hover:underline text-left"
                    >
                      My Business Page
                    </button>
                  )}
                  <Link
                    href="/dashboard"
                    className="text-sm pt-2 font-medium text-white hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleRedirect("/api/stripe/update-payment-details");
                      setIsMenuOpen(false);
                    }}
                    className="text-sm pt-2 font-medium text-white hover:underline text-left"
                  >
                    Stripe - Payment Details
                  </button>
                  <button
                    onClick={() => {
                      handleRedirect("/api/stripe/update-business-details");
                      setIsMenuOpen(false);
                    }}
                    className="text-sm pt-2 font-medium text-white hover:underline text-left"
                  >
                    Stripe - Business Details
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-sm pt-2 text-white hover:underline text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                !loading && (
                  <div className="flex flex-col p-4 border-t border-white/10 space-y-2">
                    <Link href="/login" className="text-sm font-medium hover:text-white transition-colors p-2" >
                      Login / Sign Up
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
