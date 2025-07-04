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
  const todayAsDate = new Date(todayDate);
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
    .select("*, subscriptions(*), products(*, businesses(stripe_account_id))")
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
        skipReasons.push(`Missing Stripe account for business ${business.id}`);
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
        },
      });

      await supabase.from("payments").insert({
        user_id: record.user_id,
        purchase_id: record.purchase_id,
        stripe_invoice_id: paymentIntent.id,
        amount: product.price,
        status: "pending",
        created_at: new Date().toISOString(),
      });

      succeededCount++;
      console.log(`PaymentIntent created: ${paymentIntent.id}`);
      console.log(`Successfully charged customer ${record.user_id}`);
    } catch (err) {
      console.error("Error processing payment for record:", record.id, err);
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
  return new NextResponse("Cron run complete", { status: 200 });
}
