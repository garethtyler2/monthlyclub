"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, ShoppingCart } from "lucide-react";
import { Product } from "@/types/products";

function OneTimePurchaseConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const productId = searchParams.get("productId");
  const reference = searchParams.get("reference");

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      const { data, error } = await supabase
        .from("products")
        .select("*, business:businesses(name, description)")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
        return;
      }

      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [productId]);

  const handlePurchase = async () => {
    if (!productId || !reference) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/stripe/process-one-time-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId, 
          reference 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment processing failed");
      }

      const data = await response.json();

      if (data.url) {
        // Customer needs to set up payment method
        window.location.href = data.url;
      } else if (data.success) {
        // Payment successful, redirect to success page
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error("Purchase error:", error);
      
      // Try to get more specific error message
      let errorMessage = "Purchase failed. Please try again.";
      try {
        const errorData = await error.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If we can't parse the error, use the default message
      }
      
      alert(errorMessage);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
          <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-2 text-brand-purple">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading product details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
          <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-brand-purple">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Button 
              onClick={() => router.push("/dashboard")}
              className="hero-button-primary"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
        <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-brand-purple mb-2">
              Confirm Purchase
            </h1>
            <p className="text-gray-600">You're already set up with a payment method.</p>
          </div>

          <Card className="bg-gradient-to-b from-brand-purple/10 to-transparent border-brand-purple/20 text-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-white/80 italic">"{product.description}"</p>
                  
                  {/* Product Type Badge */}
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      One-time Purchase
                    </span>
                  </div>

                  <div className="flex flex-col items-center sm:items-end mt-4">
                    <p className="text-xl font-bold text-white">£{product.price}</p>
                    <p className="text-xs text-white/70 mt-1 italic">
                      from {product.business?.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Method</p>
                      <p className="text-sm text-gray-600">Your saved payment method</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Type</p>
                      <p className="text-sm text-gray-600">One-time payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button
              disabled={submitting}
              onClick={handlePurchase}
              className="w-full bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-brand-purple/90 hover:to-brand-indigo/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Now
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full bg-white/5 border-white/20 text-gray-700 hover:bg-white/10"
            >
              Go Back
            </Button>
          </div>

          <div className="text-center mt-8 animate-fade-in delay-500">
            <p className="text-sm text-gray-500 mt-1">
              Questions? <a href="/contact" className="text-brand-purple underline hover:text-brand-purple/80">Contact us</a> anytime for support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OneTimePurchaseConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
          <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-2 text-brand-purple">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    }>
      <OneTimePurchaseConfirmContent />
    </Suspense>
  );
}
