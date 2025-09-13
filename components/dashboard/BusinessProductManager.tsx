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
  Building2, 
  CreditCard, 
  Sparkles,
  TrendingUp,
  Settings,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  PoundSterling,
  Calendar,
  ShoppingCart
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ProductWithSubscribers, ProductType, getProductTypeConfig, requiresPrice } from '@/types/products';
import ProductTypeSelector from '@/components/shared/ProductTypeSelector';
import MultiStepProductCreator from '@/components/shared/MultiStepProductCreator';
import { cn } from '@/lib/utils';

// ProductWithSubscribers interface is now imported from types/products.ts

export default function BusinessProductManager({ businessId }: { businessId: string }) {
  const [products, setProducts] = useState<ProductWithSubscribers[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithSubscribers | null>(null);
  const [editForm, setEditForm] = useState<Partial<ProductWithSubscribers>>({});

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
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


  const saveChanges = async () => {
    if (!editingProduct || !editForm.name || !editForm.description) {
      return;
    }

    // For balance builder products, don't update price
    const updateData: any = {
      name: editForm.name,
      description: editForm.description,
    };

    // Only include price for non-balance-builder products
    if (editingProduct.product_type !== 'balance_builder' && editForm.price !== undefined) {
      updateData.price = editForm.price;
    }

    const { error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", editingProduct.id);

    if (error) {
      console.error("Failed to update product:", error);
      return;
    }

    // Re-fetch the products to show updated values
    setLoading(true);
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("id, name, description, price, product_type, status")
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

  const handleCreateProduct = async (productData: any) => {
    const { error } = await supabase
      .from("products")
      .insert({
        business_id: businessId,
        name: productData.name,
        description: productData.description,
        price: productData.price || 0,
        product_type: productData.product_type,
        status: 'active',
      });

    if (error) {
      console.error("Failed to create product:", error);
      throw error;
    }

    // Re-fetch products to show the new one
    const { data: fetchedProducts, error: productError } = await supabase
      .from("products")
      .select("id, name, description, price, product_type, status")
      .eq("business_id", businessId);

    if (productError) {
      console.error("Failed to fetch products:", productError);
      throw productError;
    }

    const enrichedProducts = await Promise.all(
      (fetchedProducts || []).map(async (product: any) => {
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
        .select("id, name, description, price, product_type, status")
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
    if (product.product_type === 'balance_builder') return sum;
    return sum + (product.price * product.subscriberCount);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Your Products</h2>
          <p className="text-sm text-muted-foreground">Manage your products</p>
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
                        {product.product_type === 'balance_builder' ? (
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        ) : product.product_type === 'pay_it_off' ? (
                          <Calendar className="w-5 h-5 text-purple-400" />
                        ) : product.product_type === 'one_time' ? (
                          <ShoppingCart className="w-5 h-5 text-orange-400" />
                        ) : (
                          <CreditCard className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white capitalize">{product.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={cn(
                            "text-xs",
                            product.product_type === 'balance_builder' && "bg-green-500/20 text-green-400 border-green-500/30",
                            product.product_type === 'pay_it_off' && "bg-purple-500/20 text-purple-400 border-purple-500/30",
                            product.product_type === 'standard' && "bg-blue-500/20 text-blue-400 border-blue-500/30",
                            product.product_type === 'one_time' && "bg-orange-500/20 text-orange-400 border-orange-500/30"
                          )}>
                            {getProductTypeConfig(product.product_type).label}
                          </Badge>
                        </div>
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
                    {product.product_type === 'balance_builder' ? (
                      <div className="flex items-center space-x-2">
                        <PoundSterling className="w-4 h-4 text-green-400" />
                        <span className="text-lg font-bold text-green-300">Flexible Pricing</span>
                      </div>
                    ) : product.product_type === 'pay_it_off' ? (
                      <div className="flex items-center space-x-2">
                        <PoundSterling className="w-4 h-4 text-purple-400" />
                        <div>
                          <span className="text-lg font-bold text-purple-300">£{product.price?.toFixed(2)} total</span>
                          <p className="text-sm text-purple-200">Customer chooses payment plan</p>
                        </div>
                      </div>
                    ) : product.product_type === 'one_time' ? (
                      <div className="flex items-center space-x-2">
                        <PoundSterling className="w-4 h-4 text-orange-400" />
                        <span className="text-lg font-bold text-orange-300">£{product.price?.toFixed(2)} one-time</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <PoundSterling className="w-4 h-4 text-blue-400" />
                        <span className="text-lg font-bold text-blue-300">£{product.price.toFixed(2)}/month</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {product.product_type === 'balance_builder' ? 'Builders' : 'Subscribers'}
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
                      onClick={() => openEditModal(product)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    
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
                                <p>You cannot delete "{product.name}" because it has active {product.product_type === 'balance_builder' ? 'builders' : 'subscribers'}.</p>
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
                {editingProduct?.product_type !== 'balance_builder' && (
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium text-white">
                      {editingProduct?.product_type === 'pay_it_off' ? 'Total Amount (£)' : 'Price (£)'}
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={editForm.price || ''}
                      onChange={(e) => updateEditForm('price', parseFloat(e.target.value))}
                      placeholder="0.00"
                      className="bg-white/5 border-white/10 text-white"
                    />
                    {editingProduct?.product_type === 'pay_it_off' && (
                      <p className="text-xs text-gray-400">
                        Customers will choose how many months to pay this off over
                      </p>
                    )}
                  </div>
                )}
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
          <MultiStepProductCreator
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            onSubmit={handleCreateProduct}
          />

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