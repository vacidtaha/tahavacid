import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')
  const url = request.nextUrl.clone()
  
  // Subdomain kontrolü
  if (host?.startsWith('contact.')) {
    // contact.tahavacid.com -> /contact sayfasına yönlendir
    url.pathname = '/contact'
    return NextResponse.rewrite(url)
  }
  
  // Diğer subdomain'ler için de benzer kontroller eklenebilir
  // Örnek: blog.tahavacid.com, api.tahavacid.com
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 