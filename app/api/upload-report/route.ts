import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

// ── POST /api/upload-report ──────────────────────────────────────────────
// Uploads a visitor's PageSpeed report PDF (generated client-side in
// app/website-speed-optimization/report/ReportView.tsx) to a Supabase
// Storage bucket, server-side, using the service-role key — the same
// pattern as /api/orders. Returns the public URL, which the client then
// carries through to /contact?pdfUrl=... and on into the order record via
// /api/orders, so the PDF ends up attached to the lead in Supabase instead
// of only landing in the visitor's own Downloads folder.
//
// Requires a Supabase Storage bucket named "speed-reports" to already
// exist (created once, manually, in the Supabase dashboard) — see the
// setup note at the bottom of this file.

const BUCKET = 'speed-reports'
const MAX_BASE64_LENGTH = 12_000_000 // ~9MB decoded — generous for a text-only report PDF

export async function POST(req: NextRequest) {
  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const filename = String(body.filename || '').trim()
  const base64 = String(body.base64 || '')

  if (!filename.toLowerCase().endsWith('.pdf')) {
    return NextResponse.json({ error: 'Only PDF uploads are allowed.' }, { status: 400 })
  }
  if (!base64) {
    return NextResponse.json({ error: 'Missing file data.' }, { status: 400 })
  }
  if (base64.length > MAX_BASE64_LENGTH) {
    return NextResponse.json({ error: 'File is too large.' }, { status: 400 })
  }

  try {
    const bytes = Buffer.from(base64, 'base64')

    // Prefix with a timestamp so repeat checks of the same site never
    // collide/overwrite an earlier lead's report.
    const safePart = filename.replace(/[^a-z0-9.-]+/gi, '-').toLowerCase()
    const path = `${Date.now()}-${safePart}`

    const supabaseAdmin = getSupabaseAdmin()
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: 'application/pdf', upsert: false })

    if (uploadError) throw uploadError

    const { data: publicUrlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path)

    return NextResponse.json({ ok: true, url: publicUrlData.publicUrl })
  } catch (err: any) {
    console.error('Report upload failed:', err)
    return NextResponse.json({ error: 'Could not upload the report. Please try again.' }, { status: 500 })
  }
}

// ── One-time Supabase setup (do this once in the dashboard) ─────────────
// 1. Storage → New bucket → name it exactly "speed-reports" → toggle
//    "Public bucket" ON (reports aren't sensitive; this keeps the public
//    URL usable directly, with no signed-URL/expiry logic needed).
// 2. Table Editor → orders table → add a column: pdf_url, type text,
//    nullable. (Or SQL editor: alter table orders add column pdf_url text;)
// No new env vars needed — this reuses SUPABASE_SERVICE_ROLE_KEY and
// NEXT_PUBLIC_SUPABASE_URL, which lib/supabaseAdmin.ts already requires.
