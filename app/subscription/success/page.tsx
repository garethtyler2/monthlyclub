// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { CheckCircle, Calendar, CreditCard, Settings, ArrowRight, TrendingUp, PoundSterling } from "lucide-react";
import { ProductType, getProductTypeConfig } from "@/types/products";

function formatOrdinal(n: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`;
}

type ProductWithBusiness = {
  name: string;
  description: string;
  price: number;
  product_type: ProductType;
  business: {
    name: string;
  };
};

export default function SubscriptionSuccessPage() {
  const router = useRouter();

  const [scheduledInfo, setScheduledInfo] = useState<{
    productName: string;
    productDescription: string;
    businessName: string;
    preferredPaymentDay: number;
    price: number;
    productType: ProductType;
    totalAmount?: number;
    paymentMonths?: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscriptionDetails() {
      console.log("Starting to fetch subscription details...");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.warn("No user found");
        setLoading(false);
        return;
      }

      const { data: scheduledData, error: scheduleError } = await supabase
        .from("scheduled_payments")
        .select("scheduled_for, product_id, amount, purchase_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      const scheduled = scheduledData?.[0];
      if (!scheduled) {
        console.warn("No scheduled record found");
        setLoading(false);
        return;
      }

      // Get subscription data separately to get total_payments
      const { data: subscriptionInfo, error: subError } = await supabase
        .from("subscriptions")
        .select("total_payments")
        .eq("id", scheduled.purchase_id)
        .single();

      // Step 2: Fetch product and business manually
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("name, description, price, product_type, business:businesses(name)")
        .eq("id", scheduled.product_id)
        .single<ProductWithBusiness>();

      if (productError || !product) {
        setLoading(false);
        return;
      }

      // Use the amount from scheduled payment for balance builder and pay_it_off products, otherwise use product price
      const displayPrice = (product.product_type === 'balance_builder' || product.product_type === 'pay_it_off') 
        ? (scheduled.amount / 100) 
        : (product.price ?? 0);
      
      console.log("Debug - Product:", product);
      console.log("Debug - Subscription Info:", subscriptionInfo);
      console.log("Debug - Product Type:", product.product_type);
      console.log("Debug - Product Price:", product.price);
      console.log("Debug - Total Payments:", subscriptionInfo?.total_payments);

      setScheduledInfo({
        productName: product.name ?? "Unknown product",
        productDescription: product.description ?? "No description provided",
        businessName: product.business?.name ?? "Unknown business",
        preferredPaymentDay: scheduled.scheduled_for,
        price: displayPrice,
        productType: product.product_type,
        totalAmount: product.product_type === 'pay_it_off' ? product.price : undefined,
        paymentMonths: product.product_type === 'pay_it_off' ? subscriptionInfo?.total_payments : undefined,
      });

      // Send subscription confirmation email
      try {
        const { data: subscriptionData } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("user_id", user.id)
          .eq("product_id", scheduled.product_id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (subscriptionData) {
          // Send new subscriber notification to business owner
          try {
            await fetch('/api/email/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'new_subscriber',
                data: {
                  businessName: product.business?.name ?? "Unknown business",
                  subscriberEmail: user.email || '',
                  productName: product.name ?? "Unknown product",
                  subscriptionId: subscriptionData.id,
                  price: displayPrice
                }
              })
            });
            console.log('New subscriber notification sent');
          } catch (emailError) {
            console.error('Failed to send new subscriber notification:', emailError);
          }
        }
      } catch (emailError) {
        console.error('Failed to send subscription emails:', emailError);
      }

      setLoading(false);
    }

    fetchSubscriptionDetails();
  }, []);
  if (loading ) {
    return <LoadingOverlay show message="Confirming Subscription..." />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-purple/10 via-brand-blue/10 to-transparent relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-brand-purple/30 rounded-full blur-[128px] -z-10" />
        <div className="absolute -bottom-24 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full blur-[128px] -z-10" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          {/* Success Icon */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-purple to-brand-indigo rounded-full shadow-lg mb-4 animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-brand-purple mb-2">
              Subscription Confirmed! 🎉
            </h1>
          </div>

          {/* Subscription Details Card */}
          <Card className="bg-gradient-to-b from-brand-purple/10 to-transparent border-brand-purple/20 text-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mb-6">
            <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-white mb-1">
                      {scheduledInfo?.productName}
                    </h2>
                    <p className="text-sm text-white/80 italic">"{scheduledInfo?.productDescription}"</p>
                    
                    {/* Product Type Badge */}
                    <div className="mt-2">
                      {scheduledInfo?.productType === 'balance_builder' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Balance Builder
                        </span>
                      )}
                      {scheduledInfo?.productType === 'pay_it_off' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          <PoundSterling className="w-3 h-3 mr-1" />
                          Pay it Off
                        </span>
                      )}
                      {scheduledInfo?.productType === 'standard' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          <CreditCard className="w-3 h-3 mr-1" />
                          Standard
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col items-center sm:items-end mt-4">
                      {scheduledInfo?.productType === 'balance_builder' ? (
                        <div>
                          <p className="text-xl font-bold text-green-300">£{scheduledInfo?.price}/month</p>
                          <p className="text-sm text-green-200">Flexible amount</p>
                        </div>
                      ) : scheduledInfo?.productType === 'pay_it_off' ? (
                        <div>
                          <p className="text-xl font-bold text-purple-300">£{scheduledInfo?.totalAmount} total</p>
                          <p className="text-sm text-purple-200">
                            £{scheduledInfo?.price}/month for {scheduledInfo?.paymentMonths} months
                          </p>
                        </div>
                      ) : (
                        <p className="text-xl font-bold text-white">£{scheduledInfo?.price}/month</p>
                      )}
                      <p className="text-xs text-white/70 mt-1 italic">
                        from {scheduledInfo?.businessName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment Schedule</p>
                        <p className="text-sm text-gray-600">
                          {scheduledInfo ? formatOrdinal(scheduledInfo.preferredPaymentDay) : ""} of each month
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Billing Status</p>
                        <p className="text-sm text-gray-600">Active & Ready</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                      <Settings className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Manage Subscription</p>
                        <p className="text-sm text-gray-600">Edit or cancel anytime from your dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-brand-purple/90 hover:to-brand-indigo/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>


          </div>

          {/* Footer message */}
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