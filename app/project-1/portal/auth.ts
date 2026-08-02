// Demo-only "authentication" for the Client Portal. Nothing here talks to a
// server — it exists purely to demonstrate a realistic portal UX flow.

export const DEMO_ACCOUNT = {
  email: 'client@marfa-urban.demo',
  password: 'demo1234',
}

const STORAGE_KEY = 'p1-portal-session'

export function signIn(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, signedInAt: Date.now() }))
    }
    return true
  }
  return false
}

export function signOut() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY)
  }
}

export function getSession(): { email: string; signedInAt: number } | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}
