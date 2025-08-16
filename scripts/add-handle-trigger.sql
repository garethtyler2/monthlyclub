-- Add trigger to automatically generate handles for new users
-- This trigger will fire when a new user_profile is inserted

-- First, create the function that generates the handle
CREATE OR REPLACE FUNCTION generate_user_handle()
RETURNS TRIGGER AS $$
DECLARE
  email_prefix TEXT;
  random_suffix TEXT;
  new_handle TEXT;
  counter INTEGER := 1;
BEGIN
  -- Extract email prefix (everything before @)
  email_prefix := split_part(NEW.email, '@', 1);
  
  -- Generate random suffix (6 characters)
  random_suffix := substr(md5(random()::text), 1, 6);
  
  -- Create initial handle
  new_handle := email_prefix || '_' || random_suffix;
  
  -- Keep trying until we find a unique handle
  WHILE EXISTS (SELECT 1 FROM user_profiles WHERE handle = new_handle) LOOP
    random_suffix := substr(md5(random()::text), 1, 6);
    new_handle := email_prefix || '_' || random_suffix;
    counter := counter + 1;
    
    -- Prevent infinite loop (shouldn't happen in practice)
    IF counter > 100 THEN
      RAISE EXCEPTION 'Could not generate unique handle after 100 attempts';
    END IF;
  END LOOP;
  
  -- Set the handle
  NEW.handle := new_handle;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'trigger_generate_user_handle'
  ) THEN
    CREATE TRIGGER trigger_generate_user_handle
      BEFORE INSERT ON user_profiles
      FOR EACH ROW
      WHEN (NEW.handle IS NULL)
      EXECUTE FUNCTION generate_user_handle();
    RAISE NOTICE 'Trigger trigger_generate_user_handle created successfully';
  ELSE
    RAISE NOTICE 'Trigger trigger_generate_user_handle already exists, skipping...';
  END IF;
END $$;

-- Also create a trigger for when users sign up via Supabase Auth
-- This will create the user_profile record automatically
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, created_at)
  VALUES (NEW.id, NEW.email, NEW.created_at);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
    RAISE NOTICE 'Trigger on_auth_user_created created successfully';
  ELSE
    RAISE NOTICE 'Trigger on_auth_user_created already exists, skipping...';
  END IF;
END $$;
