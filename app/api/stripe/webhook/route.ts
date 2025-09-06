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

    // Fetch product details first
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("price, business_id, product_type, name")
      .eq("id", productId)
      .single();
      if (productError || !product) {
        return NextResponse.json({ error: "Product not found" }, { status: 400 });
        }

    // Insert into subscriptions
    const subscriptionData: any = {
      user_id: userId,
      product_id: productId,
      status: "active",
      customer_reference: customerReference,
      start_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      email: userProfile?.email ?? null,
    };

    // Add pay_it_off specific fields
    if (product.product_type === 'pay_it_off') {
      const paymentMonths = parseInt(metadata.paymentMonths || '12');
      const monthlyAmount = product.price / paymentMonths;
      
      subscriptionData.total_paid = 0;
      subscriptionData.remaining_amount = product.price * 100; // Store in pence
      subscriptionData.payment_count = 0;
      subscriptionData.total_payments = paymentMonths;
    }

    const { data: purchase, error: purchaseError } = await supabase
      .from("subscriptions")
      .insert(subscriptionData)
      .select()
      .single();

    if (purchaseError) {
      console.error("Failed to insert into subscriptions:", purchaseError);
      return new NextResponse("Database Error", { status: 500 });
    }

    // Insert into scheduled_payments

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
    let amount;
    if (product.product_type === 'balance_builder' && creditAmount) {
      amount = Math.round(parseFloat(creditAmount) * 100);
    } else if (product.product_type === 'pay_it_off') {
      const paymentMonths = parseInt(metadata.paymentMonths || '12');
      amount = Math.round((product.price / paymentMonths) * 100);
    } else {
      amount = Math.round(product.price * 100);
    }
    
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
    if (product.product_type === 'balance_builder') {
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
        .select("name, user_id")
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

      // New subscriber notification is now sent from the success page to avoid duplication
    } catch (emailError) {
      console.error('Failed to send subscription emails:', emailError);
    }

    return new NextResponse("Success", { status: 200 });
  }

  if (event.type === "account.updated") {
    const account = event.data.object as Stripe.Account;
    console.log("Account updated:", account.id, "Details submitted:", account.details_submitted, "Charges enabled:", account.charges_enabled);

    // Check if this is a business account that has completed onboarding
    if (account.details_submitted && account.charges_enabled) {
      try {
        // Find the business with this Stripe account ID
        const { data: business, error: businessError } = await supabase
          .from("businesses")
          .select("id, name, user_id, status")
          .eq("stripe_account_id", account.id)
          .single();

        if (businessError || !business) {
          console.log("No business found for Stripe account:", account.id);
          return new NextResponse("Business not found", { status: 200 });
        }

        // Only update if status is not already 'active'
        if (business.status !== 'active') {
          const { error: updateError } = await supabase
            .from("businesses")
            .update({ status: "active" })
            .eq("id", business.id);

          if (updateError) {
            console.error("Failed to update business status to active:", updateError);
            return NextResponse.json({ error: "Failed to update business status" }, { status: 500 });
          }

          console.log("✅ Business status updated to 'active' for:", business.name);

          // Send business activated notification to owner
          try {
            const { data: userProfile } = await supabase
              .from("user_profiles")
              .select("email")
              .eq("id", business.user_id)
              .single();

            if (userProfile?.email) {
              await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'business_activated',
                  data: { 
                    businessName: business.name, 
                    businessId: business.id, 
                    ownerEmail: userProfile.email 
                  }
                })
              });
              console.log("✅ Business activated email sent to:", userProfile.email);
            }
          } catch (emailError) {
            console.error('Failed to send business activated email:', emailError);
          }
        } else {
          console.log("Business already has 'active' status:", business.name);
        }
      } catch (error) {
        console.error("Error processing account.updated webhook:", error);
        return NextResponse.json({ error: "Failed to process account update" }, { status: 500 });
      }
    } else {
      console.log("Account not fully onboarded yet. Details submitted:", account.details_submitted, "Charges enabled:", account.charges_enabled);
    }

    return new NextResponse("Account update processed", { status: 200 });
  }

  if (event.type === "payment_intent.succeeded") {
    const succeededIntent = event.data.object as Stripe.PaymentIntent;
    console.log("Payment succeeded for intent:", succeededIntent.id);
    
    // Check if this is a one-time purchase by looking at metadata
    const metadata = succeededIntent.metadata || {};
    const purchaseType = metadata.purchase_type;
    
    if (purchaseType === 'one_time') {
      console.log("Processing one-time purchase success webhook");
      
      // Get payment details from our database
      const { data: paymentData, error: paymentError } = await supabase
        .from("payments")
        .select(`
          *,
          products(*, businesses(*)),
          user_profiles(*)
        `)
        .eq("stripe_payment_intent_id", succeededIntent.id)
        .single();

      if (paymentError) {
        console.error("Failed to fetch payment data for one-time purchase:", paymentError);
        // Don't return error here as the payment was already processed by the API
        return new NextResponse("Payment data not found", { status: 200 });
      }

      // Update payment status to succeeded (in case it wasn't already)
      const { error: updateError } = await supabase
        .from("payments")
        .update({ 
          status: "succeeded",
          paid_at: new Date().toISOString()
        })
        .eq("stripe_payment_intent_id", succeededIntent.id);

      if (updateError) {
        console.error("Failed to update payment status:", updateError);
        // Don't fail the webhook as payment was successful
      }

      // Send success notifications
      try {
        const userData = paymentData.user_profiles;
        const businessOwnerData = paymentData.products?.businesses;

        // Send payment success notification to customer
        if (userData?.email) {
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'payment_notification',
              data: {
                userEmail: userData.email,
                businessName: paymentData.products?.businesses?.name || 'Unknown Business',
                productName: paymentData.products?.name || 'Unknown Product',
                amount: paymentData.amount,
                status: 'success',
                paymentDate: new Date().toLocaleDateString()
              }
            })
          });
        }

        // Send payment success notification to business
        if (businessOwnerData?.email) {
          await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'payment_success',
              data: {
                businessEmail: businessOwnerData.email,
                businessName: paymentData.products?.businesses?.name || 'Unknown Business',
                customerEmail: userData?.email || 'Unknown',
                productName: paymentData.products?.name || 'Unknown Product',
                amount: paymentData.amount,
                paymentDate: new Date().toLocaleDateString()
              }
            })
          });
        }
      } catch (error) {
        console.error('Failed to send payment success notifications:', error);
      }

      return new NextResponse("One-time payment success logged", { status: 200 });
    }
    
    // For subscription payments, let the existing logic handle it
    return new NextResponse("Payment success logged", { status: 200 });
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