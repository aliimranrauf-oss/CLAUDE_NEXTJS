'use client'

// app/tools/tools/ToolCTA.tsx
import { ArrowRight, Store, Wrench, LayoutGrid } from 'lucide-react'

interface ToolCTAProps {
  toolName: string
}

export default function ToolCTA({ toolName: _toolName }: ToolCTAProps) {
  return (
    <div
      className="mt-8 rounded-2xl p-7 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(122,92,255,0.12))',
        border: '1px solid rgba(0,212,255,0.25)',
      }}
    >
      <div className="text-3xl mb-2">🚀</div>
      <h3
        className="text-xl font-extrabold text-white mb-2"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        Ready to Take Action?
      </h3>
      <p className="text-[#999] text-sm mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
        One-time payment. No monthly fees. Live in 3–10 days.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        {/* Option 1 */}
        <a
          href="https://www.makemystore.online/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #7a5cff 100%)',
            boxShadow: '0 4px 15px rgba(0,212,255,0.25)',
            fontFamily: 'Syne, sans-serif',
          }}
        >
          <Store size={15} />
          Get Your Store Built
          <ArrowRight size={13} />
        </a>

        {/* Option 2 */}
        <a
          href="https://www.fiverr.com/s/DBYND3P"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-transform hover:scale-105"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,107,107,0.4)',
            color: '#ff6b6b',
            fontFamily: 'Syne, sans-serif',
          }}
        >
          <Wrench size={15} />
          Fix My Website
          <ArrowRight size={13} />
        </a>

        {/* Option 3 */}
        <a
          href="https://www.makemystore.online"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-transform hover:scale-105"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#aaa',
            fontFamily: 'Syne, sans-serif',
          }}
        >
          <LayoutGrid size={15} />
          Our Services
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  )
}
