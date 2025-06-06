import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const baseUrl = ""

  const formatDate = (date: string | Date) =>
    new Date(date).toISOString().split("T")[0]

  // Only include the homepage for sitemap
  const staticPaths = [""]

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