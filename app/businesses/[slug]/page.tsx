// app/business/[slug]/page.tsx

import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const gradientStyles = [
  "from-brand-blue/10 to-transparent border-brand-blue/20",
  "from-brand-purple/10 to-transparent border-brand-purple/20",
  "from-brand-indigo/10 to-transparent border-brand-indigo/20",
  "from-brand-pink/10 to-transparent border-brand-pink/20",
];

// This makes it a Server Component
export default async function BusinessPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
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

  // Fetch related products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("business_id", business.id);

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
            <img
              src={business.image_url}
              alt="Business profile"
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
            <h3 className="text-xl font-semibold mb-4 text-white">Available Products</h3>
            <div className="space-y-4">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className={cn(
                    "bg-gradient-to-b text-white border-none animate-fade-in",
                    gradientStyles[index % gradientStyles.length]
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                    <p className="text-sm opacity-90 mb-3">{product.description}</p>
                    <p className="text-md font-bold mb-4">£{product.price}/month</p>

                   
                      <Button className="hero-button-primary mt-4">
                        Subscribe
                      </Button>
                
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}