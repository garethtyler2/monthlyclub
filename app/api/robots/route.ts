export async function GET() {
    const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production"
    const content = isProduction
      ? "User-agent: *\nAllow: /"
      : "User-agent: *\nDisallow: /"
  
    return new Response(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }
  