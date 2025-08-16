import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// This script populates user_connections based on existing subscriptions
// Run with: npx tsx scripts/populate-connections.ts

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function populateUserConnections() {
  console.log('Starting to populate user connections...');
  
  try {
    // Get all subscriptions (active and cancelled)
    const { data: subscriptions, error: subError } = await supabase
      .from('subscriptions')
      .select(`
        id,
        user_id,
        product_id,
        status,
        products!inner (
          business_id,
          businesses!inner (
            id,
            user_id
          )
        )
      `);
    
    if (subError) {
      console.error('Error fetching subscriptions:', subError);
      return;
    }
    
    console.log(`Found ${subscriptions?.length || 0} subscriptions`);
    
    if (!subscriptions || subscriptions.length === 0) {
      console.log('No subscriptions found');
      return;
    }
    
    let connectionsCreated = 0;
    let connectionsSkipped = 0;
    
    for (const sub of subscriptions as any[]) {
      const customerUserId = sub.user_id;
      const businessUserId = sub.products.businesses.user_id;
      
      if (customerUserId === businessUserId) {
        console.log(`Skipping subscription ${sub.id} - user is messaging themselves`);
        connectionsSkipped++;
        continue;
      }
      
      try {
        // Create connection: Customer -> Business Owner
        const { error: customerToBusinessError } = await supabase
          .from('user_connections')
          .upsert({
            user_id: customerUserId,
            connected_user_id: businessUserId,
            connection_type: 'customer_business',
            business_id: sub.products.business_id,
            product_id: sub.product_id
          }, {
            onConflict: 'user_id,connected_user_id,business_id'
          });
        
        if (customerToBusinessError) {
          console.error(`Error creating customer->business connection:`, customerToBusinessError);
        } else {
          connectionsCreated++;
        }
        
        // Create connection: Business Owner -> Customer
        const { error: businessToCustomerError } = await supabase
          .from('user_connections')
          .upsert({
            user_id: businessUserId,
            connected_user_id: customerUserId,
            connection_type: 'business_customer',
            business_id: sub.products.business_id,
            product_id: sub.product_id
          }, {
            onConflict: 'user_id,connected_user_id,business_id'
          });
        
        if (businessToCustomerError) {
          console.error(`Error creating business->customer connection:`, businessToCustomerError);
        } else {
          connectionsCreated++;
        }
        
      } catch (error) {
        console.error(`Error processing subscription ${sub.id}:`, error);
      }
    }
    
    console.log(`Connection population complete!`);
    console.log(`Created: ${connectionsCreated} connections`);
    console.log(`Skipped: ${connectionsSkipped} connections`);
    
  } catch (error) {
    console.error('Script failed:', error);
  }
}

// Run the script
populateUserConnections();
