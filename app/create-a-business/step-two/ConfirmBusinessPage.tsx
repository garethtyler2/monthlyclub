"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay"

const gradientStyles = [
  "from-brand-blue/10 to-transparent border-brand-blue/20",
  "from-brand-purple/10 to-transparent border-brand-purple/20",
  "from-brand-indigo/10 to-transparent border-brand-indigo/20",
  "from-brand-pink/10 to-transparent border-brand-pink/20",
];

export default function ConfirmBusinessPage() {
  const searchParams = useSearchParams();
  const businessId = searchParams.get("id");

  const [business, setBusiness] = useState<any>(null);
  const [businessType, setBusinessType] = useState("individual");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [clickedProductId, setClickedProductId] = useState<string | null>(null);
  const [tab, setTab] = useState("edit");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!businessId) return;
      setLoading(false);

      const { data: businessData } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", businessId)
        .single();

      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", businessId);

      setBusiness(businessData);
      setBusinessType(businessData?.business_type || "individual");
      setProducts(productData || []);
      setLoading(false);
    };

    fetchData();
  }, [businessId]);

  const handleProductChange = (index: number, field: string, value: string | number) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = async () => {
    if (!businessId) return;

    setSaving(true);

    try {
      const { error: businessError } = await supabase
        .from("businesses")
        .update({ description: business.description, name: business.name })
        .eq("id", businessId);

      if (businessError) throw new Error("Failed to update business");

      const { error: deleteError } = await supabase
        .from("products")
        .delete()
        .eq("business_id", businessId);

      if (deleteError) throw new Error("Failed to delete existing products");

      const cleanedProducts = products.map((product) => ({
        business_id: businessId,
        name: product.name,
        description: product.description,
        price: product.price,
      }));

      const { error: insertError } = await supabase
        .from("products")
        .insert(cleanedProducts);

      if (insertError) throw new Error("Failed to insert updated products");

      // No redirect here, we want to proceed to Stripe setup instead
    } catch (err) {
      console.error("Save error:", err);
      alert("There was a problem saving your business details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndStripe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setLoading(true);
    try {
      await handleSave();
      await handleStripeSetup();
    } catch (err) {
      console.error("Error during save and stripe setup:", err);
      setLoading(false);
    }
  };
  const handleStripeSetup = async () => {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const token = session?.access_token;
    const userId = user?.id;

    if (!userId || !token) {
      alert("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/stripe/create-business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          businessId,
          name,
          email,
          business_type: businessType,
        }),
      });

      const data = await response.json();

      if (response.ok && data?.url) {
        window.location.href = data.url;
        return; // skip further execution
      } else {
        alert("Something went wrong creating the Stripe link.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Stripe onboarding error:", error);
      alert("Error initiating Stripe onboarding.");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingOverlay show message="Redirecting you to Stripe for setup..." />;
  }

  return (
    <div className=" py-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-brand-purple/20 rounded-full blur-[128px] -z-10" />
    <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
        <p className="text-base font-medium text-gray-100 text-center mb-2">
          Step 2: Review your business details
        </p>
        <div className="max-w-3xl mx-auto mb-8">
        <div className="w-full h-2 mb-8 bg-gray-700/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue w-2/3 animate-pulse" />
        </div>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="max-w-3xl mx-auto">
          <TabsList className="mb-6 flex justify-center">
            <TabsTrigger value="edit">Edit Info</TabsTrigger>
            <TabsTrigger value="preview">Preview Page</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <div className="glass-card p-4 md:p-12 animate-fade-in border border-gray-200 shadow-md rounded-lg bg-white/5">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-1">Business Name</label>
                <Input
                  className="bg-gray-800 border border-white text-white placeholder-gray-400"
                  value={business?.name || ""}
                  onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                  placeholder="Business Name"
                />
              </div>
              {/* Show uploaded business image if present */}
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
              <div className="mb-6">
                <label className="block text-sm font-semibold text-white mb-1">Business Summary</label>
                <Textarea
                  className="bg-gray-800 border border-white text-white placeholder-gray-400"
                  value={business?.description || ""}
                  onChange={(e) => setBusiness({ ...business, description: e.target.value })}
                />
              </div>
              <div className="mb-6">
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
                      <div>
                        <label className="text-sm font-semibold text-white">Price (£/month)</label>
                        <Input
                          className="bg-gray-800 border border-white text-white placeholder-gray-400"
                          type="number"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, "price", parseFloat(e.target.value))}
                          placeholder="Monthly Price"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setProducts((prev) => [
                        ...prev,
                        { id: `temp-${Date.now()}`, name: "", description: "", price: 0 }
                      ])
                    }
                  >
                    + Add New Product
                  </Button>
                </div>
              </div>
              <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between gap-3">
                <Button
                  variant="ghost"
                  className="text-white border border-white hover:bg-white/10 w-full md:w-auto"
                  onClick={() => setTab("preview")}
                >
                  Preview My Business Page
                </Button>
                <Button
                  className="hero-button-primary w-full md:w-auto"
                  onClick={handleSaveAndStripe}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Continue to Stripe Setup"}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent id="preview" value="preview">
            <div className="glass-card p-4 border border-white/10 bg-white/5 rounded-lg shadow animate-fade-in text-white">
              {business?.name && (
                <h2 className="text-2xl font-semibold text-center mb-4">{business.name}</h2>
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
                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm opacity-90 mb-3">{product.description}</p>
                      <p className="text-md font-bold mb-4">£{product.price}/month</p>

                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Button
                          className="hero-button-primary mt-4"
                          onClick={() => setClickedProductId(product.id)}
                        >
                          Subscribe
                        </Button>
                        {clickedProductId === product.id && (
                          <p className="mt-2 text-sm text-green-400 text-center animate-bounce">
                            🎉 Ooooh NICE!
                          </p>
                        )}
                      </motion.div>

                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  variant="ghost"
                  className="text-white border border-white hover:bg-white/10"
                  onClick={() => setTab("edit")}
                >
                  Back to Editing
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}