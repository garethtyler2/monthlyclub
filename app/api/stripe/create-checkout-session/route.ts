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

  // 4. Create Stripe Checkout session (payment mode)
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

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 400 });
  }
}
