"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import EmptyPostsCta from "@/components/business/EmptyPostsCta";
import { ShareButton } from "@/components/shared/ShareButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Post = {
  id: string;
  created_at: string;
  title: string;
  content: string | null;
  link_url: string | null;
  image_url: string | null;
};

export default function MyPostsList({ businessId, businessSlug }: { businessId: string; businessSlug: string }) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from("business_posts")
      .select("id, created_at, title, content, link_url, image_url")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId]);

  async function deletePost(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from("business_posts").delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      alert(`Failed to delete: ${error.message || "Unknown error"}`);
      return;
    }
    setPosts((prev) => (prev ? prev.filter((p) => p.id !== id) : prev));
    setConfirmOpen(false);
    setSelectedPostId(null);
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 p-6 text-sm text-muted-foreground">Loading posts…</div>
    );
  }

  if (!posts || posts.length === 0) {
    return <EmptyPostsCta businessId={businessId} />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article key={post.id} className="rounded-xl border border-white/10 p-4 bg-background/60">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-lg font-semibold mr-4">{post.title}</h4>
            <div className="flex items-center space-x-2">
              <ShareButton
                url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.monthlyclubhq.com'}/businesses/${businessSlug}`}
                variant="outline"
                size="sm"
                className="text-blue-400 border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
              />
              <Button
                variant="outline"
                className="text-red-400 border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                size="sm"
                disabled={deletingId === post.id}
                onClick={() => {
                  setSelectedPostId(post.id);
                  setConfirmOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
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
          <div className="mt-3 flex items-center justify-end">
            <time className="text-xs text-muted-foreground">
              {new Date(post.created_at).toLocaleString()}
            </time>
          </div>
        </article>
      ))}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="bg-gray-900 border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone and will permanently remove the post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!deletingId}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              disabled={!selectedPostId || !!deletingId}
              onClick={() => selectedPostId && deletePost(selectedPostId)}
            >
              {deletingId ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


