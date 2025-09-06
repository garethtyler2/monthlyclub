"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { ProductType } from "@/types/products";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: string;
  onSuccess: () => void;
  productType?: ProductType;
  businessName?: string;
}

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  subscriptionId,
  onSuccess,
  productType,
  businessName,
}: CancelSubscriptionModalProps) {
  const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
    setLoading(true);

    // Get subscription details before cancelling
    const { data: subscriptionData, error: subscriptionDataError } = await supabase
        .from("subscriptions")
        .select(`
            id,
            user_id,
            product_id,
            products!inner(
                name, 
                business_id,
                product_type,
                businesses!inner(name)
            )
        `)
        .eq("id", subscriptionId)
        .single();
    
    console.log('Subscription data query result:', { subscriptionData, subscriptionDataError });

    // For balance builders, we only cancel the scheduled payments, not the subscription itself
    // This allows the user to keep their balance while stopping future payments
    if (productType === 'balance_builder') {
        const { error: schedError } = await supabase
            .from("scheduled_payments")
            .update({ status: "cancelled", cancel_at: new Date().toISOString() })
            .eq("purchase_id", subscriptionId);

        setLoading(false);

        if (!schedError) {
            onSuccess();
            onClose();
        } else {
            console.error("Failed to cancel scheduled payments", schedError);
        }
        return;
    }

    // For standard subscriptions, cancel both subscription and scheduled payments
    const { error: subError } = await supabase
        .from("subscriptions")
        .update({ status: "cancelled", cancel_at: new Date().toISOString() })
        .eq("id", subscriptionId);

    const { error: schedError } = await supabase
        .from("scheduled_payments")
        .update({ status: "cancelled", cancel_at: new Date().toISOString()  })
        .eq("purchase_id", subscriptionId);

    // Send cancellation email
    console.log('Cancellation email check:', { subError, schedError, subscriptionData });
    if (!subError && !schedError && subscriptionData) {
        try {
            console.log('Attempting to send cancellation email...');
            // Get user email
            const { data: userData } = await supabase
                .from("user_profiles")
                .select("email")
                .eq("id", subscriptionData.user_id)
                .single();

            console.log('User data for email:', userData);
            if (userData?.email) {
                console.log('Sending cancellation email to:', userData.email);
                const emailResponse = await fetch('/api/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'subscription_cancelled',
                        data: {
                            userEmail: userData.email,
                            productName: (subscriptionData.products as any)?.name || 'Unknown Product',
                            businessName: (subscriptionData.products as any)?.businesses?.name || 'Unknown Business'
                        }
                    })
                });
                console.log('Email API response:', emailResponse.status, await emailResponse.text());
            } else {
                console.log('No user email found, skipping email');
            }
        } catch (emailError) {
            console.error('Failed to send cancellation email:', emailError);
        }
    } else {
        console.log('Skipping email due to errors or missing data');
    }

    setLoading(false);

    if (!subError && !schedError) {
        onSuccess();
        onClose();
    } else {
        console.error("Failed to cancel subscription or schedule", subError, schedError);
    }
    };

  // Handle Pay It Off subscriptions - prevent direct cancellation
  if (productType === 'pay_it_off') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Payment Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To cancel this payment plan, please contact {businessName || 'the business'} directly.
            </p>
            <p className="text-sm text-muted-foreground">
              This helps protect both you and the business, as the service may have already been provided.
            </p>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-300">
                <strong>Note:</strong> You can still view your payment progress and history in your dashboard.
              </p>
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Handle Balance Builder subscriptions - allow cancellation but mention balance retention
  if (productType === 'balance_builder') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Balance Builder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to stop making monthly payments to your balance builder?
            </p>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Good news:</strong> Any balance you've already built up will remain available for you to use.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              You can always restart payments later if you want to build up more credit.
            </p>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="ghost" onClick={onClose}>
              Keep Building Balance
            </Button>
            <Button variant="destructive" onClick={handleCancel} disabled={loading}>
              {loading ? "Cancelling..." : "Stop Payments"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Handle Standard subscriptions - normal cancellation flow
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Subscription</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to cancel this subscription? You may lose access to your benefits immediately.
        </p>
        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={onClose}>
            Go Back
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={loading}>
            {loading ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
