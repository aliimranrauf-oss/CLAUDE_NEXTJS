'use client'

import { useState } from 'react'

export default function VideoSection() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <section className="py-16 px-4">
      <div className="max-w-[700px] mx-auto">
        {/* Section heading */}
        <div className="text-center mb-8">
          <h2
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{ fontFamily: 'var(--font-syne), Syne, sans-serif', letterSpacing: '-0.01em' }}
          >
            What is MakeMyStore?{' '}
            <span className="text-[#40e0ff]">Watch This 60-Second Video</span>
          </h2>
        </div>

        {/*
          ── CLS fix ───────────────────────────────────────────────────────────
          Replaced inline aspectRatio style with a padding-top hack that works
          at SSR/paint time — the browser knows the height before any JS runs,
          eliminating the layout shift. The preconnect for i.ytimg.com is set
          in layout.tsx so the thumbnail loads without an extra DNS round-trip.
        */}
        <div
          className="relative rounded-xl overflow-hidden bg-black"
          style={{
            paddingTop: '56.25%', /* 16:9 ratio — calculated before paint, prevents CLS */
            border: '1px solid rgba(0,212,255,0.2)',
            boxShadow: '0 0 30px rgba(0,212,255,0.1)',
          }}
        >
          {!videoLoaded ? (
            <button
              onClick={() => setVideoLoaded(true)}
              className="absolute inset-0 w-full h-full group"
              aria-label="Play MakeMyStore Demo Video"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ytimg.com/vi/D7jsdZtfeu8/hqdefault.jpg"
                alt="MakeMyStore Demo — Ecommerce Website Preview"
                width={480}
                height={360}
                className="w-full h-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/D7jsdZtfeu8?rel=0&modestbranding=1&autoplay=1"
              title="MakeMyStore — Custom Ecommerce"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>

        {/* Caption */}
        <p className="mt-4 text-center text-gray-500 text-sm">
          See how easy it is to launch your dream store in minutes
        </p>
      </div>
    </section>
  )
}
