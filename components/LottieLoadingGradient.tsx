// components/LottieLoadingGradient.tsx

"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LottieLoadingGradientProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export default function LottieLoadingGradient({
  src,
  loop = true,
  autoplay = true,
  className = "h-40 w-40",
}: LottieLoadingGradientProps) {
  return (
    <div className="flex items-center justify-center">
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        className={className}
      />
    </div>
  );
}
