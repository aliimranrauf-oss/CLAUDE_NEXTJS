'use client'

/*
  ── PERFORMANCE FIXES (mobile TBT was 2,330ms — target <200ms) ───────────────
  
  Root causes found and fixed:

  1. LIMIT 60 → 16  (line was: .limit(60))
     60 reviews × 2 duplicates × 2 rows = 240 cards × ~15 DOM nodes = ~3,600 nodes.
     Fixed: 16 reviews × 2 × 2 = 64 cards × ~15 = ~960 nodes (73% reduction).

  2. DiceBear removed (was: FALLBACK_AVATAR = 'https://api.dicebear.com/...')
     Every card without a real avatar triggered an external HTTP request to
     api.dicebear.com — Lighthouse showed 30+ requests to that domain.
     Fixed: pure CSS initial avatar, zero external requests.

  3. backdropFilter: blur(8px) removed from each ReviewCard
     backdrop-filter on 240 elements causes massive GPU compositing overhead
     on mobile. Removed — the card still looks great without it.

  4. Inline style mutation on hover replaced with CSS class toggle
     onMouseEnter/Leave calling .style.xxx triggers style recalculation on
     each of the 240 rendered cards. Replaced with a CSS :hover rule.

  5. Contrast fixes:
     - Country text: rgba(255,255,255,0.4) → rgba(255,255,255,0.65) (passes AA)
     - Order number: rgba(0,212,255,0.35), 10px → rgba(0,212,255,0.8), 12px
     - Subheading: rgba(255,255,255,0.4) → rgba(255,255,255,0.6)

  6. ARIA fix: StarRating div → span role="img"
     aria-label is prohibited on plain <div> elements (generic role).
     Lighthouse: "Elements use prohibited ARIA attributes" — affects 20+ cards.
     Fixed: changed to <span role="img"> which allows aria-label.
  ─────────────────────────────────────────────────────────────────────────────
*/

import { useEffect, useState } from 'react'

export interface Review {
  id: number
  name: string
  rating: number
  message: string
  date: string
  avatar_url: string | null
  order_number: string | null
  Country: string
}

/*
  ── PERF FIX (unused JavaScript — 196 KiB opportunity) ───────────────────────
  This component used to import the full @supabase/supabase-js client at the
  top of the file and call it on every mount. Because that import was static,
  Next.js bundled the entire Supabase client into this page's JS — even
  though the homepage now fetches reviews on the SERVER (see app/page.tsx)
  and passes them down as `initialReviews`, meaning the client-side Supabase
  call almost never actually runs.

  Fix: `createClient` is now imported dynamically, INSIDE the fallback branch
  of the effect below, so it's only downloaded/parsed if `initialReviews` is
  missing or empty. On a normal page load (server data present), the browser
  never fetches @supabase/supabase-js for this component at all.
*/

const PLACEHOLDER_REVIEWS: Review[] = [
  { id: 1, name: 'Sarah M.', rating: 5, message: 'Absolutely love my new store! Launched in under a week and sales are already coming in. No more Shopify fees eating into my profits.', date: new Date().toISOString(), avatar_url: null, order_number: 'MMS-1042', Country: 'United States' },
  { id: 2, name: 'Ahmed K.', rating: 5, message: 'Professional team, fast delivery, and the SEO optimization is incredible. My store ranks on Google already!', date: new Date().toISOString(), avatar_url: null, order_number: 'MMS-0987', Country: 'Saudi Arabia' },
  { id: 3, name: 'Priya S.', rating: 5, message: 'Switched from Shopify and saved $100+/month. The custom design is exactly what I wanted. Highly recommended!', date: new Date().toISOString(), avatar_url: null, order_number: 'MMS-1101', Country: 'India' },
  { id: 4, name: 'Carlos R.', rating: 5, message: "One-time payment model is genius. My store has been live for 6 months and I've paid nothing extra. Pure profit.", date: new Date().toISOString(), avatar_url: null, order_number: 'MMS-0756', Country: 'Brazil' },
  { id: 5, name: 'Fatima H.', rating: 5, message: 'The team was super responsive and delivered ahead of schedule. The store looks so professional, my customers keep complimenting it.', date: new Date().toISOString(), avatar_url: null, order_number: 'MMS-1234', Country: 'UAE' },
  { id: 6, name: 'James T.', rating: 5, message: 'Zero monthly fees, full ownership, Stripe integrated flawlessly. Everything I needed and more. Worth every penny.', date: new Date().toISOString(), avatar_url: null, order_number: 'MMS-0891', Country: 'United Kingdom' },
]

function countryToFlag(country: string): string {
  const map: Record<string, string> = {
    'United States': '🇺🇸', 'USA': '🇺🇸', 'US': '🇺🇸',
    'United Kingdom': '🇬🇧', 'UK': '🇬🇧',
    'Saudi Arabia': '🇸🇦', 'UAE': '🇦🇪', 'India': '🇮🇳',
    'Brazil': '🇧🇷', 'Pakistan': '🇵🇰', 'Canada': '🇨🇦',
    'Australia': '🇦🇺', 'Germany': '🇩🇪', 'France': '🇫🇷',
    'Egypt': '🇪🇬', 'Nigeria': '🇳🇬', 'Turkey': '🇹🇷',
    'Bangladesh': '🇧🇩', 'Philippines': '🇵🇭', 'Indonesia': '🇮🇩',
    'Malaysia': '🇲🇾', 'Singapore': '🇸🇬', 'Jordan': '🇯🇴',
    'Kuwait': '🇰🇼', 'Qatar': '🇶🇦', 'Bahrain': '🇧🇭',
    'Oman': '🇴🇲', 'Morocco': '🇲🇦', 'Kenya': '🇰🇪',
    'South Africa': '🇿🇦', 'Mexico': '🇲🇽', 'Spain': '🇪🇸',
    'Italy': '🇮🇹', 'Netherlands': '🇳🇱', 'Sweden': '🇸🇪',
    'Norway': '🇳🇴', 'Denmark': '🇩🇰', 'Poland': '🇵🇱',
    'Romania': '🇷🇴', 'Ukraine': '🇺🇦', 'Russia': '🇷🇺',
    'China': '🇨🇳', 'Japan': '🇯🇵', 'South Korea': '🇰🇷',
    'Thailand': '🇹🇭', 'Vietnam': '🇻🇳',
  }
  return map[country] ?? '🌍'
}

/*
  ARIA FIX: Changed <div> → <span role="img">
  aria-label is prohibited on generic role elements like <div>.
  <span role="img"> explicitly declares this as an image/icon group,
  which allows aria-label. Visually identical — no style change needed.
  Fixes Lighthouse: "Elements use prohibited ARIA attributes" (20+ cards affected).
*/
function StarRating({ rating }: { rating: number }) {
  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      style={{ display: 'flex', gap: '2px' }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? '#00d4ff' : 'rgba(255,255,255,0.12)'}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={i < rating ? { filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.7))' } : {}}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  )
}

/*
  CSS-based initial avatar — replaces DiceBear entirely.
  Generates a consistent hue from the name so each reviewer gets a unique color.
  Zero external requests, renders instantly, never fails.
*/
function InitialAvatar({ name }: { name: string }) {
  const hue = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  return (
    <div
      aria-hidden="true"
      style={{
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: `hsl(${hue}, 60%, 25%)`,
        border: '2px solid rgba(0,212,255,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 700,
        color: `hsl(${hue}, 80%, 75%)`,
        flexShrink: 0,
        fontFamily: 'var(--font-syne), Syne, sans-serif',
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const truncated = review.message.length > 120
    ? review.message.slice(0, 117) + '…'
    : review.message

  return (
    /*
      PERF FIX: Removed backdropFilter: blur(8px) — extremely expensive on mobile.
      PERF FIX: Replaced inline onMouseEnter/Leave style mutations with CSS class hover.
      Each inline style mutation triggers a full style recalc; CSS :hover is GPU-composited.
    */
    <div className="review-card" style={{ flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        {review.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.avatar_url}
            alt={review.name}
            width={38}
            height={38}
            loading="lazy"
            decoding="async"
            style={{
              borderRadius: '50%',
              border: '2px solid rgba(0,212,255,0.25)',
              objectFit: 'cover',
              width: 38,
              height: 38,
              flexShrink: 0,
              background: '#0b0f1a',
            }}
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        ) : (
          <InitialAvatar name={review.name} />
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {review.name}
          </p>
          {/* CONTRAST FIX: 0.4 opacity → 0.65 (passes WCAG AA) */}
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>
            {countryToFlag(review.Country)} {review.Country}
          </p>
        </div>

        <StarRating rating={review.rating} />
      </div>

      <p
        style={{
          margin: 0,
          fontSize: '13px',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: '1.55',
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
        }}
      >
        &ldquo;{truncated}&rdquo;
      </p>

      {/* CONTRAST FIX: 0.6 → 0.8 opacity (passes WCAG AA on dark bg) */}
      {review.order_number && (
        <p
          style={{
            margin: '10px 0 0',
            fontSize: '12px',
            color: 'rgba(0,212,255,0.8)',
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          }}
        >
          Order #{review.order_number}
        </p>
      )}
    </div>
  )
}

function MarqueeRow({
  reviews,
  direction = 'left',
  speed = 40,
  paused,
}: {
  reviews: Review[]
  direction?: 'left' | 'right'
  speed?: number
  paused: boolean
}) {
  // Duplicate once for seamless infinite loop
  const doubled = [...reviews, ...reviews]
  const duration = reviews.length * speed

  return (
    <div
      style={{
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '16px',
          width: 'max-content',
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} />
        ))}
      </div>
    </div>
  )
}

function ReviewsModal({ reviews, onClose }: { reviews: Review[]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="All customer reviews"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(11,15,26,0.9)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0b0f1a',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          width: '100%', maxWidth: '900px', maxHeight: '80vh',
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontSize: '18px', color: '#fff', fontWeight: 700,
            }}
          >
            All Reviews <span style={{ color: '#00d4ff' }}>({reviews.length})</span>
          </h3>
          <button
            onClick={onClose}
            aria-label="Close reviews modal"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px', color: '#fff',
              padding: '6px 12px', cursor: 'pointer',
              fontSize: '13px',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            }}
          >
            Close ✕
          </button>
        </div>

        <div
          style={{
            overflowY: 'auto', padding: '20px 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ReviewsSection({ initialReviews }: { initialReviews?: Review[] } = {}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews ?? [])
  const [loading, setLoading] = useState(!(initialReviews && initialReviews.length > 0))
  const [paused, setPaused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    // ── Server already provided reviews (normal case) ──────────────────────
    // Skip the client fetch entirely — no network round-trip, and critically,
    // @supabase/supabase-js is never imported/downloaded by the browser.
    if (initialReviews && initialReviews.length > 0) return

    let cancelled = false
    ;(async () => {
      try {
        // Dynamic import: only pulled into the browser bundle on this
        // fallback path (server fetch failed/timed out/returned nothing).
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('date', { ascending: false })
          /*
            CRITICAL PERF FIX: 60 → 16
            60 reviews × 2 duplicates × 2 rows = 240 cards in DOM at once.
            16 reviews × 2 × 2 = 64 cards — 73% fewer DOM nodes.
            The marquee loops perfectly with 16 items; visitors never notice
            the difference because the animation is continuous.
          */
          .limit(16)

        if (!cancelled) {
          if (error || !data || data.length === 0) {
            setReviews(PLACEHOLDER_REVIEWS)
          } else {
            setReviews(data as Review[])
          }
        }
      } catch {
        if (!cancelled) setReviews(PLACEHOLDER_REVIEWS)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [initialReviews])

  const mid = Math.ceil(reviews.length / 2)
  const rowA = reviews.slice(0, mid)
  const rowB = reviews.slice(mid)

  const filledA = rowA.length >= 3 ? rowA : PLACEHOLDER_REVIEWS
  const filledB = rowB.length >= 3 ? rowB : [...PLACEHOLDER_REVIEWS].reverse()

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* PERF FIX: CSS hover instead of JS inline style mutations */
        .review-card {
          min-width: 280px;
          max-width: 300px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 16px;
          padding: 18px;
          cursor: default;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          /* NO backdropFilter here — was killing mobile GPU performance */
        }
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,212,255,0.15);
          border-color: rgba(0,212,255,0.35);
        }

        @media (max-width: 640px) {
          .review-card {
            min-width: 240px !important;
            max-width: 260px !important;
            padding: 14px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-left"], [style*="marquee-right"] {
            animation: none !important;
          }
        }
      `}</style>

      <section
        id="reviews"
        style={{ padding: '80px 0', overflow: 'hidden', position: 'relative' }}
        aria-label="Customer Reviews"
      >
        {/* Background glow — will-change:transform prevents layout participation */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />

        {/* Heading */}
        <div style={{ textAlign: 'center', padding: '0 16px', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '12px', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#00d4ff',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              marginBottom: '12px',
            }}
          >
            ★ REAL CLIENT REVIEWS
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontSize: 'clamp(36px, 5vw, 42px)',
              fontWeight: 700, color: '#fff',
              margin: '0 auto', maxWidth: '700px',
              lineHeight: 1.2, letterSpacing: '-0.01em',
            }}
          >
            Don&apos;t Just Take Our Word –
            <br />
            <span style={{ color: '#40e0ff' }}>See What 500+ Store Owners Say</span>
          </h2>
          {/* CONTRAST FIX: 0.4 → 0.6 */}
          <p
            style={{
              marginTop: '12px', fontSize: '14px',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            }}
          >
            Real reviews from real store owners who launched in minutes
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <div
              role="status"
              aria-label="Loading reviews"
              style={{
                width: '40px', height: '40px',
                border: '3px solid rgba(0,212,255,0.2)',
                borderTopColor: '#00d4ff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            role="region"
            aria-label="Scrolling customer reviews"
          >
            <MarqueeRow reviews={filledA} direction="left" speed={45} paused={paused} />
            <MarqueeRow reviews={filledB} direction="right" speed={50} paused={paused} />
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="reviews-see-all-btn"
              style={{
                background: 'transparent',
                border: '1px solid rgba(0,212,255,0.35)',
                borderRadius: '10px', color: '#00d4ff',
                padding: '10px 28px', fontSize: '14px',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                fontWeight: 600, cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            >
              See All Reviews →
            </button>
          </div>
        )}
      </section>

      {modalOpen && (
        <ReviewsModal reviews={reviews} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}
