"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

interface CreatePostModalProps {
  businessId: string;
  trigger?: React.ReactNode;
  onCreated?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CreatePostModal({ businessId, trigger, onCreated, open: controlledOpen, onOpenChange }: CreatePostModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setLinkUrl("");
    setImageFile(null);
  };

  async function handleSubmit() {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl: string | null = null;
      let normalizedLinkUrl: string | null = null;

      // Normalize and validate link URL against DB constraint
      const trimmedLink = linkUrl.trim();
      if (trimmedLink.length > 0) {
        let candidate = trimmedLink;
        if (!/^https?:\/\//i.test(candidate)) {
          candidate = `https://${candidate}`;
        }
        // Force lowercase scheme to satisfy case-sensitive DB regex
        candidate = candidate.replace(/^https?:\/\//i, (m) => m.toLowerCase());
        try {
          // Basic URL validation
          new URL(candidate);
          normalizedLinkUrl = candidate;
        } catch {
          alert("Please enter a valid URL (e.g. https://example.com)");
          setSubmitting(false);
          return;
        }
      }

      if (imageFile) {
        if (!businessId) {
          alert("Cannot upload image: missing business id.");
          setSubmitting(false);
          return;
        }
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${businessId}/${Date.now()}.${fileExt}`;

        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();
        // Debug info for RLS issues
        console.log("Uploading image to storage", {
          userId: currentUser?.id,
          businessId,
          fileName,
          bucket: "business-post-images",
          contentType: imageFile.type,
          sizeBytes: imageFile.size,
        });

        const { error: uploadError } = await supabase.storage
          .from("business-post-images")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: imageFile.type || "application/octet-stream",
          });

        if (uploadError) {
          console.error("Image upload failed:", uploadError.message || uploadError);
          alert(`Image upload failed: ${uploadError.message || "Unknown error"}`);
          setSubmitting(false);
          return;
        }

        const { data: publicUrl } = supabase.storage
          .from("business-post-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl.publicUrl;
      }

      const { error: insertError } = await supabase.from("business_posts").insert({
        business_id: businessId,
        title: title.trim(),
        content: content.trim() || null,
        link_url: normalizedLinkUrl,
        image_url: imageUrl,
      });

      if (insertError) {
        console.error("Failed to create post:", insertError.message || insertError);
        alert("Failed to create post");
        setSubmitting(false);
        return;
      }

      resetForm();
      setOpen(false);
      onCreated?.();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {(
        // Render a trigger if one is provided OR if this component is uncontrolled.
        // If it's controlled (open prop provided) and no trigger is passed, don't render a default button.
        trigger !== undefined || controlledOpen === undefined
      ) && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button className="w-full">Create Post</Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="bg-gray-900 border border-white/10 text-white max-w-lg">
        <DialogTitle asChild>
          <h2 className="text-xl font-semibold mb-2">New Post</h2>
        </DialogTitle>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              placeholder="What's new?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              placeholder="Share an update with your subscribers..."
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Link (optional)</label>
            <Input
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image (optional)</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button className="hero-button-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


