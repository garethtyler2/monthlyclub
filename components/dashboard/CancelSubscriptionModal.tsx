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

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: string;
  onSuccess: () => void;
}

export default function CancelSubscriptionModal({
  isOpen,
  onClose,
  subscriptionId,
  onSuccess,
}: CancelSubscriptionModalProps) {
  const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
    setLoading(true);

    // Get subscription details before cancelling
    const { data: subscriptionData } = await supabase
        .from("subscriptions")
        .select(`
            id,
            user_id,
            product_id,
            products(name, business_id),
            businesses(name)
        `)
        .eq("id", subscriptionId)
        .single();

    const { error: subError } = await supabase
        .from("subscriptions")
        .update({ status: "cancelled", cancel_at: new Date().toISOString() })
        .eq("id", subscriptionId);

    const { error: schedError } = await supabase
        .from("scheduled_payments")
        .update({ status: "cancelled", cancel_at: new Date().toISOString()  })
        .eq("purchase_id", subscriptionId);

    // Send cancellation email
    if (!subError && !schedError && subscriptionData) {
        try {
            // Get user email
            const { data: userData } = await supabase
                .from("user_profiles")
                .select("email")
                .eq("id", subscriptionData.user_id)
                .single();

            if (userData?.email) {
                await fetch('/api/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'subscription_cancelled',
                        data: {
                            userEmail: userData.email,
                            productName: subscriptionData.products[0]?.name || 'Unknown Product',
                            businessName: subscriptionData.businesses[0]?.name || 'Unknown Business'
                        }
                    })
                });
            }
        } catch (emailError) {
            console.error('Failed to send cancellation email:', emailError);
        }
    }

    setLoading(false);

    if (!subError && !schedError) {
        onSuccess();
        onClose();
    } else {
        console.error("Failed to cancel subscription or schedule", subError, schedError);
    }
    };

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
