"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { 
  Plus, 
  Edit, 
  Trash2, 
  CreditCard, 
  TrendingUp, 
  Calendar,
  Building2
} from "lucide-react";
import ProductTypeSelector from "@/components/shared/ProductTypeSelector";
import { Product, ProductType, getProductTypeConfig, requiresPrice } from "@/types/products";

export function EditBusinessModal({ business }: { business: any }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(business.name || "");
  const [editDescription, setEditDescription] = useState(business.description || "");
  const [editImageUrl, setEditImageUrl] = useState(business.image_url || "");
  const [editSlug, setEditSlug] = useState(business.slug || "");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [slugError, setSlugError] = useState("");
  
  // Product management state
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [addForm, setAddForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    product_type: 'standard'
  });
  const [editForm, setEditForm] = useState<Partial<Product>>({});

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

  // Fetch products when modal opens
  useEffect(() => {
    if (editing) {
      fetchProducts();
    }
  }, [editing, business.id]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('business_id', business.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data || []);
    }
  };

  const updateAddForm = (field: keyof Product, value: any) => {
    setAddForm(prev => ({ ...prev, [field]: value }));
  };

  const updateEditForm = (field: keyof Product, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = async () => {
    if (!addForm.name || !addForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const { error } = await supabase
      .from('products')
      .insert({
        name: addForm.name,
        description: addForm.description,
        price: addForm.price || 0,
        product_type: addForm.product_type || 'standard',
        business_id: business.id,
        status: 'active'
      });

    if (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    } else {
      setAddForm({ name: '', description: '', price: 0, product_type: 'standard' });
      setShowAddProduct(false);
      fetchProducts();
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct || !editForm.name || !editForm.description) {
      alert('Please fill in all required fields');
      return;
    }

    const { error } = await supabase
      .from('products')
      .update({
        name: editForm.name,
        description: editForm.description,
        price: editForm.price || 0
        // Note: product_type is intentionally not updated to prevent breaking existing subscriptions
      })
      .eq('id', editingProduct.id);

    if (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    } else {
      setEditingProduct(null);
      setEditForm({});
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } else {
      fetchProducts();
    }
  };

  const startEditProduct = (product: Product) => {
    // Close any open add product form
    setShowAddProduct(false);
    // Close any other editing product
    setEditingProduct(null);
    // Start editing the selected product
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price
      // Note: product_type is intentionally not included in edit form
    });
  };

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

  const getProductIcon = (type: ProductType) => {
    switch (type) {
      case 'standard': return <CreditCard className="w-4 h-4 text-blue-400" />;
      case 'balance_builder': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'pay_it_off': return <Calendar className="w-4 h-4 text-purple-400" />;
      default: return <Building2 className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Dialog open={editing} onOpenChange={setEditing}>
      <DialogTrigger asChild>
        <Button className="hero-button-primary">Edit Business</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogTitle asChild>
          <h2 className="text-xl font-semibold mb-4">Edit Business</h2>
        </DialogTitle>
        
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="business" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Business Name</label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="mb-4" />
            </div>
            
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
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="mb-4"
                rows={5}
                style={{ minHeight: "120px" }}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              <Button className="hero-button-primary" onClick={handleUpdateBusiness}>Save Changes</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Products</h3>
              <Button 
                onClick={() => {
                  // Close any open edit forms
                  setEditingProduct(null);
                  setEditForm({});
                  // Open add product form
                  setShowAddProduct(true);
                }}
                className="hero-button-primary"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            
            {/* Products List */}
            <div className="space-y-3">
              {products.map((product) => (
                <Card key={product.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-white/10 rounded-lg">
                          {getProductIcon(product.product_type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-white">{product.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {getProductTypeConfig(product.product_type).label}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{product.description}</p>
                          {requiresPrice(product.product_type) && (
                            <p className="text-sm text-gray-400">
                              {product.product_type === 'pay_it_off' 
                                ? `£${product.price} total` 
                                : `£${product.price}/month`
                              }
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {products.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No products yet</p>
                  <p className="text-sm">Add your first product to get started</p>
                </div>
              )}
            </div>
            
            {/* Add Product Form */}
            {showAddProduct && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <h4 className="font-medium text-white mb-4">Add New Product</h4>
                  <div className="space-y-4">
                    <ProductTypeSelector
                      selectedType={addForm.product_type as ProductType}
                      onTypeChange={(type) => updateAddForm('product_type', type)}
                    />
                    <div>
                      <Label htmlFor="add-name" className="text-sm font-medium text-white">Name</Label>
                      <Input
                        id="add-name"
                        value={addForm.name || ''}
                        onChange={(e) => updateAddForm('name', e.target.value)}
                        placeholder="Product name"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="add-description" className="text-sm font-medium text-white">Description</Label>
                      <Textarea
                        id="add-description"
                        value={addForm.description || ''}
                        onChange={(e) => updateAddForm('description', e.target.value)}
                        placeholder="Product description"
                        className="min-h-[100px] bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    {requiresPrice(addForm.product_type as ProductType) && (
                      <div>
                        <Label htmlFor="add-price" className="text-sm font-medium text-white">
                          {addForm.product_type === 'pay_it_off' ? 'Total Amount (£)' : 'Price (£)'}
                        </Label>
                        <Input
                          id="add-price"
                          type="number"
                          step="0.01"
                          value={addForm.price || ''}
                          onChange={(e) => updateAddForm('price', parseFloat(e.target.value))}
                          placeholder="0.00"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => {
                        setShowAddProduct(false);
                        setAddForm({ name: '', description: '', price: 0, product_type: 'standard' });
                      }}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddProduct} className="hero-button-primary">
                        Add Product
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Edit Product Form */}
            {editingProduct && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <h4 className="font-medium text-white mb-4">Edit Product</h4>
                  <div className="space-y-4">
                    {/* Product Type Display (Read-only) */}
                    <div>
                      <Label className="text-sm font-medium text-white">Product Type</Label>
                      <div className="flex items-center gap-2 mt-1 p-3 bg-white/5 border border-white/10 rounded-lg">
                        <div className="p-1.5 rounded-lg bg-white/10">
                          {getProductIcon(editingProduct.product_type)}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {getProductTypeConfig(editingProduct.product_type).label}
                          </div>
                          <div className="text-xs text-gray-400">
                            {getProductTypeConfig(editingProduct.product_type).description}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Product type cannot be changed after creation to protect existing subscriptions
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="edit-name" className="text-sm font-medium text-white">Name</Label>
                      <Input
                        id="edit-name"
                        value={editForm.name || ''}
                        onChange={(e) => updateEditForm('name', e.target.value)}
                        placeholder="Product name"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description" className="text-sm font-medium text-white">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editForm.description || ''}
                        onChange={(e) => updateEditForm('description', e.target.value)}
                        placeholder="Product description"
                        className="min-h-[100px] bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    {requiresPrice(editingProduct.product_type) && (
                      <div>
                        <Label htmlFor="edit-price" className="text-sm font-medium text-white">
                          {editingProduct.product_type === 'pay_it_off' ? 'Total Amount (£)' : 'Price (£)'}
                        </Label>
                        <Input
                          id="edit-price"
                          type="number"
                          step="0.01"
                          value={editForm.price || ''}
                          onChange={(e) => updateEditForm('price', parseFloat(e.target.value))}
                          placeholder="0.00"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => {
                        setEditingProduct(null);
                        setEditForm({});
                      }}>
                        Cancel
                      </Button>
                      <Button onClick={handleEditProduct} className="hero-button-primary">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}