// @ts-nocheck
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Settings, Calendar, CreditCard, CheckCircle, TrendingUp, PoundSterling } from "lucide-react";
import { ProductType, getProductTypeConfig, isCustomerAmountType, requiresTotalAmount } from "@/types/products";

function formatOrdinal(n: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`;
}

function SubscriptionConfirmPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("productId");
  const reference = searchParams.get("reference");
  const preferredPaymentDay = searchParams.get("preferredPaymentDay");
  const creditAmount = searchParams.get("creditAmount");
  const paymentMonths = searchParams.get("paymentMonths");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      const { data, error } = await supabase
        .from("products")
        .select("name, description, price, product_type, business:businesses(name), business_id")
        .eq("id", productId)
        .single();

      if (!error) {
        setProduct(data);
      }

      setLoading(false);
    }

    fetchProduct();
  }, [productId]);

  const handleConfirm = async () => {
    setSubmitting(true);

    // 1. Get the logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in.");
      setSubmitting(false);
      return;
    }

    // 2. Fetch the user email
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("email")
      .eq("id", user.id)
      .single();

    // 3. Insert into the subscriptions table
    const subscriptionData: any = {
      user_id: user.id,
      product_id: productId,
      status: "active",
      customer_reference: reference,
      start_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      email: profile?.email ?? null,
    };

    // Add pay_it_off specific fields
    if (product.product_type === 'pay_it_off') {
      const months = parseInt(paymentMonths || '12');
      subscriptionData.total_paid = 0;
      subscriptionData.remaining_amount = product.price * 100; // Store in pence
      subscriptionData.payment_count = 0;
      subscriptionData.total_payments = months;
    }

    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .insert(subscriptionData)
      .select()
      .single();

    if (subError) {
      alert("Error creating subscription.");
      setSubmitting(false);
      return;
    }

    // 4. Insert into the scheduled_payments table
    let amount;
    if (product.product_type === 'balance_builder' && creditAmount) {
      amount = Math.round(parseFloat(creditAmount) * 100);
    } else if (product.product_type === 'pay_it_off') {
      const months = parseInt(paymentMonths || '12');
      amount = Math.round((product.price / months) * 100);
    } else {
      amount = Math.round(product.price * 100);
    }
    
    const { error: scheduleError } = await supabase
      .from("scheduled_payments")
      .insert({
        user_id: user.id,
        product_id: productId,
        business_id: product.business_id,
        purchase_id: subscription.id,
        scheduled_for: parseInt(preferredPaymentDay),
        status: "active",
        amount: amount,
        customer_reference: reference,
        created_at: new Date().toISOString(),
      });

    if (scheduleError) {
      alert("Error creating payment schedule.");
      setSubmitting(false);
      return;
    }

    // 5. Initialize user credit record if this is a balance builder product
    if (product.product_type === 'balance_builder') {
      const { error: creditError } = await supabase
        .from("user_credits")
        .upsert({
          user_id: user.id,
          business_id: product.business_id,
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

    // 6. Redirect to /subscription/success upon success
    router.push("/subscription/success");
  };

  if (loading) {
    return <LoadingOverlay show message="Loading product info..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
        <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          <div className="text-center mb-8 animate-fade-in">

            <h1 className="text-3xl font-bold text-brand-purple mb-2">
              Confirm Subscription
            </h1>
            <p className="text-gray-600">You're already set up with a payment method.</p>
          </div>

          <Card className="bg-gradient-to-b from-brand-purple/10 to-transparent border-brand-purple/20 text-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {product?.name}
                  </h2>
                  <p className="text-sm text-white/80 italic">"{product?.description}"</p>
                  
                  {/* Product Type Badge */}
                  <div className="mt-2">
                    {product?.product_type === 'balance_builder' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Balance Builder
                      </span>
                    )}
                    {product?.product_type === 'pay_it_off' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        <PoundSterling className="w-3 h-3 mr-1" />
                        Pay it Off
                      </span>
                    )}
                    {product?.product_type === 'standard' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <CreditCard className="w-3 h-3 mr-1" />
                        Standard
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-center sm:items-end mt-4">
                    {product?.product_type === 'balance_builder' && creditAmount ? (
                      <div>
                        <p className="text-xl font-bold text-green-300">£{creditAmount}/month</p>
                        <p className="text-sm text-green-200">Flexible amount</p>
                      </div>
                                          ) : product?.product_type === 'pay_it_off' ? (
                        <div>
                          <p className="text-xl font-bold text-purple-300">£{product?.price} total</p>
                          <p className="text-sm text-purple-200">
                            £{(product?.price / parseInt(paymentMonths || '12')).toFixed(2)}/month for {paymentMonths} months
                          </p>
                        </div>
                      ) : (
                      <p className="text-xl font-bold text-white">£{product?.price}/month</p>
                    )}
                    <p className="text-xs text-white/70 mt-1 italic">
                      from {product?.business?.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Schedule</p>
                      <p className="text-sm text-gray-600">
                        {formatOrdinal(Number(preferredPaymentDay))} of each month
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Billing Schedule</p>
                      <p className="text-sm text-gray-600">Monthly</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button
              disabled={submitting}
              onClick={handleConfirm}
              className="w-full bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-brand-purple/90 hover:to-brand-indigo/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12"
            >
              {submitting ? "Confirming..." : "Confirm Subscription"}
            </Button>
          </div>

          <div className="text-center mt-8 animate-fade-in delay-500">
            <p className="text-sm text-gray-500 mt-1">
              Questions? <a href="/contact" className="text-brand-purple underline hover:text-brand-purple/80">Contact us</a> anytime for support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubscriptionConfirmPage() {
  return (
    <Suspense fallback={<LoadingOverlay show message="Loading..." />}>
      <SubscriptionConfirmPageInner />
    </Suspense>
  );
}