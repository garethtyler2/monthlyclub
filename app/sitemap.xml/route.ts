

import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

export async function GET() {
  const baseUrl = "https://ai-rehab.co.uk"

  // Static routes
  const staticPaths = [
    "",
    "injury-diagnosis",
    "prehab",
    "personal-training",
    "contact",
    "ai-rehab-insights",
    "ai-physical-rehabilitation",
    "ai-physical-rehabilitation/what-is-ai-physical-rehabilitation",
    "ai-physical-rehabilitation/personalized-rehab-plans",
    "ai-physical-rehabilitation/benefits-ai-physical-therapy",
    "ai-physical-rehabilitation/limitations-ai-rehabilitation",
    "ai-physical-rehabilitation/success-stories-ai-rehabilitation",
    "ai-physical-rehabilitation/ai-injury-identification",
    "ai-prehabilitation",
    "ai-prehabilitation/what-is-ai-powered-prehabilitation",
    "ai-prehabilitation/how-can-ai-help-prevent-injuries",
    "ai-prehabilitation/prehab-exercises-tailored-by-ai",
    "ai-prehabilitation/is-ai-prehabilitation-effective-for-surgery-prep",
    "ai-prehabilitation/how-does-ai-analyze-your-prehab-needs",
    "ai-personal-training",
    "ai-personal-training/what-is-ai-powered-personal-training",
    "ai-personal-training/how-can-ai-help-optimize-training-results",
    "ai-personal-training/examples-of-ai-personalized-workouts",
    "ai-personal-training/is-ai-effective-for-specific-fitness-goals",
    "ai-personal-training/how-does-ai-track-progress-in-training",
    "ai-physiotherapy",
    "ai-physiotherapy/how-ai-transforms-physiotherapy",
    "ai-physiotherapy/ai-in-injury-identification",
    "ai-physiotherapy/ai-for-rehabilitation-exercises",
    "ai-physiotherapy/ai-in-prehab-and-injury-prevention",
    "ai-physiotherapy/personalized-ai-training-for-recovery-and-fitness",
    "ai-physiotherapy/the-future-of-ai-in-physiotherapy-and-fitness",
    "ai-physiotherapy/online-physiotherapy",
    "ai-physiotherapy/virtual-vs-traditional-physio",
    "ai-physiotherapy/ai-physiotherapist",
    "ai-physiotherapy/home-physio-guide",
    "ai-physiotherapy/virtual-physio-faq",
  ]

  // Dynamic injury slugs
  const { data: injuries, error } = await supabase
    .from("injuries")
    .select("slug")
    .not("details", "is", null)

  if (error) {
    console.error("❌ Failed to load slugs for sitemap:", error)
  }

  const urls = [
    ...staticPaths.map(
      (path) => `
    <url>
      <loc>${baseUrl}/${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    ),
    ...(injuries || []).map(
      (injury) => `
    <url>
      <loc>${baseUrl}/injuries/${injury.slug}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
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