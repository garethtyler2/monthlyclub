import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  const body = Buffer.from(await req.arrayBuffer());
  const sig = req.headers.get("stripe-signature") as string;
  
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

    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
        auth: { persistSession: false, autoRefreshToken: false },
        }
    );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string | undefined;

    const metadata = session.metadata || {};
    const productId = metadata.product_id;
    const userId = metadata.user_id;
    const paymentDay = metadata.preferred_payment_day;
    const customerReference = metadata.customer_reference;

    if (!productId || !userId || !customerId) {
      console.error("Missing metadata in session");
      return new NextResponse("Bad Request", { status: 400 });
    }

    // 1. Attach the saved payment method to the customer and set as default
    if (session.setup_intent) {
      console.log("Webhook: setup_intent ID in session", session.setup_intent);

      try {
        const setupIntent = await stripe.setupIntents.retrieve(
          session.setup_intent as string
        );

        console.log("Webhook: retrieved setup intent", setupIntent.id);
        console.log("Webhook: payment method on intent", setupIntent.payment_method);

        if (setupIntent.payment_method) {
          await stripe.customers.update(customerId, {
            invoice_settings: {
              default_payment_method: setupIntent.payment_method as string,
            },
          });
          console.log("Webhook: default payment method set on customer");
        } else {
          console.warn("No payment method found on setup intent:", setupIntent.id);
        }
      } catch (err) {
        console.error("Failed to retrieve or update setup intent:", err);
      }
    }

    // Insert into subscriptions
    const { data: purchase, error: purchaseError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: userId,
        product_id: productId,
        status: "active",
        start_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (purchaseError) {
      console.error("Failed to insert into subscriptions:", purchaseError);
      return new NextResponse("Database Error", { status: 500 });
    }

    // Insert into scheduled_payments
    // Fetch product price
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("price, business_id")
      .eq("id", productId)
      .single();
      if (productError || !product) {
        return NextResponse.json({ error: "Product not found" }, { status: 400 });
        }
    const businessId = product.business_id;
    const { error: scheduleError } = await supabase
      .from("scheduled_payments")
      .insert({
        user_id: userId,
        product_id: productId,
        business_id: businessId,
        purchase_id: purchase.id,
        scheduled_for: parseInt(paymentDay),
        status: "active",
        amount: product.price * 100,
        customer_reference: customerReference,
        created_at: new Date().toISOString(),
      });

    if (scheduleError) {
      console.error("Failed to insert into scheduled_payments:", scheduleError);
      return new NextResponse("Database Error", { status: 500 });
    }

    return new NextResponse("Success", { status: 200 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;

    const metadata = intent.metadata || {};
    const subscriptionId = metadata.subscription_id;
    const userId = metadata.user_id;
    const productId = metadata.product_id;

    if (!subscriptionId || !userId || !productId) {
      console.error("Missing metadata in payment intent");
      return new NextResponse("Bad Request", { status: 400 });
    }

    const { error: paymentError } = await supabase.from("payments").insert({
      user_id: userId,
      product_id: productId,
      subscription_id: subscriptionId,
      amount: intent.amount,
      currency: intent.currency,
      stripe_payment_intent_id: intent.id,
      status: "succeeded",
      paid_at: new Date().toISOString(),
    });

    if (paymentError) {
      console.error("Failed to insert into payments:", paymentError);
      return new NextResponse("Database Error", { status: 500 });
    }

    console.log("Payment recorded successfully for PaymentIntent:", intent.id);
    return new NextResponse("Payment recorded", { status: 200 });
  }

  return new NextResponse("Event received", { status: 200 });
}