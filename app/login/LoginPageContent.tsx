"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [redirectUrl, setRedirectUrl] = useState("");

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen);

  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/");
      }
    };

    checkUser();
    setRedirectUrl(`${window.location.origin}${redirectTo}`);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push(redirectTo);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, redirectTo]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setStatusMessage(error.message);
    } else {
      setStatusMessage("Login successful! Redirecting...");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setStatusMessage(error.message);
    } else {
      setStatusMessage("Signup successful! Please check your email to confirm your account.");
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "facebook") => {
    setStatusMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUrl },
    });
    if (error) {
      setStatusMessage(error.message);
    }
  };

  return (
    <div className="h-screen mb-10 flex items-center justify-center px-4">
      <div className="absolute top-0 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px]" />
      <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <Image
            src="/images/MonthlyClubLogo.png"
            alt="Monthly Club Logo"
            width={200}
            height={20}
            className="mx-auto mb-"
          />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
            Monthly Club
          </h1>
        </div>

        <div className="mb-6">
          <div className="flex justify-center mb-4 space-x-4">
            <button
              onClick={() => { setAuthMode("sign-in"); setStatusMessage(null); }}
              className={`px-4 py-2 rounded-md font-semibold ${authMode === "sign-in" ? "bg-brand-purple text-white" : "bg-gray-200 text-gray-700"}`}
              type="button"
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode("sign-up"); setStatusMessage(null); }}
              className={`px-4 py-2 rounded-md font-semibold ${authMode === "sign-up" ? "bg-brand-purple text-white" : "bg-gray-200 text-gray-700"}`}
              type="button"
            >
              Sign Up
            </button>
          </div>

          <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <button
                onClick={() => handleOAuthSignIn("google")}
                className="w-full border border-gray-300 hover:bg-red-200 text-black px-4 py-2 rounded flex items-center justify-center space-x-2"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.3 0 6.2 1.1 8.5 3.2l6.3-6.3C34.8 2.4 29.8 0 24 0 14.8 0 7.1 5.8 3.7 13.8l7.3 5.6C12.3 13.6 17.7 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.5c-.5 3.1-2.2 5.7-4.6 7.4l7.2 5.6c4.2-3.9 6.7-9.6 6.7-16.7z"/>
                  <path fill="#4A90E2" d="M10.8 28.5c-.6-1.7-1-3.4-1-5.3s.4-3.6 1-5.3l-7.3-5.6C2.1 16.5 1 20.1 1 24s1.1 7.5 2.5 11l7.3-5.5z"/>
                  <path fill="#FBBC05" d="M24 48c6.5 0 12-2.1 16-5.7l-7.2-5.6c-2 1.3-4.5 2-8.8 2-6.3 0-11.7-4.1-13.7-9.6l-7.3 5.6C7.1 42.2 14.8 48 24 48z"/>
                </svg>
                <span>Google</span>
              </button>
            </div>
            <div className="flex-1">
              <button
                onClick={() => handleOAuthSignIn("facebook")}
                className="w-full border border-gray-300 hover:bg-blue-200 text-black px-4 py-2 rounded flex items-center justify-center space-x-2"
                type="button"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path fill="#1877F2" d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.408.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.592 1.324-1.326V1.326C24 .593 23.408 0 22.675 0z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </div>
        <p className="mt-4 text-xs text-gray-500">
          Supabase ID: <strong className="text-gray-600">qnecyousolguftvceaao</strong>
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
          {!showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              className="hero-button-primary w-full text-sm text-white bg-brand-purple py-2 mt-6 rounded hover:bg-brand-purple/90 transition"
            >
              {authMode === "sign-in" ? "Sign in with Email" : "Sign up with Email"}
            </button>
          ) : (
            <>


              {authMode === "sign-in" && (
                <form onSubmit={handleLogin} className="space-y-4 mt-4 text-left">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                  />
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="hero-button-primary w-full bg-brand-purple text-white py-2 rounded hover:bg-brand-purple/90 disabled:opacity-50"
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              )}

              {authMode === "sign-up" && (
                <form onSubmit={handleSignup} className="space-y-4 text-left">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                  />
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="hero-button-primary w-full bg-brand-purple text-white py-2 rounded hover:bg-brand-purple/90 disabled:opacity-50"
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                </form>
              )}
            </>
          )}

          {statusMessage && (
            <p className="mt-4 text-sm text-center text-red-600">{statusMessage}</p>
          )}
        </div>



        <p className="mt-12 text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-gray-700">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-gray-700">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
