import { createClient } from '@supabase/supabase-js';
import { generateUniqueHandle } from '../lib/utils';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// This script generates handles for existing users
// Run with: npx tsx scripts/generate-handles.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function generateHandlesForExistingUsers() {
  console.log('Starting handle generation for existing users...');
  
  try {
    // Get all users without handles
    const { data: usersWithoutHandles, error: fetchError } = await supabase
      .from('user_profiles')
      .select('id, email')
      .is('handle', null);
    
    if (fetchError) {
      console.error('Error fetching users:', fetchError);
      return;
    }
    
    console.log(`Found ${usersWithoutHandles?.length || 0} users without handles`);
    
    if (!usersWithoutHandles || usersWithoutHandles.length === 0) {
      console.log('All users already have handles!');
      return;
    }
    
    // Generate and update handles
    for (const user of usersWithoutHandles) {
      if (!user.email) {
        console.log(`Skipping user ${user.id} - no email`);
        continue;
      }
      
      try {
        const handle = await generateUniqueHandle(user.email, supabase);
        
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ handle })
          .eq('id', user.id);
        
        if (updateError) {
          console.error(`Error updating user ${user.id}:`, updateError);
        } else {
          console.log(`Generated handle "${handle}" for user ${user.id}`);
        }
      } catch (error) {
        console.error(`Error processing user ${user.id}:`, error);
      }
    }
    
    console.log('Handle generation complete!');
    
  } catch (error) {
    console.error('Script failed:', error);
  }
}

// Run the script
generateHandlesForExistingUsers();
