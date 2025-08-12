import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

type BusinessPost = {
  id: string;
  created_at: string;
  title: string;
  content: string | null;
  link_url: string | null;
  image_url: string | null;
  business: { id: string; name: string; slug: string };
};

export default async function FeedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">Your Feed</h1>
        <p className="text-muted-foreground">Please log in to view your feed.</p>
      </section>
    );
  }

  // 1) Get active subscriptions for the user
  const { data: subs } = await supabase
    .from("subscriptions")
    .select("product_id")
    .eq("user_id", user.id)
    .eq("status", "active");

  const productIds = (subs ?? []).map((s: any) => s.product_id);

  if (productIds.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">Your Feed</h1>
        <p className="text-muted-foreground">Subscribe to businesses to see their posts here.</p>
      </section>
    );
  }

  // 2) Resolve business_ids from those products
  const { data: products } = await supabase
    .from("products")
    .select("id, business_id")
    .in("id", productIds);

  const businessIds = Array.from(new Set((products ?? []).map((p: any) => p.business_id))).filter(Boolean);

  if (businessIds.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">Your Feed</h1>
        <p className="text-muted-foreground">No posts yet.</p>
      </section>
    );
  }

  // 3) Get posts for those businesses
  const { data: posts } = (await supabase
    .from("business_posts")
    .select(
      `id, created_at, title, content, link_url, image_url, business:business_id ( id, name, slug )`
    )
    .in("business_id", businessIds)
    .order("created_at", { ascending: false })
  ) as unknown as { data: BusinessPost[] };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Your Feed</h1>
      <div className="space-y-4">
        {(posts ?? []).map((post) => (
          <article key={post.id} className="rounded-xl border border-white/10 p-4 bg-background/60">
            <div className="flex items-center justify-between mb-2">
              <Link href={`/businesses/${post.business.slug}`} className="font-semibold hover:underline">
                {post.business.name}
              </Link>
              <time className="text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleString()}
              </time>
            </div>
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            {post.content && <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">{post.content}</p>}
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
        {(!posts || posts.length === 0) && (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </section>
  );
}


