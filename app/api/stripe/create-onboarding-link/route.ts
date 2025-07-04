import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  const { userId } = await req.json();
  console.log("➡️ Received userId:", userId);

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const { data: business, error } = await supabase
    .from("businesses")
    .select("id, stripe_account_id, slug")
    .eq("user_id", userId)
    .single();

  console.log("📦 Supabase business data:", business);
  if (error) console.error("❌ Supabase fetch error:", error);

  if (error || !business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  let accountId = business.stripe_account_id;

  if (!accountId) {
    let account;
    try {
      account = await stripe.accounts.create({
        type: "express",
        capabilities: {
          transfers: { requested: true },
        },
        business_profile: {
          url: `https://www.monthlyclubhq.com/business/${business.slug}`,
        },
      });
      console.log("✅ Stripe account created:", account.id);
    } catch (err) {
      console.error("❌ Stripe account creation failed:", err);
      return NextResponse.json({ error: "Stripe account creation failed" }, { status: 500 });
    }

    accountId = account.id;

    const { error: updateError } = await supabase
      .from("businesses")
      .update({ stripe_account_id: accountId })
      .eq("id", business.id);

    if (updateError) {
      return NextResponse.json({ error: "Failed to update Stripe account ID" }, { status: 500 });
    }
  }

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;

  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${origin}/refresh`,
    return_url: `${origin}/stripe-business-setup-completion`,
    type: "account_onboarding",
  });

  console.log("🔗 Stripe onboarding link created:", accountLink.url);

  return NextResponse.json({ url: accountLink.url });
}