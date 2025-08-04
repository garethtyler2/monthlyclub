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
import { Pencil, Plus, Info, Trash2 } from 'lucide-react';

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
    window.location.reload();
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

          if (countError) {
            console.error(`Error fetching subscriptions for product ${product.id}:`, countError);
          } else {
            console.log(`Subscription count for product ${product.id}:`, count);
          }

          return {
            ...product,
            subscriberCount: countError ? 0 : count || 0,
          };
        })
      );

      console.log("Final enriched products:", enrichedProducts);

      setProducts(enrichedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [businessId]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Products</h2>
        <Button onClick={openAddModal} className="hero-button-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground text-center">Loading products...</p>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-brand-blue/20 bg-gradient-to-br from-brand-blue/10 to-transparent shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 mr-3">
                      <div className="flex items-center gap-2 mb-1">
                        {product.is_credit_builder ? (
                          <span className="bg-gradient-to-r from-blue-500 to-emerald-900 text-white px-3 py-1 rounded-full font-semibold text-lg leading-tight">
                            {product.name}
                          </span>
                        ) : (
                          <h3 className="font-semibold text-lg text-foreground leading-tight">
                            {product.name}
                          </h3>
                        )}
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.is_credit_builder ? "Flexible" : `£${product.price.toFixed(2)}`}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex flex-col gap-2 pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {product.is_credit_builder ? 'Credit Builders' : 'Subscribers'}
                        </span>
                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {product.subscriberCount}
                        </div>
                      </div>
                                              <div className="flex gap-2">
                          {!product.is_credit_builder && (
                            <Button size="sm" variant="outline" onClick={() => openEditModal(product)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  {product.subscriberCount > 0 ? "Cannot Delete Product" : "Delete Product"}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  {product.subscriberCount > 0 ? (
                                    <div>
                                      <p>You cannot delete "{product.name}" because it has active {product.is_credit_builder ? 'credit builders' : 'subscribers'}.</p>
                                      <p className="mt-2 text-sm text-gray-600">
                                        Please either remove all users from this product or ask your users to cancel their subscriptions before this product can be deleted.
                                      </p>
                                    </div>
                                  ) : (
                                    <p>Are you sure you want to delete "{product.name}"? </p>
                                  )}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                {product.subscriberCount === 0 && (
                                  <AlertDialogAction onClick={() => openDeleteModal(product)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                )}
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                    </div>
                    <Button size="sm" variant="secondary" className="w-full" onClick={() => window.location.href = `/dashboard/products/${product.id}/manage-users`}>
                      Manage Users
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="bg-white/5 rounded-xl shadow-lg overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-white text-sm">
                  <thead className="bg-gradient-to-r from-brand-purple/10 to-transparent border-b border-brand-purple/20 text-white">
                    <tr>
                      <th className="px-4 py-3">Actions</th>
                      <th className="px-4 py-3 text-left font-semibold">Title</th>
                      <th className="px-4 py-3 text-left font-semibold">Description</th>
                      <th className="px-4 py-3 text-right font-semibold">Price</th>
                      <th className="px-4 py-3 text-right font-semibold">Subscribers</th>
                      <th className="px-4 py-3 text-center font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gradient-to-r from-brand-purple/5 to-transparent divide-y divide-brand-purple/10">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-brand-purple/10 transition-colors duration-200">
                        <td className="px-4 py-3 text-center">
                          <div className="flex gap-2 justify-center">
                            {!product.is_credit_builder && (
                              <Button size="sm" variant="outline" onClick={() => openEditModal(product)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    {product.subscriberCount > 0 ? "Cannot Delete Product" : "Delete Product"}
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {product.subscriberCount > 0 ? (
                                      <div>
                                        <p>You cannot delete "{product.name}" because it has active {product.is_credit_builder ? 'credit builders' : 'subscribers'}.</p>
                                        <p className="mt-2 text-sm text-gray-600">
                                          Please either remove all users from this product or ask your users to cancel their subscriptions before this product can be deleted.
                                        </p>
                                      </div>
                                    ) : (
                                      <p>Are you sure you want to delete "{product.name}"? </p>
                                    )}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  {product.subscriberCount === 0 && (
                                    <AlertDialogAction onClick={() => openDeleteModal(product)} className="bg-red-600 hover:bg-red-700">
                                      Delete
                                    </AlertDialogAction>
                                  )}
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-2">
                            {product.name}
                            
                          </div>
                        </td>
                        <td className="px-4 py-3">{product.description}</td>
                        <td className="px-4 py-3 text-right">
                          {product.is_credit_builder ? "Flexible" : `£${product.price.toFixed(2)}`}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {product.subscriberCount} {product.is_credit_builder ? 'builders' : 'subscribers'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex gap-2 justify-center">
                            <Button size="sm" variant="secondary" onClick={() => window.location.href = `/dashboard/products/${product.id}/manage-users`}>
                              Manage Users
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white">Name</label>
                  <Input
                    id="name"
                    value={editForm.name || ''}
                    onChange={(e) => updateEditForm('name', e.target.value)}
                    placeholder="Product name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-white">Description</label>
                  <Textarea
                    id="description"
                    value={editForm.description || ''}
                    onChange={(e) => updateEditForm('description', e.target.value)}
                    placeholder="Product description"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium text-white">Price (£)</label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={editForm.price || ''}
                    onChange={(e) => updateEditForm('price', parseFloat(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeEditModal}>
                  Cancel
                </Button>
                <Button className="hero-button-primary" onClick={saveChanges}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add New Product Modal */}
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="add-name" className="text-sm font-medium text-white">Name</label>
                  <Input
                    id="add-name"
                    value={addForm.name || ''}
                    onChange={(e) => updateAddForm('name', e.target.value)}
                    placeholder="Product name"
                    disabled={addForm.is_credit_builder}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="add-description" className="text-sm font-medium text-white">Description</label>
                  <Textarea
                    id="add-description"
                    value={addForm.description || ''}
                    onChange={(e) => updateAddForm('description', e.target.value)}
                    placeholder="Product description"
                    className="min-h-[100px]"
                    disabled={addForm.is_credit_builder}
                  />
                </div>
                {!addForm.is_credit_builder && (
                  <div className="space-y-2">
                    <label htmlFor="add-price" className="text-sm font-medium text-white">Price (£)</label>
                    <Input
                      id="add-price"
                      type="number"
                      step="0.01"
                      value={addForm.price || ''}
                      onChange={(e) => updateAddForm('price', parseFloat(e.target.value))}
                      placeholder="0.00"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="add-credit-builder"
                    checked={addForm.is_credit_builder || false}
                    onCheckedChange={(checked) => updateAddForm("is_credit_builder", checked)}
                    className="text-white"
                  />
                  <label htmlFor="add-credit-builder" className="text-sm text-white">
                    Enable Credit Builder Mode
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Info className="w-4 h-4 text-gray-400" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Credit Builder</h4>
                        <p className="text-sm text-gray-600">
                          Allow customers to build up credit over time that they can use on any of your services. 
                          Customers choose how much they want to add each month, and you can charge against their balance.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={closeAddModal}>
                  Cancel
                </Button>
                <Button className="hero-button-primary" onClick={saveNewProduct}>
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Modal */}
          <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                  Please confirm you want to delete "{productToDelete?.name}". This will remove it from your business page and cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDeleteModal}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteProduct} className="bg-red-600 hover:bg-red-700">
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