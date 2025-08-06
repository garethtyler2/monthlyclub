"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Pencil, 
  Plus, 
  Info, 
  Trash2, 
  Users, 
  Building2, 
  CreditCard, 
  Sparkles,
  TrendingUp,
  Settings,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  PoundSterling
} from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ProductWithSubscribers {
  id: string;
  name: string;
  description: string;
  price: number;
  product_type: 'subscription' | 'credit_builder';
  is_credit_builder: boolean;
  status: 'active' | 'inactive';
  subscriberCount: number;
}

export default function BusinessProductManager({ businessId }: { businessId: string }) {
  const [products, setProducts] = useState<ProductWithSubscribers[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithSubscribers | null>(null);
  const [editForm, setEditForm] = useState<Partial<ProductWithSubscribers>>({});

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState<Partial<ProductWithSubscribers>>({});

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductWithSubscribers | null>(null);

  const openEditModal = (product: ProductWithSubscribers) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
    setEditForm({});
  };

  const openAddModal = () => {
    setAddForm({
      name: "",
      description: "",
      price: 0,
      product_type: 'subscription',
      is_credit_builder: false,
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddForm({});
  };

  const openDeleteModal = (product: ProductWithSubscribers) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const updateEditForm = (field: keyof ProductWithSubscribers, value: string | number) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const updateAddForm = (field: keyof ProductWithSubscribers, value: string | number | boolean) => {
    setAddForm(prev => {
      const updated = { ...prev, [field]: value };
      
      // If credit builder is enabled, set default values
      if (field === 'is_credit_builder' && value === true) {
        updated.name = "Credit Builder";
        updated.description = "Build up credit over time to use on any of our services. Choose how much you'd like to add each month.";
        updated.price = 0; // Will be set by user
        updated.product_type = 'credit_builder';
      } else if (field === 'is_credit_builder' && value === false) {
        updated.product_type = 'subscription';
      }
      
      return updated;
    });
  };

  const saveChanges = async () => {
    if (!editingProduct || !editForm.name || !editForm.description || editForm.price === undefined) {
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name: editForm.name,
        description: editForm.description,
        price: editForm.price,
      })
      .eq("id", editingProduct.id);

    if (error) {
      console.error("Failed to update product:", error);
      return;
    }

    // Re-fetch the products to show updated values
    setLoading(true);
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("id, name, description, price, product_type, is_credit_builder, status")
      .eq("business_id", businessId);

    if (productError) {
      console.error("Failed to fetch products:", productError);
      setLoading(false);
      return;
    }

    const enrichedProducts = await Promise.all(
      (productData || []).map(async (product) => {
        const { count, error: countError } = await supabase
          .from("subscriptions")
          .select("id", { count: "exact" })
          .eq("product_id", product.id)
          .eq("status", "active");

        return {
          ...product,
          subscriberCount: countError ? 0 : count || 0,
        };
      })
    );

    setProducts(enrichedProducts);
    setLoading(false);
    closeEditModal();
  };

  const saveNewProduct = async () => {
    if (!addForm.name || !addForm.description || addForm.price === undefined) {
      return;
    }

    const { error } = await supabase
      .from("products")
      .insert({
        business_id: businessId,
        name: addForm.name,
        description: addForm.description,
        price: addForm.price,
        product_type: addForm.product_type || 'subscription',
        is_credit_builder: addForm.is_credit_builder || false,
        status: 'active',
      });

    if (error) {
      console.error("Failed to create product:", error);
      return;
    }

    // Re-fetch products to show the new one
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("id, name, description, price, product_type, is_credit_builder, status")
      .eq("business_id", businessId);

    if (productError) {
      console.error("Failed to fetch products:", productError);
      setLoading(false);
      return;
    }

    const enrichedProducts = await Promise.all(
      (productData || []).map(async (product) => {
        const { count, error: countError } = await supabase
          .from("subscriptions")
          .select("id", { count: "exact" })
          .eq("product_id", product.id)
          .eq("status", "active");

        return {
          ...product,
          subscriberCount: countError ? 0 : count || 0,
        };
      })
    );

    setProducts(enrichedProducts);
    closeAddModal();
  };

  const deleteProduct = async () => {
    if (!productToDelete) return;

    // Check if product has active subscribers
    if (productToDelete.subscriberCount > 0) {
      closeDeleteModal();
      return;
    }

    const { error } = await supabase
      .from("products")
      .update({ status: 'inactive' })
      .eq("id", productToDelete.id);

    if (error) {
      console.error("Failed to delete product:", error);
      return;
    }

    // Remove from local state
    setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
    closeDeleteModal();
  };

  const getProductGradient = (index: number) => {
    const gradients = [
      "from-blue-500/10 to-indigo-500/10 border-blue-500/20",
      "from-purple-500/10 to-violet-500/10 border-purple-500/20",
      "from-green-500/10 to-emerald-500/10 border-green-500/20",
      "from-orange-500/10 to-red-500/10 border-orange-500/20",
      "from-pink-500/10 to-rose-500/10 border-pink-500/20",
      "from-teal-500/10 to-cyan-500/10 border-teal-500/20",
    ];
    return gradients[index % gradients.length];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, name, description, price, product_type, is_credit_builder, status")
        .eq("business_id", businessId)
        .eq("status", "active"); // Only show active products

      if (productError) {
        console.error("Failed to fetch products:", productError);
        setLoading(false);
        return;
      }

      // For each product, fetch subscriber count
      const enrichedProducts = await Promise.all(
        (productData || []).map(async (product) => {
          const { count, error: countError } = await supabase
            .from("subscriptions")
            .select("id", { count: "exact" })
            .eq("product_id", product.id)
            .eq("status", "active");

          return {
            ...product,
            subscriberCount: countError ? 0 : count || 0,
          };
        })
      );

      setProducts(enrichedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [businessId]);

  const totalSubscribers = products.reduce((sum, product) => sum + product.subscriberCount, 0);
  const totalRevenue = products.reduce((sum, product) => {
    if (product.is_credit_builder) return sum;
    return sum + (product.price * product.subscriberCount);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Your Products</h2>
          <p className="text-sm text-muted-foreground">Manage your subscription products and credit builders</p>
        </div>
        <Button 
          onClick={openAddModal} 
          className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>


      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className={`bg-gradient-to-br border-none transition-all duration-300 hover:scale-[1.02] group ${getProductGradient(index)}`}
              >
                <CardContent className="p-6">
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        {product.is_credit_builder ? (
                          <CreditCard className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Building2 className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white capitalize">{product.name}</h3>
                        {product.is_credit_builder && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs mt-1">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Credit Builder
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>

                  {/* Product Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-4">
                    {product.is_credit_builder ? (
                      <div className="flex items-center space-x-2">
                        <PoundSterling className="w-4 h-4 text-blue-400" />
                        <span className="text-lg font-bold text-blue-300">Flexible Pricing</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <PoundSterling className="w-4 h-4 text-green-400" />
                        <span className="text-lg font-bold text-green-300">£{product.price.toFixed(2)}/month</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {product.is_credit_builder ? 'Credit Builders' : 'Subscribers'}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {product.subscriberCount}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                      onClick={() => window.location.href = `/dashboard/products/${product.id}/manage-users`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                    
                    {!product.is_credit_builder && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => openEditModal(product)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-800 border-white/10">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">
                            {product.subscriberCount > 0 ? "Cannot Delete Product" : "Delete Product"}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-muted-foreground">
                            {product.subscriberCount > 0 ? (
                              <div className="space-y-2">
                                <p>You cannot delete "{product.name}" because it has active {product.is_credit_builder ? 'credit builders' : 'subscribers'}.</p>
                                <div className="flex items-center space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                  <p className="text-sm text-yellow-300">
                                    Please remove all users or ask them to cancel their subscriptions first.
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <p>Are you sure you want to delete "{product.name}"? This action cannot be undone.</p>
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-white/20 text-white">Cancel</AlertDialogCancel>
                          {product.subscriberCount === 0 && (
                            <AlertDialogAction 
                              onClick={() => openDeleteModal(product)} 
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete Product
                            </AlertDialogAction>
                          )}
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8 text-center">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Products Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first product to start accepting subscriptions and building your business.
                </p>
                <Button 
                  onClick={openAddModal}
                  className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Edit Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="bg-slate-800 border-white/10 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-white">Edit Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-white">Name</Label>
                  <Input
                    id="name"
                    value={editForm.name || ''}
                    onChange={(e) => updateEditForm('name', e.target.value)}
                    placeholder="Product name"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={editForm.description || ''}
                    onChange={(e) => updateEditForm('description', e.target.value)}
                    placeholder="Product description"
                    className="min-h-[100px] bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium text-white">Price (£)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={editForm.price || ''}
                    onChange={(e) => updateEditForm('price', parseFloat(e.target.value))}
                    placeholder="0.00"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <DialogFooter>

                <Button 
                  onClick={saveChanges}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add New Product Modal */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="bg-slate-800 border-white/10 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name" className="text-sm font-medium text-white">Name</Label>
                  <Input
                    id="add-name"
                    value={addForm.name || ''}
                    onChange={(e) => updateAddForm('name', e.target.value)}
                    placeholder="Product name"
                    disabled={addForm.is_credit_builder}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-description" className="text-sm font-medium text-white">Description</Label>
                  <Textarea
                    id="add-description"
                    value={addForm.description || ''}
                    onChange={(e) => updateAddForm('description', e.target.value)}
                    placeholder="Product description"
                    className="min-h-[100px] bg-white/5 border-white/10 text-white"
                    disabled={addForm.is_credit_builder}
                  />
                </div>
                {!addForm.is_credit_builder && (
                  <div className="space-y-2">
                    <Label htmlFor="add-price" className="text-sm font-medium text-white">Price (£)</Label>
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
                <div className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg">
                  <Checkbox
                    id="add-credit-builder"
                    checked={addForm.is_credit_builder || false}
                    onCheckedChange={(checked) => updateAddForm("is_credit_builder", checked)}
                    className="text-white"
                  />
                  <Label htmlFor="add-credit-builder" className="text-sm text-white">
                    Enable Credit Builder Mode
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1 h-auto text-muted-foreground hover:text-white">
                        <Info className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-slate-800 border-white/10">
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Credit Builder</h4>
                        <p className="text-sm text-muted-foreground">
                          Allow customers to build up credit over time that they can use on any of your services. 
                          Customers choose how much they want to add each month, and you can charge against their balance.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>

                <Button 
                  onClick={saveNewProduct}
                  className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Modal */}
          <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <AlertDialogContent className="bg-slate-800 border-white/10">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  Please confirm you want to delete "{productToDelete?.name}". This will remove it from your business page and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDeleteModal} className="border-white/20 text-white">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={deleteProduct} 
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Product
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}