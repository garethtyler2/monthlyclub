import Link from "next/link";
import React from "react";

export type TocItem = { id: string; label: string };

interface GuideLayoutProps {
  title: string;
  summary: string;
  toc: TocItem[];
  backHref?: string;
  heroTone?: "purple" | "blue" | "indigo";
  children: React.ReactNode;
}

/**
 * Consistent layout for all Guides pages.
 * - Hero with gradient tone and summary
 * - Mobile expandable TOC and desktop sticky TOC
 * - Glass card wrapper for article content
 */
export default function GuideLayout({
  title,
  summary,
  toc,
  backHref = "/guides",
  heroTone = "purple",
  children,
}: GuideLayoutProps) {
  const toneMap: Record<string, string> = {
    purple: "from-brand-purple/10",
    blue: "from-brand-blue/10",
    indigo: "from-brand-indigo/10",
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className={`py-14 md:py-20 bg-gradient-to-b ${toneMap[heroTone]} to-transparent`}>
        <div className="container mx-auto px-6 max-w-5xl">
          <nav className="mb-6 text-sm">
            <Link href={backHref} className="text-brand-purple hover:underline">
              ← Back to Guides
            </Link>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">{summary}</p>

          {/* Mobile TOC */}
          {toc?.length > 0 && (
            <details className="md:hidden mt-6 rounded-lg border border-white/10 p-3 bg-white/5">
              <summary className="cursor-pointer text-sm font-medium">Table of contents</summary>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-brand-purple hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </section>

      {/* Content + Desktop TOC */}
      <section className="py-10">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div className="glass-card p-6 md:p-8">
            <article className="prose prose-base md:prose-lg max-w-none dark:prose-invert">{children}</article>
          </div>

          {toc?.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-lg border border-white/10 p-4 bg-white/5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">On this page</p>
                <ul className="space-y-2 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-brand-purple hover:underline">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}


