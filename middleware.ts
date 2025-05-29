// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = (request as NextRequest & { geo?: { country?: string } }).geo?.country || 'XX';
  const userAgent = request.headers.get('user-agent') || ''

  // Let search engine and AI bots through
  const allowedBots = [
    'Googlebot',
    'Bingbot',
    'DuckDuckBot',
    'GPTBot',
    'AnthropicBot',
    'facebookexternalhit',
    'Twitterbot',
    'LinkedInBot',
    'Slackbot'
  ]
  const isBot = allowedBots.some(bot => userAgent.includes(bot))

  // Allow users from allowed countries and bots
  const allowedCountries = new Set(['GB', 'US', 'FR', 'DE', 'ES', 'IT', 'PT', 'NO', 'SE', 'NL', 'BE']);
  if (allowedCountries.has(country) || isBot) {
    return NextResponse.next();
  }

  // Redirect others to the "unavailable" page
  return NextResponse.redirect(new URL('/unavailable', request.url))
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|api).*)'], // skip Next.js internals and API routes
}
