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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Trash, Info, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { LoadingOverlay } from "@/components/ui/loading-overlay"

const gradientStyles = [
  "from-brand-blue/10 to-transparent border-brand-blue/20",
  "from-brand-purple/10 to-transparent border-brand-purple/20",
  "from-brand-indigo/10 to-transparent border-brand-indigo/20",
  "from-brand-pink/10 to-transparent border-brand-pink/20",
];

import { Product, ProductType, getProductTypeConfig, requiresPrice } from '@/types/products';
import ProductTypeSelector from '@/components/shared/ProductTypeSelector';

export default function ConfirmBusinessPage() {
  const searchParams = useSearchParams();
  const businessId = searchParams.get("id");

  const [business, setBusiness] = useState<any>(null);
  const [businessType, setBusinessType] = useState("individual");
  const [products, setProducts] = useState<Product[]>([]);
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
        product_type: product.product_type || 'standard',

      }));

      const { error: insertError } = await supabase
        .from("products")
        .insert(cleanedProducts);

      if (insertError) throw new Error("Failed to insert products");

      setSaving(false);
      setTab("preview");
    } catch (error) {
      console.error("Error saving:", error);
      setSaving(false);
    }
  };

  const handleSaveAndStripe = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await handleSave();
    await handleStripeSetup();
  };

  const handleStripeSetup = async () => {
    if (!businessId) return;

    try {
      const response = await fetch("/api/stripe/create-business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ businessId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create Stripe account");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error setting up Stripe:", error);
    }
  };

  if (loading) {
    return <LoadingOverlay show message="Loading business details..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Set Up Your Business
            </h1>
            <p className="text-lg text-gray-300">
              Customize your business page and add your products
            </p>
          </div>

          <Progress value={66} className="mb-8" />

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
                      {product.product_type === 'balance_builder' ? (
                        <p className="text-md font-bold mb-4 text-green-300">Choose your monthly amount</p>
                      ) : product.product_type === 'pay_it_off' ? (
                        <div className="text-md font-bold mb-4">
                          <p className="text-purple-300">Total: £{product.price}</p>
                          <p className="text-sm text-gray-300">Choose payment plan at checkout</p>
                        </div>
                      ) : (
                        <p className="text-md font-bold mb-4">£{product.price}/month</p>
                      )}

                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Button
                          className="hero-button-primary mt-4"
                          onClick={() => setClickedProductId(product.id)}
                        >
                          {product.product_type === 'balance_builder' ? "Start Building" : product.product_type === 'pay_it_off' ? "Start Paying" : product.product_type === 'one_time' ? "Buy Now" : "Subscribe"}
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
    </div>
  );
}