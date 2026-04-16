'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// ── Types ──────────────────────────────────────────────────────────────────────
interface Review {
  id: number
  name: string
  rating: number
  message: string
  date: string
  avatar_url: string | null
  order_number: string | null
  Country: string
}

// ── Supabase client ────────────────────────────────────────────────────────────
// Replace with your actual Supabase URL and anon key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ── Fallback avatar ────────────────────────────────────────────────────────────
const FALLBACK_AVATAR = 'https://api.dicebear.com/7.x/initials/svg?seed='

// ── Static placeholder cards (shown if fetch fails / no data) ─────────────────
const PLACEHOLDER_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    message: 'Absolutely love my new store! Launched in under a week and sales are already coming in. No more Shopify fees eating into my profits.',
    date: new Date().toISOString(),
    avatar_url: null,
    order_number: 'MMS-1042',
    Country: 'United States',
  },
  {
    id: 2,
    name: 'Ahmed K.',
    rating: 5,
    message: 'Professional team, fast delivery, and the SEO optimization is incredible. My store ranks on Google already!',
    date: new Date().toISOString(),
    avatar_url: null,
    order_number: 'MMS-0987',
    Country: 'Saudi Arabia',
  },
  {
    id: 3,
    name: 'Priya S.',
    rating: 5,
    message: 'Switched from Shopify and saved $100+/month. The custom design is exactly what I wanted. Highly recommended!',
    date: new Date().toISOString(),
    avatar_url: null,
    order_number: 'MMS-1101',
    Country: 'India',
  },
  {
    id: 4,
    name: 'Carlos R.',
    rating: 5,
    message: 'One-time payment model is genius. My store has been live for 6 months and I've paid nothing extra. Pure profit.',
    date: new Date().toISOString(),
    avatar_url: null,
    order_number: 'MMS-0756',
    Country: 'Brazil',
  },
  {
    id: 5,
    name: 'Fatima H.',
    rating: 5,
    message: 'The team was super responsive and delivered ahead of schedule. The store looks so professional, my customers keep complimenting it.',
    date: new Date().toISOString(),
    avatar_url: null,
    order_number: 'MMS-1234',
    Country: 'UAE',
  },
  {
    id: 6,
    name: 'James T.',
    rating: 5,
    message: 'Zero monthly fees, full ownership, Stripe integrated flawlessly. Everything I needed and more. Worth every penny.',
    date: new Date().toISOString(),
    avatar_url: null,
    order_number: 'MMS-0891',
    Country: 'United Kingdom',
  },
]

// ── Country flag helper ────────────────────────────────────────────────────────
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

// ── StarRating ─────────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? '#00d4ff' : 'rgba(255,255,255,0.12)'}
          xmlns="http://www.w3.org/2000/svg"
          style={i < rating ? { filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.7))' } : {}}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

// ── ReviewCard ─────────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  const avatarSrc = review.avatar_url || `${FALLBACK_AVATAR}${encodeURIComponent(review.name)}&backgroundColor=0b0f1a&textColor=00d4ff`
  const truncated = review.message.length > 120
    ? review.message.slice(0, 117) + '…'
    : review.message

  return (
    <div
      className="review-card"
      style={{
        minWidth: '280px',
        maxWidth: '300px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,212,255,0.1)',
        borderRadius: '16px',
        padding: '18px',
        backdropFilter: 'blur(8px)',
        cursor: 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 8px 32px rgba(0,212,255,0.15)'
        el.style.borderColor = 'rgba(0,212,255,0.35)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
        el.style.borderColor = 'rgba(0,212,255,0.1)'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt={review.name}
          width={38}
          height={38}
          style={{
            borderRadius: '50%',
            border: '2px solid rgba(0,212,255,0.25)',
            objectFit: 'cover',
            flexShrink: 0,
            background: '#0b0f1a',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `${FALLBACK_AVATAR}${encodeURIComponent(review.name)}&backgroundColor=0b0f1a&textColor=00d4ff`
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontFamily: 'Syne, sans-serif',
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
          <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
            {countryToFlag(review.Country)} {review.Country}
          </p>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Message */}
      <p
        style={{
          margin: 0,
          fontSize: '13px',
          color: 'rgba(255,255,255,0.65)',
          lineHeight: '1.55',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        &ldquo;{truncated}&rdquo;
      </p>

      {/* Footer */}
      {review.order_number && (
        <p
          style={{
            margin: '10px 0 0',
            fontSize: '10px',
            color: 'rgba(0,212,255,0.35)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Order #{review.order_number}
        </p>
      )}
    </div>
  )
}

// ── MarqueeRow ─────────────────────────────────────────────────────────────────
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
  // Duplicate for infinite loop
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

// ── ReviewsModal ───────────────────────────────────────────────────────────────
function ReviewsModal({ reviews, onClose }: { reviews: Review[]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(11,15,26,0.9)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0b0f1a',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: 'Syne, sans-serif',
              fontSize: '18px',
              color: '#fff',
              fontWeight: 700,
            }}
          >
            All Reviews <span style={{ color: '#00d4ff' }}>({reviews.length})</span>
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              color: '#fff',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '13px',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Close ✕
          </button>
        </div>

        {/* Grid */}
        <div
          style={{
            overflowY: 'auto',
            padding: '20px 24px',
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

// ── Main ReviewsSection ────────────────────────────────────────────────────────
export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [paused, setPaused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('date', { ascending: false })
          .limit(60)

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
  }, [])

  // Split reviews into two rows
  const mid = Math.ceil(reviews.length / 2)
  const rowA = reviews.slice(0, mid)
  const rowB = reviews.slice(mid)

  // Ensure at least 5 cards per row for a good visual
  const filledA = rowA.length >= 3 ? rowA : PLACEHOLDER_REVIEWS
  const filledB = rowB.length >= 3 ? rowB : [...PLACEHOLDER_REVIEWS].reverse()

  return (
    <>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (max-width: 640px) {
          .review-card {
            min-width: 240px !important;
            max-width: 260px !important;
            padding: 14px !important;
          }
        }
      `}</style>

      <section
        id="reviews"
        style={{ padding: '80px 0', overflow: 'hidden', position: 'relative' }}
        aria-label="Customer Reviews"
      >
        {/* Background glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Heading */}
        <div style={{ textAlign: 'center', padding: '0 16px', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#00d4ff',
              fontFamily: 'DM Sans, sans-serif',
              marginBottom: '12px',
            }}
          >
            ★ REAL CLIENT REVIEWS
          </p>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800,
              color: '#fff',
              margin: '0 auto',
              maxWidth: '680px',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Don&apos;t Just Take Our Word –{' '}
            <span style={{ color: '#40e0ff' }}>See What 500+ Store Owners Say</span>
          </h2>
          <p
            style={{
              marginTop: '12px',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Real reviews from real store owners who launched in minutes
          </p>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(0,212,255,0.2)',
                borderTopColor: '#00d4ff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          /* Marquee container */
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

        {/* See All Reviews button */}
        {!loading && reviews.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(0,212,255,0.35)',
                borderRadius: '10px',
                color: '#00d4ff',
                padding: '10px 28px',
                fontSize: '14px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,212,255,0.08)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              See All Reviews →
            </button>
          </div>
        )}
      </section>

      {/* Full Reviews Modal */}
      {modalOpen && (
        <ReviewsModal reviews={reviews} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}
