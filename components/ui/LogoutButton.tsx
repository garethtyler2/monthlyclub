"use client";

import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // Use window.location for reliable redirect after logout
      window.location.href = "/";
    } catch (error) {
      console.error('Error during logout:', error);
      // Force redirect even if logout fails
      window.location.href = "/login";
    }
  };

  return (
    <Button onClick={handleLogout} variant="ghost" className="text-sm ml-auto">
      Logout
    </Button>
  );
}
