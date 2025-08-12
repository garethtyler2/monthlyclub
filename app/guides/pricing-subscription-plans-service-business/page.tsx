import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing Your Subscription Plans for Service Businesses | Monthly Club",
  description:
    "A complete guide to subscription pricing for service businesses: models, value metrics, trials vs discounts, payment day strategy, and example pricing tables.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/pricing-subscription-plans-service-business",
  },
  openGraph: {
    title: "Pricing Your Subscription Plans for Service Businesses",
    description:
      "Learn subscription pricing models, anchoring, value metrics, payment day strategy, and see example pricing tables by niche.",
    url: "https://www.monthlyclubhq.com/guides/pricing-subscription-plans-service-business",
    type: "article",
    siteName: "Monthly Club",
    images: [
      {
        url: "https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png",
        width: 1200,
        height: 630,
        alt: "Monthly Club",
      },
    ],
  },
};

export default function PricingSubscriptionPlansGuide() {
  const primaryKeyword = "subscription pricing for service businesses";

  const toc = [
    { id: "pricing-models", label: "Pricing models" },
    { id: "anchoring", label: "Anchoring & value metrics" },
    { id: "trials", label: "Trials vs. discounts" },
    { id: "payment-day", label: "Payment day strategy" },
    { id: "examples", label: "Example pricing tables" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Pricing Your Subscription Plans for Service Businesses | Monthly Club</title>
        <meta
          name="description"
          content="A complete guide to subscription pricing for service businesses: models, value metrics, trials vs. discounts, payment day strategy, and example pricing tables."
        />
        <meta name="robots" content="index,follow" />
        <link
          rel="canonical"
          href="https://www.monthlyclubhq.com/guides/pricing-subscription-plans-service-business"
        />
        <meta name="keywords" content={`${primaryKeyword}, subscription pricing models, tiered pricing, usage pricing, pricing tables by niche`} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing Your Subscription Plans for Service Businesses" />
        <meta name="twitter:description" content="Learn pricing models, anchoring, payment day strategy and see example tables by niche." />
        <meta name="twitter:image" content="https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/guides/pricing-subscription-plans-service-business",
              },
              headline: "Pricing Your Subscription Plans for Service Businesses",
              description:
                "A complete guide to subscription pricing for service businesses: models, value metrics, trials vs. discounts, payment day strategy, and example pricing tables.",
              author: {
                "@type": "Organization",
                name: "Monthly Club",
                url: "https://www.monthlyclubhq.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png",
                },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
              articleSection: [
                "Common pricing models",
                "Anchoring and value metrics",
                "Trial vs. discount vs. first-month promos",
                "Payment day strategy",
                "Example pricing tables by niche",
              ],
              keywords: primaryKeyword,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.monthlyclubhq.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.monthlyclubhq.com/guides" },
                { "@type": "ListItem", position: 3, name: "Pricing Your Subscription Plans" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-purple/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-5 text-sm">
              <Link href="/guides" className="text-brand-purple hover:underline">← Back to Guides</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Pricing Your Subscription Plans for Service Businesses
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              A practical handbook for {primaryKeyword}: models, anchoring, promos and payment‑day strategy — plus ready‑to‑use pricing tables by niche.
            </p>
            {/* Mobile TOC */}
            <details className="md:hidden mt-5 rounded-lg border border-white/10 p-3 bg-white/5">
              <summary className="cursor-pointer text-sm font-medium">Table of contents</summary>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-brand-purple hover:underline">{item.label}</a>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

              <article className="prose prose-base md:prose-lg max-w-none dark:prose-invert space-y-8 md:space-y-10">
              <h2 id="pricing-models">Common pricing models</h2>
              <p>
                The most common models for service subscriptions are flat, tiered, and usage-linked. For local services, we recommend starting with a
                <strong> flat monthly</strong> plan, then layering <strong>tiers</strong> (e.g., basic/standard/premium) when you have clear value differences, or
                <strong> usage</strong> when session counts vary widely.
              </p>
              <ul>
                <li><strong>Flat</strong>: One monthly price for a defined bundle (e.g., 2 cleans/month).</li>
                <li><strong>Tiered</strong>: Good/better/best packages with clear added benefits.</li>
                <li><strong>Usage</strong>: Price scales by number of visits or time; cap usage to keep margins predictable.</li>
              </ul>

              <h2 id="anchoring">Anchoring and value metrics</h2>
              <p>
                Price perception improves when you anchor against <em>retail value</em>, <em>time saved</em>, or <em>outcomes</em>. Use a value metric that matches customer goals (e.g., visits/month, hours saved, areas cleaned) and present a
                "retail vs. member" comparison. On your plan card, include: <strong>normal price</strong>, <strong>member price</strong>, and <strong>you save X%</strong>.
              </p>

              <h2 id="trials">Trial vs. discount vs. first-month promos</h2>
              <p>
                Trials reduce friction but can attract tire‑kickers; discounts convert faster but risk anchoring low. For most service businesses we suggest a
                <strong> modest first‑month discount (10–20%)</strong> with clear renewal to the standard price. If you use free trials, require a card and limit benefits.
              </p>

              <h2 id="payment-day">Setting payment day strategy</h2>
              <p>
                Align the billing day with cash‑flow needs and customer expectations. Popular options are <strong>anniversary billing</strong> (same day each month) or a chosen
                <strong> preferred payment day</strong> (e.g., the 1st or 15th). If your business is busiest at month‑end, collect earlier to avoid payment collisions. Monthly Club supports preferred payment day configuration.
              </p>

              <h2 id="examples">Example pricing tables by niche</h2>
              <p>Use these as starting points and adjust for local rates and demand.</p>
              <div className="not-prose overflow-x-auto rounded-lg border border-white/10 bg-white/5">
                <table className="min-w-[640px] w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-3 py-2 text-left">Business Type</th>
                      <th className="px-3 py-2 text-left">Basic</th>
                      <th className="px-3 py-2 text-left">Standard</th>
                      <th className="px-3 py-2 text-left">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-white/10">
                      <td className="px-3 py-2">Home Cleaning</td>
                      <td className="px-3 py-2">£49/mo (1 clean)</td>
                      <td className="px-3 py-2">£89/mo (2 cleans)</td>
                      <td className="px-3 py-2">£129/mo (3 cleans + deep clean 1x/qtr)</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="px-3 py-2">Hair &amp; Beauty</td>
                      <td className="px-3 py-2">£35/mo (1 blow dry)</td>
                      <td className="px-3 py-2">£65/mo (2 blow dries)</td>
                      <td className="px-3 py-2">£99/mo (3 blow dries + treatment)</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="px-3 py-2">Dog Grooming</td>
                      <td className="px-3 py-2">£29/mo (bath)</td>
                      <td className="px-3 py-2">£55/mo (bath + tidy)</td>
                      <td className="px-3 py-2">£85/mo (full groom + nail trim)</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="px-3 py-2">Personal Training</td>
                      <td className="px-3 py-2">£79/mo (1 session)</td>
                      <td className="px-3 py-2">£149/mo (2 sessions)</td>
                      <td className="px-3 py-2">£219/mo (3 sessions + plan)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2>Next steps</h2>
              <ul>
                <li>Start with a simple flat plan; add a tier if demand outstrips capacity.</li>
                <li>Anchor prices with retail comparison and hours saved.</li>
                <li>Test a first‑month discount; keep renewal price clear.</li>
                <li>Pick a payment day that smooths cash flow.</li>
              </ul>

              <div className="mt-8">
                <Link href="/create-a-business/step-one" className="hero-button-primary">Create your plan</Link>
              </div>
              </article>


            {/* Desktop sticky TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-lg border border-white/10 p-4 bg-white/5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">On this page</p>
                <ul className="space-y-2 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-brand-purple hover:underline">{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}


