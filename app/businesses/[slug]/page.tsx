// app/business/[slug]/page.tsx

import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ProductsListWrapper from "@/components/business/ProductsListWrapper";

const gradientStyles = [
  "from-brand-blue/10 to-transparent border-brand-blue/20",
  "from-brand-purple/10 to-transparent border-brand-purple/20",
  "from-brand-indigo/10 to-transparent border-brand-indigo/20",
  "from-brand-pink/10 to-transparent border-brand-pink/20",
];

// This makes it a Server Component
export default async function BusinessPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const supabase = await createClient();


  // Fetch business by slug
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (businessError || !business) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-2xl font-bold">Business Not Found</h1>
        <p className="mt-2 text-gray-400">Please check the URL or contact the business owner.</p>
      </div>
    );
  }
  console.log("Slug:", slug);
  console.log("Business:", business);
  console.log("Business Error:", businessError);

  // Fetch related products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("business_id", business.id);

  const session = await supabase.auth.getSession();

  // Fetch active subscriptions for logged-in user
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("product_id")
    .eq("user_id", session.data?.session?.user?.id)
    .eq("status", "active");

  // Extract current user ID and check if the user is the owner
  const currentUserId = session.data?.session?.user?.id;
  const isOwner = business?.user_id === currentUserId;

  console.log("Supabase session:", session);
  console.log("Business ID:", business?.id);
  console.log("Products:", products);
  console.log("Products Error:", productsError);
  console.log("User Subscriptions:", subscriptions);

  return (
    <div className="relative py-10 overflow-hidden text-white">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        {/* Business Info */}
        {business?.name && (
          <h2 className="text-3xl font-bold text-center mb-4">{business.name}</h2>
        )}
        {business?.image_url && (
          <div className="flex justify-center mb-6">
            <Image
              src={business.image_url}
              alt="Business profile"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover border-2 border-white shadow"
            />
          </div>
        )}
        {business?.description && (
          <p className="text-center text-muted-foreground mb-10">{business.description}</p>
        )}

        {/* Products */}
        {products && products.length > 0 && (
          <>
            {console.log("Fetched products:", products)}
            <ProductsListWrapper products={products} userSubscriptions={subscriptions ?? []} isOwner={isOwner} />
          </>
        )}
      </div>
    </div>
  );
}