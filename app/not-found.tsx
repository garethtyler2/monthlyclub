'use client';
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    console.error("404 Error: Page not found");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background text-foreground">
      <h1 className="text-5xl font-bold mb-4 text-brand-purple">Oops... something went wrong</h1>
      <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md">
        Sorry about this. Try again or contact us if it keeps happening:{" "}
        <a
          href="mailto:hello@monthlyclubhq.com"
          className="text-brand-blue underline hover:text-brand-blue/80"
        >
          hello@monthlyclubhq.com
        </a>
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-brand-purple to-brand-blue text-white font-medium rounded-md shadow hover:opacity-90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
