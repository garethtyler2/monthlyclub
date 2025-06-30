"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";

interface ManagePaymentDayModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionId: string;
  onSuccess: () => void;
}

export default function ManagePaymentDayModal({
  isOpen,
  onClose,
  subscriptionId,
  onSuccess,
}: ManagePaymentDayModalProps) {
  const [selectedDay, setSelectedDay] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedDay) return;

    setLoading(true);
    const { error } = await supabase
      .from("scheduled_payments")
      .update({ scheduled_for: parseInt(selectedDay) })
      .eq("purchase_id", subscriptionId);

    setLoading(false);

    if (!error) {
      onSuccess();
      onClose();
    } else {
      console.error("Failed to update payment day", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Payment Day</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose a new day of the month (1–28) to be charged.
          </p>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <button
                key={day}
                type="button"
                className={cn(
                  "w-8 h-8 rounded-full border text-sm flex items-center justify-center",
                  selectedDay === String(day)
                    ? "bg-brand-purple text-white font-semibold"
                    : "bg-transparent text-white border-white/30"
                )}
                onClick={() => setSelectedDay(String(day))}
              >
                {day}
              </button>
            ))}
          </div>

          <Button
            className="hero-button-primary w-full"
            onClick={handleSubmit}
            disabled={loading || !selectedDay}
          >
            {loading ? "Saving..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}