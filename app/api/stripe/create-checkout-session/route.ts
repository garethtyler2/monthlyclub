import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: Request) {
  const supabase = await createClient();

  const { productId, reference, preferredPaymentDay } = await request.json();

  // 1. Get product info from Supabase
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*, business:businesses(stripe_account_id)")
    .eq("id", productId)
    .single();

  if (productError || !product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // 2. Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. Get or create Stripe customer for the logged in user
  let { data: customerData } = await supabase
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!customerData) {
    const customer = await stripe.customers.create({
      email: user.email || undefined,
    });

    const { error: insertError } = await supabase
      .from("stripe_customers")
      .insert({ user_id: user.id, stripe_customer_id: customer.id });

    if (insertError) {
      return NextResponse.json({ error: "Error saving customer" }, { status: 500 });
    }

    customerData = { stripe_customer_id: customer.id };
  }

  // 4. Check if customer has a default payment method
  const stripeCustomer = await stripe.customers.retrieve(customerData.stripe_customer_id);

  if ('deleted' in stripeCustomer && stripeCustomer.deleted) {
    return NextResponse.json({ error: "Customer was deleted in Stripe" }, { status: 400 });
  }

  const defaultPaymentMethod = (stripeCustomer as Stripe.Customer).invoice_settings?.default_payment_method;

  if (defaultPaymentMethod) {
    const confirmUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/subscription/confirm`);
    confirmUrl.searchParams.set("productId", productId);
    confirmUrl.searchParams.set("reference", reference);
    confirmUrl.searchParams.set("preferredPaymentDay", preferredPaymentDay);

    return NextResponse.json({ url: confirmUrl.toString() }, { status: 200 });
  }

  // 5. Create Stripe Checkout session (payment mode)
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      customer: customerData.stripe_customer_id,
      currency: "gbp",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      metadata: {
        user_id: user.id,
        business_id: product.business.stripe_account_id,
        product_id: product.id,
        customer_reference: reference,
        preferred_payment_day: preferredPaymentDay,
      },
    });

    // Insert into subscriptions
    const { data: userProfile, error: profileError } = await supabase
      .from("user_profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Failed to fetch user profile:", profileError);
    }

    const { data: purchase, error: purchaseError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: user.id,
        product_id: product.id,
        status: "active",
        customer_reference: reference,
        start_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        email: userProfile?.email ?? null,
      })
      .select()
      .single();

    if (purchaseError) {
      console.error("Failed to insert into subscriptions:", purchaseError);
      return NextResponse.json({ error: "Failed to insert subscription" }, { status: 500 });
    }

    // Fetch business_id for the product directly from products table
    const { data: productInfo, error: productInfoError } = await supabase
      .from("products")
      .select("business_id")
      .eq("id", product.id)
      .single();

    if (productInfoError || !productInfo?.business_id) {
      return NextResponse.json({ error: "Failed to get business ID for product" }, { status: 400 });
    }

    const { error: scheduleError } = await supabase
      .from("scheduled_payments")
      .insert({
        user_id: user.id,
        product_id: product.id,
        business_id: productInfo.business_id,
        purchase_id: purchase.id,
        scheduled_for: parseInt(preferredPaymentDay),
        status: "active",
        amount: product.price * 100,
        customer_reference: reference,
        created_at: new Date().toISOString(),
      });

    if (scheduleError) {
      console.error("Failed to insert into scheduled_payments:", scheduleError);
      return NextResponse.json({ error: "Failed to insert scheduled payment" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 400 });
  }
}
