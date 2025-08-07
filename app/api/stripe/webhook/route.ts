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
    const creditAmount = metadata.credit_amount;

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
    const { data: userProfile, error: profileError } = await supabase
        .from("user_profiles")
        .select("email")
        .eq("id", userId)
        .single();

        if (profileError) {
        console.error("Failed to fetch user profile:", profileError);
        }
    
    const { data: existingSubscription, error: existingSubError } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (existingSubscription) {
      console.log("Subscription already exists for user and product. Skipping insert.");
      return new NextResponse("Subscription already exists", { status: 200 });
    }

    // Insert into subscriptions
    const { data: purchase, error: purchaseError } = await supabase
      .from("subscriptions")
      .insert({
        user_id: userId,
        product_id: productId,
        status: "active",
        customer_reference: customerReference,
        start_date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        email: userProfile?.email ?? null,
      })
      .select()
      .single();

    if (purchaseError) {
      console.error("Failed to insert into subscriptions:", purchaseError);
      return new NextResponse("Database Error", { status: 500 });
    }

    // Insert into scheduled_payments
    // Fetch product price and check if it's a balance builder
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("price, business_id, is_credit_builder, name")
      .eq("id", productId)
      .single();
      if (productError || !product) {
        return NextResponse.json({ error: "Product not found" }, { status: 400 });
        }

    const { data: existingScheduled, error: existingScheduledError } = await supabase
      .from("scheduled_payments")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (existingScheduled) {
      console.log("Scheduled payment already exists for user and product. Skipping insert.");
      return new NextResponse("Scheduled payment already exists", { status: 200 });
    }

    const businessId = product.business_id;
    const amount = product.is_credit_builder && creditAmount ? parseFloat(creditAmount) * 100 : product.price * 100;
    
    const { error: scheduleError } = await supabase
      .from("scheduled_payments")
      .insert({
        user_id: userId,
        product_id: productId,
        business_id: businessId,
        purchase_id: purchase.id,
        scheduled_for: parseInt(paymentDay),
        status: "active",
        amount: amount,
        customer_reference: customerReference,
        created_at: new Date().toISOString(),
      });

    if (scheduleError) {
      console.error("Failed to insert into scheduled_payments:", scheduleError);
      return new NextResponse("Database Error", { status: 500 });
    }

    // Initialize user credit record if this is a balance builder product
    if (product.is_credit_builder) {
      const { error: creditError } = await supabase
        .from("user_credits")
        .upsert({
          user_id: userId,
          business_id: businessId,
          balance: 0,
          total_earned: 0,
          total_spent: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,business_id'
        });

      if (creditError) {
        console.error("Error initializing user credit:", creditError);
        // Don't fail the subscription for this, just log it
      }
    }

    // Send subscription confirmation email
    try {
      const { data: businessData } = await supabase
        .from("businesses")
        .select("name")
        .eq("id", businessId)
        .single();

      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'subscription_confirmation',
          data: {
            userEmail: userProfile?.email || '',
            businessName: businessData?.name || 'Unknown Business',
            productName: product.name || 'Unknown Product',
            amount: amount,
            paymentDay: parseInt(paymentDay),
            subscriptionId: purchase.id
          }
        })
      });

      // Send new subscriber notification to business
      if (businessData) {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'new_subscriber',
            data: {
              businessEmail: userProfile?.email || '', // This should be the business owner's email
              businessName: businessData.name,
              subscriberEmail: userProfile?.email || '',
              productName: product.name || 'Unknown Product',
              subscriptionId: purchase.id
            }
          })
        });
      }
    } catch (emailError) {
      console.error('Failed to send subscription emails:', emailError);
    }

    return new NextResponse("Success", { status: 200 });
  }

  if (event.type === "payment_intent.payment_failed") {
    const failedIntent = event.data.object as Stripe.PaymentIntent;
    console.warn("Payment failed:", failedIntent.id, failedIntent.last_payment_error?.message);

    // Get payment details and send failure notifications
    try {
      const { data: paymentData } = await supabase
        .from("payments")
        .select(`
          user_id,
          product_id,
          business_id,
          amount,
          products(name),
          businesses(name, user_id)
        `)
        .eq("stripe_payment_intent_id", failedIntent.id)
        .single();

      if (paymentData) {
        // Get user email
        const { data: userData } = await supabase
          .from("user_profiles")
          .select("email")
          .eq("id", paymentData.user_id)
          .single();

        // Get business owner email
        const { data: businessOwnerData } = await supabase
          .from("user_profiles")
          .select("email")
          .eq("id", paymentData.businesses[0]?.user_id)
          .single();

        // Send payment failure notification to user
        if (userData?.email) {
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'payment_notification',
              data: {
                userEmail: userData.email,
                businessName: paymentData.businesses[0]?.name || 'Unknown Business',
                productName: paymentData.products[0]?.name || 'Unknown Product',
                amount: paymentData.amount,
                status: 'failed',
                failureReason: failedIntent.last_payment_error?.message || 'Payment failed',
                paymentDate: new Date().toLocaleDateString()
              }
            })
          });
        }

        // Send payment failure notification to business
        if (businessOwnerData?.email) {
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'payment_failure',
              data: {
                businessEmail: businessOwnerData.email,
                businessName: paymentData.businesses[0]?.name || 'Unknown Business',
                customerEmail: userData?.email || 'Unknown',
                productName: paymentData.products[0]?.name || 'Unknown Product',
                amount: paymentData.amount,
                failureReason: failedIntent.last_payment_error?.message || 'Payment failed'
              }
            })
          });
        }
      }
    } catch (error) {
      console.error('Failed to send payment failure notifications:', error);
    }

    return new NextResponse("Payment failure logged", { status: 200 });
  }

  return new NextResponse("Event received", { status: 200 });
}