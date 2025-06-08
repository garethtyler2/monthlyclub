// app/unavailable/page.tsx

import Link from "next/link";
export default function UnavailablePage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4 bg-white dark:bg-black">
      <div className="max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-brand-purple">
          monthlyclubhq.com isn’t available in your region yet
        </h1>
        <p className="text-muted-foreground mb-6">
          We're currently only available in the UK and US. Stay tuned — we're expanding soon!
        </p>
        <p className="text-sm text-muted-foreground">
          If you think this is a mistake, feel free to contact us at{" "}
          <Link href="mailto:hello@monthlyclubhq.com" className="underline text-brand-blue">
            hello@monthlyclubhq.com
          </Link>
        </p>
      </div>
    </div>
  )
}