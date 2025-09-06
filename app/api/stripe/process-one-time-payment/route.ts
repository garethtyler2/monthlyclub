import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: Request) {
  const supabase = await createClient();

  const { productId, reference } = await request.json();

  // 1. Get product info from Supabase
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*, business:businesses(id, stripe_account_id)")
    .eq("id", productId)
    .single();

  if (productError || !product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // 2. Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. Get or create Stripe customer for the logged in user
  let { data: customerData } = await supabase
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!customerData) {
    const customer = await stripe.customers.create({
      email: user.email || undefined,
    });

    const { error: insertError } = await supabase
      .from("stripe_customers")
      .insert({ user_id: user.id, stripe_customer_id: customer.id });

    if (insertError) {
      return NextResponse.json({ error: "Error saving customer" }, { status: 500 });
    }

    customerData = { stripe_customer_id: customer.id };
  }

  // 4. Check if customer has a default payment method
  const stripeCustomer = await stripe.customers.retrieve(customerData.stripe_customer_id);

  if ('deleted' in stripeCustomer && stripeCustomer.deleted) {
    return NextResponse.json({ error: "Customer was deleted in Stripe" }, { status: 400 });
  }

  const defaultPaymentMethod = (stripeCustomer as Stripe.Customer).invoice_settings?.default_payment_method;

  if (!defaultPaymentMethod) {
    // Customer needs to set up payment method first
    const session = await stripe.checkout.sessions.create({
      mode: "setup",
      customer: customerData.stripe_customer_id,
      currency: "gbp",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/one-time-purchase/confirm?productId=${productId}&reference=${reference}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      metadata: {
        user_id: user.id,
        business_id: product.business.stripe_account_id,
        product_id: product.id,
        customer_reference: reference,
        purchase_type: 'one_time',
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  }

  // 5. Customer has payment method, process payment immediately
  try {
    const amountInPence = Math.round(product.price * 100);
    const applicationFee = Math.round(amountInPence * 0.029 + 20); // 2.9% + 20p

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPence,
      currency: "gbp",
      customer: customerData.stripe_customer_id,
      payment_method: defaultPaymentMethod as string,
      off_session: true,
      confirm: true,
      application_fee_amount: applicationFee,
      transfer_data: {
        destination: product.business.stripe_account_id,
      },
      metadata: {
        product_id: product.id,
        user_id: user.id,
        business_id: product.business.id,
        purchase_type: 'one_time',
        customer_reference: reference,
      },
    });

    // Check if payment was successful
    if (paymentIntent.status !== 'succeeded') {
      console.error("Payment intent not succeeded:", paymentIntent.status, paymentIntent.last_payment_error);
      return NextResponse.json({ 
        error: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}` 
      }, { status: 400 });
    }

    // 6. Record the payment in our database
    const { error: insertPaymentError } = await supabase.from("payments").insert({
      user_id: user.id,
      product_id: product.id,
      business_id: product.business.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      stripe_payment_intent_id: paymentIntent.id,
      status: "succeeded",
      paid_at: new Date().toISOString(),
      subscription_id: null, // One-time purchase, no subscription
    });

    if (insertPaymentError) {
      console.error("Failed to log payment:", insertPaymentError);
      console.error("Payment data that failed to insert:", {
        user_id: user.id,
        product_id: product.id,
        business_id: product.business.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        stripe_payment_intent_id: paymentIntent.id,
        status: "succeeded",
        paid_at: new Date().toISOString(),
        subscription_id: null
      });
      // Payment succeeded but failed to record - this is a critical issue
      // We should still redirect to success but log this error
      console.error("CRITICAL: Payment succeeded but failed to record in database");
    } else {
      console.log("Payment successfully recorded in database:", paymentIntent.id);
    }

    return NextResponse.json({ 
      success: true, 
      paymentIntentId: paymentIntent.id,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/one-time-purchase/success?productId=${productId}`
    }, { status: 200 });

  } catch (error) {
    console.error("Payment processing failed:", error);
    
    // Check if this is a Stripe error with more details
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: `Payment processing failed: ${error.message}` 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: "Payment processing failed. Please try again." 
    }, { status: 500 });
  }
}
