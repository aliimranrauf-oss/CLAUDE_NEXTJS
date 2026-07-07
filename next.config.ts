import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cozmgcrpnwoztaetnxeo.supabase.co',
      },
      // Added for YouTube thumbnails used in VideoSection
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
    // Serve AVIF first (smaller than WebP), then WebP as fallback
    formats: ['image/avif', 'image/webp'],
    /*
      PERF FIX: Supabase images were caching for only 1h (Lighthouse flagged
      203 KiB of repeat-visit waste). 1 year TTL means returning visitors
      serve images from cache — zero network requests for template images.
      Only applies to images served through Next.js Image Optimization API.
    */
    minimumCacheTTL: 31536000, // 1 year in seconds
  },

  /*
    ── Security headers ───────────────────────────────────────────────────
    Fixes Lighthouse Best Practices warnings:
    ✓ "No COOP header found"           → Cross-Origin-Opener-Policy
    ✓ "No frame control policy"        → X-Frame-Options
    ✓ "No HSTS includeSubDomains"      → Strict-Transport-Security
    ✓ "No CSP found in enforcement"    → Content-Security-Policy
    ✓ "No Trusted Types directive"     → CSP require-trusted-types-for
  */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevents clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // HSTS with includeSubDomains + preload (fixes Lighthouse medium warnings)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevents MIME-type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // COOP — isolates top-level window (same-origin-allow-popups keeps
          // Facebook/Google login popups working)
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // CSP — allows Next.js SSR, GA4, FB Pixel, Supabase, YouTube embeds
          // Uses unsafe-inline + unsafe-eval because Next.js runtime requires them.
          // For a stricter nonce-based CSP, use Next.js middleware.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://www.facebook.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: blob: https://cozmgcrpnwoztaetnxeo.supabase.co https://i.ytimg.com https://www.facebook.com https://www.makemystore.online",
              "connect-src 'self' https://cozmgcrpnwoztaetnxeo.supabase.co https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://connect.facebook.net https://*.supabase.co",
              "frame-src https://www.youtube.com https://www.facebook.com",
              "media-src 'self'",
              "worker-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ]
  },

  /*
    ── Bundle size reduction ──────────────────────────────────────────────
    Tree-shakes lucide-react and supabase so only imported icons/functions
    are bundled, reducing the unused JS flagged by Lighthouse (181KB).
  */
  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js', 'framer-motion'],
  },
}

export default nextConfig
