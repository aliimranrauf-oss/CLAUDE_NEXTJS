import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/adminSession'

// ── Server-side gate for /admin ─────────────────────────────────────────────
// Runs BEFORE any admin page code or JS bundle is sent to the browser.
// Replaces the old client-side password screen in app/admin/layout.tsx,
// which compared against a password that was visible in the public JS bundle.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Let the login page itself and its API route through.
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin-auth')) {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const valid = await verifySessionToken(token)

  if (!valid) {
    const loginUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
