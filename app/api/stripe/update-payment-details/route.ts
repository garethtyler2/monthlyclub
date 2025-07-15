import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
  }

  // Get Stripe customer
  const { data: customerData } = await supabase
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!customerData?.stripe_customer_id) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
  }

  const stripeCustomer = await stripe.customers.retrieve(customerData.stripe_customer_id);

  if ("deleted" in stripeCustomer && stripeCustomer.deleted) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      customer: customerData.stripe_customer_id,
      currency: "gbp",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscription/payment-details-updated`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    });

    return NextResponse.redirect(session.url ?? `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
  } catch (err) {
    console.error("Stripe setup session creation failed:", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
  }
}