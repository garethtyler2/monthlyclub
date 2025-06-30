"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductsListProps {
  products: Product[];
  userSubscriptions: { product_id: string }[];
  isOwner?: boolean;
}

const gradientStyles = [
  "from-brand-blue/10 to-transparent border-brand-blue/20",
  "from-brand-purple/10 to-transparent border-brand-purple/20",
  "from-brand-indigo/10 to-transparent border-brand-indigo/20",
  "from-brand-pink/10 to-transparent border-brand-pink/20",
];

export default function ProductsList({ products, userSubscriptions, isOwner = false }: ProductsListProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [reference, setReference] = useState("");
  const [preferredPaymentDate, setPreferredPaymentDate] = useState("");

  const handleSelect = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleContinue = async (productId: string) => {
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, reference, preferredPaymentDay: preferredPaymentDate, }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Failed to create checkout session");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        console.error("No URL returned from checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">Available Products</h3>
      <div className="space-y-4">
        {products.map((product, index) => {
          const isSelected = selectedProductId === product.id;
          const alreadySubscribed = userSubscriptions.some(
            (sub) => sub.product_id === product.id
          );
          return (
            <Card
              key={product.id}
              className={cn(
                "bg-gradient-to-b text-white border-none animate-fade-in",
                gradientStyles[index % gradientStyles.length]
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-white">{product.name}</h3>
                <p className="text-sm opacity-90 mb-3">{product.description}</p>
                <p className="text-md font-bold mb-4">£{product.price}/month</p>
                {!isSelected && (
                  <Button
                    className="hero-button-primary mt-4"
                    onClick={() => handleSelect(product.id)}
                    disabled={alreadySubscribed || isOwner}
                  >
                    {alreadySubscribed
                      ? "Already Subscribed"
                      : isOwner
                      ? "You Own This Product"
                      : "Select"}
                  </Button>
                )}
                {isSelected && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="reference">Reference</Label>
                      <Input
                        id="reference"
                        placeholder="e.g. Flat 2B, Smith"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Preferred Payment Date</Label>
                      <div className="max-w-xs mx-auto">
                        <div className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 xl:grid-cols-7 gap-1">
                          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                            <button
                              key={day}
                              type="button"
                              className={cn(
                                "w-8 h-8 rounded-full border text-sm flex items-center justify-center",
                                preferredPaymentDate === String(day)
                                  ? "bg-white text-black font-semibold"
                                  : "bg-transparent text-white border-white/30"
                              )}
                              onClick={() => setPreferredPaymentDate(String(day))}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button className="hero-button-primary mt-4" onClick={() => handleContinue(product.id)}>
                      Continue
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}