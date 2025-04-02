"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // 🚨 Redirect already-logged-in users away from this page
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/dashboard"); // or "/", totally up to you
      }
    };

    checkUser();
  }, [router]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: '${window.location.origin}/dashboard'
      },
    });

    if (error) console.error("Login error:", error.message);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <Button onClick={handleLogin}>Sign in with Google</Button>
    </div>
  );
}
