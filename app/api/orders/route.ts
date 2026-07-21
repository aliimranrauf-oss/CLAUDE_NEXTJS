import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

// ── POST /api/orders ─────────────────────────────────────────────────────
// Replaces the old flow where app/contact/page.tsx wrote to Supabase
// directly from the browser using the public anon key. Now:
//   1. The insert happens server-side with the service-role key.
//   2. A very basic honeypot + rate-limit-friendly shape check blocks
//      obvious bots.
//   3. You (the owner) get an email the moment an order comes in, and the
//      customer gets a confirmation — neither of which existed before.
//
// Required env vars (set in Vercel → Project → Settings → Environment
// Variables): SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY,
// ORDER_NOTIFICATION_EMAIL, RESEND_FROM_EMAIL.
// If RESEND_API_KEY isn't set yet, the order still saves — email sending
// is just skipped (logged) so you're never blocked from taking orders.

export async function POST(req: NextRequest) {
  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Honeypot field: a real browser never fills this (it's hidden via CSS in
  // the form). Bots that auto-fill every field will trip it.
  if (body.website) {
    return NextResponse.json({ ok: true }) // pretend success, drop silently
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()

  if (!name || !email || !email.includes('@')) {
    return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 400 })
  }

  const order = {
    name,
    email,
    domain: body.domain ? String(body.domain).trim() : null,
    platform: body.platform ? String(body.platform).trim() : null,
    package: body.package ? String(body.package).trim() : null,
    payment: body.payment ? String(body.payment).trim() : null,
    message: body.message ? String(body.message).trim() : null,
  }

  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin.from('orders').insert([order]).select().single()
    if (error) throw error

    await sendOrderEmails(order)

    return NextResponse.json({ ok: true, id: data?.id })
  } catch (err: any) {
    console.error('Order creation failed:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

async function sendOrderEmails(order: {
  name: string
  email: string
  domain: string | null
  platform: string | null
  package: string | null
  payment: string | null
  message: string | null
}) {
  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.ORDER_NOTIFICATION_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'orders@makemystore.online'

  if (!apiKey || !ownerEmail) {
    console.warn(
      'RESEND_API_KEY or ORDER_NOTIFICATION_EMAIL not set — skipping order notification email.'
    )
    return
  }

  const ownerHtml = `
    <h2>New order on MakeMyStore.online</h2>
    <p><b>Name:</b> ${escapeHtml(order.name)}</p>
    <p><b>Email:</b> ${escapeHtml(order.email)}</p>
    <p><b>Domain:</b> ${escapeHtml(order.domain || '—')}</p>
    <p><b>Platform:</b> ${escapeHtml(order.platform || '—')}</p>
    <p><b>Package:</b> ${escapeHtml(order.package || '—')}</p>
    <p><b>Payment:</b> ${escapeHtml(order.payment || '—')}</p>
    <p><b>Message:</b><br/>${escapeHtml(order.message || '—')}</p>
  `

  const customerHtml = `
    <p>Hi ${escapeHtml(order.name)},</p>
    <p>Thanks for your order with MakeMyStore.online! We've received your details and
    our team will reach out shortly to confirm the next steps.</p>
    <p>If you have questions in the meantime, just reply to this email and we'll get
    back to you.</p>
    <p>— MakeMyStore.online</p>
  `

  const send = (to: string, subject: string, html: string) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: fromEmail, to, subject, html }),
    })

  try {
    await Promise.all([
      send(ownerEmail, `New order — ${order.name}`, ownerHtml),
      send(order.email, 'We received your order — MakeMyStore.online', customerHtml),
    ])
  } catch (err) {
    // Never let an email failure block the order — it's already saved.
    console.error('Failed to send order notification emails:', err)
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
