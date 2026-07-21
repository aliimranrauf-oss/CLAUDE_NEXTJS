import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, createSessionToken } from '@/lib/adminSession'

// ── POST /api/admin-auth ────────────────────────────────────────────────────
// Verifies the password SERVER-SIDE against process.env.ADMIN_PASSWORD
// (no NEXT_PUBLIC_ prefix — never sent to the browser) and, if correct,
// sets an httpOnly signed session cookie. The browser never sees the
// real password after this point, only an opaque signed token.
export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { error: 'Server is not configured. Set ADMIN_PASSWORD in your Vercel env vars.' },
      { status: 500 }
    )
  }

  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!body.password || body.password !== adminPassword) {
    // Same generic message either way — don't reveal which part was wrong.
    return NextResponse.json({ error: 'Wrong password. Try again.' }, { status: 401 })
  }

  const token = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE,
  })
  return res
}

// ── DELETE /api/admin-auth ──────────────────────────────────────────────────
// Logs out by clearing the session cookie.
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}
