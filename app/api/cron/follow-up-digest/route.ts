import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

// ── GET /api/cron/follow-up-digest ──────────────────────────────────────
// Runs once a day (see vercel.json) and emails you a list of everyone who
// opened or clicked 24h+ ago but you haven't marked as "followed up" yet
// in the admin panel. Nothing gets sent automatically to leads — this is
// just a reminder list for you.
//
// Required env vars: SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY,
// ORDER_NOTIFICATION_EMAIL, RESEND_FROM_EMAIL, CRON_SECRET.

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabaseAdmin = getSupabaseAdmin()

    // Everyone whose best-known status is opened/clicked, more than 24h
    // ago, and who hasn't been marked followed_up_at yet.
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data, error } = await supabaseAdmin
      .from('email_contact_status')
      .select('*')
      .in('latest_status', ['opened', 'clicked'])
      .lt('latest_event_at', cutoff)
      .is('followed_up_at', null)
      .order('latest_status', { ascending: false }) // clicked first
      .order('latest_event_at', { ascending: true }) // oldest/most-overdue first

    if (error) throw error

    if (!data || data.length === 0) {
      return NextResponse.json({ ok: true, sent: false, reason: 'Nothing due' })
    }

    await sendDigest(data)
    return NextResponse.json({ ok: true, sent: true, count: data.length })
  } catch (err: any) {
    console.error('Follow-up digest failed:', err)
    return NextResponse.json({ error: 'Digest failed' }, { status: 500 })
  }
}

async function sendDigest(rows: any[]) {
  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.ORDER_NOTIFICATION_EMAIL
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'orders@makemystore.online'
  if (!apiKey || !ownerEmail) {
    console.warn('RESEND_API_KEY or ORDER_NOTIFICATION_EMAIL not set — skipping digest.')
    return
  }

  const clickers = rows.filter((r) => r.latest_status === 'clicked')
  const openers = rows.filter((r) => r.latest_status === 'opened')

  const rowHtml = (r: any) => {
    const hours = Math.round((Date.now() - new Date(r.latest_event_at).getTime()) / 3600000)
    return `<li><b>${escapeHtml(r.contact_email)}</b> — "${escapeHtml(r.subject || '')}" — ${hours}h ago</li>`
  }

  const html = `
    <h2>Follow-up reminder — ${rows.length} contact${rows.length > 1 ? 's' : ''} due</h2>
    ${clickers.length > 0 ? `<h3>🔥 Clicked (reply to these first)</h3><ul>${clickers.map(rowHtml).join('')}</ul>` : ''}
    ${openers.length > 0 ? `<h3>👀 Opened, no click yet</h3><ul>${openers.map(rowHtml).join('')}</ul>` : ''}
    <p style="color:#888;font-size:12px;">Mark someone as followed up in your admin panel's Email Tracking tab so they stop showing up here.</p>
  `

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail,
      to: ownerEmail,
      subject: `📋 ${rows.length} follow-up${rows.length > 1 ? 's' : ''} due today`,
      html,
    }),
  })
}

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
