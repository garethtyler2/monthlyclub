'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from "next/image";
import { HelpCircle, Sparkles, Plus, Trash, Info, TrendingUp, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from "@/lib/supabase/client";
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import ProductTypeSelector from '@/components/shared/ProductTypeSelector';
import { Product, ProductType, getProductTypeConfig, isCustomerAmountType, requiresPrice } from '@/types/products';

// Product interface is now imported from types/products.ts

const gradientStyles = [
  "from-brand-blue/10 to-transparent border-brand-blue/20",
  "from-brand-purple/10 to-transparent border-brand-purple/20",
  "from-brand-indigo/10 to-transparent border-brand-indigo/20",
  "from-brand-pink/10 to-transparent border-brand-pink/20",
];

export default function CreateBusinessPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [accountType, setAccountType] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [customBusinessType, setCustomBusinessType] = useState("");
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [hasBusiness, setHasBusiness] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace(`/login?redirect=${encodeURIComponent('/create-a-business')}`);
        return;
      }

      // Check if user has existing business in draft/pre-stripe status
      const { data: existingBusiness, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", user.id)
        .in("status", ["draft", "pre-stripe"])
        .single();

      if (existingBusiness && !error) {
        // Load existing business data
        setIsEditing(true);
        setName(existingBusiness.name || '');
        setDescription(existingBusiness.description || '');
        setAccountType(existingBusiness.business_type || '');
        setBusinessType(existingBusiness.service_type || '');
        setExistingImageUrl(existingBusiness.image_url);

        // Load products
        const { data: productData } = await supabase
          .from("products")
          .select("*")
          .eq("business_id", existingBusiness.id);

        if (productData) {
          setProducts(productData.map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            product_type: p.product_type === 'credit_builder' ? 'balance_builder' : (p.product_type as ProductType) || 'standard'
          })));
        }
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const phrases = useMemo(() => ['the service you offer', 'products and prices'], []);
  const [typing, setTyping] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  useEffect(() => {
    const checkExistingBusiness = async () => {
      const userResult = await supabase.auth.getUser();
      const user = userResult.data.user;
      if (!user) return;

      const { data: businesses, error } = await supabase
        .from("businesses")
        .select("id, status, slug")
        .eq("user_id", user.id);

      const activeBusiness = businesses?.find((b) => b.status === "active");
      if (activeBusiness) {
        setHasBusiness(true);
      }
    };

    checkExistingBusiness();
  }, [router]);

  const handleAiSpruceUp = async () => {
    if (!description.trim() || !name.trim()) {
      alert("Please fill in both business name and description before using AI spruce-up.");
      return;
    }

    setAiLoading(true);
    try {
      const aiRes = await fetch("/api/ai/generate-business-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName: name, paragraph: description })
      });

      const aiData = await aiRes.json();
      if (!aiRes.ok || !aiData?.data) {
        console.error("AI error:", aiData);
        alert("Failed to generate AI summary. Please try again.");
        return;
      }

      const { summary } = aiData.data;
      
      // Update description with AI summary only
      setDescription(summary);
    } catch (error) {
      console.error("AI spruce-up error:", error);
      alert("Failed to generate AI summary. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleProductChange = (index: number, field: string, value: string | number) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const addNewProduct = () => {
    setProducts((prev) => [
      ...prev,
      { 
        id: `temp-${Date.now()}`, 
        name: "", 
        description: "", 
        price: 0,
        product_type: 'standard'
      }
    ]);
  };

  const handleProductTypeChange = (index: number, newType: ProductType) => {
    setProducts((prev) =>
      prev.map((p, i) => {
        if (i === index) {
          const config = getProductTypeConfig(newType);
          
          // Set default values based on product type
          let defaultName = "";
          let defaultDescription = "";
          let defaultPrice = 0;
          
          if (newType === 'balance_builder') {
            defaultName = "Balance Builder";
            defaultDescription = "Build up a balance over time to use on any of our services. Choose how much you'd like to add each month.";
            defaultPrice = 0;
          } else if (newType === 'pay_it_off') {
            defaultName = "Pay it off";
            defaultDescription = "Pay off a larger amount over time with monthly installments.";
            defaultPrice = 0;
          } else if (newType === 'one_time') {
            defaultName = "One-time Purchase";
            defaultDescription = "A single payment for immediate purchase - no recurring billing.";
            defaultPrice = 0;
          }
          
          return {
            ...p,
            name: defaultName,
            description: defaultDescription,
            price: defaultPrice,
            product_type: newType
          };
        }
        return p;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return alert("You must be logged in.");

    // Check if we're updating an existing business
    const { data: existingBusiness } = await supabase
      .from("businesses")
      .select("id")
      .eq("user_id", user.id)
      .in("status", ["draft", "pre-stripe"])
      .single();

    let businessId = existingBusiness?.id;

    if (businessId) {
      // Update existing business
      let imageUrl = existingImageUrl || "";

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

      // Update business
      const { error: businessError } = await supabase
        .from("businesses")
        .update({
          name,
          description,
          image_url: imageUrl,
          service_type: businessType,
          business_type: accountType,
          status: "pre-stripe"
        })
        .eq("id", businessId);

      if (businessError) {
        console.error("Business update error:", businessError);
        setLoading(false);
        return;
      }

      // Delete existing products and insert new ones
      await supabase.from("products").delete().eq("business_id", businessId);

      if (products.length > 0) {
        const productInserts = products.map((product) => ({
          business_id: businessId,
          name: product.name,
          description: product.description,
          price: product.price,
          product_type: product.product_type,
        }));

        await supabase.from("products").insert(productInserts);
      }
    } else {
      // Create new business
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
            slug,
            status: "pre-stripe"
          }
        ])
        .select()
        .single();

      if (businessError || !business) {
        console.error("Business insert error:", businessError);
        setLoading(false);
        return;
      }

      businessId = business.id;

      // Insert products
      if (products.length > 0) {
        const productInserts = products.map((product) => ({
          business_id: businessId,
          name: product.name,
          description: product.description,
          price: product.price,
          product_type: product.product_type,
        }));

        await supabase.from("products").insert(productInserts);
      }
    }

    // Continue to Stripe setup
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No active session");
      }

      const response = await fetch("/api/stripe/create-business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ businessId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create Stripe account");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error setting up Stripe:", error);
      setLoading(false);
    }
  };

  if (hasBusiness) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-2xl font-bold mb-4">You already have a business</h2>
        <p className="mb-6">Each account is limited to one business. You can manage your existing business from your dashboard.</p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button onClick={() => router.push("/dashboard")} className="w-full hero-button-primary">
            Go to Dashboard
          </Button>
          <Button onClick={() => router.push("/")} variant="outline" className="w-full">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingOverlay show message="Setting up your business..." />;
  }

  if (aiLoading) {
    return <LoadingOverlay show message="Polishing your business description with AI..." />;
  }

  return (
    <section className="py-10 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />

        {/* Progress bar at the top */}
        <p className="text-base font-medium text-gray-100 text-center mb-2">
          {isEditing ? "Complete Your Business Setup" : "Create Your Business"}
        </p>
        <div className="max-w-3xl mx-auto mb-8">
          <div className="w-full h-2 mb-8 bg-gray-700/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue w-1/3 animate-pulse" />
          </div>
        </div>
        
        <div className="glass-card p-4 md:p-12 max-w-4xl mx-auto animate-fade-in border border-gray-200 shadow-md rounded-lg bg-white/5">
          <h1 className="mb-4 animate-fade-in text-center mx-auto">
            {isEditing ? "Complete Your " : "Create Your "}<span className="gradient-text text-center">AI-Powered Business Page</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-6 text-center mx-auto">
            {isEditing 
              ? "Review and update your business details, then continue to Stripe setup."
              : "Add your details below, let our AI polish your description, and set up your products—all in one step."
            }
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image upload and preview section */}
            <div className="flex flex-col items-center space-y-2">
              <label className="block text-base font-semibold text-gray-100 text-center mb-2">
                Business Profile Image
              </label>
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center relative">
                <Image
                  src={imagePreviewUrl || existingImageUrl || "/images/MonthlyClubLogo.png"}
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
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setImage(file);
                    if (file) {
                      const previewUrl = URL.createObjectURL(file);
                      setImagePreviewUrl(previewUrl);
                    } else {
                      setImagePreviewUrl(null);
                    }
                  }}
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
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-800 text-white"
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
                className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
              >
                <option value="" disabled>Select your business type</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {businessType === "Other" && (
                <Input
                  type="text"
                  required
                  placeholder="Please specify your business type"
                  value={customBusinessType}
                  onChange={(e) => setCustomBusinessType(e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded bg-gray-800 text-white"
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
                  Add all your details here — what you do and what you want to offer. Click the AI button to polish your description.
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded bg-gray-800 text-white"
                  placeholder={`Include ${typing}`}
                  required
                />
                <Button
                  type="button"
                  onClick={handleAiSpruceUp}
                  disabled={aiLoading || !description.trim() || !name.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-brand-purple to-brand-blue text-white rounded hover:opacity-90 disabled:opacity-50 sm:w-auto w-full"
                >
                  {aiLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <Sparkles className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      AI Polish
                    </div>
                  )}
                </Button>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <label className="block font-medium mb-2 text-white">Your Products</label>
              <div className="space-y-4">
                {products.map((product, index) => (
                  <div key={product.id} className="bg-white/5 p-4 rounded-md border border-white/10 space-y-3">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setProducts((prev) => prev.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-700 transition"
                        aria-label="Delete product"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                    <ProductTypeSelector
                      selectedType={product.product_type}
                      onTypeChange={(newType) => handleProductTypeChange(index, newType)}
                      className="mb-4"
                    />
                    <div>
                      <label className="text-sm font-semibold text-white">Product Name</label>
                      <Input
                        className="bg-gray-800 border border-white text-white placeholder-gray-400"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, "name", e.target.value)}
                        placeholder="Product Name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-white">Product Description</label>
                      <Textarea
                        className="bg-gray-800 border border-white text-white placeholder-gray-400"
                        value={product.description}
                        onChange={(e) => handleProductChange(index, "description", e.target.value)}
                        placeholder="Product Description"
                      />
                    </div>
                    {requiresPrice(product.product_type) && (
                      <div>
                        <label className="text-sm font-semibold text-white">
                          {product.product_type === 'pay_it_off' ? 'Total Amount (£)' : 'Price (£/month)'}
                        </label>
                        <Input
                          className="bg-gray-800 border border-white text-white placeholder-gray-400"
                          type="number"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, "price", parseFloat(e.target.value))}
                          placeholder={product.product_type === 'pay_it_off' ? 'Total amount to be paid off' : 'Monthly Price'}
                        />
                        {product.product_type === 'pay_it_off' && (
                          <p className="text-xs text-gray-400 mt-1">
                            Customers will choose how many months to pay this off over
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addNewProduct}
                  className="text-white border border-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </div>
            </div>

            {/* Preview Section */}
            {name && description && (
              <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Preview</h3>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-white mb-4">{name}</h2>
                  {(imagePreviewUrl || existingImageUrl) && (
                    <div className="flex justify-center mb-6">
                      <Image
                        src={imagePreviewUrl || existingImageUrl || ""}
                        alt="Business profile"
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full object-cover border-2 border-white shadow"
                      />
                    </div>
                  )}
                  <p className="text-center text-muted-foreground mb-6">{description}</p>
                  
                  {products.length > 0 && (
                    <div>
                      <label className="block font-medium mb-2 text-white">Products</label>
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
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <div className="flex items-center space-x-2">
                                  {product.product_type === 'balance_builder' && (
                                    <>
                                      <TrendingUp className="w-4 h-4 text-green-400" />
                                      <span className="text-sm text-green-400">Balance Builder</span>
                                    </>
                                  )}
                                  {product.product_type === 'pay_it_off' && (
                                    <>
                                      <Calendar className="w-4 h-4 text-purple-400" />
                                      <span className="text-sm text-purple-400">Pay it off</span>
                                    </>
                                  )}
                                  {product.product_type === 'standard' && (
                                    <>
                                      <CreditCard className="w-4 h-4 text-blue-400" />
                                      <span className="text-sm text-blue-400">Standard</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm opacity-90 mb-3">{product.description}</p>
                              {isCustomerAmountType(product.product_type) ? (
                                <p className="text-md font-bold mb-4 text-green-300">Choose your monthly amount</p>
                              ) : product.product_type === 'pay_it_off' ? (
                                <div className="text-md font-bold mb-4">
                                  <p className="text-purple-300">Total: £{product.price}</p>
                                  <p className="text-sm text-gray-300">Choose payment plan at checkout</p>
                                </div>
                              ) : (
                                <p className="text-md font-bold mb-4">£{product.price}/month</p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="text-center mb-4">
              <p className="text-sm text-gray-400 mb-2">
                By continuing, you agree to our{' '}
                <a 
                  href="/terms-business" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:text-brand-purple underline"
                >
                  Business Terms and Conditions
                </a>
              </p>
            </div>

            <Button type="submit" className="w-full hero-button-primary">
              {isEditing ? "Update & Continue to Stripe" : "Create & Continue to Stripe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

