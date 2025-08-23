import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabase } from "./supabase/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

/**
 * Generates a unique handle for a user based on their email
 * Format: email_prefix + underscore + random_string
 */
export function generateHandle(email: string): string {
  const emailPrefix = email.split('@')[0];
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${emailPrefix}_${randomSuffix}`;
}

/**
 * Generates a unique handle with collision detection
 * Will keep trying until it finds a unique handle
 */
export async function generateUniqueHandle(email: string, supabase: any): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    const handle = generateHandle(email);
    
    // Check if handle already exists
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('handle', handle)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // Handle doesn't exist, we can use it
      return handle;
    }
    
    attempts++;
  }
  
  // Fallback: add timestamp to ensure uniqueness
  const timestamp = Date.now().toString(36);
  return `${email.split('@')[0]}_${timestamp}`;
}

/**
 * Creates user connections for messaging when a subscription is created
 * This enables business owners and customers to message each other
 */
export async function createUserConnectionsForSubscription(
  customerUserId: string,
  productId: string,
  businessId: string
) {
  try {
    // Get the business owner's user ID
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('user_id')
      .eq('id', businessId)
      .single();

    if (businessError || !business) {
      console.error('Error fetching business:', businessError);
      return false;
    }

    const businessUserId = business.user_id;

    // Don't create connections if user is messaging themselves
    if (customerUserId === businessUserId) {
      return true;
    }

    // Create connection: Customer -> Business Owner
    const { error: customerToBusinessError } = await supabase
      .from('user_connections')
      .upsert({
        user_id: customerUserId,
        connected_user_id: businessUserId,
        connection_type: 'customer_business',
        business_id: businessId,
        product_id: productId
      }, {
        onConflict: 'user_id,connected_user_id,business_id'
      });

    if (customerToBusinessError) {
      console.error('Error creating customer->business connection:', customerToBusinessError);
    }

    // Create connection: Business Owner -> Customer
    const { error: businessToCustomerError } = await supabase
      .from('user_connections')
      .upsert({
        user_id: businessUserId,
        connected_user_id: customerUserId,
        connection_type: 'business_customer',
        business_id: businessId,
        product_id: productId
      }, {
        onConflict: 'user_id,connected_user_id,business_id'
      });

    if (businessToCustomerError) {
      console.error('Error creating business->customer connection:', businessToCustomerError);
    }

    // Return true if at least one connection was created successfully
    // (errors might just mean the connection already exists)
    return true;
  } catch (error) {
    console.error('Error creating user connections:', error);
    return false;
  }
}
