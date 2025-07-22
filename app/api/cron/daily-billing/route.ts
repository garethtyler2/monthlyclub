import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function GET() {
  console.log("Billing cron started");

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );

  const today = new Date().getDate(); // e.g. 25
  const todayDate = new Date().toISOString().split("T")[0];

  console.log("Today's day of the month:", today);
  console.log("Checking for run_date:", todayDate);
  // Check if the cron has already run today
  const { data: alreadyRunToday,  error: checkError } = await supabase
    .from("daily_billing_logs")
    .select("id")
    .eq("run_date", todayDate)
    .limit(1)
    .single();
  console.log("alreadyRunToday data:", alreadyRunToday);
  console.log("alreadyRunToday error:", checkError);

  if (alreadyRunToday) {
    console.log("Cron already ran today, skipping execution.");
    return new NextResponse("Billing already processed today", { status: 200 });
  }

  const { data: scheduled, error: scheduledError } = await supabase
    .from("scheduled_payments")
    .select("*, subscriptions(*), products(*, businesses(id, stripe_account_id))")
    .eq("scheduled_for", today)
    .eq("status", "active");

  console.log(`Found ${scheduled?.length || 0} scheduled payments for today`);

  if (scheduledError) {
    console.error("Failed to fetch scheduled payments:", scheduledError);
    return new NextResponse("Error loading scheduled payments", { status: 500 });
  }

  let skippedCount = 0;
  let skipReasons: string[] = [];
  let succeededCount = 0;

  for (const record of scheduled) {
    try {
      const product = record.products;
      const business = product.businesses;

      if (!business?.stripe_account_id) {
        console.warn(`Missing Stripe account for business tied to product ${product.id}`);
        skippedCount++;
        skipReasons.push(`Missing Stripe account for business ${business?.id || "unknown"}`);
        continue;
      }

      const amountInPence = product.price * 100;

      const { data: customerData, error: customerError } = await supabase
        .from("stripe_customers")
        .select("stripe_customer_id")
        .eq("user_id", record.user_id)
        .single();

      if (customerError || !customerData) {
        console.error("Missing Stripe customer:", customerError);
        skippedCount++;
        skipReasons.push(`Missing Stripe customer for user ${record.user_id}`);
        continue;
      }

      const customer = await stripe.customers.retrieve(
        customerData.stripe_customer_id
      ) as Stripe.Customer;

      const paymentMethodId = customer.invoice_settings?.default_payment_method;

      if (!paymentMethodId || typeof paymentMethodId !== "string") {
        console.warn("No default payment method found for customer:", customerData.stripe_customer_id);
        skippedCount++;
        skipReasons.push(`No default payment method for customer ${customerData.stripe_customer_id}`);
        continue;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInPence,
        currency: "gbp",
        customer: customerData.stripe_customer_id,
        payment_method: paymentMethodId,
        off_session: true, // 🔥 critical
        confirm: true,    
        application_fee_amount: Math.floor(amountInPence * 0.015), // 1.5% fee
        transfer_data: {
          destination: business.stripe_account_id,
        },
        metadata: {
          subscription_id: record.purchase_id,
          product_id: product.id,
          user_id: record.user_id,
          business_id: business.id,
        },
      });
      console.log("Resolved business object:", record.products?.businesses);
      console.log("Resolved business_id:", record.products?.businesses?.id);

      const { error: insertSuccessError } = await supabase.from("payments").insert({
        user_id: record.user_id,
        product_id: product.id,
        subscription_id: record.subscriptions?.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        business_id: business.id,
        stripe_payment_intent_id: paymentIntent.id,
        status: "succeeded",
        paid_at: new Date().toISOString(),
      });
      if (insertSuccessError) {
        console.error("Failed to log successful payment:", insertSuccessError);
      }

      succeededCount++;
      console.log(`PaymentIntent created: ${paymentIntent.id}`);
      console.log(`Successfully charged customer ${record.user_id}`);
    } catch (err) {
      console.error("Error processing payment for record:", record.id, err);
      const { error: insertFailureError } = await supabase.from("payments").insert({
        user_id: record.user_id,
        product_id: record.products?.id,
        subscription_id: record.subscriptions?.id,
        amount: record.products?.price * 100,
        currency: "gbp",
        business_id: record.products?.businesses?.id,
        stripe_payment_intent_id: null,
        status: "failed",
        paid_at: new Date().toISOString(),
      });
      if (insertFailureError) {
        console.error("Failed to log failed payment:", insertFailureError);
      }
      skippedCount++;
      skipReasons.push(`Error processing payment for record ${record.id}`);
    }
  }

  const { error: logInsertError } = await supabase.from("daily_billing_logs").insert({
    run_date: todayDate,
    payments_found: scheduled?.length || 0,
    payments_succeeded: succeededCount,
    notes: `Daily billing cron executed. Skipped ${skippedCount} payments. ${skipReasons.join(" | ")}`,
  });
  if (logInsertError) {
    console.error("Failed to insert billing log:", logInsertError);
    }
  console.log(`Cron run summary: ${succeededCount} succeeded, ${skippedCount} skipped.`);
  return new NextResponse("Cron run complete", { status: 200 });
}
