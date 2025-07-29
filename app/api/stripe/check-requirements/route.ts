

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: business, error } = await supabase
    .from("businesses")
    .select("stripe_account_id")
    .eq("user_id", user.id)
    .single();

  if (error || !business?.stripe_account_id) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  try {
    const account = await stripe.accounts.retrieve(business.stripe_account_id);
    const needsID =
      account.requirements?.currently_due?.includes("individual.verification.document") ||
      account.requirements?.currently_due?.includes("company.verification.document");

    return NextResponse.json({ needsID });
  } catch (err) {
    console.error("Error retrieving Stripe account:", err);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}