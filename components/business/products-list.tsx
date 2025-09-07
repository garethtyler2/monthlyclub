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
  Clock,
  ShoppingCart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Product, isCustomerAmountType } from "@/types/products";

// Product interface is now imported from types/products.ts

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
  const [paymentMonths, setPaymentMonths] = useState(12); // For pay_it_off products (default to 12 months)
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
      let amount;
      if (selectedProduct?.product_type === 'balance_builder') {
        amount = parseFloat(creditAmount);
      } else if (selectedProduct?.product_type === 'pay_it_off') {
        amount = Math.round((selectedProduct.price / paymentMonths) * 100) / 100; // Round to 2 decimal places
      } else {
        amount = selectedProduct?.price;
      }

      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId, 
          reference, 
          preferredPaymentDay: preferredPaymentDate,
          creditAmount: selectedProduct?.product_type === 'balance_builder' ? amount : undefined,
          paymentMonths: selectedProduct?.product_type === 'pay_it_off' ? paymentMonths : undefined,
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
    
    if (selectedProduct.product_type === 'one_time') {
      return true; // One-time purchases don't need additional form validation
    }
    
    if (selectedProduct.product_type === 'balance_builder') {
      return preferredPaymentDate && creditAmount && parseFloat(creditAmount) > 0;
    }
    
    if (selectedProduct.product_type === 'pay_it_off') {
      return preferredPaymentDate && paymentMonths > 0;
    }
    
    return preferredPaymentDate;
  };

  const getProductIcon = (product: Product) => {
    if (product.product_type === 'balance_builder') {
      return <TrendingUp className="w-6 h-6" />;
    } else if (product.product_type === 'pay_it_off') {
      return <Calendar className="w-6 h-6" />;
    }
    return <CreditCard className="w-6 h-6" />;
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
                      {product.product_type === 'balance_builder' && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Balance Builder
                        </Badge>
                      )}
                      {product.product_type === 'pay_it_off' && (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          Pay it off
                        </Badge>
                      )}
                      {product.product_type === 'standard' && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs mt-1">
                          <CreditCard className="w-3 h-3 mr-1" />
                          Standard
                        </Badge>
                      )}
                      {product.product_type === 'one_time' && (
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs mt-1">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          One Time
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
                  {isCustomerAmountType(product.product_type) ? (
                    <div className="flex items-center space-x-2">
                      <PoundSterling className="w-4 h-4 text-green-400" />
                      <span className="text-lg font-bold text-green-300">Choose your amount</span>
                    </div>
                  ) : product.product_type === 'pay_it_off' ? (
                    <div className="flex items-center space-x-2">
                      <PoundSterling className="w-4 h-4 text-purple-400" />
                      <div>
                        <span className="text-lg font-bold text-purple-300">£{product.price} total</span>
                        <p className="text-sm text-purple-200">Choose payment plan</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <PoundSterling className="w-4 h-4 text-blue-400" />
                      <span className="text-lg font-bold text-blue-300">£{product.price}/month</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {!isSelected && !alreadySubscribed && !isOwner && (
                  <Button
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white"
                    onClick={() => handleSelect(product.id)}
                  >
                    {product.product_type === 'balance_builder' ? (
                      <>
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Start Building
                      </>
                    ) : product.product_type === 'one_time' ? (
                      <>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Buy Now
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
                      {alreadySubscribed ? 
                        (product.product_type === 'one_time' ? "You've already purchased this product" : "You're already subscribed to this product") 
                        : "You own this product"}
                    </p>
                  </div>
                )}

                {/* Selection Form */}
                {isSelected && (
                  <div className="space-y-4 mt-6 pt-4 border-t border-white/10">
                    {/* Credit Amount Input */}
                    {isCustomerAmountType(product.product_type) && (
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

                    {/* Payment Plan Selector for Pay it Off */}
                    {product.product_type === 'pay_it_off' && (
                      <div className="space-y-2">
                        <Label htmlFor="paymentMonths" className="text-sm font-medium text-white">
                          Payment Plan
                        </Label>
                        <select
                          id="paymentMonths"
                          value={paymentMonths}
                          onChange={(e) => setPaymentMonths(parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-md"
                        >
                          <option value={2}>2 months - £{(product.price / 2).toFixed(2)}/month</option>
                          <option value={3}>3 months - £{(product.price / 3).toFixed(2)}/month</option>
                          <option value={4}>4 months - £{(product.price / 4).toFixed(2)}/month</option>
                          <option value={6}>6 months - £{(product.price / 6).toFixed(2)}/month</option>
                          <option value={9}>9 months - £{(product.price / 9).toFixed(2)}/month</option>
                          <option value={12}>12 months - £{(product.price / 12).toFixed(2)}/month</option>
                          <option value={18}>18 months - £{(product.price / 18).toFixed(2)}/month</option>
                        </select>
                        <p className="text-xs text-muted-foreground">
                          Total: £{product.price} • Monthly payment: £{(product.price / paymentMonths).toFixed(2)}
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

                    {/* Payment Date Selection - Only for recurring products */}
                    {product.product_type !== 'one_time' && (
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
                    )}

                    {/* Terms Link */}
                    <div className="text-center mb-4">
                      <p className="text-xs text-muted-foreground">
                        By {product.product_type === 'one_time' ? 'purchasing' : 'subscribing'}, you agree to our{' '}
                        <a 
                          href="/terms-customer" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-brand-blue hover:text-brand-purple underline"
                        >
                          Customer Terms and Conditions
                        </a>
                      </p>
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
                          {product.product_type === 'one_time' ? 'Buy Now' : 'Continue to Payment'}
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