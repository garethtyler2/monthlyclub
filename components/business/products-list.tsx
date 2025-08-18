"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Calendar, 
  PoundSterling, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Building2,
  User,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  product_type: 'subscription' | 'credit_builder';
  is_credit_builder: boolean;
  status?: 'active' | 'inactive';
}

interface ProductsListProps {
  products: Product[];
  userSubscriptions: { product_id: string }[];
  isOwner?: boolean;
}

export default function ProductsList({ products, userSubscriptions, isOwner = false }: ProductsListProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [reference, setReference] = useState("");
  const [preferredPaymentDate, setPreferredPaymentDate] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = async (productId: string) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    setSelectedProductId(productId);
  };

  const handleContinue = async (productId: string) => {
    setIsLoading(true);
    try {
      const selectedProduct = products.find(p => p.id === productId);
      const amount = selectedProduct?.is_credit_builder ? parseFloat(creditAmount) : selectedProduct?.price;

      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId, 
          reference, 
          preferredPaymentDay: preferredPaymentDate,
          creditAmount: selectedProduct?.is_credit_builder ? amount : undefined,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Failed to create checkout session");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
        setIsLoading(false);
      } else {
        console.error("No URL returned from checkout session");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const selectedProduct = products.find(p => p.id === selectedProductId);
    if (!selectedProduct) return false;
    
    if (selectedProduct.is_credit_builder) {
      return preferredPaymentDate && creditAmount && parseFloat(creditAmount) > 0;
    }
    
    return preferredPaymentDate;
  };

  const getProductIcon = (product: Product) => {
    if (product.is_credit_builder) {
      return <CreditCard className="w-6 h-6" />;
    }
    return <Building2 className="w-6 h-6" />;
  };

  const getProductGradient = (index: number) => {
    const gradients = [
      "from-blue-500/10 to-indigo-500/10 border-blue-500/20",
      "from-purple-500/10 to-violet-500/10 border-purple-500/20",
      "from-green-500/10 to-emerald-500/10 border-green-500/20",
      "from-orange-500/10 to-red-500/10 border-orange-500/20",
      "from-pink-500/10 to-rose-500/10 border-pink-500/20",
      "from-teal-500/10 to-cyan-500/10 border-teal-500/20",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Available Products</h3>
          <p className="text-sm text-muted-foreground">Choose the perfect subscription for your needs</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map((product, index) => {
          const isSelected = selectedProductId === product.id;
          const alreadySubscribed = userSubscriptions.some(
            (sub) => sub.product_id === product.id
          );
          
          return (
            <Card
              key={product.id}
              className={cn(
                "bg-gradient-to-br border-none transition-all duration-300 hover:scale-[1.02] group",
                getProductGradient(index),
                isSelected && "ring-2 ring-white/20 scale-[1.02]",
                alreadySubscribed && "opacity-60"
              )}
            >
              <CardContent className="p-6">
                {/* Product Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      {getProductIcon(product)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white capitalize">{product.name}</h3>
                      {product.is_credit_builder && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs mt-1">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Balance Builder
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {alreadySubscribed && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Subscribed
                    </Badge>
                  )}
                </div>

                {/* Product Description */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Pricing */}
                <div className="mb-4">
                  {product.is_credit_builder ? (
                    <div className="flex items-center space-x-2">
                      <PoundSterling className="w-4 h-4 text-blue-400" />
                      <span className="text-lg font-bold text-blue-300">Choose your amount</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <PoundSterling className="w-4 h-4 text-green-400" />
                      <span className="text-lg font-bold text-green-300">£{product.price}/month</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {!isSelected && !alreadySubscribed && !isOwner && (
                  <Button
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white"
                    onClick={() => handleSelect(product.id)}
                  >
                    {product.is_credit_builder ? (
                      <>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Start Building
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Subscribe Now
                      </>
                    )}
                  </Button>
                )}

                {/* Already Subscribed or Owner */}
                {(alreadySubscribed || isOwner) && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      {alreadySubscribed ? "You're already subscribed to this product" : "You own this product"}
                    </p>
                  </div>
                )}

                {/* Selection Form */}
                {isSelected && (
                  <div className="space-y-4 mt-6 pt-4 border-t border-white/10">
                    {/* Credit Amount Input */}
                    {product.is_credit_builder && (
                      <div className="space-y-2">
                        <Label htmlFor="creditAmount" className="text-sm font-medium text-white">
                          Monthly Amount
                        </Label>
                        <div className="relative">
                          <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="creditAmount"
                            type="number"
                            step="0.01"
                            min="0.01"
                            placeholder="50.00"
                            value={creditAmount}
                            onChange={(e) => setCreditAmount(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Choose how much to add to your balance builder fund each month
                        </p>
                      </div>
                    )}

                    {/* Reference Input */}
                    <div className="space-y-2">
                      <Label htmlFor="reference" className="text-sm font-medium text-white">
                        Reference
                      </Label>
                      <Input
                        id="reference"
                        placeholder="e.g. Flat 2B, Smith"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
                      />
                    </div>

                    {/* Payment Date Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-white">
                        Preferred Payment Date
                      </Label>
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                            <button
                              key={day}
                              type="button"
                              className={cn(
                                "w-8 h-8 rounded-full border text-sm flex items-center justify-center transition-all duration-200",
                                preferredPaymentDate === String(day)
                                  ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold border-transparent"
                                  : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                              )}
                              onClick={() => setPreferredPaymentDate(String(day))}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      onClick={() => handleContinue(product.id)}
                      disabled={isLoading || !isFormValid()}
                    >
                      {isLoading ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Continue to Payment
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-8 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Products Available</h3>
            <p className="text-muted-foreground">
              This business hasn't added any products yet. Check back later!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}