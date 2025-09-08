import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pricing | Simple Pay-As-You-Go Model",
  description: "No subscriptions or hidden fees. Just 1.5% + 20p for Stripe and 1.5% for MonthlyClub per transaction. See exactly how pricing works.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/pricing"
  },
  openGraph: {
    title: "Pricing | Simple Pay-As-You-Go Model",
    description: "No monthly fees—just a small % per transaction. Built for growing businesses.",
    url: "https://www.monthlyclubhq.com/pricing",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png",
        width: 1200,
        height: 630,
        alt: "MonthlyClub Pricing"
      }
    ],
    type: "website"
  },
};

const amounts = [10, 50, 100];

const formatGBP = (value: number) => `£${value.toFixed(2)}`;

const PricingPage = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero */}
      <section className="py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 text-primary-foreground animate-bounce-in">
            <Zap className="w-4 h-4 mr-2" />
            Pricing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            No monthly fee. Just pay when you get paid.*
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            *Payment processed immediately, funds typically reach your bank account within 7 days
          </p>
        </div>
      </section>
      <section className="py-4 px-4">
        <div className="max-w-3xl mx-auto grid gap-6">
          <Card className="shadow-primary">
            <CardContent className="p-6 space-y-4">
         <div className="text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-purple to-brand-indigo rounded-full shadow-lg animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

          </div>
              <div className="flex justify-center mb-2">
              </div>
              <h2 className="text-2xl font-bold text-center text-foreground">Pay-As-You-Go</h2>
              <p className="gradient-text text-center text-base">
                One simple rate. No tiers. No surprises.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Stripe fee: 1.5% + 20p per transaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">MonthlyClub fee: 1.5% per transaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">No subscription or setup fees</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Comparison Section (moved below Pay-As-You-Go visually on mobile via order) */}
      <section className="py-12 px-4 order-3 md:order-none">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">How We Compare</h2>
          <p className="text-center text-muted-foreground mb-8">Fees and feature highlights vs alternatives</p>

          {/* Desktop/table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm md:text-base border-separate border-spacing-y-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left text-muted-foreground bg-white/10">
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">MonthlyClub</th>
                  <th className="px-5 py-3">Patreon</th>
                  <th className="px-5 py-3">Direct Debit (example)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: 'Fees (example)\u00b9',
                    mc: '1.5% (MC) + 1.5% + 20p (Stripe card)',
                    patreon: '5%–12% platform fee + payment processing',
                    dd: '1% + 20p (Stripe Bacs) cap ~£4 + MC 1.5% (if used)',
                  },
                  {
                    label: 'Payout speed',
                    mc: 'Stripe payout schedule (typically 3–7 days)',
                    patreon: 'Monthly cycles; creator payout schedule',
                    dd: 'Slower settlement (e.g., 3–6 business days typical)',
                  },
                  {
                    label: 'Own customer relationship',
                    mc: 'Yes (your brand + dashboard)',
                    patreon: 'Shared (Patreon account + creator page)',
                    dd: 'Yes',
                  },
                  {
                    label: 'Recurring subscriptions',
                    mc: 'Yes (products, schedules)',
                    patreon: 'Yes (tiers/memberships)',
                    dd: 'Yes',
                  },
                  {
                    label: 'Balance Builder (stored credit)',
                    mc: 'Built-in (customer gets full balance)',
                    patreon: 'Not designed for stored credit',
                    dd: 'Not standard',
                  },
                  {
                    label: 'Branding & site control',
                    mc: 'Your storefront + copy',
                    patreon: 'Hosted creator page with Patreon UI',
                    dd: 'Yours (implementation needed)',
                  },
                  {
                    label: 'Content/community tools',
                    mc: 'Basic announcements (roadmap)',
                    patreon: 'Rich: posts, media, memberships, messaging',
                    dd: 'N/A',
                  },
                  {
                    label: 'Dunning/retries',
                    mc: 'Stripe retries + dashboard visibility',
                    patreon: 'Handled within Patreon billing',
                    dd: 'Depends on provider',
                  },
                ].map((row, idx) => (
                  <tr key={row.label} className={`${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                    <td className="px-5 py-3 font-medium text-white">{row.label}</td>
                    <td className="px-5 py-3">{row.mc}</td>
                    <td className="px-5 py-3">{row.patreon}</td>
                    <td className="px-5 py-3">{row.dd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/cards */}
          <div className="grid gap-4 md:hidden">
            {[
              {
                label: 'Fees (example)\u00b9',
                mc: '1.5% (MC) + 1.5% + 20p (Stripe card)',
                patreon: '5%–12% platform fee + processing',
                dd: '1% + 20p (Bacs) cap ~£4 + MC 1.5%',
              },
              {
                label: 'Payout speed',
                mc: 'Stripe payout schedule',
                patreon: 'Monthly cycles',
                dd: '3–6 business days typical',
              },
              {
                label: 'Own relationship',
                mc: 'Yes',
                patreon: 'Shared',
                dd: 'Yes',
              },
              {
                label: 'Balance Builder',
                mc: 'Built-in',
                patreon: 'Not designed for credit',
                dd: 'Not standard',
              },
              {
                label: 'Community tools',
                mc: 'Basic (roadmap)',
                patreon: 'Rich posts/messaging',
                dd: 'N/A',
              },
            ].map((row, idx) => (
              <div key={`m-comp-${idx}`} className={`rounded-lg p-4 ${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                <div className="text-white font-semibold mb-3">{row.label}</div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">MonthlyClub</span>
                    <span className="text-right max-w-[60%] leading-5">{row.mc}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">Patreon</span>
                    <span className="text-right max-w-[60%] leading-5">{row.patreon}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground">Direct Debit</span>
                    <span className="text-right max-w-[60%] leading-5">{row.dd}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            1: Fees vary by country, payment method, and provider plan. Examples shown use UK Stripe card pricing (1.5% + 20p) and Stripe Bacs Direct Debit (1% + 20p, cap ~£4). Patreon platform fee varies by plan (5%–12%) + separate processing fees. Always check vendor pricing pages.
          </p>
        </div>
      </section>

      {/* Pricing Breakdown */}


      {/* Examples: Standard Subscriptions */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-2">Example Payouts</h2>
          <p className="text-center text-muted-foreground mb-8">How a single payment breaks down with our fees</p>
          <div className="bg-blue-50/10 border border-blue-200/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Payment Timing:</strong> When a customer's payment is processed, Stripe typically holds the funds for about 7 days before transferring them to your bank account. This is standard practice for payment processors to ensure transaction security.
            </p>
          </div>

          {/* Desktop/table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-sm md:text-base border-separate border-spacing-y-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left text-muted-foreground bg-white/10">
                  <th className="px-5 py-3">Customer pays</th>
                  <th className="px-5 py-3">Stripe fee (1.5% + 20p)</th>
                  <th className="px-5 py-3">MonthlyClub fee (1.5%)</th>
                  <th className="px-5 py-3">You receive</th>
                </tr>
              </thead>
              <tbody>
                {amounts.map((amount, idx) => {
                  const stripeFee = amount * 0.015 + 0.20;
                  const mcFee = amount * 0.015;
                  const youGet = amount - stripeFee - mcFee;
                  return (
                    <tr key={amount} className={`${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'} hover:bg-white/15 transition`}> 
                      <td className="px-5 py-3 font-medium text-white">{formatGBP(amount)}</td>
                      <td className="px-5 py-3">{formatGBP(stripeFee)}</td>
                      <td className="px-5 py-3">{formatGBP(mcFee)}</td>
                      <td className="px-5 py-3 font-semibold text-emerald-400">{formatGBP(youGet)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile/cards */}
          <div className="grid gap-3 md:hidden">
            {amounts.map((amount, idx) => {
              const stripeFee = amount * 0.015 + 0.20;
              const mcFee = amount * 0.015;
              const youGet = amount - stripeFee - mcFee;
              return (
                <div key={`m-${amount}`} className={`rounded-lg p-4 ${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Customer pays</span>
                    <span className="font-semibold text-white">{formatGBP(amount)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Stripe fee</span>
                    <span>{formatGBP(stripeFee)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">MonthlyClub fee</span>
                    <span>{formatGBP(mcFee)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                    <span className="text-sm text-muted-foreground">You receive</span>
                    <span className="font-semibold text-emerald-400">{formatGBP(youGet)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Examples: Balance Builder */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">Balance Builder Examples</h3>
          <p className="text-center text-muted-foreground mb-8">Customers get every penny added to their balance; you see fees on payout</p>

          {/* Desktop/table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-sm md:text-base border-separate border-spacing-y-0 rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left text-muted-foreground bg-white/10">
                  <th className="px-5 py-3">Customer pays</th>
                  <th className="px-5 py-3">Added to customer balance</th>
                  <th className="px-5 py-3">Stripe fee (1.5% + 20p)</th>
                  <th className="px-5 py-3">MonthlyClub fee (1.5%)</th>
                  <th className="px-5 py-3">You receive</th>
                </tr>
              </thead>
              <tbody>
                {amounts.map((amount, idx) => {
                  const stripeFee = amount * 0.015 + 0.20;
                  const mcFee = amount * 0.015;
                  const youGet = amount - stripeFee - mcFee;
                  return (
                    <tr key={`bb-${amount}`} className={`${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'} hover:bg-white/15 transition`}>
                      <td className="px-5 py-3 font-medium text-white">{formatGBP(amount)}</td>
                      <td className="px-5 py-3 font-medium">{formatGBP(amount)}</td>
                      <td className="px-5 py-3">{formatGBP(stripeFee)}</td>
                      <td className="px-5 py-3">{formatGBP(mcFee)}</td>
                      <td className="px-5 py-3 font-semibold text-emerald-400">{formatGBP(youGet)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile/cards */}
          <div className="grid gap-3 md:hidden">
            {amounts.map((amount, idx) => {
              const stripeFee = amount * 0.015 + 0.20;
              const mcFee = amount * 0.015;
              const youGet = amount - stripeFee - mcFee;
              return (
                <div key={`mbb-${amount}`} className={`rounded-lg p-4 ${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Customer pays</span>
                    <span className="font-semibold text-white">{formatGBP(amount)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Added to balance</span>
                    <span className="font-medium">{formatGBP(amount)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Stripe fee</span>
                    <span>{formatGBP(stripeFee)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">MonthlyClub fee</span>
                    <span>{formatGBP(mcFee)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                    <span className="text-sm text-muted-foreground">You receive</span>
                    <span className="font-semibold text-emerald-400">{formatGBP(youGet)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Included Features */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What's Included
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to launch and grow your subscription club.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            "Custom branded storefront",
            "AI-powered product descriptions",
            "Stripe integration for secure payments",
            "Mobile-optimized checkout",
            "Dashboard with analytics",
            "Recurring billing engine",
            "Flexible customer management",
            "Built-in fraud protection"
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 mt-1 text-primary" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Still have questions? We've got answers.
          </p>
        </div>
        <div className="space-y-6 max-w-3xl mx-auto">
          {[
            {
              q: "Do I need to pay anything upfront?",
              a: "Nope! MonthlyClub is free to start. You only pay a small percentage when you make a sale."
            },
            {
              q: "How does Stripe billing work?",
              a: "Stripe charges 1.5% + 20p per transaction. MonthlyClub integrates directly so you don’t have to manage billing."
            },
            {
              q: "Can I cancel at any time?",
              a: "Yes — there are no contracts or lock-ins. You can pause or stop anytime."
            },
            {
              q: "Is there a minimum number of subscribers?",
              a: "No, you can start with just one paying customer."
            }
          ].map((item, i) => (
            <details key={i} className="bg-muted/30 p-4 rounded-lg shadow">
              <summary className="font-semibold text-foreground cursor-pointer">
                {item.q}
              </summary>
              <p className="mt-2 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

            {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 shadow-glow overflow-hidden relative">
            <CardContent className="p-6 relative z-10">
              <div className="absolute inset-0 bg-black/10"></div>
              <h2 className="text-4xl md:text-5xl gradient-text font-bold mb-6 relative z-10">
                Start for Free Today
              </h2>
              <p className="text-xl mb-8 opacity-90 relative z-10">
                Only pay when you earn. It's that simple.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                               <Link href="/create-a-business">
                <Button className="hero-button-primary bg-white text-primary hover:bg-white/90">
                  Start Creating Now
                <Sparkles className="w-5 h-5 ml-2" />
                </Button>
             </Link>

          
              </div>
            </CardContent>
            
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          </Card>
        </div>
      </section>
    </div>

    <Script id="pricing-schema" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Pricing",
        "url": "https://www.monthlyclubhq.com/pricing",
        "description": "No subscriptions or hidden fees. Just 1.5% + 20p for Stripe and 1.5% for MonthlyClub per transaction."
      })}
    </Script>
    </>
  );
};

export default PricingPage;