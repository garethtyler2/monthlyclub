-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.billing_run_details (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  run_date date NOT NULL,
  business_id uuid,
  user_id uuid,
  product_id uuid,
  subscription_id uuid,
  amount integer,
  fee integer,
  stripe_payment_intent_id text,
  status text,
  reason text,
  created_at timestamp without time zone DEFAULT now(),
  batch_id uuid,
  currency text NOT NULL DEFAULT 'gbp'::text,
  CONSTRAINT billing_run_details_pkey PRIMARY KEY (id)
);
CREATE TABLE public.business_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  business_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  link_url text CHECK (link_url IS NULL OR link_url ~ '^https?://'::text),
  image_url text,
  published boolean NOT NULL DEFAULT true,
  CONSTRAINT business_posts_pkey PRIMARY KEY (id),
  CONSTRAINT business_posts_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id)
);
CREATE TABLE public.businesses (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid UNIQUE,
  name text NOT NULL,
  description text,
  image_url text,
  service_type text,
  created_at timestamp without time zone DEFAULT now(),
  stripe_account_id text,
  slug text UNIQUE,
  stripe_verification_prompt_dismissed boolean DEFAULT false,
  business_type text,
  status text DEFAULT 'draft'::text,
  is_vip boolean DEFAULT false,
  currency text NOT NULL DEFAULT 'gbp'::text,
  CONSTRAINT businesses_pkey PRIMARY KEY (id),
  CONSTRAINT businesses_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.conversations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  participant1_id uuid NOT NULL,
  participant2_id uuid NOT NULL,
  last_message_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT conversations_pkey PRIMARY KEY (id),
  CONSTRAINT conversations_participant2_id_fkey FOREIGN KEY (participant2_id) REFERENCES public.user_profiles(id),
  CONSTRAINT conversations_participant1_id_fkey FOREIGN KEY (participant1_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.credit_transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  business_id uuid,
  amount integer NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['earned'::text, 'spent'::text, 'refund'::text])),
  description text,
  related_subscription_id uuid,
  related_payment_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT credit_transactions_pkey PRIMARY KEY (id),
  CONSTRAINT credit_transactions_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id),
  CONSTRAINT credit_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT credit_transactions_related_payment_id_fkey FOREIGN KEY (related_payment_id) REFERENCES public.payments(id),
  CONSTRAINT credit_transactions_related_subscription_id_fkey FOREIGN KEY (related_subscription_id) REFERENCES public.subscriptions(id)
);
CREATE TABLE public.daily_billing_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  run_date date NOT NULL DEFAULT CURRENT_DATE,
  run_time timestamp with time zone NOT NULL DEFAULT now(),
  payments_found integer NOT NULL,
  payments_succeeded integer NOT NULL,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  total_payments integer,
  total_succeeded integer,
  total_failed integer,
  total_amount bigint,
  total_fees bigint,
  run_started_at timestamp without time zone,
  run_ended_at timestamp without time zone,
  batch_id uuid DEFAULT gen_random_uuid(),
  CONSTRAINT daily_billing_logs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL,
  sender_id uuid NOT NULL,
  content text,
  message_type text NOT NULL DEFAULT 'text'::text CHECK (message_type = ANY (ARRAY['text'::text, 'image'::text])),
  image_url text,
  read_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  image_filename text,
  image_size integer,
  image_mime_type text,
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id),
  CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL,
  stripe_payment_intent_id text,
  amount integer NOT NULL,
  status text NOT NULL,
  paid_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  currency text,
  product_id uuid,
  user_id uuid,
  business_id uuid,
  CONSTRAINT payments_pkey PRIMARY KEY (id),
  CONSTRAINT payments_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id)
);
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  business_id uuid,
  name text,
  description text,
  price numeric,
  created_at timestamp without time zone DEFAULT now(),
  product_type text DEFAULT 'subscription'::text,
  status text DEFAULT 'active'::text,
  currency text,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id)
);
CREATE TABLE public.scheduled_payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  purchase_id uuid,
  user_id uuid,
  product_id uuid,
  business_id uuid,
  scheduled_for integer NOT NULL,
  status text NOT NULL DEFAULT 'pending'::text,
  attempt_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  customer_reference text,
  amount bigint NOT NULL DEFAULT 0,
  cancel_at timestamp without time zone,
  currency text NOT NULL DEFAULT 'gbp'::text,
  CONSTRAINT scheduled_payments_pkey PRIMARY KEY (id),
  CONSTRAINT scheduled_payments_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES public.subscriptions(id),
  CONSTRAINT scheduled_payments_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id),
  CONSTRAINT scheduled_payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT scheduled_payments_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.service_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL,
  product_id uuid NOT NULL,
  subscription_id uuid,
  user_id uuid NOT NULL,
  served_at timestamp with time zone NOT NULL DEFAULT now(),
  amount_charged integer,
  notes text,
  source text NOT NULL DEFAULT 'manual'::text CHECK (source = ANY (ARRAY['manual'::text, 'credit_charge'::text, 'other'::text])),
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT service_events_pkey PRIMARY KEY (id),
  CONSTRAINT service_events_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id),
  CONSTRAINT service_events_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id),
  CONSTRAINT service_events_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT service_events_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id),
  CONSTRAINT service_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.service_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  label text NOT NULL,
  is_custom boolean NOT NULL DEFAULT false,
  created_by_user_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT service_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.stripe_customers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  stripe_customer_id text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT stripe_customers_pkey PRIMARY KEY (id),
  CONSTRAINT stripe_customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'active'::text,
  start_date timestamp with time zone DEFAULT now(),
  cancel_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  customer_reference text,
  email text,
  total_paid numeric DEFAULT 0,
  remaining_amount numeric,
  payment_count integer DEFAULT 0,
  total_payments integer,
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT purchases_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT fk_subscriptions_user_id FOREIGN KEY (user_id) REFERENCES public.user_profiles(id),
  CONSTRAINT purchases_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.user_connections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  connected_user_id uuid NOT NULL,
  connection_type text NOT NULL CHECK (connection_type = ANY (ARRAY['business_customer'::text, 'customer_business'::text])),
  business_id uuid,
  product_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_connections_pkey PRIMARY KEY (id),
  CONSTRAINT user_connections_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id),
  CONSTRAINT user_connections_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id),
  CONSTRAINT user_connections_connected_user_id_fkey FOREIGN KEY (connected_user_id) REFERENCES public.user_profiles(id),
  CONSTRAINT user_connections_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_profiles(id)
);
CREATE TABLE public.user_credits (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  business_id uuid,
  balance integer NOT NULL DEFAULT 0,
  total_earned integer NOT NULL DEFAULT 0,
  total_spent integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_credits_pkey PRIMARY KEY (id),
  CONSTRAINT user_credits_business_id_fkey FOREIGN KEY (business_id) REFERENCES public.businesses(id),
  CONSTRAINT user_credits_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_profiles (
  id uuid NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  handle text UNIQUE,
  display_name text,
  avatar_url text,
  user_type text DEFAULT 'user'::text,
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);