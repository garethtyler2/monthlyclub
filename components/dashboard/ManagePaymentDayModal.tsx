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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { 
  Calendar, 
  CheckCircle, 
  RefreshCw, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock
} from "lucide-react";

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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleContinue = () => {
    if (!selectedDay) return;
    setShowConfirmation(true);
  };

  const handleBack = () => {
    setShowConfirmation(false);
  };

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
      handleClose();
    } else {
      console.error("Failed to update payment day", error);
    }
  };

  const handleClose = () => {
    setSelectedDay("");
    setShowConfirmation(false);
    setLoading(false);
    onClose();
  };

  const getNextPaymentDate = (day: number): string => {
    const today = new Date();
    const year = today.getFullYear();
    
    // Check if the selected day is today and if it's after 7:00 AM
    const isToday = today.getDate() === day;
    const isAfter7AM = today.getHours() >= 7;
    
    // If it's today and after 7 AM, use next month
    // If it's a future day, use this month
    // If it's today and before 7 AM, use this month
    // If it's a past day, use next month
    const month = (isToday && isAfter7AM) || today.getDate() > day ? today.getMonth() + 1 : today.getMonth();
    const nextDate = new Date(year, month, day);

    const dayNum = nextDate.getDate();
    const monthName = nextDate.toLocaleString('default', { month: 'long' });

    const ordinal =
      dayNum === 1 || dayNum === 21 || dayNum === 31 ? 'st' :
      dayNum === 2 || dayNum === 22 ? 'nd' :
      dayNum === 3 || dayNum === 23 ? 'rd' : 'th';

    return `${dayNum}${ordinal} ${monthName}`;
  };

  const getOrdinalSuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Group days into logical ranges for better UX
  const dayRanges = [
    { label: "Early Month", days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { label: "Mid Month", days: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    { label: "Late Month", days: [21, 22, 23, 24, 25, 26, 27, 28] }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-white/10 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-white">
            {showConfirmation ? "Confirm Payment Day Change" : "Change Payment Day"}
          </DialogTitle>
        </DialogHeader>

        {!showConfirmation ? (
          <>
            <div className="space-y-6 py-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Choose Payment Day</span>
                </div>
                <p className="text-sm text-blue-200">
                  Select when you'd like your monthly payments to be processed.
                </p>
              </div>

              <div className="space-y-4">
                {dayRanges.map((range) => (
                  <div key={range.label} className="space-y-3">
                    <div className="grid grid-cols-5 gap-2">
                      {range.days.map((day) => (
                        <button
                          key={day}
                          type="button"
                          className={cn(
                            "p-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:scale-105",
                            selectedDay === String(day)
                              ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white border-transparent shadow-lg"
                              : "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30"
                          )}
                          onClick={() => setSelectedDay(String(day))}
                        >
                          <div className="text-center">
                            <div className="text-lg font-bold">{day}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedDay && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-green-300">Selected Payment Day</span>
                  </div>
                  <div className="text-2xl font-bold text-green-100 text-center">
                    {selectedDay}
                  </div>
                  <div className="text-sm text-green-200 text-center mt-1">
                    Next payment: {getNextPaymentDate(parseInt(selectedDay))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="flex space-x-2">

              <Button 
                onClick={handleContinue}
                disabled={!selectedDay}
                className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white flex-1"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="space-y-4 py-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Confirm Payment Day Change</span>
                </div>
                <p className="text-sm text-green-200 mb-3">
                  You're about to change your payment day to:
                </p>
                <div className="text-3xl font-bold text-green-100 text-center">
                  {selectedDay}
                </div>
                <div className="text-sm text-green-300 text-center mt-2">
                  Next payment will be on {getNextPaymentDate(parseInt(selectedDay))}
                </div>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <p className="text-sm text-blue-300">
                    Your payment will be processed on the {selectedDay} of each month going forward.
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex space-x-2">

              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex-1"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Change
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}