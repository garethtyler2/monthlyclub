import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://www.monthlyclubhq.com"

  const formatDate = (date: string | Date) =>
    new Date(date).toISOString().split("T")[0]

  // Include homepage, guides, and use-cases for sitemap
  const staticPaths = [
    "",
    "how-it-works",
    "pricing",
    "features",
    "guides",
    "use-cases",
    "guides/automate-payments-stripe",
    "guides/create-subscription-plan",
    "guides/pricing-subscription-plans-service-business",
    "guides/subscription-launch-checklist",
    "guides/balance-builder-subscriptions-guide",
    "guides/how-monthly-club-helps",
    "guides/marketing-subscription-services",
    "guides/recurring-revenue-benefits",
    "guides/service-subscription-examples",
    "guides/subscription-billing-tools",
    "guides/subscription-ideas-for-service-businesses",
    "guides/what-is-a-service-subscription",
    "use-cases/sports-club-membership-software",
    "use-cases/hairdressers-subscription-software",
    "use-cases/cleaning-subscription-software",
    "use-cases/window-cleaning-subscription-software",
    "use-cases/gardener-subscription-service",
    "use-cases/car-valeting-subscription-software",
    "use-cases/pet-sitter-subscription-software",
    "use-cases/personal-trainers-gym-memberships",
    "use-cases/gym-membership-software",
    "use-cases/beauty-salon-subscription-software",
    "use-cases/tattoo-artist-buy-now-pay-later",
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