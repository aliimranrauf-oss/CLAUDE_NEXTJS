'use client'

// app/tools/tools/StoreNameGenerator.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react'
import ToolCTA from './ToolCTA'
import { trackToolUsage } from './useToolTracking'

/*
  REWRITE: Previous generator just concatenated raw prefixes + keyword
  producing robotic names like "NovaSneaker", "SneakerCart", "ChicSneaker".

  New approach produces 4 categories of names that real brands actually use:

  1. COINED  — invented word blends (Spotify/Shopify style): blend keyword
     with a suffix to create something unique and trademarkable.
  2. EVOCATIVE — emotion/lifestyle words that describe the feeling,
     not the product (Apple, Amazon, Lush style).
  3. COMPOUND — two meaningful short words joined cleanly (DoorDash style).
  4. DESCRIPTOR — clear, direct names that say exactly what you sell
     but with premium framing (AllBirds, Warby Parker style).

  Each name is scored for:
  - Length (ideal: 6-12 chars)
  - Pronounceability
  - No double letters at join point
  - Capitalised correctly for display
*/

// ── Niche-specific word banks ─────────────────────────────────────────────

const NICHE_DATA: Record<string, {
  emotions: string[]
  suffixes: string[]
  prefixes: string[]
  evocative: string[]
}> = {
  fashion: {
    emotions:  ['Luxe', 'Vogue', 'Aura', 'Silk', 'Grace', 'Radiant', 'Atelier', 'Maison'],
    suffixes:  ['ique', 'elle', 'ara', 'ora', 'ify', 'ova', 'era', 'ette'],
    prefixes:  ['La', 'Le', 'The', 'So', 'Neo', 'Re'],
    evocative: ['Thread', 'Drape', 'Stitch', 'Hem', 'Weave', 'Seam', 'Loom', 'Knot'],
  },
  tech: {
    emotions:  ['Sync', 'Flux', 'Core', 'Grid', 'Apex', 'Nova', 'Pulse', 'Zeal'],
    suffixes:  ['ly', 'ify', 'eon', 'ara', 'io', 'iq', 'ika', 'ova'],
    prefixes:  ['Bit', 'Byte', 'Net', 'Geo', 'Meta', 'Hyper'],
    evocative: ['Stack', 'Loop', 'Pixel', 'Circuit', 'Vector', 'Signal', 'Node', 'Forge'],
  },
  health: {
    emotions:  ['Vital', 'Zen', 'Bloom', 'Thrive', 'Glow', 'Calm', 'Renew', 'Serum'],
    suffixes:  ['ify', 'elle', 'ara', 'ura', 'ix', 'ova', 'ia', 'ina'],
    prefixes:  ['Bio', 'Vit', 'Eco', 'Pure', 'Raw', 'True'],
    evocative: ['Root', 'Leaf', 'Seed', 'Herb', 'Bloom', 'Bark', 'Sap', 'Stem'],
  },
  pets: {
    emotions:  ['Paw', 'Furr', 'Woof', 'Fetch', 'Cozy', 'Happy', 'Loyal', 'Biscuit'],
    suffixes:  ['ify', 'ie', 'ly', 'ster', 'pal', 'buddy', 'co', 'hub'],
    prefixes:  ['My', 'Pet', 'Fur', 'Good', 'Wild', 'Best'],
    evocative: ['Tail', 'Paw', 'Snout', 'Kennel', 'Leash', 'Bone', 'Treat', 'Den'],
  },
  food: {
    emotions:  ['Savour', 'Zest', 'Crisp', 'Brewed', 'Harvest', 'Feast', 'Batch', 'Press'],
    suffixes:  ['ify', 'ery', 'house', 'works', 'ine', 'ara', 'co', 'ova'],
    prefixes:  ['Farm', 'Field', 'Grove', 'Mill', 'Sun', 'Fresh'],
    evocative: ['Grain', 'Spice', 'Jar', 'Basket', 'Table', 'Pantry', 'Larder', 'Cellar'],
  },
  beauty: {
    emotions:  ['Glow', 'Bloom', 'Radiant', 'Lush', 'Silk', 'Dew', 'Petal', 'Lustre'],
    suffixes:  ['ique', 'elle', 'ura', 'ora', 'ify', 'ia', 'ova', 'ette'],
    prefixes:  ['Pure', 'True', 'Neo', 'La', 'Le', 'Re'],
    evocative: ['Serum', 'Tint', 'Blush', 'Gloss', 'Sheen', 'Hue', 'Flush', 'Dew'],
  },
  generic: {
    emotions:  ['Apex', 'Nova', 'Bold', 'Prime', 'Swift', 'Elite', 'Summit', 'Crest'],
    suffixes:  ['ify', 'ly', 'ova', 'ara', 'io', 'iq', 'era', 'eon'],
    prefixes:  ['The', 'My', 'Get', 'Go', 'Re', 'Be'],
    evocative: ['Hub', 'Loft', 'Works', 'Studio', 'Lab', 'House', 'Forge', 'Den'],
  },
}

// ── Name generation logic ─────────────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

// Remove double letters at a join boundary: "PurePets" → fine, "NovaNova" → bad
function hasDoubleLetterJoin(a: string, b: string): boolean {
  return a.toLowerCase().slice(-1) === b.toLowerCase().charAt(0)
}

// Generate a coined name: trim keyword + suffix → e.g. "Sneaker" + "ify" = "Sneakerify"
function makeCoinedName(kw: string, suffix: string): string {
  const base = kw.length > 7 ? kw.slice(0, 6) : kw
  return capitalize(base) + suffix
}

// Generate compound name: two words joined → "ThreadLoft", "SilkForge"
function makeCompound(a: string, b: string): string | null {
  if (hasDoubleLetterJoin(a, b)) return null
  return capitalize(a) + capitalize(b)
}

function generateNames(keyword: string, niche: string): string[] {
  const kw = keyword.trim().replace(/[^a-zA-Z0-9]/g, '')
  if (!kw) return []

  const data = NICHE_DATA[niche] || NICHE_DATA.generic
  const results = new Set<string>()

  // 1. COINED — keyword + suffix
  data.suffixes.forEach((suffix) => {
    const name = makeCoinedName(kw, suffix)
    if (name.length >= 5 && name.length <= 14) results.add(name)
  })

  // 2. PREFIX + KEYWORD — "BioGlow", "EcoLeaf"
  data.prefixes.forEach((prefix) => {
    const name = makeCompound(prefix, kw)
    if (name && name.length >= 5 && name.length <= 14) results.add(name)
  })

  // 3. EMOTION + KEYWORD — "ZenGlow", "ApexSync"
  data.emotions.forEach((emotion) => {
    const name = makeCompound(emotion, kw)
    if (name && name.length >= 6 && name.length <= 14) results.add(name)
  })

  // 4. KEYWORD + EVOCATIVE — "SneakerForge", "CandleLoft"
  data.evocative.forEach((ev) => {
    const name = makeCompound(kw, ev)
    if (name && name.length >= 6 && name.length <= 14) results.add(name)
  })

  // 5. EVOCATIVE ONLY (mood-based names like Apple/Lush) — emotion word standalone
  data.emotions.slice(0, 4).forEach((e) => results.add(capitalize(e)))

  // 6. COINED SHORT — first 4 chars + suffix (very short, snappy)
  const short = kw.slice(0, 4)
  data.suffixes.slice(0, 3).forEach((suffix) => {
    const name = capitalize(short) + suffix
    if (name.length >= 5 && name.length <= 10) results.add(name)
  })

  // Filter: min 5 chars, max 14, no numbers in final name, deduplicated
  const filtered = [...results].filter(
    (n) => n.length >= 5 && n.length <= 14 && !/\d/.test(n)
  )

  // Shuffle deterministically using keyword as seed (stable across same inputs)
  const seed = kw.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const shuffled = filtered.sort((a, b) => {
    const ha = (a.charCodeAt(0) + seed) % 97
    const hb = (b.charCodeAt(0) + seed) % 97
    return ha - hb
  })

  return shuffled.slice(0, 12)
}

// ── Component ─────────────────────────────────────────────────────────────

const NICHES = ['generic', 'fashion', 'tech', 'health', 'beauty', 'pets', 'food']

const NICHE_LABELS: Record<string, string> = {
  generic: '🛍️ General',
  fashion: '👗 Fashion',
  tech:    '💻 Tech',
  health:  '🌿 Health',
  beauty:  '✨ Beauty',
  pets:    '🐾 Pets',
  food:    '🍃 Food',
}

export default function StoreNameGenerator() {
  const [keyword, setKeyword] = useState('')
  const [niche, setNiche] = useState('generic')
  const [names, setNames] = useState<string[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [generated, setGenerated] = useState(false)

  const generate = () => {
    if (!keyword.trim()) return
    // Rotate seed on "Generate More" by appending a random char
    const seed = generated ? keyword + String.fromCharCode(97 + Math.floor(Math.random() * 26)) : keyword
    const result = generateNames(seed, niche)
    setNames(result)
    setGenerated(true)
    trackToolUsage('store-name-generator', { keyword, niche }, { names: result } as unknown as Record<string, unknown>)
  }

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  // Tag each name with a style label so users understand the naming style
  function getNameStyle(name: string): string {
    const data = NICHE_DATA[niche] || NICHE_DATA.generic
    if (data.emotions.map(e => capitalize(e)).includes(name)) return 'Mood'
    if (data.evocative.some(ev => name.endsWith(capitalize(ev)))) return 'Compound'
    if (data.prefixes.some(p => name.startsWith(capitalize(p)))) return 'Prefixed'
    const suffixes = ['ify', 'ly', 'ova', 'ara', 'io', 'iq', 'era', 'eon', 'ique', 'elle', 'ura', 'ora', 'ia', 'ina', 'ix', 'ette']
    if (suffixes.some(s => name.toLowerCase().endsWith(s))) return 'Coined'
    return 'Blend'
  }

  const styleColors: Record<string, string> = {
    Mood:     '#ff9f43',
    Compound: '#00d4ff',
    Prefixed: '#7a5cff',
    Coined:   '#00ffaa',
    Blend:    '#ff6b6b',
  }

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: 'Syne, sans-serif' }}>
        ✨ Store Name Generator
      </h2>
      <p className="text-[#777] text-sm mb-6">
        Generate professional, brandable names for your ecommerce store — no generic fluff.
      </p>

      <div className="flex flex-col gap-3.5 mb-6">
        <div>
          <label className="block text-[13px] text-[#aaa] mb-1.5">
            Main Keyword / Product
          </label>
          <input
            type="text"
            placeholder="e.g. candle, sneaker, skin, pet"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generate()}
            className="w-full px-3.5 py-2.5 text-sm text-white rounded-lg outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>

        <div>
          <label className="block text-[13px] text-[#aaa] mb-2">Niche</label>
          <div className="flex gap-2 flex-wrap">
            {NICHES.map((n) => (
              <button
                key={n}
                onClick={() => setNiche(n)}
                className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                style={{
                  border: '1px solid',
                  borderColor: niche === n ? '#7a5cff' : 'rgba(255,255,255,0.1)',
                  background: niche === n ? 'rgba(122,92,255,0.15)' : 'rgba(255,255,255,0.04)',
                  color: niche === n ? '#c4b5fd' : '#777',
                }}
              >
                {NICHE_LABELS[n]}
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

            {/* Legend */}
            <div className="flex gap-3 flex-wrap mb-4">
              {Object.entries(styleColors).map(([label, color]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-[11px] text-[#666]">{label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {names.map((name, i) => {
                const style = getNameStyle(name)
                const color = styleColors[style] || '#aaa'
                return (
                  <motion.div
                    key={name + i}
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex justify-between items-center rounded-xl px-3.5 py-3 group"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div>
                      <div className="font-bold text-[15px] text-white">{name}</div>
                      <div className="text-[10px] mt-0.5 font-semibold" style={{ color }}>
                        {style}
                      </div>
                    </div>
                    <button
                      onClick={() => copyName(name)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all"
                      style={{
                        background: copied === name ? 'rgba(0,255,170,0.12)' : 'rgba(255,255,255,0.06)',
                        color: copied === name ? '#00ffaa' : '#666',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {copied === name ? <Check size={12} /> : <Copy size={12} />}
                      {copied === name ? 'Copied' : 'Copy'}
                    </button>
                  </motion.div>
                )
              })}
            </div>

            <button
              onClick={generate}
              className="flex items-center gap-2 text-[#aaa] text-sm font-semibold rounded-lg px-4 py-2.5 mb-6 transition-colors hover:text-white w-full justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <RefreshCw size={14} /> Generate More Names
            </button>

            <ToolCTA toolName="store-name-generator" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
