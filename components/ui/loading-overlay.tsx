"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type LoadingOverlayProps = {
  message?: string
  show: boolean
  className?: string
}

export function LoadingOverlay({ show, message = "Loading...", className }: LoadingOverlayProps) {
  if (!show) return null

  return (
    <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm", className)}>
      <Loader2 className="h-10 w-10 animate-spin text-fitness-primary mb-4" />
      <p className="text-lg font-medium text-white">{message}</p>
    </div>
  )
}
