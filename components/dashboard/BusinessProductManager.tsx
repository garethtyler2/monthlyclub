"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface ProductWithSubscribers {
  id: string;
  name: string;
  description: string;
  price: number;
  subscriberCount: number;
}

export default function BusinessProductManager({ businessId }: { businessId: string }) {
  const [products, setProducts] = useState<ProductWithSubscribers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, name, description, price")
        .eq("business_id", businessId);

      if (productError) {
        console.error("Failed to fetch products:", productError);
        setLoading(false);
        return;
      }

      // For each product, fetch subscriber count
      const enrichedProducts = await Promise.all(
        (productData || []).map(async (product) => {
          const { count, error: countError } = await supabase
            .from("subscriptions")
            .select("id", { count: "exact" })
            .eq("product_id", product.id)
            .eq("status", "active");

          if (countError) {
            console.error(`Error fetching subscriptions for product ${product.id}:`, countError);
          } else {
            console.log(`Subscription count for product ${product.id}:`, count);
          }

          return {
            ...product,
            subscriberCount: countError ? 0 : count || 0,
          };
        })
      );

      console.log("Final enriched products:", enrichedProducts);

      setProducts(enrichedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [businessId]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Manage Your Products</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-white border border-white/10 rounded-lg">
            <thead className="bg-white/10 text-muted-foreground">
              <tr>
                <th className="px-2 py-3 text-xs sm:text-sm font-medium">Product</th>
                <th className="px-2 py-3 text-xs sm:text-sm font-medium">Description</th>
                <th className="px-2 py-3 text-xs sm:text-sm font-medium">Price (£)</th>
                <th className="px-2 py-3 text-xs sm:text-sm font-medium">Active Subscribers</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-white/5">
                  <td className="px-2 py-3 text-xs sm:text-sm">{product.name}</td>
                  <td className="px-2 py-3 text-xs sm:text-sm">{product.description}</td>
                  <td className="px-2 py-3 text-xs sm:text-sm">{(product.price).toFixed(2)}</td>
                  <td className="px-2 py-3 text-xs sm:text-sm">{product.subscriberCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}