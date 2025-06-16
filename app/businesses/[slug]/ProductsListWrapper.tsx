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
}

export default function ProductsListWrapper({ products }: ProductsListWrapperProps) {
  return <ProductsList products={products} />;
}
