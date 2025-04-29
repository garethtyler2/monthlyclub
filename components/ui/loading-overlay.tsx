"use client";

import { cn } from "@/lib/utils";
import LottieLoadingGradient from "@/components/LottieLoadingGradient";

type LoadingOverlayProps = {
  message?: string;
  show: boolean;
  className?: string;
};

export function LoadingOverlay({ show, message = "Loading...", className }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm", className)}>
      <div className="p-4 mb-4 shadow-md">
        <LottieLoadingGradient
          src="https://lottie.host/2df0aa0e-7824-4c43-a3ca-82674f0ecf55/GcoEaiXBJP.lottie"
          className="h-32 w-32"
        />
      </div>
      <p className="text-lg font-medium text-white">{message}</p>
    </div>
  );
}

