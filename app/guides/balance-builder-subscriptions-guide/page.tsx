import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Balance Builder Subscriptions: How and When to Use Them | Monthly Club",
  description:
    "Learn what Balance Builder (prepaid service credit) is, who it suits, how to price it, and how to position it without implying credit reporting.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/balance-builder-subscriptions-guide",
  },
  openGraph: {
    title: "Balance Builder Subscriptions: How and When to Use Them",
    description:
      "A practical guide to prepaid service credit plans: set amounts, messaging, examples by niche, and simple compliance notes.",
    url: "https://www.monthlyclubhq.com/guides/balance-builder-subscriptions-guide",
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

export default function BalanceBuilderGuide() {
  const primaryKeyword = "balance builder subscriptions";
  const toc = [
    { id: "what", label: "What is Balance Builder?" },
    { id: "who", label: "Who it suits & when to use" },
    { id: "pricing", label: "How to price contribution amounts" },
    { id: "messaging", label: "Messaging: build service credit (not credit reports)" },
    { id: "switching", label: "Switching from standard plans" },
    { id: "examples", label: "Examples by niche" },
    { id: "compliance", label: "Simple compliance notes" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Balance Builder Subscriptions: How and When to Use Them | Monthly Club</title>
        <meta
          name="description"
          content="Learn what Balance Builder (prepaid service credit) is, who it suits, how to price it, how to position it without implying credit reporting, plus examples by niche."
        />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/balance-builder-subscriptions-guide" />
        <meta name="keywords" content={`${primaryKeyword}, prepaid service credit, build service credit, subscription wallet`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Balance Builder Subscriptions: How and When to Use Them" />
        <meta name="twitter:description" content="Prepaid service credit plans: set amounts, messaging, examples by niche, and simple compliance notes." />
        <meta name="twitter:image" content="https://www.monthlyclubhq.com/images/MonthlyClubHomepageImage.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/guides/balance-builder-subscriptions-guide",
              },
              headline: "Balance Builder Subscriptions: How and When to Use Them",
              description:
                "A practical guide to prepaid service credit plans: set amounts, messaging, examples by niche, and simple compliance notes.",
              author: { "@type": "Organization", name: "Monthly Club", url: "https://www.monthlyclubhq.com" },
              publisher: {
                "@type": "Organization",
                name: "Monthly Club",
                logo: { "@type": "ImageObject", url: "https://www.monthlyclubhq.com/images/MonthlyClubLogo.png" },
              },
              datePublished: new Date().toISOString().slice(0, 10),
              dateModified: new Date().toISOString().slice(0, 10),
              articleSection: toc.map((t) => t.label),
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
                { "@type": "ListItem", position: 3, name: "Balance Builder Subscriptions" },
              ],
            }),
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-brand-indigo/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-5 text-sm">
              <Link href="/guides" className="text-brand-purple hover:underline">← Back to Guides</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Balance Builder Subscriptions: How and When to Use Them
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Balance Builder lets customers prepay into a wallet they can use later for services — ideal when visits vary. This guide shows how to price, position and launch it correctly.
            </p>
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
              <h2 id="what">What is Balance Builder?</h2>
              <p>
                A Balance Builder plan collects a <strong>fixed monthly contribution</strong> (e.g., £20/£40/£60). These contributions build up as
                <strong> service credit</strong> in the customer’s wallet and can be redeemed for services later. It’s not a loan and it’s <strong>not linked to credit reports</strong> —
                it’s simply prepaid store credit for your services.
              </p>

              <h2 id="who">Who it suits & when to use</h2>
              <ul>
                <li>Customers with <em>irregular visit patterns</em> (beauty, car care, pet services).</li>
                <li>High‑ticket but infrequent work (detailing, deep cleans, treatments).</li>
                <li>Seasonal services where customers prefer to spread costs across months.</li>
              </ul>

              <h2 id="pricing">How to price contribution amounts</h2>
              <ul>
                <li>Offer <strong>3 tiers</strong> (e.g., £20, £40, £60) and map each to an example outcome (“build credit for a deep clean every 3 months”).</li>
                <li>Add a <strong>small top‑up bonus</strong> occasionally (e.g., +£5 credit when contributing £60) to reward higher tiers.</li>
                <li>Show a <strong>“credit to service” table</strong> so customers see how fast they reach a goal.</li>
              </ul>

              <h2 id="messaging">Messaging: build service credit (not credit reports)</h2>
              <p>
                Use language like <em>“build service credit,” “prepaid balance,” “wallet,”</em> and avoid “credit score/report.” Make clear this is <strong>store credit for your services only</strong>.
                Suggested line: “Your monthly contributions build service credit you can redeem for treatments/cleans — it’s not a loan and not reported to credit agencies.”
              </p>

              <h2 id="switching">Switching from standard plans</h2>
              <ul>
                <li>Migrate customers who skip months or frequently reschedule.</li>
                <li>Keep your normal plans for regulars; offer Balance Builder as a <strong>flexible alternative</strong>.</li>
                <li>Update your plan copy and post an announcement explaining who should switch.</li>
              </ul>

              <h2 id="examples">Examples by niche</h2>
              <div className="not-prose overflow-x-auto rounded-lg border border-white/10 bg-white/5">
                <table className="min-w-[640px] w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-3 py-2 text-left">Niche</th>
                      <th className="px-3 py-2 text-left">Examples</th>
                      <th className="px-3 py-2 text-left">Typical use of credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-white/10">
                      <td className="px-3 py-2">Beauty / Hair</td>
                      <td className="px-3 py-2">£20 / £40 / £60</td>
                      <td className="px-3 py-2">Build toward colour, facial, or 3rd blow‑dry</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="px-3 py-2">Auto care</td>
                      <td className="px-3 py-2">£25 / £50 / £75</td>
                      <td className="px-3 py-2">Detailing every 2–3 months</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="px-3 py-2">Home services</td>
                      <td className="px-3 py-2">£20 / £40 / £80</td>
                      <td className="px-3 py-2">Deep clean, gutter clear, or seasonal jobs</td>
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="px-3 py-2">Pets</td>
                      <td className="px-3 py-2">£15 / £30 / £60</td>
                      <td className="px-3 py-2">Full groom every few months</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 id="tips">Tips for a smooth launch</h2>
              <ul>
                <li>Highlight that customers can use their balance flexibly for any of your services.</li>
                <li>Show example goals (e.g., "Save up for a deluxe treatment or use for regular visits").</li>
                <li>Use clear, friendly language like "wallet," "service credit," or "prepaid balance."</li>
              </ul>

              <h2>Next steps</h2>
              <ul>
                <li>Pick your three contribution tiers and set example goals for each.</li>
                <li>Update your plan copy to explain how the balance works and what it can be redeemed for.</li>
                <li>Announce your new Balance Builder with a business post—consider offering a bonus for early signups.</li>
              </ul>

              <div className="mt-8">
                <Link href="/create-a-business" className="hero-button-primary">Set up Balance Builder</Link>
              </div>
              </article>
     
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


