"use client";

// This wrapper is needed to use a Client Component inside a Server Component
import ProductsList from "@/components/business/products-list";
import { Product } from "@/types/products";

interface ProductsListWrapperProps {
  products: Product[];
  userSubscriptions: { product_id: string }[];
  isOwner?: boolean;
}

export default function ProductsListWrapper({ products, userSubscriptions, isOwner = false }: ProductsListWrapperProps) {
  return <ProductsList products={products} userSubscriptions={userSubscriptions} isOwner={isOwner} />;
}
