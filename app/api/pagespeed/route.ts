// app/api/pagespeed/route.ts
// Server-side proxy for Google PageSpeed Insights (Lighthouse) API.
// Keeps GOOGLE_PAGESPEED_API_KEY secret — never call the Google API directly from the browser.

import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export const runtime = 'nodejs'
// Google's real Lighthouse scan can take well over 60s on slow or heavy
// sites — and there's no reliable way to predict which ones (large
// ecommerce stores, sites with lots of third-party scripts, or ones on
// slow hosting can all push either mobile or desktop scans well past a
// minute; it's not consistently one strategy over the other).
//
// 300s is the actual ceiling here: with Fluid Compute enabled (Project
// Settings → Functions → Fluid Compute), Vercel allows up to 300s on the
// Hobby plan and 800s on Pro/Enterprise. This project is on Hobby, so 300s
// is the real usable maximum — setting it higher gets accepted at build
// time but silently rejected at deploy time. If this project is ever
// upgraded to Pro, this can be raised to 800.
export const maxDuration = 300

const GOOGLE_PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

function normalizeUrl(input: string): string | null {
  let url = input.trim()
  if (!url) return null
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`
  try {
    const parsed = new URL(url)
    return parsed.toString()
  } catch {
    return null
  }
}

// Pull a numeric metric (ms or unitless) out of a Lighthouse audit safely
function auditValue(audits: Record<string, any>, id: string) {
  const a = audits?.[id]
  if (!a) return null
  return {
    value: a.numericValue ?? null,
    displayValue: a.displayValue ?? null,
    score: a.score ?? null,
  }
}

// Google's PageSpeed API often fails with vague, unhelpful text —
// "Lighthouse returned error: Something went wrong." tells a visitor
// nothing about what actually happened or what to do next. This maps the
// known failure signatures (both from the outer API error and from
// lighthouseResult.runtimeError, which Google can return even on an
// HTTP 200) to a plain-language explanation and a concrete next step.
function explainPsiFailure(rawMessage: string | undefined, runtimeErrorCode: string | undefined): string {
  const text = `${rawMessage || ''} ${runtimeErrorCode || ''}`.toUpperCase()

  if (text.includes('DNS_FAILURE') || text.includes('NAME_NOT_RESOLVED')) {
    return "This domain couldn't be found (DNS lookup failed). Double-check the URL is spelled correctly and the domain is actually live."
  }
  if (text.includes('FAILED_DOCUMENT_REQUEST') || text.includes('ERRORED_DOCUMENT_REQUEST')) {
    return "The page didn't load at all — the server may be down, blocking automated requests, or returning an error page. Try opening the URL in a normal browser tab to confirm it loads."
  }
  if (text.includes('INSECURE_DOCUMENT_REQUEST')) {
    return "This page isn't served over HTTPS, which Google's checker requires. Make sure the site has a valid SSL certificate and redirects HTTP to HTTPS."
  }
  if (text.includes('NO_FCP')) {
    return 'The page never displayed any visible content during the scan — likely a JavaScript error or a blank/broken page. Try loading the URL in a normal browser tab and check the console for errors.'
  }
  if (text.includes('PAGE_HUNG')) {
    return 'The page froze and stopped responding during the scan — often caused by a script stuck in a loop or a slow third-party resource. Check the browser console on that page for errors.'
  }
  if (text.includes('PROTOCOL_TIMEOUT') || text.includes('TIMEOUT')) {
    return 'The page took too long to finish loading. This is usually caused by a slow server response (e.g. a slow database call) or a very heavy page. Try again — if it keeps happening, check your server response time.'
  }
  if (text.includes('QUOTA') || text.includes('RATE LIMIT') || text.includes('RESOURCE_EXHAUSTED')) {
    return "Google's PageSpeed API is temporarily rate-limited for this key. Wait a minute and try again."
  }
  // Fallback for Google's genuinely generic "Something went wrong" and
  // anything else unrecognized — still gives the visitor something
  // actionable instead of a dead-end.
  return "Google couldn't complete this scan — this is usually caused by the page taking too long to respond, or something on the page blocking automated browsers. Please try again in a moment; if it keeps failing, check the site loads normally in a regular browser tab."
}

// Logs every check attempt (success or failure) to the tool_usage table so
// the admin dashboard can show how many people use this tool, which sites
// they check, and roughly where from. Done server-side (rather than only
// client-side after the fetch resolves) so it: (a) has access to real geo
// headers Vercel attaches to the request, which the browser never sees,
// and (b) still gets recorded even if the visitor closes the tab before
// the client-side result renders. Never throws — a logging failure should
// never affect the actual PageSpeed check the visitor is waiting on.
async function logToolUsage(
  req: NextRequest,
  targetUrl: string,
  strategy: string,
  outcome: { ok: true; scores: Record<string, number | null> } | { ok: false; error: string }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    await supabaseAdmin.from('tool_usage').insert({
      tool_name: 'pagespeed-insights',
      input_data: { url: targetUrl, strategy },
      result_data: outcome.ok ? { scores: outcome.scores } : { error: outcome.error },
      visitor_ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
      // Vercel attaches these geo headers automatically in production for
      // both Node.js and Edge functions — no external geo-IP service needed.
      country: req.headers.get('x-vercel-ip-country') || null,
      region: req.headers.get('x-vercel-ip-country-region') || null,
      city: req.headers.get('x-vercel-ip-city') ? decodeURIComponent(req.headers.get('x-vercel-ip-city')!) : null,
      referrer: req.headers.get('referer') || null,
      user_agent: req.headers.get('user-agent') || null,
    })
  } catch {
    // Silently ignore — logging should never break the tool itself.
  }
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'GOOGLE_PAGESPEED_API_KEY is not configured on the server. Add it to your .env.local (and your hosting provider env vars) to enable this tool.',
      },
      { status: 500 }
    )
  }

  const { searchParams } = new URL(req.url)
  const rawUrl = searchParams.get('url') || ''
  const strategy = searchParams.get('strategy') === 'desktop' ? 'desktop' : 'mobile'

  const targetUrl = normalizeUrl(rawUrl)
  if (!targetUrl) {
    return NextResponse.json({ error: 'Please enter a valid URL, e.g. yourstore.com' }, { status: 400 })
  }

  const apiUrl = new URL(GOOGLE_PSI_ENDPOINT)
  apiUrl.searchParams.set('url', targetUrl)
  apiUrl.searchParams.set('strategy', strategy)
  apiUrl.searchParams.set('key', apiKey)
  ;['performance', 'accessibility', 'best-practices', 'seo'].forEach((c) =>
    apiUrl.searchParams.append('category', c)
  )

  try {
    const controller = new AbortController()
    // Leaves a ~20s buffer under the 300s function limit above for our own
    // response handling (JSON parsing, etc.) after Google replies.
    const timeout = setTimeout(() => controller.abort(), 280_000)

    const res = await fetch(apiUrl.toString(), { signal: controller.signal })
    clearTimeout(timeout)

    const data = await res.json()

    if (!res.ok) {
      const friendly = explainPsiFailure(data?.error?.message, undefined)
      await logToolUsage(req, targetUrl, strategy, { ok: false, error: friendly })
      return NextResponse.json({ error: friendly }, { status: res.status })
    }

    const lr = data.lighthouseResult

    // Google can return HTTP 200 while the actual Lighthouse audit inside
    // it failed (e.g. the target page hung, never painted, or errored) —
    // in that case categories/audits are empty or missing. Previously this
    // fell through silently and produced a "successful" response full of
    // null scores. Catch it explicitly and return a real, helpful error.
    if (lr?.runtimeError) {
      const friendly = explainPsiFailure(lr.runtimeError.message, lr.runtimeError.code)
      await logToolUsage(req, targetUrl, strategy, { ok: false, error: friendly })
      return NextResponse.json({ error: friendly }, { status: 502 })
    }

    const categories = lr?.categories || {}
    const audits = lr?.audits || {}
    const crux = data.loadingExperience?.metrics || null

    const result = {
      url: lr?.finalUrl || targetUrl,
      strategy,
      fetchTime: lr?.fetchTime,
      scores: {
        performance: categories.performance?.score != null ? Math.round(categories.performance.score * 100) : null,
        accessibility: categories.accessibility?.score != null ? Math.round(categories.accessibility.score * 100) : null,
        bestPractices: categories['best-practices']?.score != null ? Math.round(categories['best-practices'].score * 100) : null,
        seo: categories.seo?.score != null ? Math.round(categories.seo.score * 100) : null,
      },
      lab: {
        lcp: auditValue(audits, 'largest-contentful-paint'),
        cls: auditValue(audits, 'cumulative-layout-shift'),
        tbt: auditValue(audits, 'total-blocking-time'),
        fcp: auditValue(audits, 'first-contentful-paint'),
        speedIndex: auditValue(audits, 'speed-index'),
        ttfb: auditValue(audits, 'server-response-time'),
      },
      field: crux
        ? {
            lcp: crux.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
            cls: crux.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile != null
              ? crux.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
              : null,
            inp: crux.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
            fcp: crux.FIRST_CONTENTFUL_PAINT_MS?.percentile ?? null,
          }
        : null,
      opportunities: Object.values(audits)
        .filter((a: any) => a?.details?.type === 'opportunity' && a.score !== null && a.score < 0.9)
        .sort((a: any, b: any) => (b.numericValue || 0) - (a.numericValue || 0))
        .slice(0, 8)
        .map((a: any) => ({
          id: a.id,
          title: a.title,
          displayValue: a.displayValue || null,
        })),
    }

    await logToolUsage(req, targetUrl, strategy, { ok: true, scores: result.scores })
    return NextResponse.json(result)
  } catch (err: any) {
    // Which strategy runs slower depends on the specific site being
    // scanned (its hosting, third-party scripts, etc.) — not on mobile vs
    // desktop in general — so this message doesn't guess or steer the
    // visitor toward "just try the other one."
    const message = err?.name === 'AbortError'
      ? 'This scan is taking unusually long — Google is still working on it. Please try again in a moment; very large or slow sites can occasionally need more than one attempt.'
      : 'Something went wrong reaching Google PageSpeed Insights.'
    await logToolUsage(req, targetUrl, strategy, { ok: false, error: message })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
