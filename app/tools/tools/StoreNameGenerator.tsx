'use client'

// app/tools/tools/StoreNameGenerator.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Copy, Check } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

const prefixes = ['Nova','Spark','Peak','Crest','Velo','Lux','Zeno','Aura','Flux','Bold','True','Pure','Ace','Glow','Edge']
const middles = ['Cart','Shop','Store','Hub','Mart','Bay','Den','Lab','Co','Works']
const adjectives: Record<string, string[]> = {
  fashion: ['Chic','Vogue','Luxe','Sleek','Radiant','Silk','Dapper'],
  tech:    ['Pixel','Core','Sync','Byte','Loop','Stack','Grid'],
  health:  ['Vital','Zen','Pure','Bloom','Thrive','Glow','Calm'],
  pets:    ['Paw','Fetch','Furr','Biscuit','Whisker','Woof','Cozy'],
  food:    ['Savour','Bite','Zest','Crisp','Harvest','Brewed','Spice'],
  generic: ['Prime','Royal','Swift','Bold','Apex','Summit','Elite'],
}

function generateNames(keyword: string, niche: string): string[] {
  const kw = keyword.trim().replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
  const adj = adjectives[niche] || adjectives.generic
  const names: string[] = []
  prefixes.slice(0, 3).forEach((p) => names.push(`${p}${kw}`))
  middles.slice(0, 3).forEach((m) => names.push(`${kw}${m}`))
  adj.slice(0, 3).forEach((a) => names.push(`${a}${kw}`))
  names.push(`Shop${kw}Now`, `The${kw}Store`, `${kw}Direct`, `${adj[0]}${middles[0]}`)
  names.push(`${prefixes[Math.floor(Math.random() * prefixes.length)]}${adj[1] || 'Bold'}`)
  return [...new Set(names)].slice(0, 12)
}

export default function StoreNameGenerator() {
  const [keyword, setKeyword] = useState('')
  const [niche, setNiche] = useState('generic')
  const [names, setNames] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const generate = () => {
    if (!keyword.trim()) return
    const result = generateNames(keyword, niche)
    setNames(result)
    trackToolUsage('store-name-generator', { keyword, niche }, { names: result } as unknown as Record<string, unknown>)
  }

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  const niches = ['generic', 'fashion', 'tech', 'health', 'pets', 'food']

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        ✨ Store Name Generator
      </h2>
      <p className="text-[#777] text-sm mb-6">
        Generate brandable, memorable names for your ecommerce store.
      </p>

      <div className="flex flex-col gap-3.5 mb-6">
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">Main Keyword / Product</label>
          <input
            type="text" placeholder="e.g. candle, sneaker, gadget" value={keyword}
            onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && generate()}
            className="w-full px-3.5 py-2.5 text-sm text-white rounded-lg outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
        <div>
          <label className="block text-[13px] text-[#aaa] mb-2">Niche</label>
          <div className="flex gap-2 flex-wrap">
            {niches.map((n) => (
              <button
                key={n} onClick={() => setNiche(n)}
                className="px-3.5 py-1.5 rounded-lg text-[13px] font-semibold capitalize transition-all"
                style={{
                  border: '1px solid',
                  borderColor: niche === n ? '#7a5cff' : 'rgba(255,255,255,0.1)',
                  background: niche === n ? 'rgba(122,92,255,0.15)' : 'rgba(255,255,255,0.04)',
                  color: niche === n ? '#7a5cff' : '#888',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={generate} className="btn-primary flex items-center gap-2 mb-6">
        <Sparkles size={15} /> Generate Names
      </button>

      <AnimatePresence>
        {names.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {names.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex justify-between items-center rounded-xl px-3.5 py-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="font-semibold text-sm text-[#e0e0e0]">{name}</span>
                  <button
                    onClick={() => copyName(name)}
                    className="flex items-center transition-colors"
                    style={{ color: copied === name ? '#00ffaa' : '#555', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {copied === name ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </motion.div>
              ))}
            </div>

            <button
              onClick={generate}
              className="text-[#aaa] text-sm font-semibold rounded-lg px-4 py-2.5 mb-4 transition-colors hover:text-white"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              ↻ Generate More
            </button>

            <ToolCTA toolName="store-name-generator" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
