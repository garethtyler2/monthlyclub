import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscription Launch Checklist: From Idea to First 10 Subscribers | Monthly Club",
  description:
    "A practical checklist to launch a subscription business: validate your offer, create plans, set up Stripe, warm up with business posts, and use email/social launch templates.",
  alternates: {
    canonical: "https://www.monthlyclubhq.com/guides/subscription-launch-checklist",
  },
  openGraph: {
    title: "Subscription Launch Checklist: From Idea to First 10 Subscribers",
    description:
      "Follow this checklist to launch your subscription: validation, plan creation, Stripe tests, business posts, and ready-to-copy launch templates.",
    url: "https://www.monthlyclubhq.com/guides/subscription-launch-checklist",
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

export default function SubscriptionLaunchChecklistGuide() {
  const primaryKeyword = "launch a subscription business checklist";
  const toc = [
    { id: "validate", label: "Validate your offer & audience" },
    { id: "create-plans", label: "Create plans in Monthly Club" },
    { id: "stripe", label: "Stripe setup & test payments" },
    { id: "posts", label: "Business posts to warm up" },
    { id: "templates", label: "Launch email & social templates" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Subscription Launch Checklist: From Idea to First 10 Subscribers | Monthly Club</title>
        <meta
          name="description"
          content="Step-by-step checklist to launch a subscription business: validate, create plans, Stripe tests, warm-up posts, and launch templates."
        />
        <link rel="canonical" href="https://www.monthlyclubhq.com/guides/subscription-launch-checklist" />
        <meta name="keywords" content={`${primaryKeyword}, subscription launch, first subscribers, launch templates`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.monthlyclubhq.com/guides/subscription-launch-checklist",
              },
              headline: "Subscription Launch Checklist: From Idea to First 10 Subscribers",
              description:
                "A practical checklist to launch a subscription business: validation, plan creation, Stripe tests, business posts, and launch templates.",
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
      </Head>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-14 md:py-20 bg-gradient-to-b from-brand-blue/10 to-transparent">
          <div className="container mx-auto px-6 max-w-5xl">
            <nav className="mb-6 text-sm">
              <Link href="/guides" className="text-brand-purple hover:underline">← Back to Guides</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Subscription Launch Checklist: From Idea to First 10 Subscribers
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
              Use this {primaryKeyword} to validate your offer, create your plans, run test charges in Stripe, warm up your audience with posts, and copy the exact launch templates.
            </p>
            {/* Mobile TOC */}
            <details className="md:hidden mt-6 rounded-lg border border-white/10 p-3 bg-white/5">
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

        {/* Content + Desktop TOC */}
        <section className="py-10">
          <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
            <article className="prose prose-gray max-w-none dark:prose-invert">
              <h2 id="validate">Validate the offer and audience</h2>
              <ul>
                <li>Write your one‑sentence value prop and 3 plan names with prices.</li>
                <li>Ask 5–10 target customers for feedback (quick call or DM), capture objections.</li>
                <li>Decide your initial plan structure (flat vs. tiered) and inclusions.</li>
              </ul>

              <h2 id="create-plans">Create plans in Monthly Club</h2>
              <ul>
                <li>Create your business and add one or two starter plans.</li>
                <li>Set plan copy: benefits, what’s included, and a clear CTA.</li>
                <li>Set preferred payment day and enable balance builder if relevant.</li>
              </ul>

              <h2 id="stripe">Stripe setup and test payments</h2>
              <ul>
                <li>Connect Stripe; add a test card and run at least one test subscription.</li>
                <li>Verify payment method updates and cancellation flows.</li>
                <li>Confirm emails/receipts render correctly and links work on mobile.</li>
              </ul>

              <h2 id="posts">Business posts to warm up audience</h2>
              <ul>
                <li>Publish 3–5 posts: behind‑the‑scenes, first‑month offer, FAQ answers.</li>
                <li>Include 1 image per post and a link back to the plan page.</li>
                <li>Pin or reshare your top converting post on launch day.</li>
              </ul>

              <h2 id="templates">Launch email + social post templates</h2>
              <p><strong>Email 1: Announcement</strong> — Subject: “We’re launching memberships!”</p>
              <pre className="not-prose whitespace-pre-wrap rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
{`Hi [Name],
I’m excited to launch our new membership. Get [benefit] for just [price]/month.
👉 Join here: [plan link]
Questions? Reply to this email.`}
              </pre>
              <p><strong>Social post:</strong></p>
              <pre className="not-prose whitespace-pre-wrap rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
{`We're launching memberships 🚀
• [Benefit 1]
• [Benefit 2]
Founding offer this month only → [plan link]`}
              </pre>

              <h2>Next steps</h2>
              <ul>
                <li>Finalize plan copy and pricing; share with 3 friendly customers first.</li>
                <li>Schedule your launch posts and emails for the same morning.</li>
                <li>Track the first 10 signups, note objections, and refine plan copy.</li>
              </ul>

              <div className="mt-8">
                <Link href="/create-a-business/step-one" className="hero-button-primary inline-block px-4 py-2 rounded-lg">Create your plans</Link>
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


