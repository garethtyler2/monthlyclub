"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StepThree() {
  const searchParams = useSearchParams();
  const businessId = searchParams.get("id");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStripeSetup = async () => {
    setLoading(true);

    // Placeholder logic - this is where you'd integrate with Stripe
    console.log("Preparing Stripe setup with:", { name, email, businessId });

    setTimeout(() => {
      setLoading(false);
      alert("Stripe onboarding not connected yet – this is a placeholder.");
    }, 1500);
  };

  return (
    <section className="py-10 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />

        <p className="text-base font-medium text-gray-100 text-center mb-2">
          Step 3: Connect your payment account
        </p>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue w-full animate-pulse" />
          </div>
        </div>

        <div className="glass-card p-6 md:p-12 max-w-2xl mx-auto animate-fade-in border border-white/10 bg-white/5 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Let’s Get You Paid
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            We use Stripe to handle secure payments. To continue, please confirm a few quick details.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Your Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="bg-gray-800 border border-white text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-gray-800 border border-white text-white placeholder-gray-400"
              />
            </div>
            <Button
              className="w-full hero-button-primary mt-4"
              onClick={handleStripeSetup}
              disabled={loading}
            >
              {loading ? "Loading..." : "Connect to Stripe"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}