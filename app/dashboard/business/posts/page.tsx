import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import MyPostsList from "@/components/business/MyPostsList";

export default async function BusinessPostsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-2">My Posts</h1>
        <p className="text-muted-foreground">Please log in to view your posts.</p>
      </section>
    );
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name, slug")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!business) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-4">My Posts</h1>
        <p className="text-muted-foreground">You don't have a business yet.</p>
        <div className="mt-4">
          <Link href="/create-a-business/step-one" className="underline">Create a business</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Posts</h1>
        <Link href={`/businesses/${business.slug}`} className="text-sm text-blue-400 hover:underline">
          View my business page
        </Link>
      </div>
      <MyPostsList businessId={business.id} businessSlug={business.slug} />
    </section>
  );
}


