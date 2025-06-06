export async function GET(request: Request) {
    const url = new URL(request.url)
    const hostname = url.hostname
  
    const isProductionDomain = hostname === "monthlyclubhq.com"
    const content = isProductionDomain
      ? "User-agent: *\nAllow: /"
      : "User-agent: *\nDisallow: /"
  
    return new Response(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }
  