

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("stripe_account_id")
    .eq("user_id", user.id)
    .single();

  if (businessError || !business?.stripe_account_id) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  try {
    const payouts = await stripe.payouts.list(
      { limit: 100 },
      { stripeAccount: business.stripe_account_id }
    );

    const recentlyPaidButPending = payouts.data
      .filter(p => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0);

    return NextResponse.json({
      recentlyPaidButPending,
    });
  } catch (err) {
    console.error("Stripe API error:", err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}