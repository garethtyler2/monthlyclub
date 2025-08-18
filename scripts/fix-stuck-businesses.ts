import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please check your .env.local file.');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('Missing STRIPE_SECRET_KEY environment variable. Please check your .env.local file.');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-05-28.basil',
});

async function fixStuckBusinesses() {
  console.log('🔍 Checking for businesses stuck in pre-stripe status...');

  try {
    // Get all businesses with 'pre-stripe' status
    const { data: stuckBusinesses, error } = await supabase
      .from('businesses')
      .select('id, name, stripe_account_id, status')
      .eq('status', 'pre-stripe');

    if (error) {
      console.error('❌ Error fetching stuck businesses:', error);
      return;
    }

    if (!stuckBusinesses || stuckBusinesses.length === 0) {
      console.log('✅ No businesses found with pre-stripe status');
      return;
    }

    console.log(`📋 Found ${stuckBusinesses.length} businesses with pre-stripe status`);

    for (const business of stuckBusinesses) {
      if (!business.stripe_account_id) {
        console.log(`⚠️  Business "${business.name}" has no Stripe account ID`);
        continue;
      }

      try {
        console.log(`🔍 Checking Stripe account ${business.stripe_account_id} for business "${business.name}"...`);
        
        // Check Stripe account status
        const account = await stripe.accounts.retrieve(business.stripe_account_id);
        
        console.log(`📊 Account details:`, {
          id: account.id,
          details_submitted: account.details_submitted,
          charges_enabled: account.charges_enabled,
          payouts_enabled: account.payouts_enabled,
          requirements: account.requirements?.currently_due?.length || 0
        });

        // Check if account is fully onboarded
        if (account.details_submitted && account.charges_enabled) {
          console.log(`✅ Business "${business.name}" is fully onboarded, updating status to 'active'...`);
          
          const { error: updateError } = await supabase
            .from('businesses')
            .update({ status: 'active' })
            .eq('id', business.id);

          if (updateError) {
            console.error(`❌ Failed to update business "${business.name}":`, updateError);
          } else {
            console.log(`✅ Successfully updated business "${business.name}" to active status`);
          }
        } else {
          console.log(`⏳ Business "${business.name}" is not fully onboarded yet`);
          if (account.requirements?.currently_due && account.requirements.currently_due.length > 0) {
            console.log(`📝 Still needs to complete: ${account.requirements.currently_due.join(', ')}`);
          }
        }
      } catch (stripeError) {
        console.error(`❌ Error checking Stripe account for business "${business.name}":`, stripeError);
      }
    }

    console.log('✅ Finished checking all stuck businesses');
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the script
fixStuckBusinesses()
  .then(() => {
    console.log('🎉 Script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
