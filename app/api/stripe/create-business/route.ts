import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

// Check if we're in development and using live mode
const isDevelopment = process.env.NODE_ENV === "development";
const isLiveMode = process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_");

if (isDevelopment && isLiveMode) {
  console.warn("⚠️ Warning: Using live Stripe key in development mode. This may cause issues.");
}
console.log("🚀 API route hit");
export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  const {
    data: { user },
    error: userFetchError,
  } = await supabase.auth.getUser(token);

  console.log("🔍 user:", user);
  console.log("❗ userFetchError:", userFetchError);

  if (!user || userFetchError) {
    return NextResponse.json({ error: "Unauthorized or failed to fetch user" }, { status: 401 });
  }

  const body = await req.json();
  const accountType = body?.business_type ?? "individual"; // default to individual

  const userId = user.id;
  const email = user.email;

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
        business_type: accountType,
        ...(accountType === "individual"
          ? { individual: { email: email || undefined } }
          : { company: {} }),
        capabilities: {
          transfers: { requested: true },
          card_payments: { requested: true },
        },
        business_profile: {
          url: `https://www.monthlyclubhq.com/businesses/${business.slug}`,
        },
      });
      console.log("✅ Stripe account created:", account.id);
    } catch (err) {
      console.error("❌ Stripe account creation failed:", err);
      
      // Check if it's a live mode error
      if (err instanceof Error && err.message.includes("Livemode requests must always be redirected via HTTPS")) {
        return NextResponse.json({ 
          error: "Development environment detected. Please use Stripe test keys for development." 
        }, { status: 500 });
      }
      
      return NextResponse.json({ error: "Stripe account creation failed" }, { status: 500 });
    }

    accountId = account.id;

    const { error: updateError } = await supabase
      .from("businesses")
      .update({ stripe_account_id: accountId, business_type: accountType })
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
        collection_options: {
            fields: "eventually_due",
            },
  });

  console.log("🔗 Stripe onboarding link created:", accountLink.url);

  return NextResponse.json({ url: accountLink.url });
}