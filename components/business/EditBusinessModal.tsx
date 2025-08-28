"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";

export function EditBusinessModal({ business }: { business: any }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(business.name || "");
  const [editDescription, setEditDescription] = useState(business.description || "");
  const [editImageUrl, setEditImageUrl] = useState(business.image_url || "");
  const [editSlug, setEditSlug] = useState(business.slug || "");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [slugError, setSlugError] = useState("");

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!editSlug || editSlug === business.slug) {
        setSlugError("");
        return;
      }

      const { data: existing } = await supabase
        .from("businesses")
        .select("id")
        .eq("slug", editSlug)
        .neq("id", business.id);

      if (existing && existing.length > 0) {
        setSlugError("This URL is already taken.");
      } else {
        setSlugError("");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [editSlug, business.slug, business.id]);

  const handleUpdateBusiness = async () => {
    const { data: existing } = await supabase
      .from("businesses")
      .select("id")
      .eq("slug", editSlug)
      .neq("id", business.id);

    if (existing && existing.length > 0) {
      alert("Slug is already in use. Please choose another.");
      return;
    }

    let imageUrl = editImageUrl;

    if (newImageFile) {
      // Delete the old image if one exists and it's a Supabase storage URL
      if (editImageUrl && editImageUrl.includes("business-profile-images")) {
        try {
          const url = new URL(editImageUrl);
          const filePath = url.pathname.split("business-profile-images/")[1]?.replace(/^\/+/, "");

          if (filePath) {
            const { error: deleteError } = await supabase.storage
              .from("business-profile-images")
              .remove([filePath]);

            if (deleteError) {
              console.warn("Failed to delete old image:", deleteError.message || deleteError);
            } else {
              console.log("Old image deleted:", filePath);
            }
          }
        } catch (err) {
          console.error("Invalid image URL:", err);
        }
      }

      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        alert("You must be logged in.");
        return;
      }

      const fileExt = newImageFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("business-profile-images")
        .upload(filePath, newImageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError?.message || uploadError);
        alert("Image upload failed. Please try a smaller image or check your connection.");
        return;
      }

      const { data: publicUrl } = supabase
        .storage
        .from("business-profile-images")
        .getPublicUrl(filePath);

      imageUrl = publicUrl.publicUrl;
    }

    const { error } = await supabase
      .from("businesses")
      .update({
        name: editName,
        description: editDescription,
        image_url: imageUrl,
        slug: editSlug,
      })
      .eq("id", business.id);

    if (!error) {
      setEditing(false);
      if (editSlug !== business.slug) {
        router.push(`/businesses/${editSlug}`);
      } else {
        router.refresh();
      }
    } else {
      alert("Error updating business");
    }
  };

  return (
    <Dialog open={editing} onOpenChange={setEditing}>
      <DialogTrigger asChild>
        <Button className="hero-button-primary">Edit Business Info</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border border-white/10 text-white">
        <DialogTitle asChild>
          <h2 className="text-xl font-semibold mb-4">Edit Business Info</h2>
        </DialogTitle>
        <label className="block text-sm font-medium mb-1">Business Name</label>
        <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="mb-4" />
        {editImageUrl && (
          <div className="flex justify-center mb-4 relative group">
            <label className="cursor-pointer">
              <Image
                src={newImageFile ? URL.createObjectURL(newImageFile) : editImageUrl}
                alt="Business preview"
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-full border"
              />
              <div className="text-center mt-2">
                <span className="text-xs text-white font-medium">Change</span>
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>
        )}
        <div className="mb-1 text-white text-sm">
          <label className="block text-sm font-medium mb-1">Site URL</label>
          <div className="flex flex-col gap-1">
            <span className="text-gray-400 text-sm">https://www.monthlyclubhq.com/businesses/</span>
            <Input
              value={editSlug}
              onChange={(e) => {
                const value = e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9\-]/g, "");
                setEditSlug(value);
              }}
            />
          </div>
        </div>
        {slugError && <p className="text-red-500 text-sm mb-2">{slugError}</p>}
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="mb-4"
          rows={5}
          style={{ minHeight: "120px" }}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
          <Button className="hero-button-primary" onClick={handleUpdateBusiness}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}