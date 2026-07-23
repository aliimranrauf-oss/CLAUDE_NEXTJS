// app/api/pagespeed/route.ts
// Server-side proxy for Google PageSpeed Insights (Lighthouse) API.
// Keeps GOOGLE_PAGESPEED_API_KEY secret — never call the Google API directly from the browser.

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
// Google's real Lighthouse scan (especially mobile, which throttles CPU/
// network to simulate a real phone) can take well over 60s on slow or
// heavy sites. 60s is the ceiling for a standard Vercel function even on
// Pro — this value requires Fluid Compute enabled in the Vercel dashboard
// (Project Settings → Functions → Fluid Compute), which raises the ceiling
// to 300s even on the Hobby plan.
export const maxDuration = 120

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
    // Leaves a buffer under the 120s function limit for our own response
    // handling (JSON parsing, etc.) after Google replies.
    const timeout = setTimeout(() => controller.abort(), 110_000)

    const res = await fetch(apiUrl.toString(), { signal: controller.signal })
    clearTimeout(timeout)

    const data = await res.json()

    if (!res.ok) {
      const message =
        data?.error?.message ||
        'Google PageSpeed Insights could not analyze this URL. Double check it is public and reachable.'
      return NextResponse.json({ error: message }, { status: res.status })
    }

    const lr = data.lighthouseResult
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

    return NextResponse.json(result)
  } catch (err: any) {
    const message = err?.name === 'AbortError'
      ? `The scan took too long and timed out (this happens sometimes on very large or slow sites${strategy === 'mobile' ? ' — mobile scans take longer than desktop' : ''}). Please try again${strategy === 'mobile' ? ', or try the desktop scan instead' : ''}.`
      : 'Something went wrong reaching Google PageSpeed Insights.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
