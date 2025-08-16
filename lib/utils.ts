import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
