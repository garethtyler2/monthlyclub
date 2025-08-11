import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Very lightweight middleware to set visitor country, currency and locale cookies
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  try {
    const country = req.headers.get('x-vercel-ip-country') || 'GB';
    const acceptLanguage = req.headers.get('accept-language') || 'en-GB,en;q=0.9';
    const locale = acceptLanguage.split(',')[0] || 'en-GB';

    const currency = mapCountryToCurrency(country);

    res.cookies.set('visitorCountry', country, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set('visitorLocale', locale, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    res.cookies.set('visitorCurrency', currency, { path: '/', maxAge: 60 * 60 * 24 * 7 });
  } catch {
    // no-op
  }

  return res;
}

function mapCountryToCurrency(countryCode: string): string {
  const code = (countryCode || 'GB').toUpperCase();
  switch (code) {
    case 'US': return 'usd';
    case 'GB': return 'gbp';
    case 'IE': return 'eur';
    case 'FR': return 'eur';
    case 'DE': return 'eur';
    case 'ES': return 'eur';
    case 'IT': return 'eur';
    case 'NL': return 'eur';
    case 'BE': return 'eur';
    case 'PT': return 'eur';
    case 'AT': return 'eur';
    case 'FI': return 'eur';
    case 'GR': return 'eur';
    case 'LU': return 'eur';
    case 'MT': return 'eur';
    case 'CY': return 'eur';
    case 'EE': return 'eur';
    case 'LV': return 'eur';
    case 'LT': return 'eur';
    case 'SK': return 'eur';
    case 'SI': return 'eur';
    case 'AD': return 'eur';
    case 'SM': return 'eur';
    case 'MC': return 'eur';
    case 'VA': return 'eur';
    case 'CA': return 'cad';
    case 'AU': return 'aud';
    case 'NZ': return 'nzd';
    case 'JP': return 'jpy';
    default: return 'gbp';
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'
  ],
};


