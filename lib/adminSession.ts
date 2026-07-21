// ── Signed admin session tokens ─────────────────────────────────────────────
// Uses Web Crypto (available in both the Edge middleware runtime and the
// Node.js runtime used by route handlers) so the exact same code verifies
// the cookie in middleware.ts and issues it in app/api/admin-auth/route.ts.
//
// This replaces the old client-side check against NEXT_PUBLIC_ADMIN_PASSWORD,
// which shipped the password inside the JS bundle for anyone to read.

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8 // 8 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error(
      'ADMIN_SESSION_SECRET is not set. Add it in your Vercel project env vars (any long random string).'
    )
  }
  return secret
}

function base64url(bytes: ArrayBuffer): string {
  const b = Buffer.from(bytes)
  return b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function hmac(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return base64url(sig)
}

/** Creates a signed "expiry.signature" token to store in an httpOnly cookie. */
export async function createSessionToken(): Promise<string> {
  const secret = getSecret()
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  const payload = String(expires)
  const sig = await hmac(payload, secret)
  return `${payload}.${sig}`
}

/** Verifies a session token from the cookie. Returns true only if valid and not expired. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return false

  const expires = Number(payload)
  if (!Number.isFinite(expires) || Date.now() > expires) return false

  try {
    const secret = getSecret()
    const expectedSig = await hmac(payload, secret)
    return expectedSig === sig
  } catch {
    return false
  }
}

export const ADMIN_SESSION_COOKIE = 'mms_admin_session'
export const ADMIN_SESSION_MAX_AGE = SESSION_MAX_AGE_SECONDS
