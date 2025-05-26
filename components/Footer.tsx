
"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Title */}
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-2">
              {/* Replace with your actual logo or use text */}
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue mr-2">
                AI-Rehab
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your affordable and accessible alternative to traditional physiotherapy.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Explore Links */}
            <div>
              <h3 className="text-sm font-medium mb-4">Explore</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/insights" className="text-muted-foreground hover:text-primary transition-colors">
                    AI Rehab Insights
                  </Link>
                </li>
                <li>
                  <Link href="/ai-physical-rehabilitation" className="text-muted-foreground hover:text-primary transition-colors">
                    AI in Physical Rehabilitation
                  </Link>
                </li>
                <li>
                  <Link href="/ai-prehabilitation" className="text-muted-foreground hover:text-primary transition-colors">
                    AI in Prehabilitation
                  </Link>
                </li>
                <li>
                  <Link href="/ai-personal-training" className="text-muted-foreground hover:text-primary transition-colors">
                    AI-Powered Personal Training
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* About Links */}
            <div>
              <h3 className="text-sm font-medium mb-4">About</h3>
              <ul className="space-y-3 text-sm">

                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2023 AI-Rehab. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;