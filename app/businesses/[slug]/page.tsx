// app/businesses/[slug]/page.tsx

import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ProductsListWrapper from "@/components/business/ProductsListWrapper";
import { EditBusinessModal } from "@/components/business/EditBusinessModal";
import { ShareButton } from "@/components/shared/ShareButton";

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

  // Fetch related products (only active ones)
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("business_id", business.id)
    .eq("status", "active");

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

  // Fetch latest posts for this business
  const { data: posts } = await supabase
    .from("business_posts")
    .select("id, created_at, title, content, link_url, image_url")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="relative py-10 overflow-hidden text-white">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      {isOwner && (
        <div className="flex justify-center mt-4 mb-4">
          <EditBusinessModal business={business} />
        </div>
      )}
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
          <p className="text-center text-muted-foreground mb-6">{business.description}</p>
        )}
        
        {/* Share Button */}
        <div className="flex justify-center mb-10">
          <ShareButton
            url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.monthlyclubhq.com'}/businesses/${slug}`}
            variant="outline"
            size="default"
            className="border-white/20 text-white hover:bg-white/10"
          />
        </div>

        {/* Products */}
        {products && products.length > 0 && (
          <>
            {console.log("Fetched products:", products)}
            <ProductsListWrapper products={products} userSubscriptions={subscriptions ?? []} isOwner={isOwner} />
          </>
        )}

        {/* Posts */}
        {posts && posts.length > 0 && (
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-semibold">Latest posts</h3>
            {posts.map((post) => (
              <article key={post.id} className="rounded-xl border border-white/10 p-4 bg-background/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.created_at).toLocaleString()}
                  </span>
                  <ShareButton
                    url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.monthlyclubhq.com'}/businesses/${slug}`}
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
                {post.content && (
                  <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">{post.content}</p>
                )}
                {post.image_url && (
                  <div className="mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image_url} alt="post image" className="rounded-lg w-full object-cover" />
                  </div>
                )}
                {post.link_url && (
                  <a href={post.link_url} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">
                    {post.link_url}
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}