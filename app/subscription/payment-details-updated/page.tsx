// app/payment-details-updated/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentDetailsUpdatedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
        <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          {/* Icon and heading */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-purple to-brand-indigo rounded-full shadow-lg mb-4 animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-brand-purple mb-2">
              Payment Details Updated 🎉
            </h1>
            <p className="text-sm text-gray-200">
              You're all set to continue with your subscription.
            </p>
          </div>

          {/* Info card */}
          <Card className="bg-gradient-to-b from-brand-purple/10 to-transparent border-brand-purple/20 text-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-6">
            <CardContent className="p-6 text-center">
              <p className="text-white/90 text-sm">
                Your new card details have been securely saved. We'll use this card for any future subscription payments or scheduled charges.
              </p>
            </CardContent>
          </Card>

          {/* Back to Dashboard button */}
          <Button
            className="w-full bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-brand-purple/90 hover:to-brand-indigo/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {/* Footer message */}
          <div className="text-center mt-8 animate-fade-in delay-500">
            <p className="text-sm text-gray-500 mt-1">
              Have questions?{" "}
              <a
                href="/contact"
                className="text-brand-purple underline hover:text-brand-purple/80"
              >
                Contact support
              </a>{" "}
              anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}