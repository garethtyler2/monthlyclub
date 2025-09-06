"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ShoppingCart, ArrowRight, CreditCard } from "lucide-react";
import { Product } from "@/types/products";

export default function OneTimePurchaseSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const productId = searchParams.get("productId");

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
  }, [productId, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
          <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center text-brand-purple">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
        <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          {/* Success Icon */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-purple to-brand-indigo rounded-full shadow-lg mb-4 animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-brand-purple mb-2">
              Purchase Successful! 🎉
            </h1>
          </div>

          {/* Purchase Details Card */}
          <Card className="bg-gradient-to-b from-brand-purple/10 to-transparent border-brand-purple/20 text-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {product?.name}
                  </h2>
                  <p className="text-sm text-white/80 italic">"{product?.description}"</p>
                  
                  {/* Product Type Badge */}
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      One-time Purchase
                    </span>
                  </div>

                  <div className="flex flex-col items-center sm:items-end mt-4">
                    <p className="text-xl font-bold text-orange-300">£{product?.price}</p>
                    <p className="text-sm text-orange-200">One-time payment</p>
                    <p className="text-xs text-white/70 mt-1 italic">
                      from {product?.business?.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
                    <CreditCard className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Status</p>
                      <p className="text-sm text-gray-600">Completed Successfully</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Next Steps</p>
                      <p className="text-sm text-gray-600">The business owner will contact you soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-brand-purple/90 hover:to-brand-indigo/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Footer message */}
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
