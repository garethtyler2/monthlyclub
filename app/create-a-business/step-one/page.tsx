// Redesigned layout inspired by the CTA component, glass card, and brand styling.
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from "next/image";
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from "@/lib/supabase/client";
import { LoadingOverlay } from '@/components/ui/loading-overlay';

export default function CreateBusinessPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [accountType, setAccountType] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [customBusinessType, setCustomBusinessType] = useState("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const phrases = useMemo(() => ['the service you offer', 'products and prices'], []);
  const [typing, setTyping] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[index];
    const updateTyping = () => {
      if (isDeleting) {
        setTyping((prev) => {
          const updated = currentPhrase.substring(0, prev.length - 1);
          if (updated === '') {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % phrases.length);
          }
          return updated;
        });
      } else {
        setTyping((prev) => {
          const updated = currentPhrase.substring(0, prev.length + 1);
          if (updated === currentPhrase) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
          return updated;
        });
      }
    };

    const interval = setInterval(updateTyping, 100);
    return () => clearInterval(interval);
  }, [typing, isDeleting, index, phrases]);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const { data, error } = await supabase
        .from("service_types")
        .select("label")
        .order("label", { ascending: true });

      if (!error && data) {
        setServiceTypes(data.map((item) => item.label));
      } else {
        console.error("Failed to load service types:", error);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return alert("You must be logged in.");

    const slugify = (text: string) =>
      text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const { data: existing } = await supabase
        .from("businesses")
        .select("id")
        .eq("slug", slug);

      if (!existing || existing.length === 0) break;
      slug = `${baseSlug}-${counter++}`;
    }

    let finalBusinessType = businessType;
    if (businessType === "Other" && customBusinessType) {
      const { data: insertedType } = await supabase.from("service_types").insert([
        {
          label: customBusinessType,
          is_custom: true,
          created_by_user_id: user.id
        }
      ]).select().single();
      finalBusinessType = insertedType?.label ?? customBusinessType;
    }

    let imageUrl = "";

    if (image) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("business-profile-images")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Image upload error:", uploadError?.message || uploadError);
        alert("Image upload failed. Please try a smaller image or check your connection.");
      } else {
        const { data: publicUrl } = supabase
          .storage
          .from("business-profile-images")
          .getPublicUrl(filePath);
        imageUrl = publicUrl.publicUrl;
      }
    }

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .insert([
        {
          user_id: user.id,
          name,
          description,
          image_url: imageUrl,
          service_type: finalBusinessType,
          business_type: accountType,
          slug
        }
      ])
      .select()
      .single();

    if (businessError || !business) {
      console.error("Business insert error:", businessError);
      return;
    }

    const aiRes = await fetch("/api/ai/generate-business-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessName: name, paragraph: description })
    });

    const aiData = await aiRes.json();
    if (!aiRes.ok || !aiData?.data) {
      console.error("AI error:", aiData);
      return;
    }

    const { summary, products } = aiData.data;

    await supabase
      .from("businesses")
      .update({ description: summary })
      .eq("id", business.id);

    const productInserts = products.map((product: any) => ({
      business_id: business.id,
      name: product.name,
      description: product.description,
      price: product.price
    }));

    await supabase.from("products").insert(productInserts);
    
    window.location.href = `/create-a-business/step-two?id=${business.id}`;
  };
  if (loading ) {
    return <LoadingOverlay show message="Generating your business page and products" />;
  }
  return (
    <section className="py-10 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />

        {/* Progress bar at the top */}
        <p className="text-base font-medium text-gray-100 text-center mb-2">
          Step 1: Describe your business
        </p>
        <div className="max-w-3xl mx-auto mb-8">
        <div className="w-full h-2 mb-8 bg-gray-700/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue w-1/3 animate-pulse" />
        </div>
        </div>
        <div className="glass-card p-4 md:p-12 max-w-3xl mx-auto animate-fade-in border border-gray-200 shadow-md rounded-lg bg-white/5">
        <h1 className="mb-4 animate-fade-in text-center mx-auto">
            Create Your <span className="gradient-text text-center">AI-Powered Business Page</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Add your details below and let our AI generate your business summary and product plans—fast, polished, and easy.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image upload and preview section */}
            <div className="flex flex-col items-center space-y-2">
              <label className="block text-base font-semibold text-gray-100 text-center mb-2">
                Business Profile Image
              </label>
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                <Image
                  src={image ? URL.createObjectURL(image) : "/images/MonthlyClubLogo.png"}
                  alt="Profile Preview"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {image ? "Change" : "+ Add Image"}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-sm text-gray-400 text-center mt-2">
                Add your image <span className="text-xs">(optional)</span>
              </p>
            </div>
            {name && (
              <h2 className="text-xl font-semibold text-white mt-4 text-center">{name}</h2>
            )}
            <div>
              <label className="block text-base font-semibold mb-1 text-gray-100">Business Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
                placeholder="Business Name"
              />
            </div>
            <div>
  <label className="block text-base font-semibold mb-1 text-gray-100">Are you an individual or a company?</label>
  <div className="flex gap-4">
    <label className="flex items-center gap-2 text-white">
      <input
        type="radio"
        name="business_type"
        value="individual"
        checked={accountType === "individual"}
        onChange={() => setAccountType("individual")}
        required
      />
      Individual
    </label>
    <label className="flex items-center gap-2 text-white">
      <input
        type="radio"
        name="business_type"
        value="company"
        checked={accountType === "company"}
        onChange={() => setAccountType("company")}
      />
      Company
    </label>
  </div>
</div>
{accountType === "company" && (
  <div className="mt-2 text-sm text-yellow-300 bg-yellow-500/10 border border-yellow-500 rounded p-3">
    As a company, Stripe will ask you to provide additional business information such as your Companies House number and registered address.
  </div>
)}
            <div>
              <label className="block text-base font-semibold mb-1 text-gray-100">Service Type</label>
              <select
                required
                value={businessType}
                onChange={(e) => {
                  const value = e.target.value;
                  setBusinessType(value);
                  if (value !== "Other") setCustomBusinessType("");
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="" disabled>Select your business type</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {businessType === "Other" && (
                <input
                  type="text"
                  required
                  placeholder="Please specify your business type"
                  value={customBusinessType}
                  onChange={(e) => setCustomBusinessType(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded"
                />
              )}
            </div>
            <div>
              <label className="block text-base font-semibold mb-1 flex items-center gap-1 text-gray-100">
                Describe your service and what you'd like to sell
                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="cursor-pointer text-gray-400 hover:text-gray-400"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </label>
              {showHelp && (
                <div className="text-sm text-gray-400 mb-2 bg-gray-100 p-3 rounded border border-gray-200">
                  Add all your details here — what you do, what you want to offer, and pricing if possible. We'll polish and summarise it all for you on the next page, where you can review and edit easily.
                </div>
              )}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder={`Include ${typing}`}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Mention what you do and include the kinds of subscriptions you'd like to offer — including pricing if you have something in mind.
              </p>
            </div>
            <Button type="submit" className="w-full hero-button-primary">
              Generate My Business Page
            </Button>
          </form>
        </div>
      </div>
      
    </section>
  );
}