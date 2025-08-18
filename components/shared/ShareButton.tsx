"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareButtonProps {
  url: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
}

export function ShareButton({ 
  url, 
  variant = "outline", 
  size = "sm", 
  className = "",
  children 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is sm breakpoint, better for mobile detection
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleShare = async () => {
    try {
      // On mobile, try to use the Web Share API first
      if (isMobile && navigator.share) {
        await navigator.share({
          title: 'Check out this business',
          url: url,
        });
        return;
      }
      
      // On desktop, always copy to clipboard (more reliable than Web Share API)
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      toast({
        title: "Link copied!",
        description: "Business link has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Determine button text and icon based on screen size and state
  const getButtonContent = () => {
    if (copied) {
      return (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      );
    }
    
    if (isMobile) {
      return (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          {children || "Share Business"}
        </>
      );
    } else {
      return (
        <>
          <Copy className="w-4 h-4 mr-2" />
          {children || "Copy Business Link"}
        </>
      );
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      className={className}
    >
      {getButtonContent()}
    </Button>
  );
}
