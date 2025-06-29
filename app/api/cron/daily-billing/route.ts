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
  console.log("Today's day of the month:", today);

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

  for (const record of scheduled) {
    try {
      const product = record.products;
      const business = product.businesses;
      const amountInPence = product.price * 100;

      const { data: customerData, error: customerError } = await supabase
        .from("stripe_customers")
        .select("stripe_customer_id")
        .eq("user_id", record.user_id)
        .single();

      if (customerError || !customerData) {
        console.error("Missing Stripe customer:", customerError);
        continue;
      }

      const customer = await stripe.customers.retrieve(
        customerData.stripe_customer_id
      ) as Stripe.Customer;

      const paymentMethodId = customer.invoice_settings?.default_payment_method;

      if (!paymentMethodId || typeof paymentMethodId !== "string") {
        console.warn("No default payment method found for customer:", customerData.stripe_customer_id);
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

      console.log(`PaymentIntent created: ${paymentIntent.id}`);
      console.log(`Successfully charged customer ${record.user_id}`);
    } catch (err) {
      console.error("Error processing payment for record:", record.id, err);
    }
  }

  return new NextResponse("Cron run complete", { status: 200 });
}
