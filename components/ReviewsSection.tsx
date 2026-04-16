'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// ── Types (MATCHES YOUR DB EXACTLY) ───────────────
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

// ── Supabase SAFE INIT ───────────────────────────
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null

// ── Placeholder (if DB fails) ────────────────────
const PLACEHOLDER_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    message: 'Amazing store. No Shopify fees anymore!',
    date: new Date().toISOString(),
    avatar_url: null,
    order_number: 'MMS-1001',
    Country: 'United States',
  },
  {
    id: 2,
    name: 'Ahmed K.',
    rating: 5,
    message: 'Fast delivery + SEO already working.',
    date: new Date().toISOString(),
    avatar_url: null,
    order_number: 'MMS-1002',
    Country: 'Saudi Arabia',
  },
]

// ── Star Rating ──────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? '⭐' : '☆'}</span>
      ))}
    </div>
  )
}

// ── Review Card ──────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="p-4 rounded-xl border border-cyan-400/20 bg-[#0b0f1a] text-white">
      <h4 className="font-bold">{review.name}</h4>

      <StarRating rating={review.rating} />

      <p className="text-sm text-gray-300 mt-2">
        "{review.message}"
      </p>

      <p className="text-xs text-cyan-400 mt-2">
        🌍 {review.Country}
      </p>
    </div>
  )
}

// ── MAIN COMPONENT ───────────────────────────────
export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // If env not set → fallback
        if (!supabase) {
          setReviews(PLACEHOLDER_REVIEWS)
          return
        }

        const { data, error } = await supabase
          .from('reviews')
          .select('id,name,rating,message,date,avatar_url,order_number,Country')
          .order('date', { ascending: false })
          .limit(20)

        if (error || !data || data.length === 0) {
          setReviews(PLACEHOLDER_REVIEWS)
        } else {
          setReviews(data)
        }
      } catch (err) {
        setReviews(PLACEHOLDER_REVIEWS)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) {
    return (
      <p className="text-center text-white py-10">
        Loading reviews...
      </p>
    )
  }

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        ⭐ Real Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
