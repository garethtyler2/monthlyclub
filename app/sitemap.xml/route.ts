import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://www.monthlyclubhq.com"

  const formatDate = (date: string | Date) =>
    new Date(date).toISOString().split("T")[0]

  // Only include the homepage and all guides for sitemap
  const staticPaths = [
    "",
    "how-it-works",
    "pricing",
    "features",
    "guides/automate-payments-stripe",
    "guides/cleaning-subscription-model",
    "guides/create-subscription-plan",
    "guides/pricing-subscription-plans-service-business",
    "guides/subscription-launch-checklist",
    "guides/balance-builder-subscriptions-guide",
    "guides/hairdresser-subscriptions",
    "guides/how-monthly-club-helps",
    "guides/marketing-subscription-services",
    "guides/recurring-revenue-benefits",
    "guides/service-subscription-examples",
    "guides/subscription-billing-tools",
    "guides/subscription-ideas-for-service-businesses",
    "guides/what-is-a-service-subscription",
  ]

  const urls = [
    ...staticPaths.map(
      (path) => `
    <url>
      <loc>${baseUrl}/${path}</loc>
      <lastmod>${formatDate(new Date())}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    ),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  })
}