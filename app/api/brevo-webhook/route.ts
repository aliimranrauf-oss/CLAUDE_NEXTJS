import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

// ── POST /api/brevo-webhook ─────────────────────────────────────────────
// Brevo calls this URL every time something happens to an email you sent
// (delivered, opened, clicked, bounced, etc). Set this up once in:
//   Brevo → Settings (gear icon) → Webhooks → Transactional → Add a webhook
//   URL: https://YOURDOMAIN.com/api/brevo-webhook?secret=YOUR_SECRET
//   Events to check: Delivered, Opens, Clicks, Hard bounces, Spam, Unsubscribed
//
// The ?secret= check below stops randoms from spamming your table with fake
// events — set BREVO_WEBHOOK_SECRET in your env vars to any random string
// and put the same string in the webhook URL you paste into Brevo.
//
// Required env vars: SUPABASE_SERVICE_ROLE_KEY (already set),
// BREVO_WEBHOOK_SECRET, RESEND_API_KEY, ORDER_NOTIFICATION_EMAIL,
// RESEND_FROM_EMAIL (all already set if /api/orders works).

// Brevo's event names → our simplified event_type
const EVENT_MAP: Record<string, string> = {
  delivered: 'delivered',
  request: 'sent',
  opened: 'opened',
  uniqueOpened: 'opened',
  click: 'clicked',
  clicked: 'clicked',
  hardBounce: 'hard_bounce',
  softBounce: 'soft_bounce',
  spam: 'spam',
  unsubscribed: 'unsubscribed',
}

// Only these trigger an instant "hey, check this" notification —
// everything else (sent/delivered/bounces) just gets logged silently.
const NOTIFY_ON = new Set(['opened', 'clicked'])

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.BREVO_WEBHOOK_SECRET || secret !== process.env.BREVO_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  // Brevo sends single events as an object, but batches as an array —
  // normalize to always work with an array.
  const rawEvents = Array.isArray(body) ? body : [body]

  const eventType = (raw: any) => EVENT_MAP[raw.event] || raw.event || 'unknown'

  const rows = rawEvents.map((raw) => ({
    contact_email: String(raw.email || '').trim(),
    event_type: eventType(raw),
    subject: raw.subject || null,
    message_id: raw['message-id'] || raw.messageId || raw.mid || null,
    link_clicked: raw.link || null,
    raw_payload: raw,
    event_at: raw.date || raw.ts_epoch
      ? new Date(raw.ts_epoch ? raw.ts_epoch * 1000 : raw.date).toISOString()
      : new Date().toISOString(),
  })).filter((r) => r.contact_email)

  if (rows.length === 0) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { error } = await supabaseAdmin.from('email_events').insert(rows)
    if (error) throw error

    // Fire off instant notifications for opens/clicks, but don't let a
    // failed email block the webhook response — Brevo will retry on
    // non-2xx responses and we don't want duplicate rows.
    const toNotify = rows.filter((r) => NOTIFY_ON.has(r.event_type))
    if (toNotify.length > 0) {
      notifyOwner(toNotify).catch((err) => console.error('Notify failed:', err))
    }

    return NextResponse.json({ ok: true, inserted: rows.length })
  } catch (err: any) {
    console.error('Brevo webhook insert failed:', err)
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
  }
}

async function notifyOwner(events: { contact_email: string; event_type: string; subject: string | null; link_clicked: string | null }[]) {
  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.ORDER_NOTIFICATION_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'orders@makemystore.online'
  if (!apiKey || !ownerEmail) {
    console.warn('RESEND_API_KEY or ORDER_NOTIFICATION_EMAIL not set — skipping open/click notification.')
    return
  }

  const rowsHtml = events.map((e) => {
    const label = e.event_type === 'clicked' ? '🔥 CLICKED' : '👀 Opened'
    const linkLine = e.link_clicked ? `<br/><small>Link: ${escapeHtml(e.link_clicked)}</small>` : ''
    return `<p><b>${label}</b> — ${escapeHtml(e.contact_email)}<br/>"${escapeHtml(e.subject || '')}"${linkLine}</p>`
  }).join('')

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail,
      to: ownerEmail,
      subject: events.some((e) => e.event_type === 'clicked')
        ? `🔥 Click alert: ${events[0].contact_email}`
        : `👀 Open: ${events[0].contact_email}`,
      html: rowsHtml,
    }),
  })
}

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
