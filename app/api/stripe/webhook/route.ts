


import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  const supabase = await createClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string | undefined;

    const metadata = session.metadata || {};
    const productId = metadata.product_id;
    const userId = metadata.user_id;
    const paymentDay = metadata.payment_day;
    const customerReference = metadata.customer_reference;

    if (!productId || !userId || !customerId) {
      console.error("Missing metadata in session");
      return new NextResponse("Bad Request", { status: 400 });
    }

    // Insert into purchases
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        user_id: userId,
        product_id: productId,
        stripe_subscription_id: subscriptionId || null,
        stripe_payment_intent_id: session.payment_intent as string | null,
        status: "active",
        start_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (purchaseError) {
      console.error("Failed to insert into purchases:", purchaseError);
      return new NextResponse("Database Error", { status: 500 });
    }

    // Insert into scheduled_payments
    const { error: scheduleError } = await supabase
      .from("scheduled_payments")
      .insert({
        user_id: userId,
        product_id: productId,
        purchase_id: purchase.id,
        payment_day: parseInt(paymentDay),
        status: "scheduled",
        customer_reference: customerReference,
        created_at: new Date().toISOString(),
      });

    if (scheduleError) {
      console.error("Failed to insert into scheduled_payments:", scheduleError);
      return new NextResponse("Database Error", { status: 500 });
    }

    return new NextResponse("Success", { status: 200 });
  }

  return new NextResponse("Event received", { status: 200 });
}