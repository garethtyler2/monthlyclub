import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDatabaseTables() {
  console.log('🔍 Checking database tables...\n');
  
  try {
    // Check if user_profiles table exists by trying to select from it
    try {
      const { data: userProfilesCheck, error: userProfilesError } = await supabase
        .from('user_profiles')
        .select('id')
        .limit(1);
      
      if (userProfilesError) {
        console.log('❌ user_profiles table error:', userProfilesError.message);
      } else {
        console.log('✅ user_profiles table exists and is accessible');
        console.log(`   Found ${userProfilesCheck?.length || 0} records`);
      }
    } catch (e) {
      console.log('❌ user_profiles table: Error checking');
    }
    
    // Try to get a list of all tables in the public schema
    console.log('\n📋 Checking for other relevant tables...');
    
    // Check businesses table
    try {
      const { data: businessesCheck, error: businessesError } = await supabase
        .from('businesses')
        .select('id')
        .limit(1);
      
      if (businessesError) {
        console.log('❌ businesses table:', businessesError.message);
      } else {
        console.log('✅ businesses table exists');
        console.log(`   Found ${businessesCheck?.length || 0} records`);
      }
    } catch (e) {
      console.log('❌ businesses table: Error checking');
    }
    
    // Check conversations table
    try {
      const { data: conversationsCheck, error: conversationsError } = await supabase
        .from('conversations')
        .select('id')
        .limit(1);
      
      if (conversationsError) {
        console.log('❌ conversations table:', conversationsError.message);
      } else {
        console.log('✅ conversations table exists');
        console.log(`   Found ${conversationsCheck?.length || 0} records`);
      }
    } catch (e) {
      console.log('❌ conversations table: Error checking');
    }
    
    // Check messages table
    try {
      const { data: messagesCheck, error: messagesError } = await supabase
        .from('messages')
        .select('id')
        .limit(1);
      
      if (messagesError) {
        console.log('❌ messages table:', messagesError.message);
      } else {
        console.log('✅ messages table exists');
        console.log(`   Found ${messagesCheck?.length || 0} records`);
      }
    } catch (e) {
      console.log('❌ messages table: Error checking');
    }
    
    // Check user_connections table
    try {
      const { data: connectionsCheck, error: connectionsError } = await supabase
        .from('user_connections')
        .select('id')
        .limit(1);
      
      if (connectionsError) {
        console.log('❌ user_connections table:', connectionsError.message);
      } else {
        console.log('✅ user_connections table exists');
        console.log(`   Found ${connectionsCheck?.length || 0} records`);
      }
    } catch (e) {
      console.log('❌ user_connections table: Error checking');
    }
    
    console.log('\n💡 If user_profiles table is missing, you need to create it first before adding triggers.');
    console.log('   Run the database schema creation script or check your Supabase dashboard.');
    
  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

// Run the check
checkDatabaseTables();
