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


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
              AI-Rehab
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/injury-diagnosis" className="text-sm font-medium hover:text-white transition-colors">
            Rehab
          </Link>
          <Link href="/prehab" className="text-sm font-medium hover:text-white transition-colors">
            Prehab
          </Link>
          <Link href="/personal-training" className="text-sm font-medium hover:text-white transition-colors">
            Personal Training
          </Link>

          <Link href="/ai-rehab-insights" className="text-sm font-medium hover:text-white transition-colors">
            The Rehab Hub
          </Link>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none cursor-pointer">
                <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.full_name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback>
                      {user.user_metadata?.full_name
                        ? user.user_metadata.full_name.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}


          {!user && (
            <>

              <Button className="ml-2 bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90">
                <Link href="/login" className="text-white">Access AI-Rehab</Link>
              </Button>
            </>
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
                href="/injury-diagnosis"
                className="text-sm font-medium hover:text-white transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Rehab
              </Link>
              <Link
                href="/prehab"
                className="text-sm font-medium hover:text-white transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Prehab
              </Link>

              <Link
                href="/personal-training"
                className="text-sm font-medium hover:text-white transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Personal Training
              </Link>

              <Link
                href="/ai-rehab-insights"
                className="text-sm font-medium hover:text-white transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                The Rehab Hub
              </Link>

              {user ? (
                <div className="flex flex-col pt-4 border-t border-white/10 space-y-2 px-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="bg-gradient-to-r from-brand-purple to-brand-blue">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt={user.user_metadata.full_name || "User"}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <AvatarFallback>
                          {user.user_metadata?.full_name
                            ? user.user_metadata.full_name.charAt(0).toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-sm font-medium text-white">
                      {user.user_metadata?.full_name || "User"}
                    </span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="text-sm pt-2 font-medium text-white hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm pt-2 text-white hover:underline text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col pt-2 border-t border-white/10 space-y-2">
                  <Button
                    className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/login" className="text-white">Access AI-Rehab</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
