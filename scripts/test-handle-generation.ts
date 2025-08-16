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

async function testHandleGeneration() {
  console.log('🧪 Testing handle generation...');
  
  try {
    console.log('📋 Checking user profiles for handles...\n');
    
    // Check recent user profiles to see if they have handles
    const { data: recentProfiles, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, email, handle, created_at')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (profileError) {
      console.error('❌ Error fetching recent profiles:', profileError);
      return;
    }
    
    console.log('📊 Recent user profiles:');
    recentProfiles?.forEach(profile => {
      const hasHandle = profile.handle ? '✅' : '❌';
      const date = new Date(profile.created_at).toLocaleDateString();
      console.log(`${hasHandle} ${profile.email} - Handle: ${profile.handle || 'MISSING'} (${date})`);
    });
    
    // Check for profiles without handles
    const { data: profilesWithoutHandles, error: missingError } = await supabase
      .from('user_profiles')
      .select('id, email, created_at')
      .is('handle', null);
    
    if (missingError) {
      console.error('❌ Error checking for missing handles:', missingError);
      return;
    }
    
    if (profilesWithoutHandles && profilesWithoutHandles.length > 0) {
      console.log(`\n⚠️  Found ${profilesWithoutHandles.length} profiles without handles:`);
      profilesWithoutHandles.forEach(profile => {
        const date = new Date(profile.created_at).toLocaleDateString();
        console.log(`   - ${profile.email} (${date})`);
      });
      console.log('\n💡 Run "npm run generate-handles" to fix existing users');
    } else {
      console.log('\n✅ All user profiles have handles!');
    }
    
    // Check total count
    const { count: totalProfiles } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact' });
    
    console.log(`\n📈 Total user profiles: ${totalProfiles || 0}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testHandleGeneration();
