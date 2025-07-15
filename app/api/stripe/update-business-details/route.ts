

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET() {
  const supabase = await createClient();

  // 1. Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
  }

  // 2. Look up connected account from Supabase
  const { data: business, error } = await supabase
    .from("businesses")
    .select("stripe_account_id")
    .eq("user_id", user.id)
    .single();

  if (error || !business?.stripe_account_id) {
    console.error("No Stripe account found for user:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
  }

  try {
    // Simulate identity document upload in test mode
    if (process.env.NODE_ENV === "development") {
      try {
        await stripe.accounts.update(business.stripe_account_id, {
          individual: {
            verification: {
              document: {
                front: 'file_identity_document_success', // Simulated upload
              },
            },
          },
        });
        console.log("✅ Simulated document upload for test environment");
      } catch (uploadError) {
        console.warn("⚠️ Failed to simulate document upload:", uploadError);
      }
    }

    // 3. Retrieve account and create account link to update business info

    const accountLink = await stripe.accountLinks.create({
      account: business.stripe_account_id,
      refresh_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      type: "account_onboarding",
        collection_options: {
            fields: "eventually_due",
            },
    });

    return NextResponse.redirect(accountLink.url);
  } catch (err) {
    console.error("Stripe account link creation failed:", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
  }
}