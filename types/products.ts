// Product type definitions for the new 3-type system

export type ProductType = 'standard' | 'balance_builder' | 'pay_it_off' | 'one_time';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  product_type: ProductType;
  status?: 'active' | 'inactive';
  business_id?: string;
  created_at?: string;
  currency?: string;
  business?: {
    name: string;
    description?: string;
  };
}

export interface ProductWithSubscribers extends Product {
  subscriberCount: number;
}

export interface Subscription {
  id: string;
  user_id: string;
  product_id: string;
  status: 'active' | 'cancelled' | 'completed';
  start_date: string;
  created_at: string;
  total_paid?: number; // For pay_it_off products
  remaining_amount?: number; // For pay_it_off products
  payment_count?: number; // For pay_it_off products
  total_payments?: number; // For pay_it_off products
}

// Product type configurations with descriptions and UI hints
export const PRODUCT_TYPE_CONFIG = {
  standard: {
    label: 'Standard',
    description: 'Regular subscription with fixed price set by business owner',
    shortDescription: 'Fixed monthly price',
    icon: 'CreditCard',
    color: 'blue',
    requiresPrice: true,
    customerChoosesAmount: false,
    previewText: (price: number) => `£${price}/month`
  },
  balance_builder: {
    label: 'Balance Builder',
    description: 'Flexible amount chosen by customer to build up a balance over time',
    shortDescription: 'Customer chooses amount',
    icon: 'TrendingUp',
    color: 'green',
    requiresPrice: false,
    customerChoosesAmount: true,
    previewText: () => 'Choose your monthly amount'
  },
  pay_it_off: {
    label: 'Pay it off',
    description: 'Installment payment plan to pay off a larger amount over time',
    shortDescription: 'Installment payments',
    icon: 'Calendar',
    color: 'purple',
    requiresPrice: true, // Uses price for total amount
    customerChoosesAmount: false,
    previewText: (price: number) => `£${price} total (choose payment plan)`
  },
  one_time: {
    label: 'General Products',
    description: 'Single payment for immediate purchase - no recurring billing',
    shortDescription: 'One-off payment',
    icon: 'ShoppingCart',
    color: 'orange',
    requiresPrice: true,
    customerChoosesAmount: false,
    previewText: (price: number) => `£${price} (one-time)`
  }
} as const;

// Helper functions for product type handling
export const getProductTypeConfig = (type: ProductType) => PRODUCT_TYPE_CONFIG[type];

export const isCustomerAmountType = (type: ProductType): boolean => {
  return PRODUCT_TYPE_CONFIG[type].customerChoosesAmount;
};

export const requiresPrice = (type: ProductType): boolean => {
  return PRODUCT_TYPE_CONFIG[type].requiresPrice;
};

export const getPreviewText = (product: Product): string => {
  const config = getProductTypeConfig(product.product_type);
  return config.previewText(product.price);
};
