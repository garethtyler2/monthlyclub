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
                Monthly Club
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Helping small service businesses grow with simple subscription tools.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
            Monthly Club is a platform for businesses to manage recurring services. We don’t handle service delivery—only the tools to streamline and grow your business.
          </p>
          </div>
          
          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Explore Links */}
            <div>
              <h3 className="text-sm font-medium mb-4">Explore</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* About Links */}
            <div>
              <h3 className="text-sm font-medium mb-4">About</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
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
            © 2025 Monthly Club. All rights reserved.
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