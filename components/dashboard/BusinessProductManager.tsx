"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';

interface ProductWithSubscribers {
  id: string;
  name: string;
  description: string;
  price: number;
  subscriberCount: number;
}

export default function BusinessProductManager({ businessId }: { businessId: string }) {
  const [products, setProducts] = useState<ProductWithSubscribers[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithSubscribers | null>(null);
  const [editForm, setEditForm] = useState<Partial<ProductWithSubscribers>>({});

  const openEditModal = (product: ProductWithSubscribers) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
    setEditForm({});
  };

  const updateEditForm = (field: keyof ProductWithSubscribers, value: string | number) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
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
      .select("id, name, description, price")
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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, name, description, price")
        .eq("business_id", businessId);

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
                    <h3 className="font-semibold text-lg text-foreground leading-tight flex-1 mr-3">
                      {product.name}
                    </h3>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      £{product.price.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex flex-col gap-2 pt-3 border-t border-border">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Subscribers</span>
                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {product.subscriberCount}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => openEditModal(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
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
                      <th className="px-4 py-3">Edit</th>
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
                          <Button size="sm" variant="outline" onClick={() => openEditModal(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </td>
                        <td className="px-4 py-3 font-medium">{product.name}</td>
                        <td className="px-4 py-3">{product.description}</td>
                        <td className="px-4 py-3 text-right">£{product.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">{product.subscriberCount}</td>
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
        </>
      )}
    </div>
  );
}