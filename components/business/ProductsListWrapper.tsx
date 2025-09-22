"use client";

// This wrapper is needed to use a Client Component inside a Server Component
import ProductsList from "@/components/business/products-list";
import { Product } from "@/types/products";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface ProductsListWrapperProps {
  products: Product[];
  isOwner?: boolean;
}

export default function ProductsListWrapper({ products, isOwner = false }: ProductsListWrapperProps) {
  const { subscriptions } = useAuth();
  
  // Use subscriptions from AuthContext instead of server-side data
  const currentUserSubscriptions = subscriptions.map(sub => ({ product_id: sub.product_id }));
  
  return <ProductsList products={products} userSubscriptions={currentUserSubscriptions} isOwner={isOwner} />;
}
