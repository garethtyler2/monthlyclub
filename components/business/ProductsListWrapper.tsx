"use client";

// This wrapper is needed to use a Client Component inside a Server Component
import ProductsList from "@/components/business/products-list";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductsListWrapperProps {
  products: Product[];
  userSubscriptions: { product_id: string }[];
  isOwner?: boolean;
}

export default function ProductsListWrapper({ products, userSubscriptions, isOwner = false }: ProductsListWrapperProps) {
  return <ProductsList products={products} userSubscriptions={userSubscriptions} isOwner={isOwner} />;
}
