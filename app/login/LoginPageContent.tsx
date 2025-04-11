"use client"

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/dashboard");
      }
    };

    checkUser();
  }, [router]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${redirectTo}`
      },
    });

    if (error) console.error("Login error:", error.message);
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="absolute top-0 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px]" />
      <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <Image
            src="/AI-RehabLogo.png"
            alt="AI-Rehab logo"
            width={120}
            height={40}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
            AI-Rehab
          </h1>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Image
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              width={20}
              height={20}
            />
            Sign in with Google
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative text-sm text-gray-500 bg-white px-2">or</div>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-700">Terms</a> and{" "}
          <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
