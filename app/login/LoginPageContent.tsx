"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen);

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
            src="/Monthly Club logo.png"
            alt="Monthly Club logo"
            width={200}
            height={20}
            className="mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
            Monthly Club
          </h1>
        </div>

        <div className="flex justify-center mb-3">
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


        <p className=" text-xs text-gray-500">
          Supabase ID: <strong className="text-gray-600">zottypnnrmziobqxehxk</strong>
        </p>
        <p className="text-xs text-gray-500">
          <button className="underline text-xs" onClick={toggleAccordion}>
            What's that?
          </button>
        </p>
        {isAccordionOpen && (
          <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
            To help build trust, we show our App ID here so you can confirm it matches the one shown in Google's login screen. This ensures you're signing in securely through our app.
          </div>
        )}

        <p className="mt-12 text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-700">Terms</a> and{" "}
          <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
